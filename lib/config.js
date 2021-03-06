;(function(){

  'use strict';

      // var through = require("through2");
      // var gutil   = require("gulp-util");
      // var Gulp    = require(gulp);
      var yeomanStorage = require('./yeoman-storage.js');
      var _ = require('lodash');


      module.exports = new Storage

      function Storage(options){

        var __this = this;

        // __this.__gulpInst = gulpInst || null;
        __this.__configStore  = yeomanStorage;

      }

      Storage.prototype.create  = function ( name, fileName ) {

        var __this = this;
        __this.__configuration = new __this.__configStore( name, fileName );
      };

      Storage.prototype.set     = function ( key, val ) {

        var __this = this;
        return __this.__configuration.set( key, val );
      };

      Storage.prototype.get     = function ( key ) {

        var __this = this;

        if( key && _.isString( key )  ){
          return __this.__configuration.get( key );
        }
        return __this.__configuration.getAll();
      };

      Storage.prototype.store    = function ( object ) {

        var __this = this;

        _(object).forEach( function ( item, key ) {
          __this.__configuration.set( key, item );
        });

      };

      Storage.prototype.Storage = Storage;



}).call(this);