#!/usr/bin/env node

// md-pre
// ------
// * GitHub: https://github.com/jharding/md-pre
// * Copyright (c) 2012 Jake Harding
// * Licensed under the MIT license.

// dependencies
// ============

var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var colors = require('colors');

var optimist = require('optimist')
  .usage('Usage: $0 [options] file')
  .options('d', {
    alias: 'dir',
    default: '/tmp',
    description: 'directory generated HTML file will be placed'
  })
  .options('o', {
    alias: 'open',
    default: 'open',
    description: 'command to use to open the generated HTML file'
  })
  .options('v', {
    alias: 'verbose',
    boolean: true,
    description: 'md-pre will let you know what\'s going on'
  });

var hogan = require('fs-hogan').set({
  templates: path.join(__dirname, './templates')
});

var marked = require('marked').setOptions({
  gfm: true,
  pedantic: false,
  sanitize: true,
  highlight: function(code, lang) {
    // TODO: code highlighting would be cool
  }
});

// the heavy (not really) lifting
// ==============================

var argv = optimist.argv;

if (argv.h || argv.help) { optimist.showHelp(); return; }
if (!argv.verbose) { verbose = function() {}; }

var readPath = argv._[0];
var filename = path.basename(readPath);
var template = path.join(__dirname, './templates/template.hjs');
var writePath = path.join(argv.d, process.pid + '.html');

try {
  var renderedMarkdown = marked(fs.readFileSync(readPath, 'utf8'));
  verbose([filename, 'rendered.'].join(' '));

  hogan.renderFile(template, { title: filename, content: renderedMarkdown },
    function(err, html) {
      if (err) { error(err); return; }

      fs.writeFileSync(writePath, html);
      verbose([writePath, 'created.'].join(' '));

      var cmd;
      verbose(cmd = [argv.o, writePath].join(' '));
      cp.exec(cmd, function(err) {
        err ? error(err) : verbose('Success!'.green);
      });
    }
  );
} catch(e) { error(e); return; }

// helper functions
// ================

function verbose(s) { console.log(s); }
function error(e) { console.error(e.message ? e.message.red : String(e).red); }
