# drift-slicer

  Interpolate positions of points as they drift through space and time


## Example

Age(s) = T(a..z)
*-* : Time spans.
*+* : Position at give timespan.
*|* : Interpolated point in time slice

       Time->      T(a)                 T(b)
                    |                    |
    P1 +----+-----+-|-------+----+-------|-------+
    P2    +------+--|-----+------------+
    P3       +------|------+
    P4                +------+--++-------|--+

Age *T1* generates time-slice *\[P1,P2,P3\](a)*
Age *T2* generates time-slice *\[P1,P4\](b)*
