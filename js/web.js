var transformer = require('dat-transformer');

var w = module.exports = {}
w.transformer = transformer;


w.bindHandlers = function() {
  $('#transform-button').click(w.onClickTransform);
}

w.onClickTransform = function(event) {
  var text = $('#text-1').text().trim();
  var chain = $('#chain').text().trim().split(' ');
  chain.unshift('string');
  chain.push('string');
  var xform = transformer.async.compose(chain);

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
