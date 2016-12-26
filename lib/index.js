/**
 * Created by ckelly on 27-9-2015.
 * See README.md for details.
 */
var Promise = require('q').Promise;
var _ = require('lodash');

module.exports = function () {
    "use strict";

    return {
	// spec is optional
	slice : (data, age, spec) => {
	    spec = spec || {};
            var spotMarks
		= data.filter(function enoughDataToSpanTime (sm) {
                    return sm.positionTrack.length > 1;
		});
            if (!spotMarks.length) throw(new Error('No data to slice'));
            return spotMarks
	        // first select only points that have data in the timespan
		.map(sm => {
                    sm.epochs = _.pluck(sm.positionTrack, 'epoch')
		        // data may be in any order in the
		        // dataset. order by ascending time
			.sort((a,b) => a - b)
		        // 
			.filter((epoch, i, lst) => {
                            var greaterThanPrev = age >= (i ? lst[i-1] : -Infinity) &&
				age < epoch;
                            var lessThanNext = i !== lst.length-1
				? ((age >= epoch) && (age < lst[i+1]))
				: false;
                            return greaterThanPrev || lessThanNext;
			});
                    return sm;
		})
                // only data with multiple epochs can be
                // sliced. i.e. there must be more than one point to be considered.
 		.filter(sm => sm.epochs.length === 2)
                // abc removeIrslicedMarks
		.map(sm => {
                    var p1 = _.findWhere(sm.positionTrack, { epoch : sm.epochs[0] });
                    var p2 = _.findWhere(sm.positionTrack, { epoch : sm.epochs[1] });
                    var factor = age/ (sm.epochs[1]-sm.epochs[0]);
                    return [
			{ lat : p1.lat, lon : p1.lon, factor: factor, id : sm.id },
			{ lat : p2.lat, lon : p2.lon }
                    ];
		})
               // With only the segement, interpolate the point
		.map(spec.interpolator || defaultInterpolator);

	    function defaultInterpolator (segment) {
		var factor = segment[0].factor;
		return {
		    id : segment[0].id,
		    lon : segment[0].lon + ((segment[1].lon - segment[0].lon) * factor),
		    lat : segment[0].lat + ((segment[1].lat - segment[0].lat) * factor)
		};
	    }
	}

    };

}();

