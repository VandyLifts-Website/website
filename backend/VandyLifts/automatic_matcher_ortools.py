from threading import Timer
from time import perf_counter
import itertools

from .models import Match, Organization, SurveySubmission

from ortools.sat.python import cp_model

# Author: David Perez
# Start Date: 10/5/2022
# Largely rewritten: 10/21/2022


class catchtime:
    """Custom Context Manager to help measure performance"""

    def __init__(self, action):
        self.action = action

    def __enter__(self):
        print(self.action)
        self.time = perf_counter()
        return self

    def __exit__(self, type, value, traceback):
        self.time = perf_counter() - self.time
        self.readout = f"{self.action} took {self.time:.3f} seconds"
        print(self.readout)


def CustomOr(model: cp_model.CpModel, bool_vars):
    """Create a BoolVar which is True if and only if any of the input bool_vars is True"""
    or_var = model.NewBoolVar("")
    sum_var = cp_model.LinearExpr.Sum(bool_vars)
    model.Add(sum_var > 0).OnlyEnforceIf(or_var)  # type: ignore
    model.Add(sum_var == 0).OnlyEnforceIf(or_var.Not())  # type: ignore
    return or_var


class ObjectiveEarlyStopping(cp_model.CpSolverSolutionCallback):
    """Create a solution callback which stops the optimizer when timer_limit seconds
    have passed since the last fitness improvement"""

    def __init__(self, timer_limit: float):
        super(ObjectiveEarlyStopping, self).__init__()
        self._timer_limit = timer_limit
        self._timer = None
        self._reset_timer()

    def on_solution_callback(self):
        print(self.ObjectiveValue(), self.WallTime())
        self._reset_timer()

    def _reset_timer(self):
        if self._timer:
            self._timer.cancel()
        self._timer = Timer(self._timer_limit, self.StopSearch)
        self._timer.start()

    def cancel_timer(self):
        if self._timer:
            self._timer.cancel()

    def StopSearch(self):
        print(f"{self._timer_limit} seconds without improvement")
        super().StopSearch()

