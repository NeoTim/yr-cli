(function(){

  'use strict'
  var fs = require('fs-extra');
  var path = require('path');
  var config = require('./config');
  var log = require('./debugger.js');
  var storagePath = path.join(__dirname+'', '../', 'yuidoc.json');
      config.create('yr', storagePath);

  var yr         = module.exports;
      yr.copy    = copy;
      yr.paste   = paste;
      yr.config  = configuration;


  function copy(){
    var params = process.cwd().split('/')
    var options = {
      copied: {
        path: process.cwd(),
        name: params[params.length-1]
      }
    }
    config.store(options)
  }
  function paste(){
    var copied = config.get('copied');
    console.log(copied)
    var pastedPath = path.join(process.cwd())
    gulp.task('paste', function(){
      return gulp.src( copied.path+'**/*' )
        .pipe( gulp.dest( pastedPath ) )
    }).start()
  }
  function configuration(args){
    return {
      set:function(){
        args.splice(2)
        config.set(args[0],args[1]);
      },
      get:function(){
        config.get(args[0]);
      },
      store:function(){
        config.store(args[0]);
      }
    }


  }
})()