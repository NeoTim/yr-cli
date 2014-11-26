#!/usr/bin/env node

/*
 * yr
 * https://github.com/joelcoxokc/yr
 *
 * Copyright (c) 2014,
 * Licensed under the MIT license.
 */

/**
 * Module dependencies.
 */

var program = require('commander'),
    updateNotifier = require('update-notifier'),
    Insight = require('insight'),
    _ = require('underscore'),
    banner = require('../lib/banner.js'),
    Api = require('..'),
    api = new Api('access_token'),
    path = require('path'),
    debug = require('../lib/debugger.js'),
    pkg = require('../package.json')
    yr  = require('../lib/generator'),
    gulp = require('gulp'),
    cargs = require('minimist')(process.argv.slice(3)),
    projects = require('../lib/projects'),
require('colors');

/*
 * Api Insight
 */

var insight = new Insight({
    trackingCode: 'google-traking-code',
    packageName: pkg.name,
    packageVersion: pkg.version
});

/*
 * Api Bootstrap
 */

program
    .version(pkg.version, '-v, --version')
    .usage('command [option]'.white);

/*
 * Options
 */

program
    .option('--json', 'Show pure JSON output');

program
  .option('-s, --set', 'clarify the key and item', setter)

/*
 * Api Signup
 */

program
    .command('signup')
    .description('Create your account'.blue)
    .action(function() {
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'What\'s your name?'
        }, {
            type: 'input',
            name: 'email',
            message: 'What\'s your email?'
        }, {
            type: 'password',
            name: 'password',
            message: 'Enter your password'
        }];
        //Ask
        api.prompt(prompts, function(answers) {
            api.signup(answers.name, answers.email, answers.password);
        });
    });

function setter(val){
  return val
}

/*
 * Config.get
 */
program
    .command('config:get')
    .action(function() {
      yr.config(this.args).get();
    });

/*
 * Config.set
 */
program
    .command('config:set')
    .action(function() {
      yr.config(this.args).set();
    });


/*
 * Config.store
 */
program
    .command('config:store')
    .action(function() {
      yr.config(this.args).store();
    });

/*
 * Api Status
 */
program
    .command('status')
    .description('Show status of API'.white)
    .action(function() {
        api.status(program.json);
    });

/*
 * Copy Status
 */
program
    .command('copy')
    // .description('Show status of API'.white)
    .action(function() {
      yr.copy();
      console.log('copied ', process.cwd());
    });

program
  .command('project:create')
  .action(function(){
    projects.create(this.args[1])
  });

/*
 * Paste Status
 */
program
    .command('paste')
    .description('Show status of API'.white)
    .action(function() {
      yr.paste();
    });

/*
 * Api on help ption show examples
 */

program.on('--help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ yr signup');
    console.log('    $ yr status');
    console.log('');
});

/*
 * Api Banner
 */

if (process.argv.length === 3 && process.argv[2] === '--help') {
    banner();
}

if (process.argv.length === 4 && process.argv[3] !== '--json') {
    banner();
} else {
    if (process.argv.length === 3 && process.argv[2] !== '--help') {
        banner();
    }
}

/*
 * Api Process Parser
 */

program.parse(process.argv);

/*
 * Api Default Action
 */

var notifier = updateNotifier({
    packageName: pkg.name,
    packageVersion: pkg.version
});

if (notifier.update) {
    notifier.notify(true);
}

if (process.argv.length == 2) {
    banner();
    program.help();
}
