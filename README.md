# drift-slicer

  Interpolate positions of points as they drift through space and time

## Example

    Time ->   Age = A
    [-] : Time spans.
    [+] : Position at give timespan.

                   T(a)                 T(b)
                    |                    |
    P1 +----+-----+-|-------+----+-------|-------+
    P2    +------+--|-----+------------+
    P3       +------|------+
    P4                +------+--++-------|--+

Age *T1* generates time-slice [P1,P2,P3](a)
Age *T2* generates time-slice [P1,P4](b)


