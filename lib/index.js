/**
 * Created by ckelly on 27-9-2015.
 */
var Promise = require('q').Promise;
var _ = require('lodash');


var DriftSlicer = function () {
    "use strict";

    var TIMEPOINT_DATA;
    
    return {
        setData : setData,
        slice : slice
    };

    // -----
    function setData (data) {
        TIMEPOINT_DATA = data;
    }
    function slice (age) {
        console.log(TIMEPOINT_DATA);
        var spotMarks
            = TIMEPOINT_DATA.filter(function enoughDataToSpanTime (sm) {
                return sm.positionTrack.length > 1;
            });
        
        if (!spotMarks.length) throw(new Error('No data to slice'));

        var slicedMarks = spotMarks
            .map(function (sm) {
                sm.epochs = _.pluck(sm.positionTrack, 'epoch')
                    .sort(function (a,b) { return a - b;})
                    .filter(function (epoch, i, lst) {
                        var greaterThanPrev = age >= (i ? lst[i-1] : -Infinity) && age < epoch
                        var lessThanNext = i !== lst.length-1
                            ? ((age >= epoch) && (age < lst[i+1]))
                            : false;
                        return greaterThanPrev || lessThanNext;
                    });
                return sm;
            })
            .filter(function agesThatSpan (sm) {
                return sm.epochs.length === 2;
            })
            .map(function removeIrslicedMarks (sm) {
                var p1 = _.findWhere(sm.positionTrack, { epoch : sm.epochs[0] });
                var p2 = _.findWhere(sm.positionTrack, { epoch : sm.epochs[1] });
                var factor = age/ (sm.epochs[1]-sm.epochs[0]);
                return [
                    { lat : p1.lat, lon : p1.lon, factor: factor, id : sm._id },
                    { lat : p2.lat, lon : p2.lon }
                ]
            })
            .map(function inferPoint (segment) {
                var factor = segment[0].factor;
                return {
                    id : segment[0].id,
                    lon : segment[0].lon + ((segment[1].lon - segment[0].lon) * factor),
                    lat : segment[0].lat + ((segment[1].lat - segment[0].lat) * factor)
                };
            });
        
        return slicedMarks;
    }

}();

module.exports = DriftSlicer;
