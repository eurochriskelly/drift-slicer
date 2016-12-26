"use strict";

var should = require('should');
var _      = require('lodash');
var sut    = require('./index');

describe('Check that slicing works', () => {
    const data = require('../sample/data.json');

    it('Correctly finds slice in sample', done => {
        var slice = sut.slice(data, 200);
        slice.length.should.equal(2);
        slice.forEach(s => {
            should.exist(s.lon);
            should.exist(s.lat);
            (typeof s.id).should.equal('string');
        });
        done();
    });

    it ('finds nothing where nothing exists', done => {
        var slice = sut.slice(data, 20000);
        slice.length.should.equal(0);
        done();
    });
});
