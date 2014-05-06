#!/usr/bin/env node

var rw = require('rw');
var swig = require('swig');
var marked = require('marked');

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

swig.setFilter('markdown', function() {
  return marked(input);
});

var render = function(input) {
  var tpl = swig.compileFile(__dirname + '/other/base.html');
  var out = tpl({ content: input });
  return out
};

var input = rw.readSync('/dev/stdin', 'utf-8');
console.log(render(input));
