// var $ = require('jquery'); // already in browser
// var _ = require('underscore'); // already in browser
var browser = require('./browser');

var w = module.exports = function() {
  $("[data-toggle='tooltip']").tooltip();
  browser(); // browser entry point.
}

// call entry point
$(document).ready(w);
