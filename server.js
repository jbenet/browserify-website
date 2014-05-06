#!/usr/bin/env node

var express = require('express');
var swig = require('swig');
var app = express();

// options
var argv = require('minimist')(process.argv);
var path = argv.path || __dirname + '/build';
var port = argv.port || 3000;


// setup swig rendering
app.engine('html', swig.renderFile);

app.use('/', express.static(path));

app.listen(port, function() {
  console.log("Serving from " + path);
  console.log("Listening on " + port);
});
