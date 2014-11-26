/*
 * yr
 * https://github.com/joelcoxokc/yr
 *
 * Copyright (c) 2014, 
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var Api = require('../lib/yr.js');
var api = new Api('access_token');

describe('yr module', function() {
    describe('#constructor()', function() {
        it('should be a function', function() {
            Api.should.be.a("function");
        });
    });
    describe('#instance()', function() {
        it('should be a object', function() {
            api.should.be.a("object");
        });
    });
});

