# drift-slicer

  Interpolate positions of points as they drift through space and time
  The location (coordinates) of any point drifts over time. The data
  for each point is stored for known epochs only. _drift-slicer_ will
  take a set of points, and their histories, and return a set of
  points at a given time. Interpolation is linear between the previous
  and next point relative to the point-in-time in question.
  

## Example

Age(s) = T(a..z)
*-* : Time spans.
*+* : Known(/expected) position at give epoch.
*|* : Interpolated point in time slice
*+--+* : Segement is subset of data, for a marker, between 2 adjacent epochs.

       Time->      T(a)                 T(b)
                    |                    |
    P1 +----+-----+-|-------+----+-------|-------+
    P2    +------+--|-----+------------+
    P3       +------|------+
    P4                +------+--++-------|--+

Age *T1* generates time-slice *\[P1,P2,P3\](a)*
Age *T2* generates time-slice *\[P1,P4\](b)*


## TODO

Data format is common to multiple modules. Use JSONSchema to define
data format and validate in each module.


