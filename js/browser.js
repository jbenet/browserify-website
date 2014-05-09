// var $ = require('jquery'); // already in browser
// var _ = require('underscore'); // already in browser
var transformer = require('dat-transformer');
var modules = require('./modules');
var examples = require('./examples');

var w = module.exports = function() {
  w.bindHandlers();
  console.log(w.welcome);
}

var log = function(s) {
  console.log('/browser/ ' + s);
}

w.transformer = transformer;
window.transformer = transformer;

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

  log(text);
  log('transform ' + chain.join(' '));
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
  log('using example: ' + ex);
  $('#text-2').val('');
  $('#text-1').val(ex[0]);
  $('#type-chain').val(ex[1]);
  w.highlight('#text-1');
  w.highlight('#type-chain');
  w.highlight('#btn-transform');
  // w.onClickTransform();
}

w.onClickReverse = function() {
  log('reversing');
  $('#type-chain').val($('#type-chain').val().split(' ').reverse().join(' '));
  w.highlight('#type-chain');
  w.onChangedTypeChain();
}

w.onChangedTypeChain = function() {
  if ($('#text-2').val() && $('#text-1').val() && $('#type-chain').val())
    w.onClickTransform();
}

w.welcome = '\n\
\n\
Greetings! You can use transformer directly from this javascript console.\n\
There is a `transformer` variable ready to go! Try it out, copy the code \n\
below and paste it into the console:\n\
-------------------------------------------------------------------------\n\
\n\
// set up a transformer function to convert base64 to ascii\n\
var base64ToAscii = transformer("base64", "ascii");\n\
\n\
// a secret message!\n\
var secret = "Q29vbCEgWW91IGp1c3QgY3JlYXRlZCBhIHRyYW5zZm9ybWVyIGZ1bmN0aW9u\
IChgYmFzZTY0VG9Bc2NpaWApIGFuZCBjb252ZXJ0ZWQgdGhlIGJsb2NrIG9mIGhleCBpbnRvIH\
RoaXMgbWVzc2FnZS4gV2Fzbid0IHRoYXQgZWFzeT8gV2l0aCB0cmFuc2Zvcm1lciwgd2Ugd2Fu\
dCB0byBtYWtlIF9hbGxfIGNvbnZlcnNpb25zIHRoYXQgZWFzeSwgd2hldGhlciB5b3UncmUgY2\
9udmVydGluZyB0aW1lc3RhbXBzLCBjeXBoZXJ0ZXh0cywgb3IgZXZlbiBpbWFnZXMuIENvbnZl\
cnQgYWxsIHRoZSB0aGluZ3MhCgpEb2N1bWVudGF0aW9uIGlzIG5vdCBhbGwgdGhlcmUgeWV0LC\
BidXQgY2hlY2sgb3V0IHRoZSBnaXRodWIgcmVwbyAoaHR0cDovL2dpdGh1Yi5jb20vamJlbmV0\
L3RyYW5zZm9ybWVyKSBhbmQgdGhlICJKYXZhc2NyaXB0IiBleGFtcGxlcyBvbiB0aGlzIHdlYn\
NpdGUuIChMZXQgdXMga25vdyBpZiBzb21lIGNvbnZlcnNpb25zIGRvbid0IHdvcmshKSBJZiB5\
b3UgZ2V0IHN0dWNrLCBwaW5nIHVzIG9uIGlyYywgdHdpdHRlciwgb3IgZ2l0aHViISA6KQ==";\n\
\n\
// convert!\n\
var message = base64ToAscii(secret);\n\
\n\
// display the message\n\
console.log("The secret message is: " + message);\n\
\n\
\n';
