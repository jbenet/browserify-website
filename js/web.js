// var $ = require('jquery'); // already in browser
// var _ = require('underscore'); // already in browser
var transformer = require('dat-transformer');
var modules = require('./modules');

var w = module.exports = {}
w.transformer = transformer;


w.bindHandlers = function() {
  $('#transform-button').click(w.onClickTransform);
  $('#browser-transformer').submit(w.onClickTransform);
}

w.onClickTransform = function(event) {
  event.preventDefault();

  var text = $('#text-1').val().trim();
  if (!text)
    return w.highlight($('#text-1'));

  var chain = $('#type-chain').val().trim();
  if (!chain)
    return w.highlight($('#type-chain'));

  chain = _.filter(chain.split(' '), function (x) { return x });
  chain.unshift('string');
  chain.push('string');
  var xform = transformer.async.compose(chain);

  console.log(text);
  console.log('transform ' + chain.join(' '));
  xform(text, function(err, output) {
    if (err) throw err;

    $('#text-2').text(output);
    w.highlight($('#transformer-button'));
    w.highlight($('#text-2'));
  });
}

w.highlight = function(sel) {
  $sel = $(sel);
  $sel.focus();
  $sel.addClass('highlight');
  setTimeout(function() {
    $sel.removeClass('highlight');
  }, 200);
}

// entry point
$(document).ready(function() {
  w.bindHandlers();
})
