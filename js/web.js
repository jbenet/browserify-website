// var $ = require('jquery'); // already in browser
// var _ = require('underscore'); // already in browser
var transformer = require('dat-transformer');

var w = module.exports = {}
w.transformer = transformer;


w.bindHandlers = function() {
  $('#transform-button').click(w.onClickTransform);
  $('#browser-transformer').submit(w.onClickTransform);
}

w.onClickTransform = function(event) {
  var text = $('#text-1').val().trim();
  var chain = $('#type-chain').val().trim().split(' ');
  chain = _.filter(chain, function (x) { return x });
  chain.unshift('string');
  chain.push('string');
  var xform = transformer.async.compose(chain);

  console.log(text);
  console.log('transform ' + chain.join(' '));
  xform(text, function(err, output) {
    if (err) throw err;

    $('#text-2').text(output);
    // $('#text-2').addClass('shine');
    // $('#text-2').removeClass('shine');
  });

  event.preventDefault();
  return false;
}

// entry point
$(document).ready(function() {
  w.bindHandlers();
})