def solve_automatic_matches(org_id):
    # Get organization
    organization = Organization.objects.get(pk=org_id)

    # Get times of the organization
    times = organization.time_choices.all()

    if organization.type_of_organization == Organization.OrganizationType.MENTOR_MENTEE:
        # Get mentors in organization
        mentors = organization.surveysubmission_set.filter(type_of_person=SurveySubmission.PersonType.MENTOR).all()  # type: ignore

        # Get mentees in organization
        mentees = organization.surveysubmission_set.filter(type_of_person=SurveySubmission.PersonType.MENTEE).all()  # type: ignore
        
        same_sets = False

    elif organization.type_of_organization == Organization.OrganizationType.DAY_IN_THE_LIFE:
        # Get guides in organization
        guides = organization.surveysubmission_set.filter(type_of_person=SurveySubmission.PersonType.GUIDE_LIFTER).all()  # type: ignore

        # Get learners in organization
        learners = organization.surveysubmission_set.filter(type_of_person=SurveySubmission.PersonType.LEARNER_LIFER).all()  # type: ignore

        mentors = guides
        mentees = learners
        same_sets = False

    elif organization.type_of_organization == Organization.OrganizationType.BUDDY:
        # Get buddies in organization
        buddies = organization.surveysubmission_set.filter(type_of_person=SurveySubmission.PersonType.BUDDY).all()  # type: ignore

        mentors = buddies
        mentees = buddies
        same_sets = True

    else:
        raise ValueError("Unknown organization type")

    # Get mentor's in organization
    # mentors = organization.surveysubmission_set.filter(type_of_person=SurveySubmission.PersonType.MENTOR).all()  # type: ignore

    # Get mentee's in organization
    # mentees = organization.surveysubmission_set.filter(type_of_person=SurveySubmission.PersonType.MENTEE).all()  # type: ignore

    # Get times of the organization
    times = organization.time_choices.all()

    model = cp_model.CpModel()

    with catchtime("Creating Bools"):
        # Create 3-dimensional matrix of BoolVars where the BoolVar
        # represents if the Mentor and Mentee are matched at that Time
        # They don't have to meet at that time
        matrix = [[[model.NewBoolVar(f"{mentor.id}_{mentee.id}_{time.id}")  # type: ignore
                    for time in times] for mentee in mentees] for mentor in mentors]

        # Collapse the last dimension to make a 2-dimentsional matrix of BoolVars where the BoolVar
        # represents if the Mentor and Mentee are matches
        matrix_without_time = [[CustomOr(
            model, time_matches) for time_matches in mentee_time_matches] for mentee_time_matches in matrix]

    # same_sets means that the set of mentors is the same as the set of mentees
    # This is the case for buddy organizations where anyone can be matched with anyone
    if same_sets:
        with catchtime("Because same_sets, forbid someone from being matched with themself"):
            # for idx, (mentor, mentee_matches) in enumerate(zip(mentors, matrix_without_time)):
            #     model.Add(mentee_matches[idx] == False)
            #     assert mentor == mentees[idx]

            for idx, (mentor, mentee_matches) in enumerate(zip(mentors, matrix_without_time, strict=True)):
                for idx2, (mentee, matched) in enumerate(itertools.islice(zip(mentees, mentee_matches, strict=True), idx + 1)):
                    if idx == idx2:
                        assert mentor == mentee
                        model.Add(matched == False)
                    else:
                        assert mentor != mentee
                        model.Add(matched == matrix_without_time[idx2][idx])

    with catchtime("Limiting each mentor's number of mentees"):
        # Each mentor has at most max_mentee_preference mentees
        for mentor, mentor_matches in zip(mentors, matrix_without_time, strict=True):
            model.Add(cp_model.LinearExpr.Sum(
                mentor_matches) <= max(0, mentor.max_matches - mentor.match_set.count()))

    with catchtime("Limiting each mentor's number of mentors"):
        # Each mentee has at most max_mentor_preference mentors
        for mentee, mentee_matches in zip(mentees, zip(*matrix_without_time, strict=True), strict=True):
            model.Add(cp_model.LinearExpr.Sum(
                mentee_matches) <=  max(0, mentee.max_matches - mentee.match_set.count()))

    with catchtime("Limiting times mentors can be matched to the times they are available"):
        # If mentor is not availble for a time, they cannot be matched with a mentee at that time
        for mentor, mentor_matches in zip(mentors, matrix, strict=True):
            for time, mentee_matches in zip(times, zip(*mentor_matches, strict=True), strict=True):
                if (not mentor.time_availability.filter(pk=time.id).exists() or  # type: ignore
                        mentor.match_set.filter(times_matched=time).exists()):
                    model.Add(cp_model.LinearExpr.Sum(mentee_matches) == 0)

    with catchtime("Limiting times mentors can be matched to the times they are available"):
        # If mentor is not availble for a time, they cannot be matched with a mentee at that time
        for mentor, mentor_matches in zip(mentors, matrix_without_time, strict=True):
            for mentee, matched in zip(mentees, mentor_matches, strict=True):
                if ((mentor.gender_preference == SurveySubmission.GenderPreference.SAME_GENDER or 
                    mentee.gender_preference == SurveySubmission.GenderPreference.SAME_GENDER) and 
                    mentor.gender != mentee.gender):
                    model.Add(matched == 0)

    with catchtime("Limiting times mentees can be matched to the times they are available"):
        # If mentee is not availble for a time, they cannot be matched with a mentor at that time
        for mentee, mentee_matches in zip(mentees, zip(*matrix, strict=True), strict=True):
            for time, mentor_matches in zip(times, zip(*mentee_matches, strict=True), strict=True):
                if (not mentee.time_availability.filter(pk=time.id).exists() or # type: ignore
                        mentee.match_set.filter(times_matched=time).exists()):
                    model.Add(cp_model.LinearExpr.Sum(mentor_matches) == 0)

    with catchtime("Limiting the number of times matched per match"):
        # Only count max_time_matches per match
        for mentor, mentor_matches in zip(mentors, matrix, strict=True):
            for mentee, time_matches in zip(mentees, mentor_matches, strict=True):
                model.Add(cp_model.LinearExpr.Sum(time_matches)
                          <= organization.max_time_matches)

    fitness_components = []

    with catchtime("Creating the metric of the number of time matches"):
        # Maximize number of time matches
        all_time_matches = [
            time for mentee_time_matches in matrix for time_matches in mentee_time_matches for time in time_matches]
        num_time_matches = model.NewIntVar(
            0, len(all_time_matches), "num_time_matches")
        model.Add(cp_model.LinearExpr.Sum(
            all_time_matches) == num_time_matches)
        fitness_components.append(
            (num_time_matches, organization.num_time_matches_weight))

    with catchtime("Creating the metric of the number of matches"):
        # Maximize number of matches
        all_matches = [
            has_match for mentor_matches in matrix_without_time for has_match in mentor_matches]
        num_matches = model.NewIntVar(0, len(all_matches), "num_matches")
        model.Add(cp_model.LinearExpr.Sum(all_matches) == num_matches)
        fitness_components.append(
            (num_matches, organization.num_matches_weight))

    with catchtime("Creating the metric of the number of mentors with matches"):
        # Maximize number of mentors with matches
        all_mentor_matches = [CustomOr(model, mentor_matches)
                              for mentor_matches in matrix_without_time]
        num_mentor_matches = model.NewIntVar(
            0, len(all_mentor_matches), "num_mentor_matches")
        model.Add(cp_model.LinearExpr.Sum(
            all_mentor_matches) == num_mentor_matches)
        # TODO: Don't hardcode weight
        fitness_components.append((num_mentor_matches, organization.matched_mentors_weight))

    with catchtime("Creating the metric of the number of mentees with matches"):
        # Maximize number of mentees with matches
        all_mentee_matches = [CustomOr(model, mentee_matches)
                              for mentee_matches in zip(*matrix_without_time)]
        num_mentee_matches = model.NewIntVar(
            0, len(all_mentee_matches), "num_mentee_matches")
        model.Add(cp_model.LinearExpr.Sum(
            all_mentee_matches) == num_mentee_matches)
        # TODO: Don't hardcode weight
        fitness_components.append((num_mentee_matches, organization.matched_mentees_weight))

    with catchtime("Creating the metric of the number of matched preferences with matches"):
        # Maximize number of matches
        all_matches = [
            (has_match, mentor.power_lifting == mentee.power_lifting + mentor.body_building == mentee.body_building + mentor.olympic_lifting == mentee.olympic_lifting)
            for mentor, mentor_matches in zip(mentors, matrix_without_time, strict=True) for mentee, has_match in zip(mentees, mentor_matches, strict=True)]
        num_matches = model.NewIntVar(0, len(all_matches), "num_matches")
        model.Add(cp_model.LinearExpr.WeightedSum(*zip(*all_matches)) == num_matches)
        # TODO: Don't hardcode weight
        fitness_components.append((num_matches, organization.matched_preferences_weight))

    with catchtime("Creating the composite metric"):
        fitness = cp_model.LinearExpr.WeightedSum(
            *zip(*fitness_components, strict=True))

    with catchtime("Optimize the constrained model"):
        solver = cp_model.CpSolver()
        callback = ObjectiveEarlyStopping(30.0)
        model.Maximize(fitness)
        status = solver.Solve(model, callback)
        callback.cancel_timer()

    if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
        print("Fitness:", solver.ObjectiveValue())

        print()
        print("Mentees:")
        for mentor in mentors:
            # print(mentor.user.username, [str(time) for time in mentor.time_availability.all()], "max mentees:", mentor.max_matches)
            print((f"{mentor.user.username} has "
                   f"{len([str(time) for time in mentor.time_availability.all()])} "
                   "time availabilities and wants at most "
                   f"{mentor.max_matches} mentee(s)"))

        print()
        print("Mentees:")
        for mentee in mentees:
            # print(mentee.user.username, [str(time) for time in mentee.time_availability.all()], "max mentors:", mentee.max_matches)
            print((f"{mentee.user.username} has "
                   f"{len([str(time) for time in mentee.time_availability.all()])} "
                   "time availabilities and wants at most "
                   f"{mentee.max_matches} mentor(s)"))

        # print()
        # print("Matrix:")
        # for mentor, mentor_matches in zip(mentors, matrix):
        #     for mentee, time_matches in zip(mentees, mentor_matches):
        #         for (time, b) in zip(times, time_matches):
        #             print(mentor, mentee, time, solver.BooleanValue(b))

        print()
        print("Mentors matches:")
        # Output mentor matches
        for mentor, mentor_matches in zip(mentors, matrix_without_time):
            print((f"{mentor.user.username} has "
                   f"{sum(solver.Value(mentee_matches) for mentee_matches in mentor_matches)} "
                   "mentees"))

        print()
        print("Mentee matches:")
        # Output mentee matches
        for mentee, mentee_matches in zip(mentees, zip(*matrix_without_time)):
            print((f"{mentee.user.username} has "
                   f"{sum(solver.Value(mentee_matches) for mentee_matches in mentee_matches)} "
                   "mentors"))

        print()
        print(("Mentor-Mentee Pairs:"
               f"(max time matches: {organization.max_time_matches}, "
               f"num time matches weight: {organization.num_time_matches_weight}, "
               f"num matches weight: {organization.num_matches_weight})"))
        # Output mentor mentee pairs
        for mentor, mentor_matches in zip(mentors, matrix):
            for mentee, time_matches in zip(mentees, mentor_matches):
                if any(solver.BooleanValue(time) for time in time_matches):
                    # print(mentor.user.username, "-", mentee.user.username, [str(time) for time, matches in zip(times, time_matches) if solver.BooleanValue(matches)])
                    print((f"{mentor.user.username} - {mentee.user.username} "
                           f"{len([str(time) for time, matches in zip(times, time_matches) if solver.BooleanValue(matches)])}"))

        print()
        print(("Mentor-Mentee Pairs:"
               f"(max time matches: {organization.max_time_matches}, "
               f"num time matches weight: {organization.num_time_matches_weight}, "
               f"num matches weight: {organization.num_matches_weight}) "
               "(Ordered by mentees)"))
        # Output mentee mentor pairs
        for mentee, mentee_matches in zip(mentees, zip(*matrix)):
            for mentor, time_matches in zip(mentors, mentee_matches):
                if any(solver.BooleanValue(time) for time in time_matches):
                    # print(mentor.user.username, "-", mentee.user.username, [str(time) for time, matches in zip(times, time_matches) if solver.BooleanValue(matches)])
                    print((f"{mentor.user.username} - {mentee.user.username} "
                           f"{len([str(time) for time, matches in zip(times, time_matches) if solver.BooleanValue(matches)])}"))

        # Change from multi-dimensional array of symbolic values to concrete results
        if same_sets:
            results = [(mentor, mentee, [time for time, b in zip(times, time_matches) if solver.BooleanValue(b)])
                for idx, (mentor, mentor_matches) in enumerate(zip(mentors, matrix))
                for mentee, time_matches in itertools.islice(zip(mentees, mentor_matches), idx)
                if any(solver.BooleanValue(time) for time in time_matches)]
        else:
            results = [(mentor, mentee, [time for time, b in zip(times, time_matches) if solver.BooleanValue(b)])
                for mentor, mentor_matches in zip(mentors, matrix)
                for mentee, time_matches in zip(mentees, mentor_matches)
                if any(solver.BooleanValue(time) for time in time_matches)]

        # Add matches to database
        for mentor, mentee, time_matches in results:
            match = Match(organization=organization, confirmed=False)
            match.save()
            match.people.add(mentor, mentee)
            match.times_matched.add(*time_matches)

        return results
    return []
