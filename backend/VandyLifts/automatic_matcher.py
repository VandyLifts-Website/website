import z3


# Author: David Perez
# Start Date: 10/5/2022


def solve_automatic_matches(organization, mentors, mentees, times):
    c = z3.Context()

    s = z3.Solver(ctx = c)
    # s = z3.Optimize(ctx = c)

    #matrix = [[[z3.Bool(f"{mentor}_{mentee}_{time}", ctx = c) for time in times] for mentee in mentees] for mentor in mentors]
    matrix = [[[z3.Bool(f"{mentor.id}_{mentee.id}_{time.id}", ctx = c) for time in times] for mentee in mentees] for mentor in mentors]

    # Each mentor has at most max_mentee_preference mentees
    for mentor, mentor_matches in zip(mentors, matrix, strict=True):
        s.add(z3.PbLe([(z3.Or(mentee_time_matches), 1) for mentee_time_matches in mentor_matches], mentor.max_matches))

    # Each mentee has at most max_mentor_preference mentors
    for mentee, mentee_matches in zip(mentees, zip(*matrix, strict=True), strict=True):
        s.add(z3.PbLe([(z3.Or(mentor_time_matches), 1) for mentor_time_matches in mentee_matches], mentee.max_matches))

    # If mentor is not availble for a time, they cannot be matched with a mentee at that time
    for mentor, mentor_matches in zip(mentors, matrix, strict=True):
        for time, mentee_matches in zip(times, zip(*mentor_matches, strict=True), strict=True):
            if not mentor.time_availability.filter(pk=time.id).exists():
                s.add(z3.Not(z3.Or(mentee_matches)))

    # If mentee is not availble for a time, they cannot be matched with a mentor at that time
    for mentee, mentee_matches in zip(mentees, zip(*matrix, strict=True), strict=True):
        for time, mentor_matches in zip(times, zip(*mentee_matches, strict=True), strict=True):
            if not mentee.time_availability.filter(pk=time.id).exists():
                s.add(z3.Not(z3.Or(mentor_matches)))

    # Only count max_time_matches per match
    for mentor, mentor_matches in zip(mentors, matrix, strict=True):
        for mentee, time_matches in zip(mentees, mentor_matches, strict=True):
            s.add(z3.PbLe([(time_match, 1) for time_match in time_matches], organization.max_time_matches))

    # Maximize number of time matches
    num_time_matches = z3.Sum([z3.Sum([z3.Sum([z3.If(time, 1, 0) for time in time_matches]) for time_matches in mentee_time_matches]) for mentee_time_matches in matrix])

    # Maximize number of matches
    num_matches = z3.Sum([z3.Sum([z3.If(z3.Or(time_matches), 1, 0) for time_matches in mentee_time_matches]) for mentee_time_matches in matrix])


    a = num_time_matches * organization.num_time_matches_weight
    b = num_matches * organization.num_matches_weight

    fitness = a + b   # type: ignore

    m = None
    print(s.assertions())

    while s.check() == z3.sat:
        m = s.model()
        prev_fitness = m.eval(fitness, model_completion=True)
        print("Current fitness:", prev_fitness)
        s.add(fitness > prev_fitness)
        
    if m is not None:
        print("Optimal model:", m)
        print("Final fitness:", m.eval(fitness, model_completion=True))
        
        print()
        print("Matrix:")
        # Output matrix
        for mentor, mentor_matches in zip(mentors, matrix):
            for mentee, time_matches in zip(mentees, mentor_matches):
                for (time, b) in zip(times, time_matches):
                    print(mentor, mentee, time, m.eval(b, model_completion=True))

        print()
        print("Mentor matches:")
        # Output mentor matches
        for mentor, mentor_matches in zip(mentors, matrix):
            print(mentor, m.eval(z3.Or([z3.Or(mentee_time_matches) for mentee_time_matches in mentor_matches]), model_completion=True))

        print()
        print("Mentee matches:")
        # Output mentee matches
        for mentee, mentee_matches in zip(mentees, zip(*matrix)):
            print(mentee, m.eval(z3.Or([z3.Or(mentor_time_matches) for mentor_time_matches in mentee_matches]), model_completion=True))

        print()
        print("Pairs:")
        # Output mentor mentee pairs
        for mentor, mentor_matches in zip(mentors, matrix):
            for mentee, time_matches in zip(mentees, mentor_matches):
                if m.eval(z3.Or(time_matches), model_completion=True):
                    print(mentor, mentee, [time for time, matches in zip(times, time_matches) if m.eval(matches)])

        return [(mentor, mentee, [time for time, b in zip(times, time_matches) if m.eval(b, model_completion=True)]) for mentor, mentor_matches in zip(mentors, matrix) for mentee, time_matches in zip(mentees, mentor_matches) if m.eval(z3.Or(time_matches))]
    return []
