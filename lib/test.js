"use strict";

var should = require('should');
var module = require('./index');

describe('Check that slicing works', function () {

    before('load data', function (done) {
        module.setData(testImpl.data());
        done();
    });
    
    it('Correctly slices trivial example', function (done) {
        try {
            var slice = module.slice(200);
            console.log(slice);
        }
        catch (e) {
            console.log('hoop');
            console.log(e);
            process.exit();
            (1).should.equal(2); // do fail
        }
        done();
    });
});


var testImpl = function () {

    var DATA;
    activate();
    return {
        data : data
    };

    function data () { return DATA; }
    function activate () {
        DATA = [{"type":"spot-mark","id":"VJuMMEPJe","dirty":true,"positionTrack":[{"lat":33,"lon":44}]},{"type":"spot-mark","id":"NJluGGEPkl","dirty":true,"positionTrack":[{"lat":33,"lon":44}]},{"type":"spot-mark","id":"E1bufG4Dke","dirty":true,"positionTrack":[{"lat":33,"lon":44},{"lat":34,"lon":-45},{"lat":-134,"lon":45}],"inserted":true},{"type":"spot-mark","id":"NkGdfG4Dyl","dirty":true,"positionTrack":[{"lon":-28,"lat":-10,"epoch":2800},{"lon":-30,"lat":-12,"epoch":2000},{"lon":-35,"lat":-15,"epoch":-100},{"lon":-38,"lat":-18,"epoch":-600}],"inserted":true},{"type":"spot-mark","id":"V17_MG4wkx","dirty":true,"positionTrack":[{"lon":2,"lat":25,"epoch":2000},{"lon":20,"lat":35,"epoch":-1000},{"lon":5,"lat":1,"epoch":-2000},{"lon":5,"lat":1,"epoch":-8000},{"lon":50,"lat":-31,"epoch":-12000}],"inserted":true}];
    }

}();
