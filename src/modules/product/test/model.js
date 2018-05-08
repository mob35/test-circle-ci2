'use strict';
var request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    _model = require('../models/model').model,
    mongooseConfig = require('../../../config/mongoose'),
    Model = mongoose.model(_model);

var product;

describe(_model + ' Model save tests', function () {
    beforeEach(function (done) {
        product = new Model({
            name: 'name',
            price: 50
        });
        product.save(function () {
            done();
        });
    });
    it('should be able to save without problems', function (done) {
        this.timeout(0);
        return product.save(function (err) {
            should.not.exist(err);
            done();
        });
    });
    it('should be able to show an error when try to save without name', function (done) {
        product.name = '';

        return product.save(function (err) {
            should.exist(err);
            done();
        });
    });
    it('should be able to show an error when try to save without price', function (done) {
        product.price = null;

        return product.save(function (err) {
            should.exist(err);
            done();
        });
    });
    afterEach(function (done) {
        Model.remove().exec(done);
    });
});