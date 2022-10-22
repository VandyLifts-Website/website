from datetime import datetime
from time import perf_counter

import z3

# Author: David Perez
# Start Date: 10/5/2022

# David Perez: 10/21/2022
# After testing with the current semester's data, we noticed that Z3
# took 10 minutes to find the best matches
#
# This was too slow and since it was due to the library we replaced
# this code with the version in automatic_matcher_ortools.py
#
# OrTools can find the best matches in less than 1 minute


class catchtime:
    def __init__(self, action):
        self.action = action

    def __enter__(self):
        print(self.action)
        self.time = perf_counter()
        return self

    def __exit__(self, type, value, traceback):
        self.time = perf_counter() - self.time
        self.readout = f'{self.action} took {self.time:.3f} seconds'
        print(self.readout)


def solve_automatic_matches(organization, mentors, mentees, times):
    start = datetime.now()
    print("Start: %s", start)

    with catchtime("Creating context"):
        c = z3.Context()

    with catchtime("Creating solver/optimizer"):
        s = z3.Solver(ctx=c)
        s.set("timeout", 5*60000)

        # s = z3.Optimize(ctx = c)

    with catchtime("Creating Bools"):
        #matrix = [[[z3.Bool(f"{mentor}_{mentee}_{time}", ctx = c) for time in times] for mentee in mentees] for mentor in mentors]
        matrix = [[[z3.Bool(f"{mentor.id}_{mentee.id}_{time.id}", ctx=c)
                    for time in times] for mentee in mentees] for mentor in mentors]

    with catchtime("Limiting each mentor's number of mentees"):
        # Each mentor has at most max_mentee_preference mentees
        for mentor, mentor_matches in zip(mentors, matrix, strict=True):
            s.add(z3.PbLe([(z3.Or(mentee_time_matches), 1)
                  for mentee_time_matches in mentor_matches], mentor.max_matches))

    with catchtime("Limiting each mentor's number of mentors"):
        # Each mentee has at most max_mentor_preference mentors
        for mentee, mentee_matches in zip(mentees, zip(*matrix, strict=True), strict=True):
            s.add(z3.PbLe([(z3.Or(mentor_time_matches), 1)
                  for mentor_time_matches in mentee_matches], mentee.max_matches))

    with catchtime("Limiting times mentors can be matched to the times they are available"):
        # If mentor is not availble for a time, they cannot be matched with a mentee at that time
        for mentor, mentor_matches in zip(mentors, matrix, strict=True):
            for time, mentee_matches in zip(times, zip(*mentor_matches, strict=True), strict=True):
                if not mentor.time_availability.filter(pk=time.id).exists():
                    s.add(z3.Not(z3.Or(mentee_matches)))

    with catchtime("Limiting times mentees can be matched to the times they are available"):
        # If mentee is not availble for a time, they cannot be matched with a mentor at that time
        for mentee, mentee_matches in zip(mentees, zip(*matrix, strict=True), strict=True):
            for time, mentor_matches in zip(times, zip(*mentee_matches, strict=True), strict=True):
                if not mentee.time_availability.filter(pk=time.id).exists():
                    s.add(z3.Not(z3.Or(mentor_matches)))

    with catchtime("Limiting the number of times matched per match"):
        # Only count max_time_matches per match
        for mentor, mentor_matches in zip(mentors, matrix, strict=True):
            for mentee, time_matches in zip(mentees, mentor_matches, strict=True):
                s.add(z3.PbLe(
                    [(time_match, 1) for time_match in time_matches], organization.max_time_matches))

    with catchtime("Creating the metric of the number of time matches"):
        # Maximize number of time matches
        #num_time_matches = z3.Sum([z3.Sum([z3.Sum([z3.If(time, 1, 0) for time in time_matches]) for time_matches in mentee_time_matches]) for mentee_time_matches in matrix])
        num_time_matches = z3.Sum([z3.If(
            time, 1, 0) for mentee_time_matches in matrix for time_matches in mentee_time_matches for time in time_matches])

    with catchtime("Creating the metric of the number of matches"):
        # Maximize number of matches
        #num_matches = z3.Sum([z3.Sum([z3.If(z3.Or(time_matches), 1, 0) for time_matches in mentee_time_matches]) for mentee_time_matches in matrix])
        num_matches = z3.Sum([z3.If(z3.Or(time_matches), 1, 0)
                             for mentee_time_matches in matrix for time_matches in mentee_time_matches])

    with catchtime("Creating the composite metric"):
        a = num_time_matches * organization.num_time_matches_weight
        b = num_matches * organization.num_matches_weight

        fitness = a + b   # type: ignore

    m = None

    precheck = datetime.now()
    print("Pre-check: %s", precheck - start)

    prestep = precheck
    while s.check() == z3.sat:
        m = s.model()
        prev_fitness = m.eval(fitness, model_completion=True)
        print("Current fitness: %s", prev_fitness)
        poststep = datetime.now()
        print("Step duration: %s", poststep - prestep)
        prestep = poststep
        s.add(fitness > prev_fitness)

    print("Post-check: %s", datetime.now() - precheck)

    if m is not None:
        # print("Optimal model:", m)
        print("Final fitness: %s", m.eval(fitness, model_completion=True))

        # print()
        # print("Matrix:")
        # # Output matrix
        # for mentor, mentor_matches in zip(mentors, matrix):
        #     for mentee, time_matches in zip(mentees, mentor_matches):
        #         for (time, b) in zip(times, time_matches):
        #             print(mentor, mentee, time, m.eval(b, model_completion=True))

        # print()
        # print("Mentor matches:")
        # # Output mentor matches
        # for mentor, mentor_matches in zip(mentors, matrix):
        #     print(mentor, m.eval(z3.Or([z3.Or(mentee_time_matches) for mentee_time_matches in mentor_matches]), model_completion=True))

        # print()
        # print("Mentee matches:")
        # # Output mentee matches
        # for mentee, mentee_matches in zip(mentees, zip(*matrix)):
        #     print(mentee, m.eval(z3.Or([z3.Or(mentor_time_matches) for mentor_time_matches in mentee_matches]), model_completion=True))

        # print()
        # print('Mentees:')
        # for mentor in mentors:
        #     print(mentor.user.username, [str(time) for time in mentor.time_availability.all()], 'max mentees:', mentor.max_matches)

        # print()
        # print('Mentees:')
        # for mentee in mentees:
        #     print(mentee.user.username, [str(time) for time in mentee.time_availability.all()], 'max mentors:', mentee.max_matches)

        # print()
        # print("Pairs:", f'(max time matches: {organization.max_time_matches}, num time matches weight: {organization.num_time_matches_weight}, num matches weight: {organization.num_matches_weight})')
        # # Output mentor mentee pairs
        # for mentor, mentor_matches in zip(mentors, matrix):
        #     for mentee, time_matches in zip(mentees, mentor_matches):
        #         if m.eval(z3.Or(time_matches), model_completion=True):
        #             print(mentor.user.username, '-', mentee.user.username, [str(time) for time, matches in zip(times, time_matches) if m.eval(matches)])

        return [(mentor, mentee, [time for time, b in zip(times, time_matches) if m.eval(b, model_completion=True)]) for mentor, mentor_matches in zip(mentors, matrix) for mentee, time_matches in zip(mentees, mentor_matches) if m.eval(z3.Or(time_matches))]
    return []
