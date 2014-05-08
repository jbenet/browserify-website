// var $ = require('jquery'); // already in browser
// var _ = require('underscore'); // already in browser
var transformer = require('dat-transformer');
var modules = require('./modules');
var examples = require('./examples');

var w = module.exports = function() {
  w.bindHandlers();
}

w.transformer = transformer;


w.bindHandlers = function() {
  $('#browser-transformer').submit(w.onClickTransform);
  $('#btn-transform').click(w.onClickTransform);
  $('#btn-example').click(w.onClickRandomExample);
  $('#btn-reverse').click(w.onClickReverse);
}

w.onClickTransform = function(event) {
  if (event) event.preventDefault();

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

    $('#text-2').val(output);
    w.highlight($('#btn-transform'));
    w.highlight($('#text-2'));
  });
}

w.highlight = function(sel) {
  var $sel = $(sel);
  $sel.focus();
  $sel.addClass('highlight');
  setTimeout(function() {
    $sel.removeClass('highlight');
  }, 200);
}

w.onClickRandomExample = function() {
  var ex = _.sample(examples);
  console.log('using example: ' + ex);
  $('#text-2').val('');
  $('#text-1').val(ex[0]);
  $('#type-chain').val(ex[1]);
  w.highlight('#text-1');
  w.highlight('#type-chain');
  w.highlight('#btn-transform');
  // w.onClickTransform();
}

w.onClickReverse = function() {
  console.log('reversing');
  $('#type-chain').val($('#type-chain').val().split(' ').reverse().join(' '));
  w.highlight('#type-chain');
  w.onChangedTypeChain();
}

w.onChangedTypeChain = function() {
  if ($('#text-2').val() && $('#text-1').val() && $('#type-chain').val())
    w.onClickTransform();
}
