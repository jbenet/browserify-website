require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./examples":2,"./modules":3,"dat-transformer":46}],2:[function(require,module,exports){
module.exports = [
  ['beep boop', 'ascii base32'],
  ['beep boop', 'ascii base64'],
  ['127.0.0.1', 'ip-address buffer hex'],
  ['127.0.0.1', 'ip-address buffer base32'],
  ['127.0.0.1', 'ip-address buffer base64'],
  ['<foo>\n  bar\n </foo>', 'xml-string jsonml json'],
  ['<foo>\n  bar\n </foo>', 'xml-string jsonml json'],
  ['1399425045', 'number integer unix-time js-date iso-date'],
  ['2014-05-07T01:10:45.000Z', 'iso-date js-date unix-time integer number'],
]
},{}],3:[function(require,module,exports){
require('../node_modules/dat-transformer/js/transformer/ascii');
require('../node_modules/dat-transformer/js/transformer/base32');
require('../node_modules/dat-transformer/js/transformer/base64');
require('../node_modules/dat-transformer/js/transformer/buffer');
require('../node_modules/dat-transformer/js/transformer/hex');
require('../node_modules/dat-transformer/js/transformer/integer');
require('../node_modules/dat-transformer/js/transformer/ip-address');
require('../node_modules/dat-transformer/js/transformer/iso-date');
require('../node_modules/dat-transformer/js/transformer/js-date');
require('../node_modules/dat-transformer/js/transformer/json');
require('../node_modules/dat-transformer/js/transformer/jsonml');
require('../node_modules/dat-transformer/js/transformer/number');
require('../node_modules/dat-transformer/js/transformer/string');
require('../node_modules/dat-transformer/js/transformer/unix-time');
require('../node_modules/dat-transformer/js/transformer/us-city');
// require('../node_modules/dat-transformer/js/transformer/us-zipcode');
require('../node_modules/dat-transformer/js/transformer/xml-string');
require('../node_modules/dat-transformer/js/transformer/xml');

require('../node_modules/dat-transformer/js/transformer/ascii-to-base32');
require('../node_modules/dat-transformer/js/transformer/ascii-to-base64');
require('../node_modules/dat-transformer/js/transformer/ascii-to-buffer');
require('../node_modules/dat-transformer/js/transformer/base32-to-ascii');
require('../node_modules/dat-transformer/js/transformer/base32-to-buffer');
require('../node_modules/dat-transformer/js/transformer/base64-to-ascii');
require('../node_modules/dat-transformer/js/transformer/base64-to-buffer');
require('../node_modules/dat-transformer/js/transformer/buffer-to-ascii');
require('../node_modules/dat-transformer/js/transformer/buffer-to-base32');
require('../node_modules/dat-transformer/js/transformer/buffer-to-base64');
require('../node_modules/dat-transformer/js/transformer/buffer-to-hex');
require('../node_modules/dat-transformer/js/transformer/buffer-to-ip-address');
require('../node_modules/dat-transformer/js/transformer/hex-to-buffer');
require('../node_modules/dat-transformer/js/transformer/integer-to-ip-address');
require('../node_modules/dat-transformer/js/transformer/ip-address-ascii');
require('../node_modules/dat-transformer/js/transformer/ip-address-to-buffer');
require('../node_modules/dat-transformer/js/transformer/ip-address-to-integer');
require('../node_modules/dat-transformer/js/transformer/ip-address-to-string');
require('../node_modules/dat-transformer/js/transformer/iso-date-to-js-date');
require('../node_modules/dat-transformer/js/transformer/js-date-to-iso-date');
require('../node_modules/dat-transformer/js/transformer/js-date-to-unix-time');
require('../node_modules/dat-transformer/js/transformer/json-to-string');
require('../node_modules/dat-transformer/js/transformer/jsonml-to-xml-string');
require('../node_modules/dat-transformer/js/transformer/number-to-integer');
require('../node_modules/dat-transformer/js/transformer/number-to-string');
require('../node_modules/dat-transformer/js/transformer/string-to-ip-address');
require('../node_modules/dat-transformer/js/transformer/string-to-json');
require('../node_modules/dat-transformer/js/transformer/string-to-number');
require('../node_modules/dat-transformer/js/transformer/unix-time-to-js-date');
// require('../node_modules/dat-transformer/js/transformer/us-city-to-us-zipcode');
// require('../node_modules/dat-transformer/js/transformer/us-zipcode-to-us-city');
require('../node_modules/dat-transformer/js/transformer/xml-string-to-jsonml');

},{"../node_modules/dat-transformer/js/transformer/ascii":58,"../node_modules/dat-transformer/js/transformer/ascii-to-base32":55,"../node_modules/dat-transformer/js/transformer/ascii-to-base64":56,"../node_modules/dat-transformer/js/transformer/ascii-to-buffer":57,"../node_modules/dat-transformer/js/transformer/base32":61,"../node_modules/dat-transformer/js/transformer/base32-to-ascii":59,"../node_modules/dat-transformer/js/transformer/base32-to-buffer":60,"../node_modules/dat-transformer/js/transformer/base64":64,"../node_modules/dat-transformer/js/transformer/base64-to-ascii":62,"../node_modules/dat-transformer/js/transformer/base64-to-buffer":63,"../node_modules/dat-transformer/js/transformer/buffer":70,"../node_modules/dat-transformer/js/transformer/buffer-to-ascii":65,"../node_modules/dat-transformer/js/transformer/buffer-to-base32":66,"../node_modules/dat-transformer/js/transformer/buffer-to-base64":67,"../node_modules/dat-transformer/js/transformer/buffer-to-hex":68,"../node_modules/dat-transformer/js/transformer/buffer-to-ip-address":69,"../node_modules/dat-transformer/js/transformer/hex":72,"../node_modules/dat-transformer/js/transformer/hex-to-buffer":71,"../node_modules/dat-transformer/js/transformer/integer":74,"../node_modules/dat-transformer/js/transformer/integer-to-ip-address":73,"../node_modules/dat-transformer/js/transformer/ip-address":79,"../node_modules/dat-transformer/js/transformer/ip-address-ascii":75,"../node_modules/dat-transformer/js/transformer/ip-address-to-buffer":76,"../node_modules/dat-transformer/js/transformer/ip-address-to-integer":77,"../node_modules/dat-transformer/js/transformer/ip-address-to-string":78,"../node_modules/dat-transformer/js/transformer/iso-date":81,"../node_modules/dat-transformer/js/transformer/iso-date-to-js-date":80,"../node_modules/dat-transformer/js/transformer/js-date":84,"../node_modules/dat-transformer/js/transformer/js-date-to-iso-date":82,"../node_modules/dat-transformer/js/transformer/js-date-to-unix-time":83,"../node_modules/dat-transformer/js/transformer/json":86,"../node_modules/dat-transformer/js/transformer/json-to-string":85,"../node_modules/dat-transformer/js/transformer/jsonml":88,"../node_modules/dat-transformer/js/transformer/jsonml-to-xml-string":87,"../node_modules/dat-transformer/js/transformer/number":91,"../node_modules/dat-transformer/js/transformer/number-to-integer":89,"../node_modules/dat-transformer/js/transformer/number-to-string":90,"../node_modules/dat-transformer/js/transformer/string":95,"../node_modules/dat-transformer/js/transformer/string-to-ip-address":92,"../node_modules/dat-transformer/js/transformer/string-to-json":93,"../node_modules/dat-transformer/js/transformer/string-to-number":94,"../node_modules/dat-transformer/js/transformer/unix-time":97,"../node_modules/dat-transformer/js/transformer/unix-time-to-js-date":96,"../node_modules/dat-transformer/js/transformer/us-city":98,"../node_modules/dat-transformer/js/transformer/xml":101,"../node_modules/dat-transformer/js/transformer/xml-string":100,"../node_modules/dat-transformer/js/transformer/xml-string-to-jsonml":99}],4:[function(require,module,exports){
// var $ = require('jquery'); // already in browser
// var _ = require('underscore'); // already in browser
var browser = require('./browser');

var w = module.exports = function() {
  $("[data-toggle='tooltip']").tooltip();
  browser(); // browser entry point.
}

// call entry point
$(document).ready(w);

},{"./browser":1}],"liyfGr":[function(require,module,exports){

},{}],"browserify-fs":[function(require,module,exports){
module.exports=require('liyfGr');
},{}],7:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
  else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":9}],8:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],9:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":8,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"inherits":26}],10:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":11,"ieee754":12}],11:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

},{}],12:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],13:[function(require,module,exports){
module.exports={
  "O_RDONLY": 0,
  "O_WRONLY": 1,
  "O_RDWR": 2,
  "S_IFMT": 61440,
  "S_IFREG": 32768,
  "S_IFDIR": 16384,
  "S_IFCHR": 8192,
  "S_IFBLK": 24576,
  "S_IFIFO": 4096,
  "S_IFLNK": 40960,
  "S_IFSOCK": 49152,
  "O_CREAT": 512,
  "O_EXCL": 2048,
  "O_NOCTTY": 131072,
  "O_TRUNC": 1024,
  "O_APPEND": 8,
  "O_DIRECTORY": 1048576,
  "O_NOFOLLOW": 256,
  "O_SYNC": 128,
  "O_SYMLINK": 2097152,
  "S_IRWXU": 448,
  "S_IRUSR": 256,
  "S_IWUSR": 128,
  "S_IXUSR": 64,
  "S_IRWXG": 56,
  "S_IRGRP": 32,
  "S_IWGRP": 16,
  "S_IXGRP": 8,
  "S_IRWXO": 7,
  "S_IROTH": 4,
  "S_IWOTH": 2,
  "S_IXOTH": 1,
  "E2BIG": 7,
  "EACCES": 13,
  "EADDRINUSE": 48,
  "EADDRNOTAVAIL": 49,
  "EAFNOSUPPORT": 47,
  "EAGAIN": 35,
  "EALREADY": 37,
  "EBADF": 9,
  "EBADMSG": 94,
  "EBUSY": 16,
  "ECANCELED": 89,
  "ECHILD": 10,
  "ECONNABORTED": 53,
  "ECONNREFUSED": 61,
  "ECONNRESET": 54,
  "EDEADLK": 11,
  "EDESTADDRREQ": 39,
  "EDOM": 33,
  "EDQUOT": 69,
  "EEXIST": 17,
  "EFAULT": 14,
  "EFBIG": 27,
  "EHOSTUNREACH": 65,
  "EIDRM": 90,
  "EILSEQ": 92,
  "EINPROGRESS": 36,
  "EINTR": 4,
  "EINVAL": 22,
  "EIO": 5,
  "EISCONN": 56,
  "EISDIR": 21,
  "ELOOP": 62,
  "EMFILE": 24,
  "EMLINK": 31,
  "EMSGSIZE": 40,
  "EMULTIHOP": 95,
  "ENAMETOOLONG": 63,
  "ENETDOWN": 50,
  "ENETRESET": 52,
  "ENETUNREACH": 51,
  "ENFILE": 23,
  "ENOBUFS": 55,
  "ENODATA": 96,
  "ENODEV": 19,
  "ENOENT": 2,
  "ENOEXEC": 8,
  "ENOLCK": 77,
  "ENOLINK": 97,
  "ENOMEM": 12,
  "ENOMSG": 91,
  "ENOPROTOOPT": 42,
  "ENOSPC": 28,
  "ENOSR": 98,
  "ENOSTR": 99,
  "ENOSYS": 78,
  "ENOTCONN": 57,
  "ENOTDIR": 20,
  "ENOTEMPTY": 66,
  "ENOTSOCK": 38,
  "ENOTSUP": 45,
  "ENOTTY": 25,
  "ENXIO": 6,
  "EOPNOTSUPP": 102,
  "EOVERFLOW": 84,
  "EPERM": 1,
  "EPIPE": 32,
  "EPROTO": 100,
  "EPROTONOSUPPORT": 43,
  "EPROTOTYPE": 41,
  "ERANGE": 34,
  "EROFS": 30,
  "ESPIPE": 29,
  "ESRCH": 3,
  "ESTALE": 70,
  "ETIME": 101,
  "ETIMEDOUT": 60,
  "ETXTBSY": 26,
  "EWOULDBLOCK": 35,
  "EXDEV": 18,
  "SIGHUP": 1,
  "SIGINT": 2,
  "SIGQUIT": 3,
  "SIGILL": 4,
  "SIGTRAP": 5,
  "SIGABRT": 6,
  "SIGIOT": 6,
  "SIGBUS": 10,
  "SIGFPE": 8,
  "SIGKILL": 9,
  "SIGUSR1": 30,
  "SIGSEGV": 11,
  "SIGUSR2": 31,
  "SIGPIPE": 13,
  "SIGALRM": 14,
  "SIGTERM": 15,
  "SIGCHLD": 20,
  "SIGCONT": 19,
  "SIGSTOP": 17,
  "SIGTSTP": 18,
  "SIGTTIN": 21,
  "SIGTTOU": 22,
  "SIGURG": 16,
  "SIGXCPU": 24,
  "SIGXFSZ": 25,
  "SIGVTALRM": 26,
  "SIGPROF": 27,
  "SIGWINCH": 28,
  "SIGIO": 23,
  "SIGSYS": 12,
  "SSL_OP_ALL": 2147486719,
  "SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION": 262144,
  "SSL_OP_CIPHER_SERVER_PREFERENCE": 4194304,
  "SSL_OP_CISCO_ANYCONNECT": 32768,
  "SSL_OP_COOKIE_EXCHANGE": 8192,
  "SSL_OP_CRYPTOPRO_TLSEXT_BUG": 2147483648,
  "SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS": 2048,
  "SSL_OP_EPHEMERAL_RSA": 2097152,
  "SSL_OP_LEGACY_SERVER_CONNECT": 4,
  "SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER": 32,
  "SSL_OP_MICROSOFT_SESS_ID_BUG": 1,
  "SSL_OP_MSIE_SSLV2_RSA_PADDING": 64,
  "SSL_OP_NETSCAPE_CA_DN_BUG": 536870912,
  "SSL_OP_NETSCAPE_CHALLENGE_BUG": 2,
  "SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG": 1073741824,
  "SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG": 8,
  "SSL_OP_NO_COMPRESSION": 131072,
  "SSL_OP_NO_QUERY_MTU": 4096,
  "SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION": 65536,
  "SSL_OP_NO_SSLv2": 16777216,
  "SSL_OP_NO_SSLv3": 33554432,
  "SSL_OP_NO_TICKET": 16384,
  "SSL_OP_NO_TLSv1": 67108864,
  "SSL_OP_NO_TLSv1_1": 268435456,
  "SSL_OP_NO_TLSv1_2": 134217728,
  "SSL_OP_PKCS1_CHECK_1": 0,
  "SSL_OP_PKCS1_CHECK_2": 0,
  "SSL_OP_SINGLE_DH_USE": 1048576,
  "SSL_OP_SINGLE_ECDH_USE": 524288,
  "SSL_OP_SSLEAY_080_CLIENT_DH_BUG": 128,
  "SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG": 16,
  "SSL_OP_TLS_BLOCK_PADDING_BUG": 512,
  "SSL_OP_TLS_D5_BUG": 256,
  "SSL_OP_TLS_ROLLBACK_BUG": 8388608,
  "NPN_ENABLED": 1
}

},{}],14:[function(require,module,exports){
var Buffer = require('buffer').Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };

},{"buffer":10}],15:[function(require,module,exports){
var Buffer = require('buffer').Buffer
var sha = require('./sha')
var sha256 = require('./sha256')
var rng = require('./rng')
var md5 = require('./md5')

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

// the least I can do is make error messages for the rest of the node.js/crypto api.
each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

},{"./md5":16,"./rng":17,"./sha":18,"./sha256":19,"buffer":10}],16:[function(require,module,exports){
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var helpers = require('./helpers');

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};

},{"./helpers":14}],17:[function(require,module,exports){
// Original code adapted from Robert Kieffer.
// details at https://github.com/broofa/node-uuid
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  // NOTE: Math.random() does not guarantee "cryptographic quality"
  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())

},{}],18:[function(require,module,exports){
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var helpers = require('./helpers');

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};

},{"./helpers":14}],19:[function(require,module,exports){

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var helpers = require('./helpers');

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
  /* append padding */
  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};

},{"./helpers":14}],20:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],21:[function(require,module,exports){
var http = module.exports;
var EventEmitter = require('events').EventEmitter;
var Request = require('./lib/request');
var url = require('url')

http.request = function (params, cb) {
    if (typeof params === 'string') {
        params = url.parse(params)
    }
    if (!params) params = {};
    if (!params.host && !params.port) {
        params.port = parseInt(window.location.port, 10);
    }
    if (!params.host && params.hostname) {
        params.host = params.hostname;
    }
    
    if (!params.scheme) params.scheme = window.location.protocol.split(':')[0];
    if (!params.host) {
        params.host = window.location.hostname || window.location.host;
    }
    if (/:/.test(params.host)) {
        if (!params.port) {
            params.port = params.host.split(':')[1];
        }
        params.host = params.host.split(':')[0];
    }
    if (!params.port) params.port = params.scheme == 'https' ? 443 : 80;
    
    var req = new Request(new xhrHttp, params);
    if (cb) req.on('response', cb);
    return req;
};

http.get = function (params, cb) {
    params.method = 'GET';
    var req = http.request(params, cb);
    req.end();
    return req;
};

http.Agent = function () {};
http.Agent.defaultMaxSockets = 4;

var xhrHttp = (function () {
    if (typeof window === 'undefined') {
        throw new Error('no window object present');
    }
    else if (window.XMLHttpRequest) {
        return window.XMLHttpRequest;
    }
    else if (window.ActiveXObject) {
        var axs = [
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.3.0',
            'Microsoft.XMLHTTP'
        ];
        for (var i = 0; i < axs.length; i++) {
            try {
                var ax = new(window.ActiveXObject)(axs[i]);
                return function () {
                    if (ax) {
                        var ax_ = ax;
                        ax = null;
                        return ax_;
                    }
                    else {
                        return new(window.ActiveXObject)(axs[i]);
                    }
                };
            }
            catch (e) {}
        }
        throw new Error('ajax not supported in this browser')
    }
    else {
        throw new Error('ajax not supported in this browser');
    }
})();

http.STATUS_CODES = {
    100 : 'Continue',
    101 : 'Switching Protocols',
    102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
    200 : 'OK',
    201 : 'Created',
    202 : 'Accepted',
    203 : 'Non-Authoritative Information',
    204 : 'No Content',
    205 : 'Reset Content',
    206 : 'Partial Content',
    207 : 'Multi-Status',               // RFC 4918
    300 : 'Multiple Choices',
    301 : 'Moved Permanently',
    302 : 'Moved Temporarily',
    303 : 'See Other',
    304 : 'Not Modified',
    305 : 'Use Proxy',
    307 : 'Temporary Redirect',
    400 : 'Bad Request',
    401 : 'Unauthorized',
    402 : 'Payment Required',
    403 : 'Forbidden',
    404 : 'Not Found',
    405 : 'Method Not Allowed',
    406 : 'Not Acceptable',
    407 : 'Proxy Authentication Required',
    408 : 'Request Time-out',
    409 : 'Conflict',
    410 : 'Gone',
    411 : 'Length Required',
    412 : 'Precondition Failed',
    413 : 'Request Entity Too Large',
    414 : 'Request-URI Too Large',
    415 : 'Unsupported Media Type',
    416 : 'Requested Range Not Satisfiable',
    417 : 'Expectation Failed',
    418 : 'I\'m a teapot',              // RFC 2324
    422 : 'Unprocessable Entity',       // RFC 4918
    423 : 'Locked',                     // RFC 4918
    424 : 'Failed Dependency',          // RFC 4918
    425 : 'Unordered Collection',       // RFC 4918
    426 : 'Upgrade Required',           // RFC 2817
    428 : 'Precondition Required',      // RFC 6585
    429 : 'Too Many Requests',          // RFC 6585
    431 : 'Request Header Fields Too Large',// RFC 6585
    500 : 'Internal Server Error',
    501 : 'Not Implemented',
    502 : 'Bad Gateway',
    503 : 'Service Unavailable',
    504 : 'Gateway Time-out',
    505 : 'HTTP Version Not Supported',
    506 : 'Variant Also Negotiates',    // RFC 2295
    507 : 'Insufficient Storage',       // RFC 4918
    509 : 'Bandwidth Limit Exceeded',
    510 : 'Not Extended',               // RFC 2774
    511 : 'Network Authentication Required' // RFC 6585
};
},{"./lib/request":22,"events":20,"url":43}],22:[function(require,module,exports){
var Stream = require('stream');
var Response = require('./response');
var Base64 = require('Base64');
var inherits = require('inherits');

var Request = module.exports = function (xhr, params) {
    var self = this;
    self.writable = true;
    self.xhr = xhr;
    self.body = [];
    
    self.uri = (params.scheme || 'http') + '://'
        + params.host
        + (params.port ? ':' + params.port : '')
        + (params.path || '/')
    ;
    
    if (typeof params.withCredentials === 'undefined') {
        params.withCredentials = true;
    }

    try { xhr.withCredentials = params.withCredentials }
    catch (e) {}
    
    xhr.open(
        params.method || 'GET',
        self.uri,
        true
    );

    self._headers = {};
    
    if (params.headers) {
        var keys = objectKeys(params.headers);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!self.isSafeRequestHeader(key)) continue;
            var value = params.headers[key];
            self.setHeader(key, value);
        }
    }
    
    if (params.auth) {
        //basic auth
        this.setHeader('Authorization', 'Basic ' + Base64.btoa(params.auth));
    }

    var res = new Response;
    res.on('close', function () {
        self.emit('close');
    });
    
    res.on('ready', function () {
        self.emit('response', res);
    });
    
    xhr.onreadystatechange = function () {
        // Fix for IE9 bug
        // SCRIPT575: Could not complete the operation due to error c00c023f
        // It happens when a request is aborted, calling the success callback anyway with readyState === 4
        if (xhr.__aborted) return;
        res.handle(xhr);
    };
};

inherits(Request, Stream);

Request.prototype.setHeader = function (key, value) {
    this._headers[key.toLowerCase()] = value
};

Request.prototype.getHeader = function (key) {
    return this._headers[key.toLowerCase()]
};

Request.prototype.removeHeader = function (key) {
    delete this._headers[key.toLowerCase()]
};

Request.prototype.write = function (s) {
    this.body.push(s);
};

Request.prototype.destroy = function (s) {
    this.xhr.__aborted = true;
    this.xhr.abort();
    this.emit('close');
};

Request.prototype.end = function (s) {
    if (s !== undefined) this.body.push(s);

    var keys = objectKeys(this._headers);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = this._headers[key];
        if (isArray(value)) {
            for (var j = 0; j < value.length; j++) {
                this.xhr.setRequestHeader(key, value[j]);
            }
        }
        else this.xhr.setRequestHeader(key, value)
    }

    if (this.body.length === 0) {
        this.xhr.send('');
    }
    else if (typeof this.body[0] === 'string') {
        this.xhr.send(this.body.join(''));
    }
    else if (isArray(this.body[0])) {
        var body = [];
        for (var i = 0; i < this.body.length; i++) {
            body.push.apply(body, this.body[i]);
        }
        this.xhr.send(body);
    }
    else if (/Array/.test(Object.prototype.toString.call(this.body[0]))) {
        var len = 0;
        for (var i = 0; i < this.body.length; i++) {
            len += this.body[i].length;
        }
        var body = new(this.body[0].constructor)(len);
        var k = 0;
        
        for (var i = 0; i < this.body.length; i++) {
            var b = this.body[i];
            for (var j = 0; j < b.length; j++) {
                body[k++] = b[j];
            }
        }
        this.xhr.send(body);
    }
    else {
        var body = '';
        for (var i = 0; i < this.body.length; i++) {
            body += this.body[i].toString();
        }
        this.xhr.send(body);
    }
};

// Taken from http://dxr.mozilla.org/mozilla/mozilla-central/content/base/src/nsXMLHttpRequest.cpp.html
Request.unsafeHeaders = [
    "accept-charset",
    "accept-encoding",
    "access-control-request-headers",
    "access-control-request-method",
    "connection",
    "content-length",
    "cookie",
    "cookie2",
    "content-transfer-encoding",
    "date",
    "expect",
    "host",
    "keep-alive",
    "origin",
    "referer",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "user-agent",
    "via"
];

Request.prototype.isSafeRequestHeader = function (headerName) {
    if (!headerName) return false;
    return indexOf(Request.unsafeHeaders, headerName.toLowerCase()) === -1;
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var indexOf = function (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
};

},{"./response":23,"Base64":24,"inherits":26,"stream":35}],23:[function(require,module,exports){
var Stream = require('stream');
var util = require('util');

var Response = module.exports = function (res) {
    this.offset = 0;
    this.readable = true;
};

util.inherits(Response, Stream);

var capable = {
    streaming : true,
    status2 : true
};

function parseHeaders (res) {
    var lines = res.getAllResponseHeaders().split(/\r?\n/);
    var headers = {};
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line === '') continue;
        
        var m = line.match(/^([^:]+):\s*(.*)/);
        if (m) {
            var key = m[1].toLowerCase(), value = m[2];
            
            if (headers[key] !== undefined) {
            
                if (isArray(headers[key])) {
                    headers[key].push(value);
                }
                else {
                    headers[key] = [ headers[key], value ];
                }
            }
            else {
                headers[key] = value;
            }
        }
        else {
            headers[line] = true;
        }
    }
    return headers;
}

Response.prototype.getResponse = function (xhr) {
    var respType = String(xhr.responseType).toLowerCase();
    if (respType === 'blob') return xhr.responseBlob || xhr.response;
    if (respType === 'arraybuffer') return xhr.response;
    return xhr.responseText;
}

Response.prototype.getHeader = function (key) {
    return this.headers[key.toLowerCase()];
};

Response.prototype.handle = function (res) {
    if (res.readyState === 2 && capable.status2) {
        try {
            this.statusCode = res.status;
            this.headers = parseHeaders(res);
        }
        catch (err) {
            capable.status2 = false;
        }
        
        if (capable.status2) {
            this.emit('ready');
        }
    }
    else if (capable.streaming && res.readyState === 3) {
        try {
            if (!this.statusCode) {
                this.statusCode = res.status;
                this.headers = parseHeaders(res);
                this.emit('ready');
            }
        }
        catch (err) {}
        
        try {
            this._emitData(res);
        }
        catch (err) {
            capable.streaming = false;
        }
    }
    else if (res.readyState === 4) {
        if (!this.statusCode) {
            this.statusCode = res.status;
            this.emit('ready');
        }
        this._emitData(res);
        
        if (res.error) {
            this.emit('error', this.getResponse(res));
        }
        else this.emit('end');
        
        this.emit('close');
    }
};

Response.prototype._emitData = function (res) {
    var respBody = this.getResponse(res);
    if (respBody.toString().match(/ArrayBuffer/)) {
        this.emit('data', new Uint8Array(respBody, this.offset));
        this.offset = respBody.byteLength;
        return;
    }
    if (respBody.length > this.offset) {
        this.emit('data', respBody.slice(this.offset));
        this.offset = respBody.length;
    }
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

},{"stream":35,"util":45}],24:[function(require,module,exports){
;(function () {

  var object = typeof exports != 'undefined' ? exports : this; // #8: web workers
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next input index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      input.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = input.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    input = input.replace(/=+$/, '');
    if (input.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = input.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());

},{}],25:[function(require,module,exports){
var http = require('http');

var https = module.exports;

for (var key in http) {
    if (http.hasOwnProperty(key)) https[key] = http[key];
};

https.request = function (params, cb) {
    if (!params) params = {};
    params.scheme = 'https';
    return http.request.call(this, params, cb);
}

},{"http":21}],26:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],27:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.once = noop;
process.off = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],28:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],29:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27}],30:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],31:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],32:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],33:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":31,"./encode":32}],34:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;
var inherits = require('inherits');
var setImmediate = require('process/browser.js').nextTick;
var Readable = require('./readable.js');
var Writable = require('./writable.js');

inherits(Duplex, Readable);

Duplex.prototype.write = Writable.prototype.write;
Duplex.prototype.end = Writable.prototype.end;
Duplex.prototype._write = Writable.prototype._write;

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  var self = this;
  setImmediate(function () {
    self.end();
  });
}

},{"./readable.js":38,"./writable.js":40,"inherits":26,"process/browser.js":36}],35:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('./readable.js');
Stream.Writable = require('./writable.js');
Stream.Duplex = require('./duplex.js');
Stream.Transform = require('./transform.js');
Stream.PassThrough = require('./passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"./duplex.js":34,"./passthrough.js":37,"./readable.js":38,"./transform.js":39,"./writable.js":40,"events":20,"inherits":26}],36:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],37:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = require('./transform.js');
var inherits = require('inherits');
inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./transform.js":39,"inherits":26}],38:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;
Readable.ReadableState = ReadableState;

var EE = require('events').EventEmitter;
var Stream = require('./index.js');
var Buffer = require('buffer').Buffer;
var setImmediate = require('process/browser.js').nextTick;
var StringDecoder;

var inherits = require('inherits');
inherits(Readable, Stream);

function ReadableState(options, stream) {
  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = false;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // In streams that never have any data, and do push(null) right away,
  // the consumer can miss the 'end' event if they do some I/O before
  // consuming the stream.  So, we don't emit('end') until some reading
  // happens.
  this.calledRead = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (typeof chunk === 'string' && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null || chunk === undefined) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      // update the buffer info.
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront) {
        state.buffer.unshift(chunk);
      } else {
        state.reading = false;
        state.buffer.push(chunk);
      }

      if (state.needReadable)
        emitReadable(stream);

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (isNaN(n) || n === null) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  var state = this._readableState;
  state.calledRead = true;
  var nOrig = n;

  if (typeof n !== 'number' || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;

  // if we currently have less than the highWaterMark, then also read some
  if (state.length - n <= state.highWaterMark)
    doRead = true;

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading)
    doRead = false;

  if (doRead) {
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read called its callback synchronously, then `reading`
  // will be false, and we need to re-evaluate how much data we
  // can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we happened to read() exactly the remaining amount in the
  // buffer, and the EOF has been seen at this point, then make sure
  // that we emit 'end' on the very next tick.
  if (state.ended && !state.endEmitted && state.length === 0)
    endReadable(this);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode &&
      !er) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // if we've ended and we have some data left, then emit
  // 'readable' now to make sure it gets picked up.
  if (state.length > 0)
    emitReadable(stream);
  else
    endReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (state.emittedReadable)
    return;

  state.emittedReadable = true;
  if (state.sync)
    setImmediate(function() {
      emitReadable_(stream);
    });
  else
    emitReadable_(stream);
}

function emitReadable_(stream) {
  stream.emit('readable');
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    setImmediate(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    setImmediate(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    if (readable !== src) return;
    cleanup();
  }

  function onend() {
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (!dest._writableState || dest._writableState.needDrain)
      ondrain();
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  // check for listeners before emit removes one-time listeners.
  var errListeners = EE.listenerCount(dest, 'error');
  function onerror(er) {
    unpipe();
    if (errListeners === 0 && EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  dest.once('error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    // the handler that waits for readable events after all
    // the data gets sucked out in flow.
    // This would be easier to follow with a .once() handler
    // in flow(), but that is too slow.
    this.on('readable', pipeOnReadable);

    state.flowing = true;
    setImmediate(function() {
      flow(src);
    });
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var dest = this;
    var state = src._readableState;
    state.awaitDrain--;
    if (state.awaitDrain === 0)
      flow(src);
  };
}

function flow(src) {
  var state = src._readableState;
  var chunk;
  state.awaitDrain = 0;

  function write(dest, i, list) {
    var written = dest.write(chunk);
    if (false === written) {
      state.awaitDrain++;
    }
  }

  while (state.pipesCount && null !== (chunk = src.read())) {

    if (state.pipesCount === 1)
      write(state.pipes, 0, null);
    else
      forEach(state.pipes, write);

    src.emit('data', chunk);

    // if anyone needs a drain, then we have to wait for that.
    if (state.awaitDrain > 0)
      return;
  }

  // if every destination was unpiped, either before entering this
  // function, or in the while loop, then stop flowing.
  //
  // NB: This is a pretty rare edge case.
  if (state.pipesCount === 0) {
    state.flowing = false;

    // if there were data event listeners added, then switch to old mode.
    if (EE.listenerCount(src, 'data') > 0)
      emitDataEvents(src);
    return;
  }

  // at this point, no one needed a drain, so we just ran out of data
  // on the next readable event, start it over again.
  state.ranOut = true;
}

function pipeOnReadable() {
  if (this._readableState.ranOut) {
    this._readableState.ranOut = false;
    flow(this);
  }
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    this.removeListener('readable', pipeOnReadable);
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data' && !this._readableState.flowing)
    emitDataEvents(this);

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        this.read(0);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  emitDataEvents(this);
  this.read(0);
  this.emit('resume');
};

Readable.prototype.pause = function() {
  emitDataEvents(this, true);
  this.emit('pause');
};

function emitDataEvents(stream, startPaused) {
  var state = stream._readableState;

  if (state.flowing) {
    // https://github.com/isaacs/readable-stream/issues/16
    throw new Error('Cannot switch to old mode now.');
  }

  var paused = startPaused || false;
  var readable = false;

  // convert to an old-style stream.
  stream.readable = true;
  stream.pipe = Stream.prototype.pipe;
  stream.on = stream.addListener = Stream.prototype.on;

  stream.on('readable', function() {
    readable = true;

    var c;
    while (!paused && (null !== (c = stream.read())))
      stream.emit('data', c);

    if (c === null) {
      readable = false;
      stream._readableState.needReadable = true;
    }
  });

  stream.pause = function() {
    paused = true;
    this.emit('pause');
  };

  stream.resume = function() {
    paused = false;
    if (readable)
      setImmediate(function() {
        stream.emit('readable');
      });
    else
      this.read(0);
    this.emit('resume');
  };

  // now make it start, just in case it hadn't already.
  stream.emit('readable');
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (typeof stream[i] === 'function' &&
        typeof this[i] === 'undefined') {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, function (x) {
      return self.emit.apply(self, ev, x);
    });
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted && state.calledRead) {
    state.ended = true;
    setImmediate(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"./index.js":35,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"buffer":10,"events":20,"inherits":26,"process/browser.js":36,"string_decoder":41}],39:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = require('./duplex.js');
var inherits = require('inherits');
inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined)
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  var ts = this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('finish', function() {
    if ('function' === typeof this._flush)
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (ts.writechunk && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var rs = stream._readableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./duplex.js":34,"inherits":26}],40:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;
Writable.WritableState = WritableState;

var isUint8Array = typeof Uint8Array !== 'undefined'
  ? function (x) { return x instanceof Uint8Array }
  : function (x) {
    return x && x.constructor && x.constructor.name === 'Uint8Array'
  }
;
var isArrayBuffer = typeof ArrayBuffer !== 'undefined'
  ? function (x) { return x instanceof ArrayBuffer }
  : function (x) {
    return x && x.constructor && x.constructor.name === 'ArrayBuffer'
  }
;

var inherits = require('inherits');
var Stream = require('./index.js');
var setImmediate = require('process/browser.js').nextTick;
var Buffer = require('buffer').Buffer;

inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : 16 * 1024;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, becuase any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];
}

function Writable(options) {
  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Stream.Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  setImmediate(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!Buffer.isBuffer(chunk) &&
      'string' !== typeof chunk &&
      chunk !== null &&
      chunk !== undefined &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    setImmediate(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (!Buffer.isBuffer(chunk) && isUint8Array(chunk))
    chunk = new Buffer(chunk);
  if (isArrayBuffer(chunk) && typeof Uint8Array !== 'undefined')
    chunk = new Buffer(new Uint8Array(chunk));
  
  if (Buffer.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (typeof cb !== 'function')
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb))
    ret = writeOrBuffer(this, state, chunk, encoding, cb);

  return ret;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      typeof chunk === 'string') {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  state.needDrain = !ret;

  if (state.writing)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    setImmediate(function() {
      cb(er);
    });
  else
    cb(er);

  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished && !state.bufferProcessing && state.buffer.length)
      clearBuffer(stream, state);

    if (sync) {
      setImmediate(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  cb();
  if (finished)
    finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  for (var c = 0; c < state.buffer.length; c++) {
    var entry = state.buffer[c];
    var chunk = entry.chunk;
    var encoding = entry.encoding;
    var cb = entry.callback;
    var len = state.objectMode ? 1 : chunk.length;

    doWrite(stream, state, len, chunk, encoding, cb);

    // if we didn't call the onwrite immediately, then
    // it means that we need to wait until it does.
    // also, that means that the chunk and cb are currently
    // being processed, so move the buffer counter past them.
    if (state.writing) {
      c++;
      break;
    }
  }

  state.bufferProcessing = false;
  if (c < state.buffer.length)
    state.buffer = state.buffer.slice(c);
  else
    state.buffer.length = 0;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (typeof chunk !== 'undefined' && chunk !== null)
    this.write(chunk, encoding);

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    state.finished = true;
    stream.emit('finish');
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      setImmediate(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

},{"./index.js":35,"buffer":10,"inherits":26,"process/browser.js":36}],41:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

function assertEncoding(encoding) {
  if (encoding && !Buffer.isEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  this.charBuffer = new Buffer(6);
  this.charReceived = 0;
  this.charLength = 0;
};


StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  var offset = 0;

  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var i = (buffer.length >= this.charLength - this.charReceived) ?
                this.charLength - this.charReceived :
                buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, offset, i);
    this.charReceived += (i - offset);
    offset = i;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (i == buffer.length) return charStr;

    // otherwise cut off the characters end from the beginning of this buffer
    buffer = buffer.slice(i, buffer.length);
    break;
  }

  var lenIncomplete = this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
    this.charReceived = lenIncomplete;
    end -= lenIncomplete;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }

  return i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 2;
  this.charLength = incomplete ? 2 : 0;
  return incomplete;
}

function base64DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 3;
  this.charLength = incomplete ? 3 : 0;
  return incomplete;
}

},{"buffer":10}],42:[function(require,module,exports){
exports.isatty = function () { return false; };

function ReadStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.ReadStream = ReadStream;

function WriteStream() {
  throw new Error('tty.ReadStream is not implemented');
}
exports.WriteStream = WriteStream;

},{}],43:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":30,"querystring":33}],44:[function(require,module,exports){
module.exports=require(8)
},{}],45:[function(require,module,exports){
module.exports=require(9)
},{"./support/isBuffer":44,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"inherits":26}],46:[function(require,module,exports){
var Type = require('./js/type');
var Value = require('./js/value');
var Conversion = require('./js/conversion');
var Loader = require('./js/loader');
var coerce = require('./js/coerce');
var apiSync = require('./js/apiSync');
var apiAsync = require('./js/apiAsync');
var transformer = module.exports = apiSync;

transformer.sync = apiSync;
transformer.async = apiAsync;

transformer.coerce = coerce;
transformer.load = Loader;
transformer.Type = Type;
transformer.Conversion = Conversion;
transformer.Loader = Loader;

},{"./js/apiAsync":47,"./js/apiSync":48,"./js/coerce":50,"./js/conversion":51,"./js/loader":53,"./js/type":102,"./js/value":103}],47:[function(require,module,exports){
var Type = require('./type');
var Value = require('./value');
var Conversion = require('./conversion');
var Loader = require('./loader');
var coerce = require('./coerce');
var defer = require('./defer');
var _ = require('underscore');

module.exports = transformerAsync

// var a2b = transformer.converter(schema_a, schema_b)
// var b_data = a2b(a_data)
//
// var b_data = transformer.convert(schema_a, schema_b, a_data)

function transformerAsync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // loading
    return Loader(from);
  default: // find conversions
    return transformerAsync.compose(_.toArray(arguments))
  }
}

// composition of sync functions.
transformerAsync.compose = function(types) {
  if (types.length < 2)
    throw new Error('Must enter more than one type.');

  types = _.map(types, coerce);
  var conversions = Conversion.path(types);
  conversions = _.map(conversions, forceAsyncConversion);
  var composed = composeConversions(conversions);
  return Value.wrapAsync(types[0], composed);
}

function forceAsyncConversion(conversion) {
  // todo fix this
  // if (!(conversion instanceof Conversion))
  //   throw new Error('conversion must be instance of Conversion');

  // already async?
  if (conversion.async)
    return conversion;

  return function(input, callback) {
    // catch thrown errors and pass them to the callback.
    try {
      callback(null, conversion(input));
    } catch (e) {
      callback(e);
    }
  }
}

function composeConversions(conversions) {
  // conversion composition is tricky, because we have to handle errors
  // and call the conversions in order, with a callback chain.
  var funcs = conversions.slice(0);
  var callback = undefined;

  function composed(input) {
    // take the next conversion to apply.
    var func = funcs.shift();

    if (!func) { // no more? we've reached the end.
      callback(null, input);
      return;
    }

    func(input, function(err, output) {
      if (err) { // shortcircuit
        defer(callback, err);
      } else {
        defer(composed, output);
      }
    });
  };

  return function(input, cb) {
    callback = cb; // store callback;
    composed(input);
  };
}

},{"./coerce":50,"./conversion":51,"./defer":52,"./loader":53,"./type":102,"./value":103,"underscore":168}],48:[function(require,module,exports){
var Type = require('./type');
var Value = require('./value');
var Conversion = require('./conversion');
var Loader = require('./loader');
var coerce = require('./coerce');
var _ = require('underscore');

module.exports = transformerSync

// var a2b = transformer.converter(schema_a, schema_b)
// var b_data = a2b(a_data)
//
// var b_data = transformer.convert(schema_a, schema_b, a_data)

function transformerSync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // loading
    return Loader(from);
  default:
    return transformerSync.compose(_.toArray(arguments))
  }
}

// composition of sync functions.
transformerSync.compose = function(types) {
  if (types.length < 2)
    throw new Error('Must enter more than one type.');

  types = _.map(types, coerce);
  conversions = Conversion.path(types);

  if (_.any(_.pluck(conversions, 'async'))) {
    throw new Error("Cannot use Async conversion in Sync context. " +
      " use transformer.async");
  }

  composed = _.compose.apply(_, conversions.reverse());
  return Value.wrapSync(types[0], composed);
}

},{"./coerce":50,"./conversion":51,"./loader":53,"./type":102,"./value":103,"underscore":168}],49:[function(require,module,exports){
var _ = require('underscore');
var Object = require('./object');

module.exports = Codec

var codec_defaults = {
  '@type': 'Codec',
}

// A Codec is one of the three Transformer kinds.
// Codecs are a pair of functions that serialize Types into bytes (or abritrary
// representations), and deserialize back. There MUST be no information loss
// in Codecs; they're simply representing a Type in different ways.
// E.g. json, unix-time, iso-date

// They're like a Conversion, but specifically handles
// transforming from binary to js objects and back.
// Hence encoding/decoding.

// Note: As @sebastienzany has pointed out, these technically are a special
// case of Conversions. However I think it is useful to separate them, as
// Conversions should be thought of as "a mapping from Types to Types", and
// Codecs as "encoding Types into bytes". The cognitive difference seems
// worthwhile to highlight.

function Codec(src, encode, decode) {
  if (src instanceof Codec)
    return src;

  if (!(this instanceof Codec))
    return new Codec(src, code, decode);

  src = Object(src, codec_defaults);

  this.src = src;
  this.encode = encode || identity;
  this.decode = decode || identity;
}

function identity(a) { return a; }

},{"./object":54,"underscore":168}],50:[function(require,module,exports){
var _ = require('underscore');
var Loader = require('./loader');
var Object = require('./object');
var Type = require('./type');
var Value = require('./value');
var Conversion = require('./conversion');


module.exports = function coerce(obj) {

  // string? load module.
  if (_.isString(obj))
    return Loader(obj);

  // transformer object? all good.
  if (obj instanceof Value ||
      obj instanceof Type ||
      obj instanceof Conversion ||
      obj === Type ||
      obj === Conversion) {
    return obj;
  }

  // raw object with type? construct.
  if (_.isObject(obj) && obj['type']) {
    switch (obj['type']) {
    case 'Type': return Type(obj);
    case 'Conversion': return Conversion(obj);
    }
  }

  // wat?
  console.log(obj);
  throw new Error('transformer: unknown input object: ' + obj);
};

},{"./conversion":51,"./loader":53,"./object":54,"./type":102,"./value":103,"underscore":168}],51:[function(require,module,exports){
var S = require('string');
var _ = require('underscore');
var Object = require('./object');
var Loader = require('./loader');
var Type = require('./type');
var Value = require('./value');
var coerce = require('./coerce');
var defer = require('./defer');

module.exports = Conversion

var conversion_defaults = {
  'type': 'Conversion',
  // 'invertible': true,
  'input': [],
  'output': []
}

// A Conversion is one of the two Transformer objects.
// Conversions are functions that map from one set of Types to another.
// They "transform" source types into target types.

// Some Conversions are invertible -- meaning they are one-to-one and can be
// "undone" or reverted (e.g. email-ddress <---> mailto-url). This is only
// when there is no information loss.

// Other Conversions are lossy -- meaning reduce information, are one-way,
// and cannot be "undone" perfectly (e.g. us-street-address ---> us-zip-code).


// Implementation Details:
// new Conversion(...) returns a function that:
// - can be applied to a 'Value'
// - has information regarding the real conversion.



function Conversion(inType, outType, func, src) {

  // coercing call?
  if (arguments.length == 1 && inType instanceof Conversion)
      return src;

  // want to inherit prototype
  if (!(this instanceof Conversion))
    return new Conversion(inType, outType, func, src);

  // instantiate types.
  inType = coerce(inType)
  outType = coerce(outType)

  // setup id if not given
  src = _.extend({}, src); // copy + default.
  src.id = Conversion.idWithTypes(inType, outType);

  // if it has been seen before, return that.
  if (src && Conversion.all[src])
    return Conversion.all[src];

  if (src && src.id && Conversion.all[src.id])
    return Conversion.all[src.id];

  // setup object src with defaults
  src = Object(src, conversion_defaults);

  // get type ids
  src.input = inType.src.id;
  src.output = outType.src.id;
  src.description = src.description || src.input +' to '+ src.output;
  if (src.async)
    src.async = true; // force boolean. default is async = false.

  // if we have a 'mapping' key (relation) attempt to create func.
  if (!func && src['mapping']) {
    func = Conversion.convertFromSchema(src);
  }

  if (!func)
    throw new Error('Conversion requires a function.');

  // label the function so it is printed meaningfully
  func.name = src.id;
  func.id = src.id;

  // return a different object, one that can be applied directly.
  var wrap = (src.async ? convertAsyncWrap : convertSyncWrap);
  var conv = wrap(func, outType);
  conv.name = src.id + '.wrapper';
  // conv.constructor = Conversion; // todo fix this
  conv.convert = func;
  conv.src = src;
  conv.inType = inType;
  conv.outType = outType;
  conv.async = src.async;
  func.async = src.async;
  Conversion.all[conv.src.id] = conv;
  Loader.cache[conv.src.id] = conv;
  return conv;
}

function notImplemented() {
  throw new Error('Conversion not implemented.');
}

function uninvertible() {
  throw new Error('Uninvertible conversion inversion invoked.');
}

Conversion.all = {};

Conversion.idWithTypes = function(t1, t2) {
  if (t1.src && t1.src.id)
    t1 = t1.src.id

  if (t2.src && t2.src.id)
    t2 = t2.src.id

  if (!(_.isString(t1) && _.isString(t2)))
    throw new Error('type ids should be strings');

  return t1 + '-to-' + t2;
};

Conversion.convertFromSchema = function(src) {
  if (!src['mapping'])
    throw new Error('no mapping in conversion schema.');

  // here, we'll construct a conversion function (and inverse if possible)
  // from a schema specifying a relational mapping. For example:
  //
  //  {'mapping': {'key_in_output': 'key_in_input'}}
  //
  throw new Error('NOT YET IMPLEMENTED');
}

Conversion.withTypes = function(t1, t2) {

  function loadConversion(t1, t2) {
    return coerce(t1.src.id + '-to-'+ t2.src.id);
  }

  try {
    return loadConversion(t1, t2);
  } catch (e1) {

    // if no conversion exists, try to figure it out.
    if (e1.code == 'MODULE_NOT_FOUND' ||
        e1.toString().match(/Cannot find module/)) {
      if (t1.src.schema == t2.src.id ||
          t2.src.schema == t1.src.id ||
          t1.src.schema == t2.src.schema ||
          t1.src.id == t2.src.id) {
        return Conversion.Identity(t1, t2);
      }
    }
    throw e1;
  }

  /*
  // Symmetric Loading
  // try loading both modules, a2b and b2a, optimistically.
  try {
    return loadConversion(t1, t2);

  } catch (e1) {
    // if not found, try the reverse
    if (e1.code == 'MODULE_NOT_FOUND') {
      try {
        // if func is invertible, return it! yay!
        var m2to1 = loadConversion(t2, t1);
        if (m2to1.invertible) {
          m2to1.invert(); // hack. find a better way to do this.
          return m2to1;
        }

      } catch (e2) {
        // if e2 is some other err, we want to see it. propagate it up.
        if (e2.code != 'MODULE_NOT_FOUND')
          throw e2; // some other error
        // otherwise, we want to signal the first module wasn't found.
      }
    }

    // either it was handled already, or we're throwing the first error.
    // this is either because neither module was found, or it was another err.
    throw e1;
  }

  throw new Error('should never get here');
  */
};


Conversion.Identity = function identityConversion(tFrom, tTo) {
  return new Conversion(tFrom, tTo, function(d) { return d; });
};

Conversion.path = function conversionPath(types) {
  var pairs = _.zip(types.slice(0, types.length - 1), types.slice(1));
  return _.map(pairs, function(pair) {
    return Conversion.withTypes(pair[0], pair[1]);
  });
}

function convertSyncWrap(func, outType) {
  if (func.length != 1) {
    throw new Error('sync conversion '+ func.id
      + ' should take 1 arg (input):\n' + func);
  }

  return function (input) {
    return new Value(outType, func(input.value));
  }
}

function convertAsyncWrap(func, outType) {
  if (func.length != 2) {
    throw new Error('async conversion '+ func.id
      + ' should take 2 args (input, callback):\n' + func);
  }

  return function (input, callback) {
    if (!callback)
      throw new Error('Callback required. Async conversion ' + func.id);

    func(input.value, function(err, output) {
      // want to defer here, because user may not.
      if (err) {
        e = 'transformer conversion error in ' + func.id + '.\n'
        if (!(err instanceof Error)) {
          e += '  First callback param is neither null or Error.\n';
          e += '  Maybe calls `callback(out)` instead of';
          e += ' `callback(null, output)` ? \n';
        }
        defer(callback, new Error(e + err.toString()));
      } else {
        defer(callback, null, new Value(outType, output));
      }
    });
  };
}

},{"./coerce":50,"./defer":52,"./loader":53,"./object":54,"./type":102,"./value":103,"string":167,"underscore":168}],52:[function(require,module,exports){
(function (process){
module.exports = function defer(callback) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  process.nextTick(function() {
    callback.apply(self, args);
  });
};

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27}],53:[function(require,module,exports){
var _ = require('underscore');
var install = require('npm-installer');
module.exports = Loader;

// id format: <namespace>/<name>

function Loader(id) {
  if (!_.isString(id) || !(id.length > 0))
    throw new Error('id must be a nonempty string. Got '+id);

  // no longer namespacing-- conversions get weird.
  // if (id.search('/') == -1)
  //   id = 'transformer/' + id

  if (!Loader.cache[id])
    Loader.cache[id] = Loader.LoadId(id)
  return Loader.cache[id]
}

Loader.cache = {}
Loader.autoInstall = false;

Loader.LoadId = function(id) {
  return require('./transformer/'+id);

  // try npm -- worry about this later.
  // return Loader.LoadFromNpm(id);
}

Loader.LoadFromNpm = function (id) {
  name = Loader.NpmName(id)

  // worry about this later.
  // if (Loader.autoInstall) {
  //   install(argv.install)
  // };

  return require(name);
}

Loader.InstallFromNpm = function(npmName) {
  if (!npmName)
    throw new Error('install requires valid npmName');

  install(npmName, function(err, data) {
    if (err) throw err;
    callback(data);
  });
}

Loader.Npmize = function(id) {
  return id.toLowerCase().replace('/', '-');
}

Loader.NpmName = function(id) {
  return 'transformer.' + Loader.Npmize(id);
}

/*
// types: transformer-type-<type>
// conversions: transformer-<type>-to-<type>
Loader.NpmName = function(id, type) {
  name = id.split('/')[1]
  switch (type) {
  case 'Type':
    return 'transformer-type-' + name
  case 'Conversion':
    return 'transformer-' + name
  }
  throw new Error('Transformer npm name: unknown type.')
}
*/

},{"npm-installer":108,"underscore":168}],54:[function(require,module,exports){
var _ = require('underscore');

module.exports = Object

var obj_defaults = {
  '@context': 'http://transformer.io/context/transformer.jsonld'
}

function Object(src, defaults) {
  if (!_.isObject(src))
    throw new Error('TypeError: expected object definition. ' + src)

  if (!_.isString(src.id) || !(src.id.length > 0))
    throw new Error('id must be a nonempty string. Got '+ src.id);

  // copy for modification
  src = _.extend({}, obj_defaults, defaults, src)

  return src
}

},{"underscore":168}],55:[function(require,module,exports){
var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base32 = Loader('base32');
var Ascii = Loader('ascii');

module.exports = new Conversion(Ascii, Base32, convert);

function convert(ascii) {
  return base32.encode(ascii);
};

},{"../conversion":51,"../loader":53,"base32":104}],56:[function(require,module,exports){
(function (Buffer){
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base64 = Loader('base64');
var Ascii = Loader('ascii');

module.exports = new Conversion(Ascii, Base64, convert);

function convert(ascii) {
  var buf = new Buffer(ascii, 'ascii');
  return buf.toString('base64');
}

}).call(this,require("buffer").Buffer)
},{"../conversion":51,"../loader":53,"buffer":10}],57:[function(require,module,exports){
(function (Buffer){
var Conversion = require('../conversion');
var Loader = require('../loader');
var tBuffer = Loader('buffer');
var Ascii = Loader('ascii');

module.exports = new Conversion(Ascii, tBuffer, convert);

function convert(ascii) {
  return new Buffer(ascii, 'ascii');
}

}).call(this,require("buffer").Buffer)
},{"../conversion":51,"../loader":53,"buffer":10}],58:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'ascii',
  'description': 'ascii strings.',
  'schema': 'string',
});

},{"../type":102}],59:[function(require,module,exports){
var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base32 = Loader('base32');
var Ascii = Loader('ascii');

module.exports = Conversion(Base32, Ascii, convert);

function convert(base32str) {
  return base32.decode(base32str);
}

},{"../conversion":51,"../loader":53,"base32":104}],60:[function(require,module,exports){
var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var tBase32 = Loader('base32');

module.exports = new Conversion(tBase32, Buffer, convert);

function convert(base32str) {
  return base32.decode(base32str);
}

},{"../conversion":51,"../loader":53,"base32":104}],61:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'base32',
  'description': 'base32 encoding data into ascii.',
  'schema': 'string',
});

},{"../type":102}],62:[function(require,module,exports){
(function (Buffer){
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base64 = Loader('base64');
var Ascii = Loader('ascii');

module.exports = new Conversion(Base64, Ascii, convert);

function convert(base64str) {
  return (new Buffer(base64str, 'base64')).toString('ascii');
}

}).call(this,require("buffer").Buffer)
},{"../conversion":51,"../loader":53,"buffer":10}],63:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Base64 = Loader('base64');

module.exports = new Conversion(Base64, Buffer, convert);

function convert(base64str) {
  return new Buffer.Buffer(base64str, 'base64');
}

},{"../conversion":51,"../loader":53}],64:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'base64',
  'description': 'base64 encoding data into ascii.',
  'schema': 'string',
});

},{"../type":102}],65:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var tBuffer = Loader('buffer');
var Ascii = Loader('ascii');

module.exports = new Conversion(tBuffer, Ascii, convert);

function convert(buffer) {
  return buffer.toString('ascii');
}

},{"../conversion":51,"../loader":53}],66:[function(require,module,exports){
var base32 = require('base32')
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var tBase32 = Loader('base32');

module.exports = new Conversion(Buffer, tBase32, convert);

function convert(buffer) {
  return base32.encode('base32');
}

},{"../conversion":51,"../loader":53,"base32":104}],67:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Base64 = Loader('base64');

module.exports = new Conversion(Buffer, Base64, convert);

function convert(buffer) {
  return buffer.toString('base64');
}

},{"../conversion":51,"../loader":53}],68:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Hex = Loader('hex');

module.exports = new Conversion(Buffer, Hex, convert);

function convert(buffer) {
  return buffer.toString('hex');
}

},{"../conversion":51,"../loader":53}],69:[function(require,module,exports){
var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var Buffer = Loader('buffer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(Buffer, IPAddress, convert);

function convert(ipBuffer) {
  return ip.toString(ipBuffer);
}

},{"../conversion":51,"../loader":53,"ip":106}],70:[function(require,module,exports){
(function (Buffer){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'buffer',
  'description': 'Byte buffer representation.',
  'schema': 'Buffer',
});

module.exports.Buffer = Buffer;

}).call(this,require("buffer").Buffer)
},{"../type":102,"buffer":10}],71:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Hex = Loader('hex');

module.exports = new Conversion(Hex, Buffer, convert);

function convert(hex) {
  return new Buffer.Buffer(hex, 'hex');
}

},{"../conversion":51,"../loader":53}],72:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'hex',
  'description': 'Hexadecimal string representation.',
  'schema': 'string',
});

},{"../type":102}],73:[function(require,module,exports){
var ip = require('ip');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Integer = Loader('integer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(Integer, IPAddress, convert);

function convert(int) {
  return ip.fromLong(int);
};

},{"../conversion":51,"../loader":53,"ip":106}],74:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'integer',
  'description': 'integer.',
  'schema': 'number',
});

},{"../type":102}],75:[function(require,module,exports){
var _ = require('underscore');
var ip = require('ip');
var Codec = require('../codec');

var IPCodec = module.exports = new Codec({
  // @context and type filled in automatically.
  'id': 'ip-address-ascii',
  'description': 'IP Address ascii encoding: '
});

IPCodec.encode = function(ipStr) {
  if (!_.isString(ipStr))
    throw new Error('TypeError: ipStr must be a string.')

  return ip.toLong(ipStr);
}

IPCodec.decode = function(int) {
  int = parseInt(int, 10)
  return ip.fromLong(int);
}

},{"../codec":49,"ip":106,"underscore":168}],76:[function(require,module,exports){
var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var Buffer = Loader('buffer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddress, Buffer, convert);

function convert(ipAddress) {
  return ip.toBuffer(ipAddress); // string
}

},{"../conversion":51,"../loader":53,"ip":106}],77:[function(require,module,exports){
var ip = require('ip');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Integer = Loader('integer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddress, Integer, convert);

function convert(ipAddress) {
  return ip.toLong(ipAddress);
};

},{"../conversion":51,"../loader":53,"ip":106}],78:[function(require,module,exports){
var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var tString = Loader('string');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddress, tString, convert);

function convert(ipAddr) {
  ipAddr = ip.toString(ip.toBuffer(ipAddr)); //TODO: validate better.
  return ipAddr; // already a string
}

},{"../conversion":51,"../loader":53,"ip":106}],79:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'ip-address',
  'schema': 'ip-address',
});

},{"../type":102}],80:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var IsoDate = Loader('iso-date');
var JsDate = Loader('js-date');

module.exports = new Conversion(IsoDate, JsDate, convert);

function convert(isoDate) {
  return new Date(isoDate);
}

},{"../conversion":51,"../loader":53}],81:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'iso-date',
  'description': 'ISO Date type.',
  'schema': 'string',
});

},{"../type":102}],82:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var IsoDate = Loader('iso-date');
var JsDate = Loader('js-date');

module.exports = new Conversion(JsDate, IsoDate, convert);

function convert(jsDate) {
  return jsDate.toISOString();
}

// polyfill the toISOString function
if (!Date.prototype.toISOString) {
  function pad(number) {
    var r = String(number);
    if ( r.length === 1 ) {
      r = '0' + r;
    }
    return r;
  }

  Date.prototype.toISOString = function() {
    return this.getUTCFullYear()
      + '-' + pad( this.getUTCMonth() + 1 )
      + '-' + pad( this.getUTCDate() )
      + 'T' + pad( this.getUTCHours() )
      + ':' + pad( this.getUTCMinutes() )
      + ':' + pad( this.getUTCSeconds() )
      + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) )
        .slice( 2, 5 )
      + 'Z';
  };
}

},{"../conversion":51,"../loader":53}],83:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var UnixTime = Loader('unix-time');
var JsDate = Loader('js-date');

module.exports = new Conversion(JsDate, UnixTime, convert);

function convert(jsDate) {
  return jsDate.getTime() / 1000.0; // Date uses ms, not s.
}

},{"../conversion":51,"../loader":53}],84:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'js-date',
  'description': 'General Date type.',
  'schema': 'date',
});

},{"../type":102}],85:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var tString = Loader('string');
var tJSON = Loader('json');

module.exports = new Conversion(tJSON, tString, convert);

function convert(json) {
  return JSON.stringify(json);
}

},{"../conversion":51,"../loader":53}],86:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'json',
  'description': 'JSON - JavaScript Object Notation portable format.',
  'schema': 'json',
});

},{"../type":102}],87:[function(require,module,exports){
var jsxml = require('jsxml');
var Conversion = require('../conversion');
var Loader = require('../loader');
var JSONML = Loader('jsonml');
var XML = Loader('xml-string');

module.exports = new Conversion(JSONML, XML, convert);

function convert(jsonml) {
  return jsxml.toXml(jsonml).toString();
}

},{"../conversion":51,"../loader":53,"jsxml":107}],88:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'jsonml',
  'description': 'JSONML - JSON Markup Language (XML conversion).',
  'schema': 'json',
});

},{"../type":102}],89:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var Integer = Loader('integer');

module.exports = new Conversion(tNumber, Integer, convert);

function convert(num) {
  return Math.round(num);
};

},{"../conversion":51,"../loader":53}],90:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var tString = Loader('string');

module.exports = new Conversion(tNumber, tString, convert);

function convert(num) {
  return num.toString();
};

},{"../conversion":51,"../loader":53}],91:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'number',
  'description': 'number.',
  'schema': 'number',
});

},{"../type":102}],92:[function(require,module,exports){
var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var tString = Loader('string');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(tString, IPAddress, convert);

function convert(str) {
  str = ip.toString(ip.toBuffer(str)); //TODO: validate better.
  return str; // already ip address
}

},{"../conversion":51,"../loader":53,"ip":106}],93:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var tString = Loader('string');
var tJSON = Loader('json');

module.exports = new Conversion(tString, tJSON, convert);

function convert(str) {
  return JSON.parse(str);
}

},{"../conversion":51,"../loader":53}],94:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var tString = Loader('string');

module.exports = new Conversion(tString, tNumber, convert);

function convert(str) {
  return parseFloat(str);
};

},{"../conversion":51,"../loader":53}],95:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'string',
  'schema': 'string',
});

},{"../type":102}],96:[function(require,module,exports){
var Conversion = require('../conversion');
var Loader = require('../loader');
var UnixTime = Loader('unix-time');
var JsDate = Loader('js-date');

module.exports = new Conversion(UnixTime, JsDate, convert);

function convert(unixTime) {
  return new Date(unixTime * 1000.0); // Date uses ms, not s.
}

},{"../conversion":51,"../loader":53}],97:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'unix-time',
  'description': 'UNIX DateTime.',
  'schema': 'integer',
});

},{"../type":102}],98:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'us-city',
  'description': 'A city in the U.S.A.',
  'schema': 'string',
});

},{"../type":102}],99:[function(require,module,exports){
var jsxml = require('jsxml');
var Conversion = require('../conversion');
var Loader = require('../loader');
var JSONML = Loader('jsonml');
var XML = Loader('xml-string');

module.exports = new Conversion(XML, JSONML, convert);

function convert(xml) {
  return jsxml.fromXml(xml)[0];
  // https://github.com/rasmuserik/jsxml/issues/1
}

},{"../conversion":51,"../loader":53,"jsxml":107}],100:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'xml-string',
  'description': 'XML - eXtensible Markup Language as string.',
  'schema': 'string',
});

},{"../type":102}],101:[function(require,module,exports){
var Type = require('../type');

module.exports = new Type({
  'id': 'xml',
  'description': 'XML - eXtensible Markup Language.',
  'schema': 'xml',
});

},{"../type":102}],102:[function(require,module,exports){
var _ = require('underscore');
var Object = require('./object');
var Loader = require('./loader');

module.exports = Type

var type_defaults = {
  'type': 'Type',
}

// A Type is one of the two Transformer objects.
// Types are descriptions of kinds of objects. They uniquely identify
// a "kind", "type", or "category" of data. If raw data is just a bunch of
// bytes, Types give that data semantic meaning.
// (e.g. number, text, date, email-address, phone-number, geometry)

// Types are very simple, expressed as json-ld documents that giving the type
// a simple, meaningful name.

// Types are the way we give data semantic meaning. Types are related (linked)
// by Conversions. Transformer leverages this to simplify transforming one
// stream of bytes into another.


function Type(src) {
  if (src instanceof Type)
    return src;

  if (!(this instanceof Type))
    return new Type(src);

  if (src && Type.all[src])
    return Type.all[src];

  if (src && src.id && Type.all[src.id])
    return Type.all[src.id];

  // if not a full type, just schema, wrap it.
  if (_.isObject(src) && !src['schema'])
    src = {'schema': src};

  this.src = Object(src, type_defaults);
  Type.all[this.src.id] = this;
  Loader.cache[this.src.id] = this;
}

Type.all = {};

Type.check = function typeCheck(typeA, typeB) {
  if (!typeB) // ensuring typeA is a Type.
    return typeA instanceof Type;

  // for now, ensure they're the same thing. handle abstraction later.
  return typeA === typeB;
};

},{"./loader":53,"./object":54,"underscore":168}],103:[function(require,module,exports){
var _ = require('underscore');
var Object = require('./object');
var Type = require('./type');

module.exports = Value

// A Value is a sort of "transport" object that represents an instance
// of a type. Meaning, it is a (Type, data) pair. For example:
//
//   var myip = Value(IPAddress, '127.0.0.1');
//   myip.type == IPAddress
//   myip.value == '127.0.0.1'
//
// Values help us move data around across conversion functions.
// They "wrap" the real value because: the real value _should not_ be
// modified at all by us (only by conversion functions), and yet we need
// to associate a value with its type.

function Value(type, value) {
  this.type = type;
  this.value = value;
};

Value.wrapSync = function valueWrapSync(from, func) {
  return function(input) {
    input = new Value(from, input);
    return func(input).value;
  };
};

Value.wrapAsync = function valueWrapAsync(from, func) {
  return function(input, callback) {
    input = new Value(from, input);
    func(input, function(err, output) {
      if (err) callback(err);
      else callback(null, output.value);
    });
  };
};

Value.prototype.typeCheck = function valueTypeCheck() {
  return Type.check(this.type, this.value);
};

},{"./object":54,"./type":102,"underscore":168}],104:[function(require,module,exports){
(function (process,Buffer){
;(function(){

// This would be the place to edit if you want a different
// Base32 implementation

var alphabet = '0123456789abcdefghjkmnpqrtuvwxyz'
var alias = { o:0, i:1, l:1, s:5 }

/**
 * Build a lookup table and memoize it
 *
 * Return an object that maps a character to its
 * byte value.
 */

var lookup = function() {
    var table = {}
    // Invert 'alphabet'
    for (var i = 0; i < alphabet.length; i++) {
        table[alphabet[i]] = i
    }
    // Splice in 'alias'
    for (var key in alias) {
        if (!alias.hasOwnProperty(key)) continue
        table[key] = table['' + alias[key]]
    }
    lookup = function() { return table }
    return table
}

/**
 * A streaming encoder
 *
 *     var encoder = new base32.Encoder()
 *     var output1 = encoder.update(input1)
 *     var output2 = encoder.update(input2)
 *     var lastoutput = encode.update(lastinput, true)
 */

function Encoder() {
    var skip = 0 // how many bits we will skip from the first byte
    var bits = 0 // 5 high bits, carry from one byte to the next

    this.output = ''

    // Read one byte of input
    // Should not really be used except by "update"
    this.readByte = function(byte) {
        // coerce the byte to an int
        if (typeof byte == 'string') byte = byte.charCodeAt(0)

        if (skip < 0) { // we have a carry from the previous byte
            bits |= (byte >> (-skip))
        } else { // no carry
            bits = (byte << skip) & 248
        }

        if (skip > 3) {
            // not enough data to produce a character, get us another one
            skip -= 8
            return 1
        }

        if (skip < 4) {
            // produce a character
            this.output += alphabet[bits >> 3]
            skip += 5
        }

        return 0
    }

    // Flush any remaining bits left in the stream
    this.finish = function(check) {
        var output = this.output + (skip < 0 ? alphabet[bits >> 3] : '') + (check ? '$' : '')
        this.output = ''
        return output
    }
}

/**
 * Process additional input
 *
 * input: string of bytes to convert
 * flush: boolean, should we flush any trailing bits left
 *        in the stream
 * returns: a string of characters representing 'input' in base32
 */

Encoder.prototype.update = function(input, flush) {
    for (var i = 0; i < input.length; ) {
        i += this.readByte(input[i])
    }
    // consume all output
    var output = this.output
    this.output = ''
    if (flush) {
      output += this.finish()
    }
    return output
}

// Functions analogously to Encoder

function Decoder() {
    var skip = 0 // how many bits we have from the previous character
    var byte = 0 // current byte we're producing

    this.output = ''

    // Consume a character from the stream, store
    // the output in this.output. As before, better
    // to use update().
    this.readChar = function(char) {
        if (typeof char != 'string'){
            if (typeof char == 'number') {
                char = String.fromCharCode(char)
            }
        }
        char = char.toLowerCase()
        var val = lookup()[char]
        if (typeof val == 'undefined') {
            // character does not exist in our lookup table
            return // skip silently. An alternative would be:
            // throw Error('Could not find character "' + char + '" in lookup table.')
        }
        val <<= 3 // move to the high bits
        byte |= val >>> skip
        skip += 5
        if (skip >= 8) {
            // we have enough to preduce output
            this.output += String.fromCharCode(byte)
            skip -= 8
            if (skip > 0) byte = (val << (5 - skip)) & 255
            else byte = 0
        }

    }

    this.finish = function(check) {
        var output = this.output + (skip < 0 ? alphabet[bits >> 3] : '') + (check ? '$' : '')
        this.output = ''
        return output
    }
}

Decoder.prototype.update = function(input, flush) {
    for (var i = 0; i < input.length; i++) {
        this.readChar(input[i])
    }
    var output = this.output
    this.output = ''
    if (flush) {
      output += this.finish()
    }
    return output
}

/** Convenience functions
 *
 * These are the ones to use if you just have a string and
 * want to convert it without dealing with streams and whatnot.
 */

// String of data goes in, Base32-encoded string comes out.
function encode(input) {
  var encoder = new Encoder()
  var output = encoder.update(input, true)
  return output
}

// Base32-encoded string goes in, decoded data comes out.
function decode(input) {
    var decoder = new Decoder()
    var output = decoder.update(input, true)
    return output
}

/**
 * sha1 functions wrap the hash function from Node.js
 *
 * Several ways to use this:
 *
 *     var hash = base32.sha1('Hello World')
 *     base32.sha1(process.stdin, function (err, data) {
 *       if (err) return console.log("Something went wrong: " + err.message)
 *       console.log("Your SHA1: " + data)
 *     }
 *     base32.sha1.file('/my/file/path', console.log)
 */

var crypto, fs
function sha1(input, cb) {
    if (typeof crypto == 'undefined') crypto = require('crypto')
    var hash = crypto.createHash('sha1')
    hash.digest = (function(digest) {
        return function() {
            return encode(digest.call(this, 'binary'))
        }
    })(hash.digest)
    if (cb) { // streaming
        if (typeof input == 'string' || Buffer.isBuffer(input)) {
            try {
                return cb(null, sha1(input))
            } catch (err) {
                return cb(err, null)
            }
        }
        if (!typeof input.on == 'function') return cb({ message: "Not a stream!" })
        input.on('data', function(chunk) { hash.update(chunk) })
        input.on('end', function() { cb(null, hash.digest()) })
        return
    }

    // non-streaming
    if (input) {
        return hash.update(input).digest()
    }
    return hash
}
sha1.file = function(filename, cb) {
    if (filename == '-') {
        process.stdin.resume()
        return sha1(process.stdin, cb)
    }
    if (typeof fs == 'undefined') fs = require('fs')
    return fs.stat(filename, function(err, stats) {
        if (err) return cb(err, null)
        if (stats.isDirectory()) return cb({ dir: true, message: "Is a directory" })
        return sha1(require('fs').createReadStream(filename), cb)
    })
}

var base32 = {
    Decoder: Decoder,
    Encoder: Encoder,
    encode: encode,
    decode: decode,
    sha1: sha1
}

if (typeof window !== 'undefined') {
  // we're in a browser - OMG!
  window.base32 = base32
}

if (typeof module !== 'undefined' && module.exports) {
  // nodejs/browserify
  module.exports = base32
}
})();

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),require("buffer").Buffer)
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"buffer":10,"crypto":15,"fs":"liyfGr"}],105:[function(require,module,exports){
module.exports=require(26)
},{}],106:[function(require,module,exports){
var ip = exports,
    Buffer = require('buffer').Buffer,
    os = require('os');

ip.toBuffer = function toBuffer(ip, buff, offset) {
  offset = ~~offset;

  var result;

  if (/^(\d{1,3}\.){3,3}\d{1,3}$/.test(ip)) {
    result = buff || new Buffer(offset + 4);
    ip.split(/\./g).map(function(byte) {
      result[offset++] = parseInt(byte, 10) & 0xff;
    });
  } else if (/^[a-f0-9:]+$/.test(ip)) {
    var s = ip.split(/::/g, 2),
        head = (s[0] || '').split(/:/g, 8),
        tail = (s[1] || '').split(/:/g, 8);

    if (tail.length === 0) {
      // xxxx::
      while (head.length < 8) head.push('0000');
    } else if (head.length === 0) {
      // ::xxxx
      while (tail.length < 8) tail.unshift('0000');
    } else {
      // xxxx::xxxx
      while (head.length + tail.length < 8) head.push('0000');
    }

    result = buff || new Buffer(offset + 16);
    head.concat(tail).map(function(word) {
      word = parseInt(word, 16);
      result[offset++] = (word >> 8) & 0xff;
      result[offset++] = word & 0xff;
    });
  } else {
    throw Error('Invalid ip address: ' + ip);
  }

  return result;
};

ip.toString = function toString(buff, offset, length) {
  offset = ~~offset;
  length = length || (buff.length - offset);

  var result = [];
  if (length === 4) {
    // IPv4
    for (var i = 0; i < length; i++) {
      result.push(buff[offset + i]);
    }
    result = result.join('.');
  } else if (length === 16) {
    // IPv6
    for (var i = 0; i < length; i += 2) {
      result.push(buff.readUInt16BE(offset + i).toString(16));
    }
    result = result.join(':');
    result = result.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
    result = result.replace(/:{3,4}/, '::');
  }

  return result;
};

ip.fromPrefixLen = function fromPrefixLen(prefixlen, family) {
  if (prefixlen > 32) {
    family = 'ipv6';
  } else {
    family = _normalizeFamily(family);
  }

  var len = 4;
  if (family === 'ipv6') {
    len = 16;
  }
  var buff = new Buffer(len);

  for (var i = 0, n = buff.length; i < n; ++i) {
    var bits = 8;
    if (prefixlen < 8) {
      bits = prefixlen;
    }
    prefixlen -= bits;

    buff[i] = ~(0xff >> bits);
  }

  return ip.toString(buff);
};

ip.mask = function mask(addr, mask) {
  addr = ip.toBuffer(addr);
  mask = ip.toBuffer(mask);

  var result = new Buffer(Math.max(addr.length, mask.length));

  // Same protocol - do bitwise and
  if (addr.length === mask.length) {
    for (var i = 0; i < addr.length; i++) {
      result[i] = addr[i] & mask[i];
    }
  } else if (mask.length === 4) {
    // IPv6 address and IPv4 mask
    // (Mask low bits)
    for (var i = 0; i < mask.length; i++) {
      result[i] = addr[addr.length - 4  + i] & mask[i];
    }
  } else {
    // IPv6 mask and IPv4 addr
    for (var i = 0; i < result.length - 6; i++) {
      result[i] = 0;
    }

    // ::ffff:ipv4
    result[10] = 0xff;
    result[11] = 0xff;
    for (var i = 0; i < addr.length; i++) {
      result[i + 12] = addr[i] & mask[i + 12];
    }
  }

  return ip.toString(result);
};

ip.cidr = function cidr(cidrString) {
  var cidrParts = cidrString.split('/');

  if (cidrParts.length != 2)
    throw new Error('invalid CIDR subnet: ' + addr);

  var addr = cidrParts[0];
  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));

  return ip.mask(addr, mask);
}

ip.subnet = function subnet(addr, mask) {
  var networkAddress = ip.toLong(ip.mask(addr, mask));

  // Calculate the mask's length.
  var maskBuffer = ip.toBuffer(mask);
  var maskLength = 0;

  for (var i = 0; i < maskBuffer.length; i++) {
    if (maskBuffer[i] == 0xff) {
      maskLength += 8;
    } else {
      var octet = maskBuffer[i] & 0xff;
      while (octet) {
        octet = (octet << 1) & 0xff;
        maskLength++;
      }
    }
  }

  var numberOfAddresses = Math.pow(2, 32 - maskLength);

  return {
    networkAddress: ip.fromLong(networkAddress),
    firstAddress: ip.fromLong(networkAddress + 1),
    lastAddress: ip.fromLong(networkAddress + numberOfAddresses - 2),
    broadcastAddress: ip.fromLong(networkAddress + numberOfAddresses - 1),
    subnetMask: mask,
    subnetMaskLength: maskLength,
    numHosts: numberOfAddresses - 2,
    length: numberOfAddresses
  };
}

ip.cidrSubnet = function cidrSubnet(cidrString) {
  var cidrParts = cidrString.split('/');

  if (cidrParts.length !== 2)
    throw new Error('invalid CIDR subnet: ' + addr);

  var addr = cidrParts[0];
  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));

  return ip.subnet(addr, mask);
}

ip.not = function not(addr) {
  var buff = ip.toBuffer(addr);
  for (var i = 0; i < buff.length; i++) {
    buff[i] = 0xff ^ buff[i];
  }
  return ip.toString(buff);
};

ip.or = function or(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // same protocol
  if (a.length == b.length) {
    for (var i = 0; i < a.length; ++i) {
      a[i] |= b[i];
    }
    return ip.toString(a);

  // mixed protocols
  } else {
    var buff = a;
    var other = b;
    if (b.length > a.length) {
      buff = b;
      other = a;
    }

    var offset = buff.length - other.length;
    for (var i = offset; i < buff.length; ++i) {
      buff[i] |= other[i - offset];
    }

    return ip.toString(buff);
  }
};

ip.isEqual = function isEqual(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // Same protocol
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Swap
  if (b.length === 4) {
    var t = b;
    b = a;
    a = t;
  }

  // a - IPv4, b - IPv6
  for (var i = 0; i < 10; i++) {
    if (b[i] !== 0) return false;
  }

  var word = b.readUInt16BE(10);
  if (word !== 0 && word !== 0xffff) return false;

  for (var i = 0; i < 4; i++) {
    if (a[i] !== b[i + 12]) return false;
  }

  return true;
};

ip.isPrivate = function isPrivate(addr) {
  return addr.match(/^10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^192\.168\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^169\.254\.([0-9]{1,3})\.([0-9]{1,3})/) != null ||
    addr.match(/^fc00:/) != null || addr.match(/^fe80:/) != null;
};

ip.isPublic = function isPublic(addr) {
  return !ip.isPrivate(addr);
}

ip.isLoopback = function isLoopback(addr) {
  return /^127\.0\.0\.1/.test(addr)
    || /^fe80::1/.test(addr)
    || /^::1/.test(addr);
};

ip.loopback = function loopback(family) {
  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  if (family !== 'ipv4' && family !== 'ipv6') {
    throw new Error('family must be ipv4 or ipv6');
  }

  return family === 'ipv4'
    ? '127.0.0.1'
    : 'fe80::1';
};

//
// ### function address (name, family)
// #### @name {string|'public'|'private'} **Optional** Name or security
//      of the network interface.
// #### @family {ipv4|ipv6} **Optional** IP family of the address (defaults
//      to ipv4).
//
// Returns the address for the network interface on the current system with
// the specified `name`:
//   * String: First `family` address of the interface.
//             If not found see `undefined`.
//   * 'public': the first public ip address of family.
//   * 'private': the first private ip address of family.
//   * undefined: First address with `ipv4` or loopback addres `127.0.0.1`.
//
ip.address = function address(name, family) {
  var interfaces = os.networkInterfaces(),
      all;

  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  //
  // If a specific network interface has been named,
  // return the address.
  //
  if (name && !~['public', 'private'].indexOf(name)) {
    return interfaces[name].filter(function (details) {
      details.family = details.family.toLowerCase();
      return details.family === family;
    })[0].address;
  }

  var all = Object.keys(interfaces).map(function (nic) {
    //
    // Note: name will only be `public` or `private`
    // when this is called.
    //
    var addresses = interfaces[nic].filter(function (details) {
      details.family = details.family.toLowerCase();
      if (details.family !== family || ip.isLoopback(details.address)) {
        return false;
      }
      else if (!name) {
        return true;
      }

      return name === 'public'
        ? !ip.isPrivate(details.address)
        : ip.isPrivate(details.address)
    });

    return addresses.length
      ? addresses[0].address
      : undefined;
  }).filter(Boolean);

  return !all.length
    ? ip.loopback(family)
    : all[0];
};

ip.toLong = function toInt(ip){
  var ipl=0;
  ip.split('.').forEach(function( octet ) {
      ipl<<=8;
      ipl+=parseInt(octet);
  });
  return(ipl >>>0);
};

ip.fromLong = function fromInt(ipl){
  return ( (ipl>>>24) +'.' +
      (ipl>>16 & 255) +'.' +
      (ipl>>8 & 255) +'.' +
      (ipl & 255) );
};

function _normalizeFamily(family) {
  return family ? family.toLowerCase() : 'ipv4';
}

},{"buffer":10,"os":28}],107:[function(require,module,exports){
// # JsonML
//
// Various functions for handling
// jsonml in array form.
// For more info on jsonml,
// see [jsonml.org](http://jsonml.org/)
// or [wikipedia](http://en.wikipedia.org/wiki/JsonML)
//
// Implemented to be as portable as possible. 
// Not depending on any libraries, and also
// avoid regular expressions to be possible to 
// run on javascript-subsets on j2me devices.
//
// ## XML parser
//
// Parse an XML-string. 
// Actually this is not a full implementation, but just
// the basic parts to get it up running. 
// Nonetheless it is Good Enough(tm) for most uses.
// 
// Known deficiencies: CDATA is not supported, will accept even 
// non-well-formed documents, <?... > <!... > are not really handled, ...
exports.fromXml = function(xml) {
    if(typeof(xml) !== "string") {
        JsonML_Error( 
            "Error: jsonml.parseXML didn't receive a string as parameter");
    }

    // white space definition
    var whitespace = " \n\r\t";
    // the current char in the string that is being parsed
    var c = xml[0];
    // the position in the string
    var pos = 0;
    // stack for handling nested tags
    var stack = [];
    // current tag being parsed
    var tag = [];
    // read the next char from the string
    function next_char() { c = ++pos < xml.length ? xml[pos] : undefined; }
    // check if the current char is one of those in the string parameter 
    function is_a(str) { return str.indexOf(c) !== -1; }
    // return the string from the current position to right before the first 
    // occurence of any of symb. Translate escaped xml entities to their value 
    // on the fly.
    function read_until(symb) {
        var buffer = [];
        while(c && !is_a(symb)) {
            if(c === '&') {
                next_char();
                var entity = read_until(';');
                if(entity[0] === '#') {
                    if(entity[1] === 'x') {
                        c = String.fromCharCode(parseInt(entity.slice(2), 16));
                    } else {
                        c = String.fromCharCode(parseInt(entity.slice(1), 10));
                    }
                } else {
                    c = entities[entity];
                    if(!c) {
                        JsonML_Error("error: unrecognisable xml entity: " + entity);
                    }
                }
            } 
            buffer.push(c);
            next_char();
        }
        return buffer.join("");
    }

    // The actual parsing
    while(is_a(whitespace)) { next_char(); }
    while(c) {
        if(is_a("<")) {
            next_char();

            // `<?xml ... >`, `<!-- -->` or similar - skip these
            if(is_a("?!")) {
                if(xml.slice(pos, pos+3) === "!--") {
                    pos += 3;
                    while(xml.slice(pos, pos+2) !== "--") {
                        ++pos;
                    }
                } 
                read_until('>');
                next_char();

            // `<sometag ...>` - handle begin tag
            } else if(!is_a("/")) {
                // read tag name
                var newtag = [read_until(whitespace+">/")];

                // read attributes
                var attributes = {};
                var has_attributes = 0;
                while(c && is_a(whitespace)) { next_char(); }
                while(c && !is_a(">/")) {
                    has_attributes = 1;
                    var attr = read_until(whitespace + "=>");
                    if(c === "=") {
                        next_char();
                        var value_terminator = whitespace+">/";
                        if(is_a('"\'')) { value_terminator = c; next_char(); }
                        attributes[attr] = read_until(value_terminator);
                        if(is_a('"\'')) { next_char(); }
                    } else {
                        JsonML_Error("something not attribute in tag");
                    }
                    while(c && is_a(whitespace)) { next_char(); }
                }
                if(has_attributes) { newtag.push(attributes); }

                // end of tag, is it `<.../>` or  `<...>`
                if(is_a("/")) {
                    next_char();
                    if(!is_a(">")) { 
                        JsonML_Error('expected ">" after "/" within tag'); 
                    }
                    tag.push(newtag);
                } else {
                    stack.push(tag);
                    tag = newtag;
                }
                next_char();

            // `</something>` - handle end tag
            } else {
                next_char();
                if(read_until(">") !== tag[0]) {
                    JsonML_Error("end tag not matching: " + tag[0]);
                }
                next_char();
                var parent_tag = stack.pop();
                if(tag.length <= 2 && !isArray(tag[1]) && typeof(tag[1]) !== "string") {
                    tag.push("");
                }
                parent_tag.push(tag);
                tag = parent_tag;

            }

        // actual content / data between tags
        } else {
            tag.push(read_until("<"));
        }
    }
    return tag;
};



// ## XML generation

// Convert jsonml in array form to xml.
exports.toXml = function(jsonml) {
    var acc = [];
    toXmlAcc(jsonml, acc);
    return acc.join('');
};

// The actual implementation. As the XML-string is built by appending to the 
// `acc`umulator.
function toXmlAcc(jsonml, acc) {
    if(isArray(jsonml)) {
        acc.push("<");
        acc.push(jsonml[0]);
        var pos = 1;
        var attributes = jsonml[1];
        if(attributes && !isArray(attributes) && typeof(attributes) !== "string") {
            for(var key in attributes) { if(attributes.hasOwnProperty(key)) {
                acc.push(' ');
                acc.push(key);
                acc.push('="');
                xmlEscape(attributes[key], acc);
                acc.push('"');
            } }
            ++pos;
        }
        if(pos < jsonml.length) {
            acc.push(">");
            do {
                toXmlAcc(jsonml[pos], acc);
                ++pos;
            } while(pos < jsonml.length); 
            acc.push("</");
            acc.push(jsonml[0]);
            acc.push(">");
        } else {
            acc.push(" />");
        }
    } else {
        xmlEscape(jsonml.toString(), acc);
    }
}

// XML escaped entity table
var entities = {
    "quot": '"',
    "amp": '&',
    "apos": "'",
    "lt": '<',
    "gt": '>'
};

// Generate a reverse xml entity table.
var reventities = (function () {
    var result = {};
    for(var key in entities) { if(entities.hasOwnProperty(key)) {
        result[entities[key]] = key;
    } }
    return result;
})();


// Append the characters of `str`, or the xml-entity they map to, to the `acc`umulator array.
function xmlEscape(str, acc) {
    for(var i = 0; i < str.length; ++i) {
        var c = str[i];
        var code = c.charCodeAt(0);
        var s = reventities[c];
        if(s) {
            acc.push("&" + s + ";");
        } else if(/*code < 32 ||*/ code >= 128) {
            acc.push("&#" + code + ";");
        } else {
            acc.push(c);
        }
    }
}

// ## Utility functions

// Apply a function to all the child elements of a given jsonml array.
var childReduce = exports.childReduce = function(jsonml, fn, acc) {
    var first = jsonml[1];
    if(typeof(first) !== "object" || isArray(first)) {
        acc = fn(acc, first);
    }
    for(var pos = 2; pos < jsonml.length; ++pos) {
        acc = fn(acc, jsonml[pos]);
    }
    return acc;
};

// - `jsonml.ensureAttributeObject(jsonml_array)` changes an jsonml array such that it has a (possibly empty) attribute object at position 1
exports.ensureAttributeObject = function(jsonml) {
    if(typeof jsonml[1] !== "object" || jsonml[1].constructor === Array) {
        jsonml.unshift(jsonml[0]);
        jsonml[1] = {};
    }
};

exports.getAttr = function(jsonml, attribute) {
    if(typeof jsonml[1] !== "object" || jsonml[1].constructor === Array) {
        return undefined;
    } else {
        return jsonml[1][attribute];
    }
};
// Convert jsonml into an easier subscriptable json structure, not preserving 
// the order of the elements
exports.toObject = function(jsonml) {
    var result = {};
    result[jsonml[0]] = toObjectInner(jsonml);
    return result; 
};

// Internal function called by toObject. Return an object corresponding to 
// the child nodes of the `jsonml`-parameter
function toObjectInner(jsonml) {
    var result = {};
    var attr = jsonml[1];
    var pos;
    if(typeof(attr) === "object" && !isArray(attr)) {
        for(var key in attr) { if(attr.hasOwnProperty(key)) {
            result["@" + key] = attr[key];
        } }
        pos = 2;
    } else {
        pos = 1;
        if(jsonml.length === 2 && !isArray(attr)) {
            return attr;
        }
    }
    while(pos < jsonml.length) {
        var current = jsonml[pos];
        if(isArray(current)) {
            addprop(result, current[0], toObjectInner(current));
        } else {
            addprop(result, "_", current);
        }
        ++pos;
    }
    return result;
}

// Add a property to the object. If the property is already there, append 
// the `val`ue to an array at the key instead, possibly putting existing 
// object in front of such array, if that is not an array yet.
function addprop(obj, key, val) {
    if(obj[key]) {
        if(isArray(obj[key])) {
            obj[key].push(val);
        } else {
            obj[key] = [obj[key], val];
        }
    } else {
        obj[key] = val;
    }
}
// Error handler
function JsonML_Error(desc) {
    throw desc;
}

// Array check, implemented here to avoid depending on any library
function isArray(a) {
    return a !== null && typeof(a) === "object"  && a.constructor === Array;
}

},{}],108:[function(require,module,exports){
module.exports = function(module, callback) {
    var npm = require("npm");
    var npmconf = require("npmconf");
    var configDefs = npmconf.defs;
    var shorthands = configDefs.shorthands;
    var types = configDefs.types;
    var nopt = require("nopt");
    var conf = nopt(types, shorthands);

    var dataToResult = function(data) {
        var result = {};
        result.module_and_version = data[0];
        result.module = data[0].split("@")[0];
        result.version = data[0].split("@")[1];
        result.location = data[1];
        result.parent = data[2];
        result.parentLocation = data[3];
        result.origin = data[4];
        result.children = {};
        return result;
    }

    npm.load(conf, function(er) {
        if (er) {
            console.log("LOAD ERR", er);
        } else {
            npm.commands["install"]([module], function(err, data) {
                if (err) {
                    callback(err);
                } else if (data.length == 0) {
                    callback("no data");
                } else {
                    var error = null;
                    var result = dataToResult(data[data.length - 1]);

                    callback(error, result);
                }
            });
        }
    });
}
},{"nopt":109,"npm":113,"npmconf":166}],109:[function(require,module,exports){
(function (process){
// info about each config option.

var debug = process.env.DEBUG_NOPT || process.env.NOPT_DEBUG
  ? function () { console.error.apply(console, arguments) }
  : function () {}

var url = require("url")
  , path = require("path")
  , Stream = require("stream").Stream
  , abbrev = require("abbrev")

module.exports = exports = nopt
exports.clean = clean

exports.typeDefs =
  { String  : { type: String,  validate: validateString  }
  , Boolean : { type: Boolean, validate: validateBoolean }
  , url     : { type: url,     validate: validateUrl     }
  , Number  : { type: Number,  validate: validateNumber  }
  , path    : { type: path,    validate: validatePath    }
  , Stream  : { type: Stream,  validate: validateStream  }
  , Date    : { type: Date,    validate: validateDate    }
  }

function nopt (types, shorthands, args, slice) {
  args = args || process.argv
  types = types || {}
  shorthands = shorthands || {}
  if (typeof slice !== "number") slice = 2

  debug(types, shorthands, args, slice)

  args = args.slice(slice)
  var data = {}
    , key
    , remain = []
    , cooked = args
    , original = args.slice(0)

  parse(args, data, remain, types, shorthands)
  // now data is full
  clean(data, types, exports.typeDefs)
  data.argv = {remain:remain,cooked:cooked,original:original}
  Object.defineProperty(data.argv, 'toString', { value: function () {
    return this.original.map(JSON.stringify).join(" ")
  }, enumerable: false })
  return data
}

function clean (data, types, typeDefs) {
  typeDefs = typeDefs || exports.typeDefs
  var remove = {}
    , typeDefault = [false, true, null, String, Number, Array]

  Object.keys(data).forEach(function (k) {
    if (k === "argv") return
    var val = data[k]
      , isArray = Array.isArray(val)
      , type = types[k]
    if (!isArray) val = [val]
    if (!type) type = typeDefault
    if (type === Array) type = typeDefault.concat(Array)
    if (!Array.isArray(type)) type = [type]

    debug("val=%j", val)
    debug("types=", type)
    val = val.map(function (val) {
      // if it's an unknown value, then parse false/true/null/numbers/dates
      if (typeof val === "string") {
        debug("string %j", val)
        val = val.trim()
        if ((val === "null" && ~type.indexOf(null))
            || (val === "true" &&
               (~type.indexOf(true) || ~type.indexOf(Boolean)))
            || (val === "false" &&
               (~type.indexOf(false) || ~type.indexOf(Boolean)))) {
          val = JSON.parse(val)
          debug("jsonable %j", val)
        } else if (~type.indexOf(Number) && !isNaN(val)) {
          debug("convert to number", val)
          val = +val
        } else if (~type.indexOf(Date) && !isNaN(Date.parse(val))) {
          debug("convert to date", val)
          val = new Date(val)
        }
      }

      if (!types.hasOwnProperty(k)) {
        return val
      }

      // allow `--no-blah` to set 'blah' to null if null is allowed
      if (val === false && ~type.indexOf(null) &&
          !(~type.indexOf(false) || ~type.indexOf(Boolean))) {
        val = null
      }

      var d = {}
      d[k] = val
      debug("prevalidated val", d, val, types[k])
      if (!validate(d, k, val, types[k], typeDefs)) {
        if (exports.invalidHandler) {
          exports.invalidHandler(k, val, types[k], data)
        } else if (exports.invalidHandler !== false) {
          debug("invalid: "+k+"="+val, types[k])
        }
        return remove
      }
      debug("validated val", d, val, types[k])
      return d[k]
    }).filter(function (val) { return val !== remove })

    if (!val.length) delete data[k]
    else if (isArray) {
      debug(isArray, data[k], val)
      data[k] = val
    } else data[k] = val[0]

    debug("k=%s val=%j", k, val, data[k])
  })
}

function validateString (data, k, val) {
  data[k] = String(val)
}

function validatePath (data, k, val) {
  data[k] = path.resolve(String(val))
  return true
}

function validateNumber (data, k, val) {
  debug("validate Number %j %j %j", k, val, isNaN(val))
  if (isNaN(val)) return false
  data[k] = +val
}

function validateDate (data, k, val) {
  debug("validate Date %j %j %j", k, val, Date.parse(val))
  var s = Date.parse(val)
  if (isNaN(s)) return false
  data[k] = new Date(val)
}

function validateBoolean (data, k, val) {
  if (val instanceof Boolean) val = val.valueOf()
  else if (typeof val === "string") {
    if (!isNaN(val)) val = !!(+val)
    else if (val === "null" || val === "false") val = false
    else val = true
  } else val = !!val
  data[k] = val
}

function validateUrl (data, k, val) {
  val = url.parse(String(val))
  if (!val.host) return false
  data[k] = val.href
}

function validateStream (data, k, val) {
  if (!(val instanceof Stream)) return false
  data[k] = val
}

function validate (data, k, val, type, typeDefs) {
  // arrays are lists of types.
  if (Array.isArray(type)) {
    for (var i = 0, l = type.length; i < l; i ++) {
      if (type[i] === Array) continue
      if (validate(data, k, val, type[i], typeDefs)) return true
    }
    delete data[k]
    return false
  }

  // an array of anything?
  if (type === Array) return true

  // NaN is poisonous.  Means that something is not allowed.
  if (type !== type) {
    debug("Poison NaN", k, val, type)
    delete data[k]
    return false
  }

  // explicit list of values
  if (val === type) {
    debug("Explicitly allowed %j", val)
    // if (isArray) (data[k] = data[k] || []).push(val)
    // else data[k] = val
    data[k] = val
    return true
  }

  // now go through the list of typeDefs, validate against each one.
  var ok = false
    , types = Object.keys(typeDefs)
  for (var i = 0, l = types.length; i < l; i ++) {
    debug("test type %j %j %j", k, val, types[i])
    var t = typeDefs[types[i]]
    if (t && type === t.type) {
      var d = {}
      ok = false !== t.validate(d, k, val)
      val = d[k]
      if (ok) {
        // if (isArray) (data[k] = data[k] || []).push(val)
        // else data[k] = val
        data[k] = val
        break
      }
    }
  }
  debug("OK? %j (%j %j %j)", ok, k, val, types[i])

  if (!ok) delete data[k]
  return ok
}

function parse (args, data, remain, types, shorthands) {
  debug("parse", args, data, remain)

  var key = null
    , abbrevs = abbrev(Object.keys(types))
    , shortAbbr = abbrev(Object.keys(shorthands))

  for (var i = 0; i < args.length; i ++) {
    var arg = args[i]
    debug("arg", arg)

    if (arg.match(/^-{2,}$/)) {
      // done with keys.
      // the rest are args.
      remain.push.apply(remain, args.slice(i + 1))
      args[i] = "--"
      break
    }
    var hadEq = false
    if (arg.charAt(0) === "-" && arg.length > 1) {
      if (arg.indexOf("=") !== -1) {
        hadEq = true
        var v = arg.split("=")
        arg = v.shift()
        v = v.join("=")
        args.splice.apply(args, [i, 1].concat([arg, v]))
      }

      // see if it's a shorthand
      // if so, splice and back up to re-parse it.
      var shRes = resolveShort(arg, shorthands, shortAbbr, abbrevs)
      debug("arg=%j shRes=%j", arg, shRes)
      if (shRes) {
        debug(arg, shRes)
        args.splice.apply(args, [i, 1].concat(shRes))
        if (arg !== shRes[0]) {
          i --
          continue
        }
      }
      arg = arg.replace(/^-+/, "")
      var no = null
      while (arg.toLowerCase().indexOf("no-") === 0) {
        no = !no
        arg = arg.substr(3)
      }

      if (abbrevs[arg]) arg = abbrevs[arg]

      var isArray = types[arg] === Array ||
        Array.isArray(types[arg]) && types[arg].indexOf(Array) !== -1

      // allow unknown things to be arrays if specified multiple times.
      if (!types.hasOwnProperty(arg) && data.hasOwnProperty(arg)) {
        if (!Array.isArray(data[arg]))
          data[arg] = [data[arg]]
        isArray = true
      }

      var val
        , la = args[i + 1]

      var isBool = typeof no === 'boolean' ||
        types[arg] === Boolean ||
        Array.isArray(types[arg]) && types[arg].indexOf(Boolean) !== -1 ||
        (typeof types[arg] === 'undefined' && !hadEq) ||
        (la === "false" &&
         (types[arg] === null ||
          Array.isArray(types[arg]) && ~types[arg].indexOf(null)))

      if (isBool) {
        // just set and move along
        val = !no
        // however, also support --bool true or --bool false
        if (la === "true" || la === "false") {
          val = JSON.parse(la)
          la = null
          if (no) val = !val
          i ++
        }

        // also support "foo":[Boolean, "bar"] and "--foo bar"
        if (Array.isArray(types[arg]) && la) {
          if (~types[arg].indexOf(la)) {
            // an explicit type
            val = la
            i ++
          } else if ( la === "null" && ~types[arg].indexOf(null) ) {
            // null allowed
            val = null
            i ++
          } else if ( !la.match(/^-{2,}[^-]/) &&
                      !isNaN(la) &&
                      ~types[arg].indexOf(Number) ) {
            // number
            val = +la
            i ++
          } else if ( !la.match(/^-[^-]/) && ~types[arg].indexOf(String) ) {
            // string
            val = la
            i ++
          }
        }

        if (isArray) (data[arg] = data[arg] || []).push(val)
        else data[arg] = val

        continue
      }

      if (la && la.match(/^-{2,}$/)) {
        la = undefined
        i --
      }

      val = la === undefined ? true : la
      if (isArray) (data[arg] = data[arg] || []).push(val)
      else data[arg] = val

      i ++
      continue
    }
    remain.push(arg)
  }
}

function resolveShort (arg, shorthands, shortAbbr, abbrevs) {
  // handle single-char shorthands glommed together, like
  // npm ls -glp, but only if there is one dash, and only if
  // all of the chars are single-char shorthands, and it's
  // not a match to some other abbrev.
  arg = arg.replace(/^-+/, '')

  // if it's an exact known option, then don't go any further
  if (abbrevs[arg] === arg)
    return null

  // if it's an exact known shortopt, same deal
  if (shorthands[arg]) {
    // make it an array, if it's a list of words
    if (shorthands[arg] && !Array.isArray(shorthands[arg]))
      shorthands[arg] = shorthands[arg].split(/\s+/)

    return shorthands[arg]
  }

  // first check to see if this arg is a set of single-char shorthands
  var singles = shorthands.___singles
  if (!singles) {
    singles = Object.keys(shorthands).filter(function (s) {
      return s.length === 1
    }).reduce(function (l,r) {
      l[r] = true
      return l
    }, {})
    shorthands.___singles = singles
    debug('shorthand singles', singles)
  }

  var chrs = arg.split("").filter(function (c) {
    return singles[c]
  })

  if (chrs.join("") === arg) return chrs.map(function (c) {
    return shorthands[c]
  }).reduce(function (l, r) {
    return l.concat(r)
  }, [])


  // if it's an arg abbrev, and not a literal shorthand, then prefer the arg
  if (abbrevs[arg] && !shorthands[arg])
    return null

  // if it's an abbr for a shorthand, then use that
  if (shortAbbr[arg])
    arg = shortAbbr[arg]

  // make it an array, if it's a list of words
  if (shorthands[arg] && !Array.isArray(shorthands[arg]))
    shorthands[arg] = shorthands[arg].split(/\s+/)

  return shorthands[arg]
}

if (module === require.main) {
var assert = require("assert")
  , util = require("util")

  , shorthands =
    { s : ["--loglevel", "silent"]
    , d : ["--loglevel", "info"]
    , dd : ["--loglevel", "verbose"]
    , ddd : ["--loglevel", "silly"]
    , noreg : ["--no-registry"]
    , reg : ["--registry"]
    , "no-reg" : ["--no-registry"]
    , silent : ["--loglevel", "silent"]
    , verbose : ["--loglevel", "verbose"]
    , h : ["--usage"]
    , H : ["--usage"]
    , "?" : ["--usage"]
    , help : ["--usage"]
    , v : ["--version"]
    , f : ["--force"]
    , desc : ["--description"]
    , "no-desc" : ["--no-description"]
    , "local" : ["--no-global"]
    , l : ["--long"]
    , p : ["--parseable"]
    , porcelain : ["--parseable"]
    , g : ["--global"]
    }

  , types =
    { aoa: Array
    , nullstream: [null, Stream]
    , date: Date
    , str: String
    , browser : String
    , cache : path
    , color : ["always", Boolean]
    , depth : Number
    , description : Boolean
    , dev : Boolean
    , editor : path
    , force : Boolean
    , global : Boolean
    , globalconfig : path
    , group : [String, Number]
    , gzipbin : String
    , logfd : [Number, Stream]
    , loglevel : ["silent","win","error","warn","info","verbose","silly"]
    , long : Boolean
    , "node-version" : [false, String]
    , npaturl : url
    , npat : Boolean
    , "onload-script" : [false, String]
    , outfd : [Number, Stream]
    , parseable : Boolean
    , pre: Boolean
    , prefix: path
    , proxy : url
    , "rebuild-bundle" : Boolean
    , registry : url
    , searchopts : String
    , searchexclude: [null, String]
    , shell : path
    , t: [Array, String]
    , tag : String
    , tar : String
    , tmp : path
    , "unsafe-perm" : Boolean
    , usage : Boolean
    , user : String
    , username : String
    , userconfig : path
    , version : Boolean
    , viewer: path
    , _exit : Boolean
    }

; [["-v", {version:true}, []]
  ,["---v", {version:true}, []]
  ,["ls -s --no-reg connect -d",
    {loglevel:"info",registry:null},["ls","connect"]]
  ,["ls ---s foo",{loglevel:"silent"},["ls","foo"]]
  ,["ls --registry blargle", {}, ["ls"]]
  ,["--no-registry", {registry:null}, []]
  ,["--no-color true", {color:false}, []]
  ,["--no-color false", {color:true}, []]
  ,["--no-color", {color:false}, []]
  ,["--color false", {color:false}, []]
  ,["--color --logfd 7", {logfd:7,color:true}, []]
  ,["--color=true", {color:true}, []]
  ,["--logfd=10", {logfd:10}, []]
  ,["--tmp=/tmp -tar=gtar",{tmp:"/tmp",tar:"gtar"},[]]
  ,["--tmp=tmp -tar=gtar",
    {tmp:path.resolve(process.cwd(), "tmp"),tar:"gtar"},[]]
  ,["--logfd x", {}, []]
  ,["a -true -- -no-false", {true:true},["a","-no-false"]]
  ,["a -no-false", {false:false},["a"]]
  ,["a -no-no-true", {true:true}, ["a"]]
  ,["a -no-no-no-false", {false:false}, ["a"]]
  ,["---NO-no-No-no-no-no-nO-no-no"+
    "-No-no-no-no-no-no-no-no-no"+
    "-no-no-no-no-NO-NO-no-no-no-no-no-no"+
    "-no-body-can-do-the-boogaloo-like-I-do"
   ,{"body-can-do-the-boogaloo-like-I-do":false}, []]
  ,["we are -no-strangers-to-love "+
    "--you-know=the-rules --and=so-do-i "+
    "---im-thinking-of=a-full-commitment "+
    "--no-you-would-get-this-from-any-other-guy "+
    "--no-gonna-give-you-up "+
    "-no-gonna-let-you-down=true "+
    "--no-no-gonna-run-around false "+
    "--desert-you=false "+
    "--make-you-cry false "+
    "--no-tell-a-lie "+
    "--no-no-and-hurt-you false"
   ,{"strangers-to-love":false
    ,"you-know":"the-rules"
    ,"and":"so-do-i"
    ,"you-would-get-this-from-any-other-guy":false
    ,"gonna-give-you-up":false
    ,"gonna-let-you-down":false
    ,"gonna-run-around":false
    ,"desert-you":false
    ,"make-you-cry":false
    ,"tell-a-lie":false
    ,"and-hurt-you":false
    },["we", "are"]]
  ,["-t one -t two -t three"
   ,{t: ["one", "two", "three"]}
   ,[]]
  ,["-t one -t null -t three four five null"
   ,{t: ["one", "null", "three"]}
   ,["four", "five", "null"]]
  ,["-t foo"
   ,{t:["foo"]}
   ,[]]
  ,["--no-t"
   ,{t:["false"]}
   ,[]]
  ,["-no-no-t"
   ,{t:["true"]}
   ,[]]
  ,["-aoa one -aoa null -aoa 100"
   ,{aoa:["one", null, 100]}
   ,[]]
  ,["-str 100"
   ,{str:"100"}
   ,[]]
  ,["--color always"
   ,{color:"always"}
   ,[]]
  ,["--no-nullstream"
   ,{nullstream:null}
   ,[]]
  ,["--nullstream false"
   ,{nullstream:null}
   ,[]]
  ,["--notadate=2011-01-25"
   ,{notadate: "2011-01-25"}
   ,[]]
  ,["--date 2011-01-25"
   ,{date: new Date("2011-01-25")}
   ,[]]
  ,["-cl 1"
   ,{config: true, length: 1}
   ,[]
   ,{config: Boolean, length: Number, clear: Boolean}
   ,{c: "--config", l: "--length"}]
  ,["--acount bla"
   ,{"acount":true}
   ,["bla"]
   ,{account: Boolean, credentials: Boolean, options: String}
   ,{a:"--account", c:"--credentials",o:"--options"}]
  ,["--clear"
   ,{clear:true}
   ,[]
   ,{clear:Boolean,con:Boolean,len:Boolean,exp:Boolean,add:Boolean,rep:Boolean}
   ,{c:"--con",l:"--len",e:"--exp",a:"--add",r:"--rep"}]
  ,["--file -"
   ,{"file":"-"}
   ,[]
   ,{file:String}
   ,{}]
  ,["--file -"
   ,{"file":true}
   ,["-"]
   ,{file:Boolean}
   ,{}]
  ].forEach(function (test) {
    var argv = test[0].split(/\s+/)
      , opts = test[1]
      , rem = test[2]
      , actual = nopt(test[3] || types, test[4] || shorthands, argv, 0)
      , parsed = actual.argv
    delete actual.argv
    console.log(util.inspect(actual, false, 2, true), parsed.remain)
    for (var i in opts) {
      var e = JSON.stringify(opts[i])
        , a = JSON.stringify(actual[i] === undefined ? null : actual[i])
      if (e && typeof e === "object") {
        assert.deepEqual(e, a)
      } else {
        assert.equal(e, a)
      }
    }
    assert.deepEqual(rem, parsed.remain)
  })
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"abbrev":110,"assert":7,"path":29,"stream":35,"url":43,"util":45}],110:[function(require,module,exports){

module.exports = exports = abbrev.abbrev = abbrev

abbrev.monkeyPatch = monkeyPatch

function monkeyPatch () {
  Object.defineProperty(Array.prototype, 'abbrev', {
    value: function () { return abbrev(this) },
    enumerable: false, configurable: true, writable: true
  })

  Object.defineProperty(Object.prototype, 'abbrev', {
    value: function () { return abbrev(Object.keys(this)) },
    enumerable: false, configurable: true, writable: true
  })
}

function abbrev (list) {
  if (arguments.length !== 1 || !Array.isArray(list)) {
    list = Array.prototype.slice.call(arguments, 0)
  }
  for (var i = 0, l = list.length, args = [] ; i < l ; i ++) {
    args[i] = typeof list[i] === "string" ? list[i] : String(list[i])
  }

  // sort them lexicographically, so that they're next to their nearest kin
  args = args.sort(lexSort)

  // walk through each, seeing how much it has in common with the next and previous
  var abbrevs = {}
    , prev = ""
  for (var i = 0, l = args.length ; i < l ; i ++) {
    var current = args[i]
      , next = args[i + 1] || ""
      , nextMatches = true
      , prevMatches = true
    if (current === next) continue
    for (var j = 0, cl = current.length ; j < cl ; j ++) {
      var curChar = current.charAt(j)
      nextMatches = nextMatches && curChar === next.charAt(j)
      prevMatches = prevMatches && curChar === prev.charAt(j)
      if (!nextMatches && !prevMatches) {
        j ++
        break
      }
    }
    prev = current
    if (j === cl) {
      abbrevs[current] = current
      continue
    }
    for (var a = current.substr(0, j) ; j <= cl ; j ++) {
      abbrevs[a] = current
      a += current.charAt(j)
    }
  }
  return abbrevs
}

function lexSort (a, b) {
  return a === b ? 0 : a > b ? 1 : -1
}

},{}],111:[function(require,module,exports){
(function (process){

;(function () { // wrapper in case we're in module_context mode

// windows: running "npm blah" in this folder will invoke WSH, not node.
if (typeof WScript !== "undefined") {
  WScript.echo("npm does not work when run\n"
              +"with the Windows Scripting Host\n\n"
              +"'cd' to a different directory,\n"
              +"or type 'npm.cmd <args>',\n"
              +"or type 'node npm <args>'.")
  WScript.quit(1)
  return
}


process.title = "npm"

var log = require("npmlog")
log.pause() // will be unpaused when config is loaded.
log.info("it worked if it ends with", "ok")

var fs = require("graceful-fs")
  , path = require("path")
  , npm = require("../lib/npm.js")
  , npmconf = require("npmconf")
  , errorHandler = require("../lib/utils/error-handler.js")

  , configDefs = npmconf.defs
  , shorthands = configDefs.shorthands
  , types = configDefs.types
  , nopt = require("nopt")

// if npm is called as "npmg" or "npm_g", then
// run in global mode.
if (path.basename(process.argv[1]).slice(-1)  === "g") {
  process.argv.splice(1, 1, "npm", "-g")
}

log.verbose("cli", process.argv)

var conf = nopt(types, shorthands)
npm.argv = conf.argv.remain
if (npm.deref(npm.argv[0])) npm.command = npm.argv.shift()
else conf.usage = true


if (conf.version) {
  console.log(npm.version)
  return
}

if (conf.versions) {
  npm.command = "version"
  conf.usage = false
  npm.argv = []
}

log.info("using", "npm@%s", npm.version)
log.info("using", "node@%s", process.version)

// make sure that this version of node works with this version of npm.
var semver = require("semver")
  , nodeVer = process.version
  , reqVer = npm.nodeVersionRequired
if (reqVer && !semver.satisfies(nodeVer, reqVer)) {
  return errorHandler(new Error(
    "npm doesn't work with node " + nodeVer
    + "\nRequired: node@" + reqVer), true)
}

process.on("uncaughtException", errorHandler)

if (conf.usage && npm.command !== "help") {
  npm.argv.unshift(npm.command)
  npm.command = "help"
}

// now actually fire up npm and run the command.
// this is how to use npm programmatically:
conf._exit = true
npm.load(conf, function (er) {
  if (er) return errorHandler(er)
  npm.commands[npm.command](npm.argv, errorHandler)
})

})()

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"../lib/npm.js":113,"../lib/utils/error-handler.js":114,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"graceful-fs":121,"nopt":126,"npmconf":132,"npmlog":133,"path":29,"semver":148}],112:[function(require,module,exports){
(function (process){

module.exports = config

config.usage = "npm config set <key> <value>"
             + "\nnpm config get [<key>]"
             + "\nnpm config delete <key>"
             + "\nnpm config list"
             + "\nnpm config edit"
             + "\nnpm set <key> <value>"
             + "\nnpm get [<key>]"

var log = require("npmlog")
  , npm = require("./npm.js")
  , spawn = require("child_process").spawn
  , fs = require("graceful-fs")
  , npmconf = require("npmconf")
  , types = npmconf.defs.types
  , ini = require("ini")
  , editor = require("editor")
  , os = require("os")

config.completion = function (opts, cb) {
  var argv = opts.conf.argv.remain
  if (argv[1] !== "config") argv.unshift("config")
  if (argv.length === 2) {
    var cmds = ["get", "set", "delete", "ls", "rm", "edit"]
    if (opts.partialWord !== "l") cmds.push("list")
    return cb(null, cmds)
  }

  var action = argv[2]
  switch (action) {
    case "set":
      // todo: complete with valid values, if possible.
      if (argv.length > 3) return cb(null, [])
      // fallthrough
    case "get":
    case "delete":
    case "rm":
      return cb(null, Object.keys(types))
    case "edit":
    case "list": case "ls":
      return cb(null, [])
    default: return cb(null, [])
  }
}

// npm config set key value
// npm config get key
// npm config list
function config (args, cb) {
  var action = args.shift()
  switch (action) {
    case "set": return set(args[0], args[1], cb)
    case "get": return get(args[0], cb)
    case "delete": case "rm": case "del": return del(args[0], cb)
    case "list": case "ls": return list(cb)
    case "edit": return edit(cb)
    default: return unknown(action, cb)
  }
}

function edit (cb) {
  var e = npm.config.get("editor")
    , which = npm.config.get("global") ? "global" : "user"
    , f = npm.config.get(which + "config")
  if (!e) return cb(new Error("No EDITOR config or environ set."))
  npm.config.save(which, function (er) {
    if (er) return cb(er)
    fs.readFile(f, "utf8", function (er, data) {
      if (er) data = ""
      data = [ ";;;;"
             , "; npm "+(npm.config.get("global") ?
                         "globalconfig" : "userconfig")+" file"
             , "; this is a simple ini-formatted file"
             , "; lines that start with semi-colons are comments."
             , "; read `npm help config` for help on the various options"
             , ";;;;"
             , ""
             , data
             ].concat( [ ";;;;"
                       , "; all options with default values"
                       , ";;;;"
                       ]
                     )
              .concat(Object.keys(npmconf.defaults).reduce(function (arr, key) {
                var obj = {};
                obj[key] = npmconf.defaults[key]
                if (key === "logstream") return arr
                return arr.concat(
                  ini.stringify(obj)
                    .replace(/\n$/m, '')
                    .replace(/^/g, '; ')
                    .replace(/\n/g, '\n; ')
                    .split('\n'))
              }, []))
              .concat([""])
              .join(os.EOL)
      fs.writeFile
        ( f
        , data
        , "utf8"
        , function (er) {
            if (er) return cb(er)
            editor(f, { editor: e }, cb)
          }
        )
    })
  })
}

function del (key, cb) {
  if (!key) return cb(new Error("no key provided"))
  var where = npm.config.get("global") ? "global" : "user"
  npm.config.del(key, where)
  npm.config.save(where, cb)
}

function set (key, val, cb) {
  if (key === undefined) {
    return unknown("", cb)
  }
  if (val === undefined) {
    if (key.indexOf("=") !== -1) {
      var k = key.split("=")
      key = k.shift()
      val = k.join("=")
    } else {
      val = ""
    }
  }
  key = key.trim()
  val = val.trim()
  log.info("config", "set %j %j", key, val)
  var where = npm.config.get("global") ? "global" : "user"
  npm.config.set(key, val, where)
  npm.config.save(where, cb)
}

function get (key, cb) {
  if (!key) return list(cb)
  if (key.charAt(0) === "_") {
    return cb(new Error("---sekretz---"))
  }
  console.log(npm.config.get(key))
  cb()
}

function sort (a, b) {
  return a > b ? 1 : -1
}

function reverse (a, b) {
  return a > b ? -1 : 1
}

function public (k) {
  return !(k.charAt(0) === "_" || types[k] !== types[k])
}

function getKeys (data) {
  return Object.keys(data).filter(public).sort(sort)
}

function list (cb) {
  var msg = ""
    , long = npm.config.get("long")

  var cli = npm.config.sources.cli.data
    , cliKeys = getKeys(cli)
  if (cliKeys.length) {
    msg += "; cli configs\n"
    cliKeys.forEach(function (k) {
      if (cli[k] && typeof cli[k] === "object") return
      if (k === "argv") return
      msg += k + " = " + JSON.stringify(cli[k]) + "\n"
    })
    msg += "\n"
  }

  // env configs
  var env = npm.config.sources.env.data
    , envKeys = getKeys(env)
  if (envKeys.length) {
    msg += "; environment configs\n"
    envKeys.forEach(function (k) {
      if (env[k] !== npm.config.get(k)) {
        if (!long) return
        msg += "; " + k + " = " + JSON.stringify(env[k])
            + " (overridden)\n"
      } else msg += k + " = " + JSON.stringify(env[k]) + "\n"
    })
    msg += "\n"
  }

  // user config file
  var uconf = npm.config.sources.user.data
    , uconfKeys = getKeys(uconf)
  if (uconfKeys.length) {
    msg += "; userconfig " + npm.config.get("userconfig") + "\n"
    uconfKeys.forEach(function (k) {
      var val = (k.charAt(0) === "_")
              ? "---sekretz---"
              : JSON.stringify(uconf[k])
      if (uconf[k] !== npm.config.get(k)) {
        if (!long) return
        msg += "; " + k + " = " + val
            + " (overridden)\n"
      } else msg += k + " = " + val + "\n"
    })
    msg += "\n"
  }

  // global config file
  var gconf = npm.config.sources.global.data
    , gconfKeys = getKeys(gconf)
  if (gconfKeys.length) {
    msg += "; globalconfig " + npm.config.get("globalconfig") + "\n"
    gconfKeys.forEach(function (k) {
      var val = (k.charAt(0) === "_")
              ? "---sekretz---"
              : JSON.stringify(gconf[k])
      if (gconf[k] !== npm.config.get(k)) {
        if (!long) return
        msg += "; " + k + " = " + val
            + " (overridden)\n"
      } else msg += k + " = " + val + "\n"
    })
    msg += "\n"
  }

  // builtin config file
  var builtin = npm.config.sources.builtin || {}
  if (builtin && builtin.data) {
    var bconf = builtin.data
      , bpath = builtin.path
      , bconfKeys = getKeys(bconf)
    if (bconfKeys.length) {
      var path = require("path")
      msg += "; builtin config " + bpath + "\n"
      bconfKeys.forEach(function (k) {
        var val = (k.charAt(0) === "_")
                ? "---sekretz---"
                : JSON.stringify(bconf[k])
        if (bconf[k] !== npm.config.get(k)) {
          if (!long) return
          msg += "; " + k + " = " + val
              + " (overridden)\n"
        } else msg += k + " = " + val + "\n"
      })
      msg += "\n"
    }
  }

  // only show defaults if --long
  if (!long) {
    msg += "; node bin location = " + process.execPath + "\n"
         + "; cwd = " + process.cwd() + "\n"
         + "; HOME = " + process.env.HOME + "\n"
         + "; 'npm config ls -l' to show all defaults.\n"

    console.log(msg)
    return cb()
  }

  var defaults = npmconf.defaults
    , defKeys = getKeys(defaults)
  msg += "; default values\n"
  defKeys.forEach(function (k) {
    if (defaults[k] && typeof defaults[k] === "object") return
    var val = JSON.stringify(defaults[k])
    if (defaults[k] !== npm.config.get(k)) {
      msg += "; " + k + " = " + val
          + " (overridden)\n"
    } else msg += k + " = " + val + "\n"
  })
  msg += "\n"

  console.log(msg)
  return cb()
}

function unknown (action, cb) {
  cb("Usage:\n" + config.usage)
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"./npm.js":113,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"child_process":"liyfGr","editor":120,"graceful-fs":121,"ini":124,"npmconf":132,"npmlog":133,"os":28,"path":29}],113:[function(require,module,exports){
(function (process,__dirname){
;(function(){
// windows: running "npm blah" in this folder will invoke WSH, not node.
if (typeof WScript !== "undefined") {
  WScript.echo("npm does not work when run\n"
              +"with the Windows Scripting Host\n\n"
              +"'cd' to a different directory,\n"
              +"or type 'npm.cmd <args>',\n"
              +"or type 'node npm <args>'.")
  WScript.quit(1)
  return
}


// monkey-patch support for 0.6 child processes
require('child-process-close')

var EventEmitter = require("events").EventEmitter
  , npm = module.exports = new EventEmitter
  , config = require("./config.js")
  , npmconf = require("npmconf")
  , log = require("npmlog")
  , fs = require("graceful-fs")
  , path = require("path")
  , abbrev = require("abbrev")
  , which = require("which")
  , semver = require("semver")
  , findPrefix = require("./utils/find-prefix.js")
  , getUid = require("uid-number")
  , mkdirp = require("mkdirp")
  , slide = require("slide")
  , chain = slide.chain
  , RegClient = require("npm-registry-client")

npm.config = {loaded: false}

// /usr/local is often a read-only fs, which is not
// well handled by node or mkdirp.  Just double-check
// in the case of errors when making the prefix dirs.
function mkdir (p, cb) {
  mkdirp(p, function (er, made) {
    // it could be that we couldn't create it, because it
    // already exists, and is on a read-only fs.
    if (er) {
      return fs.stat(p, function (er2, st) {
        if (er2 || !st.isDirectory()) return cb(er)
        return cb(null, made)
      })
    }
    return cb(er, made)
  })
}

npm.commands = {}

try {
  var pv = process.version.replace(/^v/, '')
  // startup, ok to do this synchronously
  var j = JSON.parse(fs.readFileSync(
    path.join(__dirname, "../package.json"))+"")
  npm.version = j.version
  npm.nodeVersionRequired = j.engines.node
  if (!semver.satisfies(pv, j.engines.node)) {
    log.warn("unsupported version", [""
            ,"npm requires node version: "+j.engines.node
            ,"And you have: "+pv
            ,"which is not satisfactory."
            ,""
            ,"Bad things will likely happen.  You have been warned."
            ,""].join("\n"))
  }
} catch (ex) {
  try {
    log.info("error reading version", ex)
  } catch (er) {}
  npm.version = ex
}

var commandCache = {}
  // short names for common things
  , aliases = { "rm" : "uninstall"
              , "r" : "uninstall"
              , "un" : "uninstall"
              , "unlink" : "uninstall"
              , "remove" : "uninstall"
              , "rb" : "rebuild"
              , "list" : "ls"
              , "la" : "ls"
              , "ll" : "ls"
              , "ln" : "link"
              , "i" : "install"
              , "isntall" : "install"
              , "up" : "update"
              , "c" : "config"
              , "info" : "view"
              , "show" : "view"
              , "find" : "search"
              , "s" : "search"
              , "se" : "search"
              , "author" : "owner"
              , "home" : "docs"
              , "issues": "bugs"
              , "unstar": "star" // same function
              , "apihelp" : "help"
              , "login": "adduser"
              , "add-user": "adduser"
              , "tst": "test"
              , "find-dupes": "dedupe"
              , "ddp": "dedupe"
              , "v": "view"
              }

  , aliasNames = Object.keys(aliases)
  // these are filenames in .
  , cmdList = [ "install"
              , "uninstall"
              , "cache"
              , "config"
              , "set"
              , "get"
              , "update"
              , "outdated"
              , "prune"
              , "submodule"
              , "pack"
              , "dedupe"

              , "rebuild"
              , "link"

              , "publish"
              , "star"
              , "stars"
              , "tag"
              , "adduser"
              , "unpublish"
              , "owner"
              , "deprecate"
              , "shrinkwrap"

              , "help"
              , "help-search"
              , "ls"
              , "search"
              , "view"
              , "init"
              , "version"
              , "edit"
              , "explore"
              , "docs"
              , "repo"
              , "bugs"
              , "faq"
              , "root"
              , "prefix"
              , "bin"
              , "whoami"

              , "test"
              , "stop"
              , "start"
              , "restart"
              , "run-script"
              , "completion"
              ]
  , plumbing = [ "build"
               , "unbuild"
               , "xmas"
               , "substack"
               , "visnup"
               ]
  , fullList = npm.fullList = cmdList.concat(aliasNames).filter(function (c) {
      return plumbing.indexOf(c) === -1
    })
  , abbrevs = abbrev(fullList)

Object.keys(abbrevs).concat(plumbing).forEach(function addCommand (c) {
  Object.defineProperty(npm.commands, c, { get : function () {
    if (!loaded) throw new Error(
      "Call npm.load(config, cb) before using this command.\n"+
      "See the README.md or cli.js for example usage.")
    var a = npm.deref(c)
    if (c === "la" || c === "ll") {
      npm.config.set("long", true)
    }
    npm.command = c
    if (commandCache[a]) return commandCache[a]
    var cmd = require(__dirname+"/"+a+".js")
    commandCache[a] = function () {
      var args = Array.prototype.slice.call(arguments, 0)
      if (typeof args[args.length - 1] !== "function") {
        args.push(defaultCb)
      }
      if (args.length === 1) args.unshift([])
      cmd.apply(npm, args)
    }
    Object.keys(cmd).forEach(function (k) {
      commandCache[a][k] = cmd[k]
    })
    return commandCache[a]
  }, enumerable: fullList.indexOf(c) !== -1 })

  // make css-case commands callable via camelCase as well
  if (c.match(/\-([a-z])/)) {
    addCommand(c.replace(/\-([a-z])/g, function (a, b) {
      return b.toUpperCase()
    }))
  }
})

function defaultCb (er, data) {
  if (er) console.error(er.stack || er.message)
  else console.log(data)
}

npm.deref = function (c) {
  if (!c) return ""
  if (c.match(/[A-Z]/)) c = c.replace(/([A-Z])/g, function (m) {
    return "-" + m.toLowerCase()
  })
  if (plumbing.indexOf(c) !== -1) return c
  var a = abbrevs[c]
  if (aliases[a]) a = aliases[a]
  return a
}

var loaded = false
  , loading = false
  , loadErr = null
  , loadListeners = []

function loadCb (er) {
  loadListeners.forEach(function (cb) {
    process.nextTick(cb.bind(npm, er, npm))
  })
  loadListeners.length = 0
}

npm.load = function (cli, cb_) {
  if (!cb_ && typeof cli === "function") cb_ = cli , cli = {}
  if (!cb_) cb_ = function () {}
  if (!cli) cli = {}
  loadListeners.push(cb_)
  if (loaded || loadErr) return cb(loadErr)
  if (loading) return
  loading = true
  var onload = true

  function cb (er) {
    if (loadErr) return
    if (npm.config.get("force")) {
      log.warn("using --force", "I sure hope you know what you are doing.")
    }
    npm.config.loaded = true
    loaded = true
    loadCb(loadErr = er)
    if (onload = onload && npm.config.get("onload-script")) {
      require(onload)
      onload = false
    }
  }

  log.pause()

  load(npm, cli, cb)
}

function load (npm, cli, cb) {
  which(process.argv[0], function (er, node) {
    if (!er && node.toUpperCase() !== process.execPath.toUpperCase()) {
      log.verbose("node symlink", node)
      process.execPath = node
      process.installPrefix = path.resolve(node, "..", "..")
    }

    // look up configs
    //console.error("about to look up configs")

    var builtin = path.resolve(__dirname, "..", "npmrc")
    npmconf.load(cli, builtin, function (er, config) {
      if (er === config) er = null

      npm.config = config

      var color = config.get("color")

      log.level = config.get("loglevel")
      log.heading = config.get("heading") || "npm"
      log.stream = config.get("logstream")
      switch (color) {
        case "always": log.enableColor(); break
        case false: log.disableColor(); break
      }
      log.resume()

      if (er) return cb(er)

      // see if we need to color normal output
      switch (color) {
        case "always":
          npm.color = true
          break
        case false:
          npm.color = false
          break
        default:
          var tty = require("tty")
          if (process.stdout.isTTY) npm.color = true
          else if (!tty.isatty) npm.color = true
          else if (tty.isatty(1)) npm.color = true
          else npm.color = false
          break
      }

      // at this point the configs are all set.
      // go ahead and spin up the registry client.
      var token = config.get("_token")
      if (typeof token === "string") {
        try {
          token = JSON.parse(token)
          config.set("_token", token, "user")
          config.save("user")
        } catch (e) { token = null }
      }

      npm.registry = new RegClient(npm.config)

      // save the token cookie in the config file
      if (npm.registry.couchLogin) {
        npm.registry.couchLogin.tokenSet = function (tok) {
          npm.config.set("_token", tok, "user")
          // ignore save error.  best effort.
          npm.config.save("user")
        }
      }

      var umask = npm.config.get("umask")
      npm.modes = { exec: 0777 & (~umask)
                  , file: 0666 & (~umask)
                  , umask: umask }

      chain([ [ loadPrefix, npm, cli ]
            , [ setUser, config, config.root ]
            , [ loadUid, npm ]
            ], cb)
    })
  })
}

function loadPrefix (npm, config, cb) {
  // try to guess at a good node_modules location.
  var p
    , gp
  if (!Object.prototype.hasOwnProperty.call(config, "prefix")) {
    p = process.cwd()
  } else {
    p = npm.config.get("prefix")
  }
  gp = npm.config.get("prefix")

  findPrefix(p, function (er, p) {
    Object.defineProperty(npm, "localPrefix",
      { get : function () { return p }
      , set : function (r) { return p = r }
      , enumerable : true
      })
    // the prefix MUST exist, or else nothing works.
    if (!npm.config.get("global")) {
      mkdir(p, next)
    } else {
      next(er)
    }
  })

  gp = path.resolve(gp)
  Object.defineProperty(npm, "globalPrefix",
    { get : function () { return gp }
    , set : function (r) { return gp = r }
    , enumerable : true
    })
  // the prefix MUST exist, or else nothing works.
  mkdir(gp, next)


  var i = 2
    , errState = null
  function next (er) {
    if (errState) return
    if (er) return cb(errState = er)
    if (--i === 0) return cb()
  }
}


function loadUid (npm, cb) {
  // if we're not in unsafe-perm mode, then figure out who
  // to run stuff as.  Do this first, to support `npm update npm -g`
  if (!npm.config.get("unsafe-perm")) {
    getUid(npm.config.get("user"), npm.config.get("group"), cb)
  } else {
    process.nextTick(cb)
  }
}

function setUser (cl, dc, cb) {
  // If global, leave it as-is.
  // If not global, then set the user to the owner of the prefix folder.
  // Just set the default, so it can be overridden.
  if (cl.get("global")) return cb()
  if (process.env.SUDO_UID) {
    dc.user = +(process.env.SUDO_UID)
    return cb()
  }

  var prefix = path.resolve(cl.get("prefix"))
  mkdir(prefix, function (er) {
    if (er) {
      log.error("could not create prefix dir", prefix)
      return cb(er)
    }
    fs.stat(prefix, function (er, st) {
      dc.user = st && st.uid
      return cb(er)
    })
  })
}


Object.defineProperty(npm, "prefix",
  { get : function () {
      return npm.config.get("global") ? npm.globalPrefix : npm.localPrefix
    }
  , set : function (r) {
      var k = npm.config.get("global") ? "globalPrefix" : "localPrefix"
      return npm[k] = r
    }
  , enumerable : true
  })

Object.defineProperty(npm, "bin",
  { get : function () {
      if (npm.config.get("global")) return npm.globalBin
      return path.resolve(npm.root, ".bin")
    }
  , enumerable : true
  })

Object.defineProperty(npm, "globalBin",
  { get : function () {
      var b = npm.globalPrefix
      if (process.platform !== "win32") b = path.resolve(b, "bin")
      return b
    }
  })

Object.defineProperty(npm, "dir",
  { get : function () {
      if (npm.config.get("global")) return npm.globalDir
      return path.resolve(npm.prefix, "node_modules")
    }
  , enumerable : true
  })

Object.defineProperty(npm, "globalDir",
  { get : function () {
      return (process.platform !== "win32")
           ? path.resolve(npm.globalPrefix, "lib", "node_modules")
           : path.resolve(npm.globalPrefix, "node_modules")
    }
  , enumerable : true
  })

Object.defineProperty(npm, "root",
  { get : function () { return npm.dir } })

Object.defineProperty(npm, "cache",
  { get : function () { return npm.config.get("cache") }
  , set : function (r) { return npm.config.set("cache", r) }
  , enumerable : true
  })

var tmpFolder
var crypto = require("crypto")
var rand = crypto.randomBytes(6)
                 .toString("base64")
                 .replace(/\//g, '_')
                 .replace(/\+/, '-')
Object.defineProperty(npm, "tmp",
  { get : function () {
      if (!tmpFolder) tmpFolder = "npm-" + process.pid + "-" + rand
      return path.resolve(npm.config.get("tmp"), tmpFolder)
    }
  , enumerable : true
  })

// the better to repl you with
Object.getOwnPropertyNames(npm.commands).forEach(function (n) {
  if (npm.hasOwnProperty(n) || n === "config") return

  Object.defineProperty(npm, n, { get: function () {
    return function () {
      var args = Array.prototype.slice.call(arguments, 0)
        , cb = defaultCb

      if (args.length === 1 && Array.isArray(args[0])) {
        args = args[0]
      }

      if (typeof args[args.length - 1] === "function") {
        cb = args.pop()
      }

      npm.commands[n](args, cb)
    }
  }, enumerable: false, configurable: true })
})

if (require.main === module) {
  require("../bin/npm-cli.js")
}
})()

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"/node_modules/dat-transformer/node_modules/npm-installer/node_modules/npm/lib")
},{"../bin/npm-cli.js":111,"./config.js":112,"./utils/find-prefix.js":115,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"abbrev":116,"child-process-close":119,"crypto":15,"events":20,"graceful-fs":121,"mkdirp":125,"npm-registry-client":127,"npmconf":132,"npmlog":133,"path":29,"semver":148,"slide":152,"tty":42,"uid-number":153,"which":154}],114:[function(require,module,exports){
(function (process){

module.exports = errorHandler

var cbCalled = false
  , log = require("npmlog")
  , npm = require("../npm.js")
  , rm = require("rimraf")
  , itWorked = false
  , path = require("path")
  , wroteLogFile = false
  , exitCode = 0


process.on("exit", function (code) {
  // console.error("exit", code)
  if (!npm.config.loaded) return
  if (code) itWorked = false
  if (itWorked) log.info("ok")
  else {
    if (!cbCalled) {
      log.error("", "cb() never called!")
    }

    if (wroteLogFile) {
      log.error("", [""
                ,"Additional logging details can be found in:"
                ,"    " + path.resolve("npm-debug.log")
                ].join("\n"))
      wroteLogFile = false
    }
    log.error("not ok", "code", code)
  }

  var doExit = npm.config.get("_exit")
  if (doExit) {
    // actually exit.
    if (exitCode === 0 && !itWorked) {
      exitCode = 1
    }
    if (exitCode !== 0) process.exit(exitCode)
  } else {
    itWorked = false // ready for next exit
  }
})

function exit (code, noLog) {
  exitCode = exitCode || process.exitCode || code

  var doExit = npm.config.get("_exit")
  log.verbose("exit", [code, doExit])
  if (log.level === "silent") noLog = true

  if (code && !noLog) writeLogFile(reallyExit)
  else rm("npm-debug.log", function () { rm(npm.tmp, reallyExit) })

  function reallyExit() {
    // truncate once it's been written.
    log.record.length = 0

    itWorked = !code

    // just emit a fake exit event.
    // if we're really exiting, then let it exit on its own, so that
    // in-process stuff can finish or clean up first.
    if (!doExit) process.emit("exit", code)
  }
}


function errorHandler (er) {
  var printStack = false
  // console.error("errorHandler", er)
  if (!npm.config.loaded) {
    // logging won't work unless we pretend that it's ready
    er = er || new Error("Exit prior to config file resolving.")
    console.error(er.stack || er.message)
  }

  if (cbCalled) {
    er = er || new Error("Callback called more than once.")
  }

  cbCalled = true
  if (!er) return exit(0)
  if (typeof er === "string") {
    log.error("", er)
    return exit(1, true)
  } else if (!(er instanceof Error)) {
    log.error("weird error", er)
    return exit(1, true)
  }

  var m = er.code || er.message.match(/^(?:Error: )?(E[A-Z]+)/)
  if (m && !er.code) er.code = m

  switch (er.code) {
  case "ECONNREFUSED":
    log.error("", er)
    log.error("", ["\nIf you are behind a proxy, please make sure that the"
              ,"'proxy' config is set properly.  See: 'npm help config'"
              ].join("\n"))
    printStack = true
    break

  case "EACCES":
  case "EPERM":
    log.error("", er)
    log.error("", ["\nPlease try running this command again as root/Administrator."
              ].join("\n"))
    printStack = true
    break

  case "ELIFECYCLE":
    er.code = "ELIFECYCLE"
    log.error("", er.message)
    log.error("", ["","Failed at the "+er.pkgid+" "+er.stage+" script."
              ,"This is most likely a problem with the "+er.pkgname+" package,"
              ,"not with npm itself."
              ,"Tell the author that this fails on your system:"
              ,"    "+er.script
              ,"You can get their info via:"
              ,"    npm owner ls "+er.pkgname
              ,"There is likely additional logging output above."
              ].join("\n"))
    break

  case "ENOGIT":
    er.code = "ENOGIT"
    log.error("", er.message)
    log.error("", ["","Failed using git."
              ,"This is most likely not a problem with npm itself."
              ,"Please check if you have git installed and in your PATH."
              ].join("\n"))
    break

  case "EJSONPARSE":
    er.code = "EJSONPARSE"
    log.error("", er.message)
    log.error("", "File: "+er.file)
    log.error("", ["Failed to parse package.json data."
              ,"package.json must be actual JSON, not just JavaScript."
              ,"","This is not a bug in npm."
              ,"Tell the package author to fix their package.json file."
              ].join("\n"), "JSON.parse")
    break

  case "E404":
    er.code = "E404"
    if (er.pkgid && er.pkgid !== "-") {
      var msg = ["'"+er.pkgid+"' is not in the npm registry."
                ,"You should bug the author to publish it"]
      if (er.parent) {
        msg.push("It was specified as a dependency of '"+er.parent+"'")
      }
      if (er.pkgid.match(/^node[\.\-]|[\.\-]js$/)) {
        var s = er.pkgid.replace(/^node[\.\-]|[\.\-]js$/g, "")
        if (s !== er.pkgid) {
          s = s.replace(/[^a-z0-9]/g, ' ')
          msg.push("\nMaybe try 'npm search " + s + "'")
        }
      }
      msg.push("\nNote that you can also install from a"
              ,"tarball, folder, or http url, or git url.")
      log.error("404", msg.join("\n"))
    }
    break

  case "EPUBLISHCONFLICT":
    er.code = "EPUBLISHCONFLICT"
    log.error("publish fail", ["Cannot publish over existing version."
              ,"Update the 'version' field in package.json and try again."
              ,""
              ,"If the previous version was published in error, see:"
              ,"    npm help unpublish"
              ,""
              ,"To automatically increment version numbers, see:"
              ,"    npm help version"
              ].join("\n"))
    break

  case "EISGIT":
    er.code = "EISGIT"
    log.error("git", [er.message
              ,"    "+er.path
              ,"Refusing to remove it. Update manually,"
              ,"or move it out of the way first."
              ].join("\n"))
    break

  case "ECYCLE":
    er.code = "ECYCLE"
    log.error("cycle", [er.message
              ,"While installing: "+er.pkgid
              ,"Found a pathological dependency case that npm cannot solve."
              ,"Please report this to the package author."
              ].join("\n"))
    break

  case "EBADPLATFORM":
    er.code = "EBADPLATFORM"
    log.error("notsup", [er.message
              ,"Not compatible with your operating system or architecture: "+er.pkgid
              ,"Valid OS:    "+er.os.join(",")
              ,"Valid Arch:  "+er.cpu.join(",")
              ,"Actual OS:   "+process.platform
              ,"Actual Arch: "+process.arch
              ].join("\n"))
    break

  case "EEXIST":
    log.error([er.message
              ,"File exists: "+er.path
              ,"Move it away, and try again."].join("\n"))
    break

  case "ENEEDAUTH":
    log.error("need auth", [er.message
              ,"You need to authorize this machine using `npm adduser`"
              ].join("\n"))
    break

  case "EPEERINVALID":
    var peerErrors = Object.keys(er.peersDepending).map(function (peer) {
      return "Peer " + peer + " wants " + er.packageName + "@"
        + er.peersDepending[peer]
    })
    log.error("peerinvalid", [er.message].concat(peerErrors).join("\n"))
    break

  case "ECONNRESET":
  case "ENOTFOUND":
  case "ETIMEDOUT":
    log.error("network", [er.message
              ,"This is most likely not a problem with npm itself"
              ,"and is related to network connectivity."
              ,"In most cases you are behind a proxy or have bad network settings."
              ,"\nIf you are behind a proxy, please make sure that the"
              ,"'proxy' config is set properly.  See: 'npm help config'"
              ].join("\n"))
    break

  case "ENOPACKAGEJSON":
    log.error("package.json", [er.message
              ,"This is most likely not a problem with npm itself."
              ,"npm can't find a package.json file in your current directory."
              ].join("\n"))
    break

  case "ETARGET":
    log.error("notarget", [er.message
              ,"This is most likely not a problem with npm itself."
              ,"In most cases you or one of your dependencies are requesting"
              ,"a package version that doesn't exist."
              ].join("\n"))
    break

  case "ENOTSUP":
    if (er.required) {
      log.error("notsup", [er.message
                ,"Not compatible with your version of node/npm: "+er.pkgid
                ,"Required: "+JSON.stringify(er.required)
                ,"Actual:   "
                +JSON.stringify({npm:npm.version
                                ,node:npm.config.get("node-version")})
                ].join("\n"))
      break
    } // else passthrough

  default:
    log.error("", er.stack || er.message || er)
    log.error("", ["If you need help, you may report this *entire* log,"
                  ,"including the npm and node versions, at:"
                  ,"    <http://github.com/isaacs/npm/issues>"
                  ].join("\n"))
    printStack = false
    break
  }

  var os = require("os")
  // just a line break
  console.error("")
  log.error("System", os.type() + " " + os.release())
  log.error("command", process.argv
            .map(JSON.stringify).join(" "))
  log.error("cwd", process.cwd())
  log.error("node -v", process.version)
  log.error("npm -v", npm.version)

  ; [ "file"
    , "path"
    , "type"
    , "syscall"
    , "fstream_path"
    , "fstream_unc_path"
    , "fstream_type"
    , "fstream_class"
    , "fstream_finish_call"
    , "fstream_linkpath"
    , "code"
    , "errno"
    , "stack"
    , "fstream_stack"
    ].forEach(function (k) {
      var v = er[k]
      if (k === "stack") {
        if (!printStack) return
        if (!v) v = er.message
      }
      if (!v) return
      if (k === "fstream_stack") v = v.join("\n")
      log.error(k, v)
    })

  exit(typeof er.errno === "number" ? er.errno : 1)
}

var writingLogFile = false
function writeLogFile (cb) {
  if (writingLogFile) return cb()
  writingLogFile = true
  wroteLogFile = true

  var fs = require("graceful-fs")
    , fstr = fs.createWriteStream("npm-debug.log")
    , util = require("util")
    , os = require("os")
    , out = ""

  log.record.forEach(function (m) {
    var pref = [m.id, m.level]
    if (m.prefix) pref.push(m.prefix)
    pref = pref.join(' ')

    m.message.trim().split(/\r?\n/).map(function (line) {
      return (pref + ' ' + line).trim()
    }).forEach(function (line) {
      out += line + os.EOL
    })
  })

  fstr.end(out)
  fstr.on("close", cb)
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"../npm.js":113,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"graceful-fs":121,"npmlog":133,"os":28,"path":29,"rimraf":147,"util":45}],115:[function(require,module,exports){
(function (process){
// try to find the most reasonable prefix to use

module.exports = findPrefix

var fs = require("graceful-fs")
  , path = require("path")
  , npm = require("../npm.js")

function findPrefix (p, cb_) {
  function cb (er, p) {
    process.nextTick(function () {
      cb_(er, p)
    })
  }

  p = path.resolve(p)
  // if there's no node_modules folder, then
  // walk up until we hopefully find one.
  // if none anywhere, then use cwd.
  var walkedUp = false
  while (path.basename(p) === "node_modules") {
    p = path.dirname(p)
    walkedUp = true
  }
  if (walkedUp) return cb(null, p)

  findPrefix_(p, p, cb)
}

function findPrefix_ (p, original, cb) {
  if (p === "/"
      || (process.platform === "win32" && p.match(/^[a-zA-Z]:(\\|\/)?$/))) {
    return cb(null, original)
  }
  fs.readdir(p, function (er, files) {
    // an error right away is a bad sign.
    // unless the prefix was simply a non
    // existent directory.
    if (er && p === original) {
      if (er.code === "ENOENT") return cb(null, original);
      return cb(er)
    }

    // walked up too high or something.
    if (er) return cb(null, original)

    if (files.indexOf("node_modules") !== -1
        || files.indexOf("package.json") !== -1) {
      return cb(null, p)
    }

    var d = path.dirname(p)
    if (d === p) return cb(null, original)

    return findPrefix_(d, original, cb)
  })
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"../npm.js":113,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"graceful-fs":121,"path":29}],116:[function(require,module,exports){

module.exports = exports = abbrev.abbrev = abbrev

abbrev.monkeyPatch = monkeyPatch

function monkeyPatch () {
  Object.defineProperty(Array.prototype, 'abbrev', {
    value: function () { return abbrev(this) },
    enumerable: false, configurable: true, writable: true
  })

  Object.defineProperty(Object.prototype, 'abbrev', {
    value: function () { return abbrev(Object.keys(this)) },
    enumerable: false, configurable: true, writable: true
  })
}

function abbrev (list) {
  if (arguments.length !== 1 || !Array.isArray(list)) {
    list = Array.prototype.slice.call(arguments, 0)
  }
  for (var i = 0, l = list.length, args = [] ; i < l ; i ++) {
    args[i] = typeof list[i] === "string" ? list[i] : String(list[i])
  }

  // sort them lexicographically, so that they're next to their nearest kin
  args = args.sort(lexSort)

  // walk through each, seeing how much it has in common with the next and previous
  var abbrevs = {}
    , prev = ""
  for (var i = 0, l = args.length ; i < l ; i ++) {
    var current = args[i]
      , next = args[i + 1] || ""
      , nextMatches = true
      , prevMatches = true
    if (current === next) continue
    for (var j = 0, cl = current.length ; j < cl ; j ++) {
      var curChar = current.charAt(j)
      nextMatches = nextMatches && curChar === next.charAt(j)
      prevMatches = prevMatches && curChar === prev.charAt(j)
      if (!nextMatches && !prevMatches) {
        j ++
        break
      }
    }
    prev = current
    if (j === cl) {
      abbrevs[current] = current
      continue
    }
    for (var a = current.substr(0, j) ; j <= cl ; j ++) {
      abbrevs[a] = current
      a += current.charAt(j)
    }
  }
  return abbrevs
}

function lexSort (a, b) {
  return a === b ? 0 : a > b ? 1 : -1
}


// tests
if (module === require.main) {

var assert = require("assert")
var util = require("util")

console.log("running tests")
function test (list, expect) {
  var actual = abbrev(list)
  assert.deepEqual(actual, expect,
    "abbrev("+util.inspect(list)+") === " + util.inspect(expect) + "\n"+
    "actual: "+util.inspect(actual))
  actual = abbrev.apply(exports, list)
  assert.deepEqual(abbrev.apply(exports, list), expect,
    "abbrev("+list.map(JSON.stringify).join(",")+") === " + util.inspect(expect) + "\n"+
    "actual: "+util.inspect(actual))
}

test([ "ruby", "ruby", "rules", "rules", "rules" ],
{ rub: 'ruby'
, ruby: 'ruby'
, rul: 'rules'
, rule: 'rules'
, rules: 'rules'
})
test(["fool", "foom", "pool", "pope"],
{ fool: 'fool'
, foom: 'foom'
, poo: 'pool'
, pool: 'pool'
, pop: 'pope'
, pope: 'pope'
})
test(["a", "ab", "abc", "abcd", "abcde", "acde"],
{ a: 'a'
, ab: 'ab'
, abc: 'abc'
, abcd: 'abcd'
, abcde: 'abcde'
, ac: 'acde'
, acd: 'acde'
, acde: 'acde'
})

console.log("pass")

}

},{"assert":7,"util":45}],117:[function(require,module,exports){

/**
 * References:
 *
 *   - http://en.wikipedia.org/wiki/ANSI_escape_code
 *   - http://www.termsys.demon.co.uk/vtansi.htm
 *
 */

/**
 * Module dependencies.
 */

var emitNewlineEvents = require('./newlines')
  , prefix = '\x1b[' // For all escape codes
  , suffix = 'm'     // Only for color codes

/**
 * The ANSI escape sequences.
 */

var codes = {
    up: 'A'
  , down: 'B'
  , forward: 'C'
  , back: 'D'
  , nextLine: 'E'
  , previousLine: 'F'
  , horizontalAbsolute: 'G'
  , eraseData: 'J'
  , eraseLine: 'K'
  , scrollUp: 'S'
  , scrollDown: 'T'
  , savePosition: 's'
  , restorePosition: 'u'
  , queryPosition: '6n'
  , hide: '?25l'
  , show: '?25h'
}

/**
 * Rendering ANSI codes.
 */

var styles = {
    bold: 1
  , italic: 3
  , underline: 4
  , inverse: 7
}

/**
 * The negating ANSI code for the rendering modes.
 */

var reset = {
    bold: 22
  , italic: 23
  , underline: 24
  , inverse: 27
}

/**
 * The standard, styleable ANSI colors.
 */

var colors = {
    white: 37
  , black: 30
  , blue: 34
  , cyan: 36
  , green: 32
  , magenta: 35
  , red: 31
  , yellow: 33
  , grey: 90
  , brightBlack: 90
  , brightRed: 91
  , brightGreen: 92
  , brightYellow: 93
  , brightBlue: 94
  , brightMagenta: 95
  , brightCyan: 96
  , brightWhite: 97
}


/**
 * Creates a Cursor instance based off the given `writable stream` instance.
 */

function ansi (stream, options) {
  if (stream._ansicursor) {
    return stream._ansicursor
  } else {
    return stream._ansicursor = new Cursor(stream, options)
  }
}
module.exports = exports = ansi

/**
 * The `Cursor` class.
 */

function Cursor (stream, options) {
  if (!(this instanceof Cursor)) {
    return new Cursor(stream, options)
  }
  if (typeof stream != 'object' || typeof stream.write != 'function') {
    throw new Error('a valid Stream instance must be passed in')
  }

  // the stream to use
  this.stream = stream

  // when 'enabled' is false then all the functions are no-ops except for write()
  this.enabled = options && options.enabled
  if (typeof this.enabled === 'undefined') {
    this.enabled = stream.isTTY
  }
  this.enabled = !!this.enabled

  // then `buffering` is true, then `write()` calls are buffered in
  // memory until `flush()` is invoked
  this.buffering = !!(options && options.buffering)
  this._buffer = []

  // controls the foreground and background colors
  this.fg = this.foreground = new Colorer(this, 0)
  this.bg = this.background = new Colorer(this, 10)

  // defaults
  this.Bold = false
  this.Italic = false
  this.Underline = false
  this.Inverse = false

  // keep track of the number of "newlines" that get encountered
  this.newlines = 0
  emitNewlineEvents(stream)
  stream.on('newline', function () {
    this.newlines++
  }.bind(this))
}
exports.Cursor = Cursor

/**
 * Helper function that calls `write()` on the underlying Stream.
 * Returns `this` instead of the write() return value to keep
 * the chaining going.
 */

Cursor.prototype.write = function (data) {
  if (this.buffering) {
    this._buffer.push(arguments)
  } else {
    this.stream.write.apply(this.stream, arguments)
  }
  return this
}

/**
 * Buffer `write()` calls into memory.
 *
 * @api public
 */

Cursor.prototype.buffer = function () {
  this.buffering = true
  return this
}

/**
 * Write out the in-memory buffer.
 *
 * @api public
 */

Cursor.prototype.flush = function () {
  this.buffering = false
  var str = this._buffer.map(function (args) {
    if (args.length != 1) throw new Error('unexpected args length! ' + args.length);
    return args[0];
  }).join('');
  this._buffer.splice(0); // empty
  this.write(str);
  return this
}


/**
 * The `Colorer` class manages both the background and foreground colors.
 */

function Colorer (cursor, base) {
  this.current = null
  this.cursor = cursor
  this.base = base
}
exports.Colorer = Colorer

/**
 * Write an ANSI color code, ensuring that the same code doesn't get rewritten.
 */

Colorer.prototype._setColorCode = function setColorCode (code) {
  var c = String(code)
  if (this.current === c) return
  this.cursor.enabled && this.cursor.write(prefix + c + suffix)
  this.current = c
  return this
}


/**
 * Set up the positional ANSI codes.
 */

Object.keys(codes).forEach(function (name) {
  var code = String(codes[name])
  Cursor.prototype[name] = function () {
    var c = code
    if (arguments.length > 0) {
      c = toArray(arguments).map(Math.round).join(';') + code
    }
    this.enabled && this.write(prefix + c)
    return this
  }
})

/**
 * Set up the functions for the rendering ANSI codes.
 */

Object.keys(styles).forEach(function (style) {
  var name = style[0].toUpperCase() + style.substring(1)
    , c = styles[style]
    , r = reset[style]

  Cursor.prototype[style] = function () {
    if (this[name]) return
    this.enabled && this.write(prefix + c + suffix)
    this[name] = true
    return this
  }

  Cursor.prototype['reset' + name] = function () {
    if (!this[name]) return
    this.enabled && this.write(prefix + r + suffix)
    this[name] = false
    return this
  }
})

/**
 * Setup the functions for the standard colors.
 */

Object.keys(colors).forEach(function (color) {
  var code = colors[color]

  Colorer.prototype[color] = function () {
    this._setColorCode(this.base + code)
    return this.cursor
  }

  Cursor.prototype[color] = function () {
    return this.foreground[color]()
  }
})

/**
 * Makes a beep sound!
 */

Cursor.prototype.beep = function () {
  this.enabled && this.write('\x07')
  return this
}

/**
 * Moves cursor to specific position
 */

Cursor.prototype.goto = function (x, y) {
  x = x | 0
  y = y | 0
  this.enabled && this.write(prefix + y + ';' + x + 'H')
  return this
}

/**
 * Resets the color.
 */

Colorer.prototype.reset = function () {
  this._setColorCode(this.base + 39)
  return this.cursor
}

/**
 * Resets all ANSI formatting on the stream.
 */

Cursor.prototype.reset = function () {
  this.enabled && this.write(prefix + '0' + suffix)
  this.Bold = false
  this.Italic = false
  this.Underline = false
  this.Inverse = false
  this.foreground.current = null
  this.background.current = null
  return this
}

/**
 * Sets the foreground color with the given RGB values.
 * The closest match out of the 216 colors is picked.
 */

Colorer.prototype.rgb = function (r, g, b) {
  var base = this.base + 38
    , code = rgb(r, g, b)
  this._setColorCode(base + ';5;' + code)
  return this.cursor
}

/**
 * Same as `cursor.fg.rgb(r, g, b)`.
 */

Cursor.prototype.rgb = function (r, g, b) {
  return this.foreground.rgb(r, g, b)
}

/**
 * Accepts CSS color codes for use with ANSI escape codes.
 * For example: `#FF000` would be bright red.
 */

Colorer.prototype.hex = function (color) {
  return this.rgb.apply(this, hex(color))
}

/**
 * Same as `cursor.fg.hex(color)`.
 */

Cursor.prototype.hex = function (color) {
  return this.foreground.hex(color)
}


// UTIL FUNCTIONS //

/**
 * Translates a 255 RGB value to a 0-5 ANSI RGV value,
 * then returns the single ANSI color code to use.
 */

function rgb (r, g, b) {
  var red = r / 255 * 5
    , green = g / 255 * 5
    , blue = b / 255 * 5
  return rgb5(red, green, blue)
}

/**
 * Turns rgb 0-5 values into a single ANSI color code to use.
 */

function rgb5 (r, g, b) {
  var red = Math.round(r)
    , green = Math.round(g)
    , blue = Math.round(b)
  return 16 + (red*36) + (green*6) + blue
}

/**
 * Accepts a hex CSS color code string (# is optional) and
 * translates it into an Array of 3 RGB 0-255 values, which
 * can then be used with rgb().
 */

function hex (color) {
  var c = color[0] === '#' ? color.substring(1) : color
    , r = c.substring(0, 2)
    , g = c.substring(2, 4)
    , b = c.substring(4, 6)
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
}

/**
 * Turns an array-like object into a real array.
 */

function toArray (a) {
  var i = 0
    , l = a.length
    , rtn = []
  for (; i<l; i++) {
    rtn.push(a[i])
  }
  return rtn
}

},{"./newlines":118}],118:[function(require,module,exports){

/**
 * Accepts any node Stream instance and hijacks its "write()" function,
 * so that it can count any newlines that get written to the output.
 *
 * When a '\n' byte is encountered, then a "newline" event will be emitted
 * on the stream, with no arguments. It is up to the listeners to determine
 * any necessary deltas required for their use-case.
 *
 * Ex:
 *
 *   var cursor = ansi(process.stdout)
 *     , ln = 0
 *   process.stdout.on('newline', function () {
 *    ln++
 *   })
 */

/**
 * Module dependencies.
 */

var assert = require('assert')
var NEWLINE = '\n'.charCodeAt(0)

function emitNewlineEvents (stream) {
  if (stream._emittingNewlines) {
    // already emitting newline events
    return
  }

  var write = stream.write

  stream.write = function (data) {
    // first write the data
    var rtn = write.apply(stream, arguments)

    if (stream.listeners('newline').length > 0) {
      var len = data.length
        , i = 0
      // now try to calculate any deltas
      if (typeof data == 'string') {
        for (; i<len; i++) {
          processByte(stream, data.charCodeAt(i))
        }
      } else {
        // buffer
        for (; i<len; i++) {
          processByte(stream, data[i])
        }
      }
    }

    return rtn
  }

  stream._emittingNewlines = true
}
module.exports = emitNewlineEvents


/**
 * Processes an individual byte being written to a stream
 */

function processByte (stream, b) {
  assert.equal(typeof b, 'number')
  if (b === NEWLINE) {
    stream.emit('newline')
  }
}

},{"assert":7}],119:[function(require,module,exports){
(function (process){

var child_process = require('child_process');

// Re-export the child_process module.
module.exports = child_process;

// Only node versions up to v0.7.6 need this hook.
if (!/^v0\.([0-6]\.|7\.[0-6](\D|$))/.test(process.version))
  return;

// Do not add the hook if already hooked.
if (child_process.hasOwnProperty('_exit_hook'))
  return;

// Version the hook in case there is ever the need to release a 0.2.0.
child_process._exit_hook = 1;


function hook(name) {
  var orig = child_process[name];

  // Older node versions may not have all functions, e.g. fork().
  if (!orig)
    return;

  // Store the unhooked version.
  child_process['_original_' + name] = orig;

  // Do the actual hooking.
  child_process[name] = function() {
    var child = orig.apply(this, arguments);

    child.once('exit', function(code, signal) {
      process.nextTick(function() {
        child.emit('close', code, signal);
      });
    });

    return child;
  }
}

hook('spawn');
hook('fork');
hook('execFile');

// Don't hook 'exec': it calls `exports.execFile` internally, so hooking it
// would trigger the close event twice.

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"child_process":"liyfGr"}],120:[function(require,module,exports){
(function (process){
var spawn = require('child_process').spawn;

module.exports = function (file, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    if (!opts) opts = {};
    
    var ed = /^win/.test(process.platform) ? 'notepad' : 'vim';
    var editor = opts.editor || process.env.VISUAL || process.env.EDITOR || ed;
    
    setRaw(true);
    var ps = spawn(editor, [ file ], { customFds : [ 0, 1, 2 ] });
    
    ps.on('exit', function (code, sig) {
        setRaw(false);
        process.stdin.pause();
        if (typeof cb === 'function') cb(code, sig)
    });
};

var tty = require('tty');
function setRaw (mode) {
    process.stdin.setRawMode ? process.stdin.setRawMode(mode) : tty.setRawMode(mode);
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"child_process":"liyfGr","tty":42}],121:[function(require,module,exports){
(function (process){
// Monkey-patching the fs module.
// It's ugly, but there is simply no other way to do this.
var fs = module.exports = require('fs')

var assert = require('assert')

// fix up some busted stuff, mostly on windows and old nodes
require('./polyfills.js')

// The EMFILE enqueuing stuff

var util = require('util')

function noop () {}

var debug = noop
var util = require('util')
if (util.debuglog)
  debug = util.debuglog('gfs')
else if (/\bgfs\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS: ' + m.split(/\n/).join('\nGFS: ')
    console.error(m)
  }

if (/\bgfs\b/i.test(process.env.NODE_DEBUG || '')) {
  process.on('exit', function() {
    debug('fds', fds)
    debug(queue)
    assert.equal(queue.length, 0)
  })
}


var originalOpen = fs.open
fs.open = open

function open(path, flags, mode, cb) {
  if (typeof mode === "function") cb = mode, mode = null
  if (typeof cb !== "function") cb = noop
  new OpenReq(path, flags, mode, cb)
}

function OpenReq(path, flags, mode, cb) {
  this.path = path
  this.flags = flags
  this.mode = mode
  this.cb = cb
  Req.call(this)
}

util.inherits(OpenReq, Req)

OpenReq.prototype.process = function() {
  originalOpen.call(fs, this.path, this.flags, this.mode, this.done)
}

var fds = {}
OpenReq.prototype.done = function(er, fd) {
  debug('open done', er, fd)
  if (fd)
    fds['fd' + fd] = this.path
  Req.prototype.done.call(this, er, fd)
}


var originalReaddir = fs.readdir
fs.readdir = readdir

function readdir(path, cb) {
  if (typeof cb !== "function") cb = noop
  new ReaddirReq(path, cb)
}

function ReaddirReq(path, cb) {
  this.path = path
  this.cb = cb
  Req.call(this)
}

util.inherits(ReaddirReq, Req)

ReaddirReq.prototype.process = function() {
  originalReaddir.call(fs, this.path, this.done)
}

ReaddirReq.prototype.done = function(er, files) {
  Req.prototype.done.call(this, er, files)
  onclose()
}


var originalClose = fs.close
fs.close = close

function close (fd, cb) {
  debug('close', fd)
  if (typeof cb !== "function") cb = noop
  delete fds['fd' + fd]
  originalClose.call(fs, fd, function(er) {
    onclose()
    cb(er)
  })
}


var originalCloseSync = fs.closeSync
fs.closeSync = closeSync

function closeSync (fd) {
  try {
    return originalCloseSync(fd)
  } finally {
    onclose()
  }
}


// Req class
function Req () {
  // start processing
  this.done = this.done.bind(this)
  this.failures = 0
  this.process()
}

Req.prototype.done = function (er, result) {
  var tryAgain = false
  if (er) {
    var code = er.code
    var tryAgain = code === "EMFILE"
    if (process.platform === "win32")
      tryAgain = tryAgain || code === "OK"
  }

  if (tryAgain) {
    this.failures ++
    enqueue(this)
  } else {
    var cb = this.cb
    cb(er, result)
  }
}

var queue = []

function enqueue(req) {
  queue.push(req)
  debug('enqueue %d %s', queue.length, req.constructor.name, req)
}

function onclose() {
  var req = queue.shift()
  if (req) {
    debug('process', req.constructor.name, req)
    req.process()
  }
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"./polyfills.js":122,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"assert":7,"fs":"liyfGr","util":45}],122:[function(require,module,exports){
(function (process){
var fs = require('fs')
var constants = require('constants')

var origCwd = process.cwd
var cwd = null
process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
var chdir = process.chdir
process.chdir = function(d) {
  cwd = null
  chdir.call(process, d)
}

// (re-)implement some things that are known busted or missing.

// lchmod, broken prior to 0.6.2
// back-port the fix here.
if (constants.hasOwnProperty('O_SYMLINK') &&
    process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
  fs.lchmod = function (path, mode, callback) {
    callback = callback || noop
    fs.open( path
           , constants.O_WRONLY | constants.O_SYMLINK
           , mode
           , function (err, fd) {
      if (err) {
        callback(err)
        return
      }
      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      fs.fchmod(fd, mode, function (err) {
        fs.close(fd, function(err2) {
          callback(err || err2)
        })
      })
    })
  }

  fs.lchmodSync = function (path, mode) {
    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

    // prefer to return the chmod error, if one occurs,
    // but still try to close, and report closing errors if they occur.
    var err, err2
    try {
      var ret = fs.fchmodSync(fd, mode)
    } catch (er) {
      err = er
    }
    try {
      fs.closeSync(fd)
    } catch (er) {
      err2 = er
    }
    if (err || err2) throw (err || err2)
    return ret
  }
}


// lutimes implementation, or no-op
if (!fs.lutimes) {
  if (constants.hasOwnProperty("O_SYMLINK")) {
    fs.lutimes = function (path, at, mt, cb) {
      fs.open(path, constants.O_SYMLINK, function (er, fd) {
        cb = cb || noop
        if (er) return cb(er)
        fs.futimes(fd, at, mt, function (er) {
          fs.close(fd, function (er2) {
            return cb(er || er2)
          })
        })
      })
    }

    fs.lutimesSync = function (path, at, mt) {
      var fd = fs.openSync(path, constants.O_SYMLINK)
        , err
        , err2
        , ret

      try {
        var ret = fs.futimesSync(fd, at, mt)
      } catch (er) {
        err = er
      }
      try {
        fs.closeSync(fd)
      } catch (er) {
        err2 = er
      }
      if (err || err2) throw (err || err2)
      return ret
    }

  } else if (fs.utimensat && constants.hasOwnProperty("AT_SYMLINK_NOFOLLOW")) {
    // maybe utimensat will be bound soonish?
    fs.lutimes = function (path, at, mt, cb) {
      fs.utimensat(path, at, mt, constants.AT_SYMLINK_NOFOLLOW, cb)
    }

    fs.lutimesSync = function (path, at, mt) {
      return fs.utimensatSync(path, at, mt, constants.AT_SYMLINK_NOFOLLOW)
    }

  } else {
    fs.lutimes = function (_a, _b, _c, cb) { process.nextTick(cb) }
    fs.lutimesSync = function () {}
  }
}


// https://github.com/isaacs/node-graceful-fs/issues/4
// Chown should not fail on einval or eperm if non-root.

fs.chown = chownFix(fs.chown)
fs.fchown = chownFix(fs.fchown)
fs.lchown = chownFix(fs.lchown)

fs.chownSync = chownFixSync(fs.chownSync)
fs.fchownSync = chownFixSync(fs.fchownSync)
fs.lchownSync = chownFixSync(fs.lchownSync)

function chownFix (orig) {
  if (!orig) return orig
  return function (target, uid, gid, cb) {
    return orig.call(fs, target, uid, gid, function (er, res) {
      if (chownErOk(er)) er = null
      cb(er, res)
    })
  }
}

function chownFixSync (orig) {
  if (!orig) return orig
  return function (target, uid, gid) {
    try {
      return orig.call(fs, target, uid, gid)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}

function chownErOk (er) {
  // if there's no getuid, or if getuid() is something other than 0,
  // and the error is EINVAL or EPERM, then just ignore it.
  // This specific case is a silent failure in cp, install, tar,
  // and most other unix tools that manage permissions.
  // When running as root, or if other types of errors are encountered,
  // then it's strict.
  if (!er || (!process.getuid || process.getuid() !== 0)
      && (er.code === "EINVAL" || er.code === "EPERM")) return true
}


// if lchmod/lchown do not exist, then make them no-ops
if (!fs.lchmod) {
  fs.lchmod = function (path, mode, cb) {
    process.nextTick(cb)
  }
  fs.lchmodSync = function () {}
}
if (!fs.lchown) {
  fs.lchown = function (path, uid, gid, cb) {
    process.nextTick(cb)
  }
  fs.lchownSync = function () {}
}



// on Windows, A/V software can lock the directory, causing this
// to fail with an EACCES or EPERM if the directory contains newly
// created files.  Try again on failure, for up to 1 second.
if (process.platform === "win32") {
  var rename_ = fs.rename
  fs.rename = function rename (from, to, cb) {
    var start = Date.now()
    rename_(from, to, function CB (er) {
      if (er
          && (er.code === "EACCES" || er.code === "EPERM")
          && Date.now() - start < 1000) {
        return rename_(from, to, CB)
      }
      cb(er)
    })
  }
}


// if read() returns EAGAIN, then just try it again.
var read = fs.read
fs.read = function (fd, buffer, offset, length, position, callback_) {
  var callback
  if (callback_ && typeof callback_ === 'function') {
    var eagCounter = 0
    callback = function (er, _, __) {
      if (er && er.code === 'EAGAIN' && eagCounter < 10) {
        eagCounter ++
        return read.call(fs, fd, buffer, offset, length, position, callback)
      }
      callback_.apply(this, arguments)
    }
  }
  return read.call(fs, fd, buffer, offset, length, position, callback)
}

var readSync = fs.readSync
fs.readSync = function (fd, buffer, offset, length, position) {
  var eagCounter = 0
  while (true) {
    try {
      return readSync.call(fs, fd, buffer, offset, length, position)
    } catch (er) {
      if (er.code === 'EAGAIN' && eagCounter < 10) {
        eagCounter ++
        continue
      }
      throw er
    }
  }
}


}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"constants":13,"fs":"liyfGr"}],123:[function(require,module,exports){
module.exports=require(26)
},{}],124:[function(require,module,exports){
(function (process){

exports.parse = exports.decode = decode
exports.stringify = exports.encode = encode

exports.safe = safe
exports.unsafe = unsafe

var eol = process.platform === "win32" ? "\r\n" : "\n"

function encode (obj, section) {
  var children = []
    , out = ""

  Object.keys(obj).forEach(function (k, _, __) {
    var val = obj[k]
    if (val && Array.isArray(val)) {
        val.forEach(function(item) {
            out += safe(k + "[]") + " = " + safe(item) + "\n"
        })
    }
    else if (val && typeof val === "object") {
      children.push(k)
    } else {
      out += safe(k) + " = " + safe(val) + eol
    }
  })

  if (section && out.length) {
    out = "[" + safe(section) + "]" + eol + out
  }

  children.forEach(function (k, _, __) {
    var nk = dotSplit(k).join('\\.')
    var child = encode(obj[k], (section ? section + "." : "") + nk)
    if (out.length && child.length) {
      out += eol
    }
    out += child
  })

  return out
}

function dotSplit (str) {
  return str.replace(/\1/g, '\2LITERAL\\1LITERAL\2')
         .replace(/\\\./g, '\1')
         .split(/\./).map(function (part) {
           return part.replace(/\1/g, '\\.')
                  .replace(/\2LITERAL\\1LITERAL\2/g, '\1')
         })
}

function decode (str) {
  var out = {}
    , p = out
    , section = null
    , state = "START"
           // section     |key = value
    , re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i
    , lines = str.split(/[\r\n]+/g)
    , section = null

  lines.forEach(function (line, _, __) {
    if (!line || line.match(/^\s*;/)) return
    var match = line.match(re)
    if (!match) return
    if (match[1] !== undefined) {
      section = unsafe(match[1])
      p = out[section] = out[section] || {}
      return
    }
    var key = unsafe(match[2])
      , value = match[3] ? unsafe((match[4] || "")) : true
    switch (value) {
      case 'true':
      case 'false':
      case 'null': value = JSON.parse(value)
    }

    // Convert keys with '[]' suffix to an array
    if (key.length > 2 && key.slice(-2) === "[]") {
        key = key.substring(0, key.length - 2)
        if (!p[key]) {
          p[key] = []
        }
        else if (!Array.isArray(p[key])) {
          p[key] = [p[key]]
        }
    }

    // safeguard against resetting a previously defined
    // array by accidentally forgetting the brackets
    if (Array.isArray(p[key])) {
      p[key].push(value)
    }
    else {
      p[key] = value
    }
  })

  // {a:{y:1},"a.b":{x:2}} --> {a:{y:1,b:{x:2}}}
  // use a filter to return the keys that have to be deleted.
  Object.keys(out).filter(function (k, _, __) {
    if (!out[k] || typeof out[k] !== "object" || Array.isArray(out[k])) return false
    // see if the parent section is also an object.
    // if so, add it to that, and mark this one for deletion
    var parts = dotSplit(k)
      , p = out
      , l = parts.pop()
      , nl = l.replace(/\\\./g, '.')
    parts.forEach(function (part, _, __) {
      if (!p[part] || typeof p[part] !== "object") p[part] = {}
      p = p[part]
    })
    if (p === out && nl === l) return false
    p[nl] = out[k]
    return true
  }).forEach(function (del, _, __) {
    delete out[del]
  })

  return out
}

function safe (val) {
  return ( typeof val !== "string"
         || val.match(/[\r\n]/)
         || val.match(/^\[/)
         || (val.length > 1
             && val.charAt(0) === "\""
             && val.slice(-1) === "\"")
         || val !== val.trim() )
         ? JSON.stringify(val)
         : val.replace(/;/g, '\\;')
}

function unsafe (val, doUnesc) {
  val = (val || "").trim()
  if (val.charAt(0) === "\"" && val.slice(-1) === "\"") {
    try { val = JSON.parse(val) } catch (_) {}
  } else {
    // walk the val to find the first not-escaped ; character
    var esc = false
    var unesc = "";
    for (var i = 0, l = val.length; i < l; i++) {
      var c = val.charAt(i)
      if (esc) {
        if (c === "\\" || c === ";")
          unesc += c
        else
          unesc += "\\" + c
        esc = false
      } else if (c === ";") {
        break
      } else if (c === "\\") {
        esc = true
      } else {
        unesc += c
      }
    }
    if (esc)
      unesc += "\\"
    return unesc
  }
  return val
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27}],125:[function(require,module,exports){
(function (process){
var path = require('path');
var fs = require('fs');

module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;

function mkdirP (p, mode, f, made) {
    if (typeof mode === 'function' || mode === undefined) {
        f = mode;
        mode = 0777 & (~process.umask());
    }
    if (!made) made = null;

    var cb = f || function () {};
    if (typeof mode === 'string') mode = parseInt(mode, 8);
    p = path.resolve(p);

    fs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirP(path.dirname(p), mode, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, mode, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                fs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

mkdirP.sync = function sync (p, mode, made) {
    if (mode === undefined) {
        mode = 0777 & (~process.umask());
    }
    if (!made) made = null;

    if (typeof mode === 'string') mode = parseInt(mode, 8);
    p = path.resolve(p);

    try {
        fs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = sync(path.dirname(p), mode, made);
                sync(p, mode, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = fs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"fs":"liyfGr","path":29}],126:[function(require,module,exports){
arguments[4][109][0].apply(exports,arguments)
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"abbrev":116,"assert":7,"path":29,"stream":35,"url":43,"util":45}],127:[function(require,module,exports){
(function (__dirname){
// utilities for working with the js-registry site.

module.exports = RegClient

var fs = require('fs')
, url = require('url')
, path = require('path')
, CouchLogin = require('couch-login')
, npmlog

try {
  npmlog = require("npmlog")
} catch (er) {
  npmlog = { error: noop, warn: noop, info: noop,
             verbose: noop, silly: noop, http: noop,
             pause: noop, resume: noop }
}

function noop () {}

function RegClient (conf) {
  // accept either a plain-jane object, or a npmconf object
  // with a "get" method.
  if (typeof conf.get !== 'function') {
    var data = conf
    conf = { get: function (k) { return data[k] }
           , set: function (k, v) { data[k] = v }
           , del: function (k) { delete data[k] } }
  }

  this.conf = conf

  // if provided, then the registry needs to be a url.
  // if it's not provided, then we're just using the cache only.
  var registry = conf.get('registry')
  if (registry) {
    registry = url.parse(registry)
    if (!registry.protocol) throw new Error(
      'Invalid registry: ' + registry.url)
    registry = registry.href
    if (registry.slice(-1) !== '/') {
      registry += '/'
    }
    this.conf.set('registry', registry)
  } else {
    registry = null
  }

  if (!conf.get('cache')) throw new Error("Cache dir is required")

  var auth = this.conf.get('_auth')
  var alwaysAuth = this.conf.get('always-auth')
  if (auth && !alwaysAuth && registry) {
    // if we're always authing, then we just send the
    // user/pass on every thing.  otherwise, create a
    // session, and use that.
    var token = this.conf.get('_token')
    this.couchLogin = new CouchLogin(registry, token)
    this.couchLogin.proxy = this.conf.get('proxy')
    this.couchLogin.strictSSL = this.conf.get('strict-ssl')
    this.couchLogin.ca = this.conf.get('ca')
    this.couchLogin.cert = this.conf.get('cert')
    this.couchLogin.key = this.conf.get('key')
  }

  this.log = conf.log || conf.get('log') || npmlog
}

require('fs').readdirSync(__dirname + "/lib").forEach(function (f) {
  if (!f.match(/\.js$/)) return
  RegClient.prototype[f.replace(/\.js$/, '')] = require('./lib/' + f)
})

}).call(this,"/node_modules/dat-transformer/node_modules/npm-installer/node_modules/npm/node_modules/npm-registry-client")
},{"couch-login":128,"fs":"liyfGr","npmlog":133,"path":29,"url":43}],128:[function(require,module,exports){
(function (process,Buffer){
var request = require('request')
, url = require('url')
, crypto = require('crypto')
, YEAR = (1000 * 60 * 60 * 24 * 365)
, BASIC = {}
, assert = require('assert')

module.exports = CouchLogin

function CouchLogin (couch, tok) {
  if (!(this instanceof CouchLogin)) {
    return new CouchLogin(couch)
  }

  if (!couch) throw new Error(
    "Need to pass a couch url to CouchLogin constructor")

  if (couch instanceof CouchLogin)
    couch = couch.couch

  couch = url.parse(couch)
  if (couch.auth) {
    var a = couch.auth.split(':')
    var name = a.shift()
    var password = a.join(':')
    this.name = name
    if (password)
      this.auth = new Buffer(name + ':' + password).toString('base64')
  } else {
    this.auth = null
    this.name = null
  }
  delete couch.auth

  if (tok === 'anonymous')
    tok = NaN
  else if (tok === 'basic')
    tok = BASIC

  // ensure that couch url ends with a slash
  couch.pathname = couch.pathname.replace(/\/?$/, '/');

  this.token = tok
  this.couch = url.format(couch)
  this.proxy = null

  this.maxAge = YEAR

  // replace with a CA cert string, or an array, or leave as null
  // to use the defaults included in node.  Only relevant for HTTPS
  // couches, of course.
  this.ca = null

  // replace these with client certificate and private key if required by
  // the server.  Only relevant for HTTPS couches.  These are passed to 
  // the request and then on to https and tls as-is.
  this.cert = null
  this.key = null

  // set to boolean true or false to specify the strictSSL behavior.
  // if left as null, then it'll use whatever node defaults to, which
  // is false <=0.8.x, and true >=0.9.x
  //
  // Again, only relevant for https couches, of course.
  this.strictSSL = null
}

CouchLogin.prototype =
{ get: makeReq('GET')
, del: makeReq('DELETE')
, put: makeReq('PUT', true)
, post: makeReq('POST', true)
, login: login
, logout: logout
, decorate: decorate
, changePass: changePass
, signup: signup
, deleteAccount: deleteAccount
, anon: anon
, anonymous: anon
, valid: valid
}

Object.defineProperty(CouchLogin.prototype, 'constructor',
  { value: CouchLogin, enumerable: false })

function decorate (req, res) {
  assert(this instanceof CouchLogin)
  req.couch = res.couch = this

  // backed by some sort of set(k,v,cb), get(k,cb) session storage.
  var session = req.session || res.session || null
  if (session) {
    this.tokenGet = function (cb) {
      session.get('couch_token', cb)
    }

    // don't worry about it failing.  it'll just mean a login next time.
    this.tokenSet = function (tok, cb) {
      session.set('couch_token', tok, cb || function () {})
    }

    this.tokenDel = function (cb) {
      session.del('couch_token', cb || function () {})
    }
  }

  return this
}

function anon () {
  assert(this instanceof CouchLogin)
  return new CouchLogin(this.couch, NaN)
}

function makeReq (meth, body, f) { return function madeReq (p, d, cb) {
  assert(this instanceof CouchLogin)
  f = f || (this.token !== this.token)
  if (!f && !valid(this.token)) {
    // lazily get the token.
    if (this.tokenGet) return this.tokenGet(function (er, tok) {
      if (er || !valid(tok)) {
        if (!body) cb = d, d = null
        return cb(new Error('auth token expired or invalid'))
      }
      this.token = tok
      return madeReq.call(this, p, d, cb)
    }.bind(this))

    // no getter, no token, no business.
    return process.nextTick(function () {
      if (!body) cb = d, d = null
      cb(new Error('auth token expired or invalid'))
    })
  }

  if (!body) cb = d, d = null

  var h = {}
  , u = url.resolve(this.couch, p.replace(/^\//, ''))
  , req = { uri: u, headers: h, json: true, body: d, method: meth }

  if (this.token === BASIC) {
    if (!this.auth)
      return process.nextTick(cb.bind(this, new Error(
        'Using basic auth and no auth provided')))
    else
      h.authorization = 'Basic ' + this.auth
  } else if (this.token) {
    h.cookie = 'AuthSession=' + this.token.AuthSession
  }

  if (this.proxy) {
    req.proxy = this.proxy
  }

  // we're handling cookies, don't do it for us.
  req.jar = false

  if (this.ca)
    req.ca = this.ca
  
  if (this.cert)
    req.cert = this.cert
  if (this.key)
    req.key = this.key

  if (typeof this.strictSSL === 'boolean')
    req.strictSSL = req.rejectUnauthorized = this.strictSSL

  request(req, function (er, res, data) {
    // update cookie.
    if (er || res.statusCode !== 200) return cb(er, res, data)
    addToken.call(this, res)
    return cb.call(this, er, res, data)
  }.bind(this))
}}

function login (auth, cb) {
  assert(this instanceof CouchLogin)
  if (this.token === BASIC) {
    this.auth = new Buffer(auth.name + ':' + auth.password).toString('base64')
    this.name = auth.name
    cb = cb.bind(this, null, { statusCode: 200 }, { ok: true })
    return process.nextTick(cb)
  }
  var a = { name: auth.name, password: auth.password }
  var req = makeReq('post', true, true)
  req.call(this, '/_session', a, function (er, cr, data) {
    if (er || (cr && cr.statusCode >= 400))
      return cb(er, cr, data)
    this.name = auth.name
    cb(er, cr, data)
  }.bind(this))
}

function changePass (auth, cb) {
  assert(this instanceof CouchLogin)
  if (!auth.name || !auth.password) return cb(new Error('invalid auth'))

  var u = '/_users/org.couchdb.user:' + auth.name
  this.get(u, function (er, res, data) {
    if (er || res.statusCode !== 200) return cb(er, res, data)

    // copy any other keys we're setting here.
    // note that name, password_sha, salt, and date
    // are all set explicitly below.
    Object.keys(auth).filter(function (k) {
      return k.charAt(0) !== '_'
          && k !== 'password'
          && k !== 'password_sha'
          && k !== 'salt'
    }).forEach(function (k) {
      data[k] = auth[k]
    })

    var newSalt = crypto.randomBytes(30).toString('hex')
    , newPass = auth.password
    , newSha = sha(newPass + newSalt)

    data.password_sha = newSha
    data.salt = newSalt
    data.date = new Date().toISOString()

    this.put(u + '?rev=' + data._rev, data, function (er, res, data) {
      if (er || res.statusCode >= 400)
        return cb(er, res, data)
      if (this.name && this.name !== auth.name)
        return cb(er, res, data)
      return this.login(auth, cb)
    }.bind(this))
  }.bind(this))
}

// They said that there should probably be a warning before
// deleting the user's whole account, so here it is:
//
// WATCH OUT!
function deleteAccount (name, cb) {
  assert(this instanceof CouchLogin)
  var u = '/_users/org.couchdb.user:' + name
  this.get(u, thenPut.bind(this))

  function thenPut (er, res, data) {
    if (er || res.statusCode !== 200) {
      return cb(er, res, data)
    }

    // user accts can't be just DELETE'd by non-admins
    // so we take the existing doc and just slap a _deleted
    // flag on it to fake it.  Works the same either way
    // in couch.
    data._deleted = true
    this.put(u + '?rev=' + data._rev, data, cb)
  }
}



function signup (auth, cb) {
  assert(this instanceof CouchLogin)
  if (this.token && this.token !== BASIC) {

    return this.logout(function (er, res, data) {
      if (er || res && res.statusCode !== 200) {
        return cb(er, res, data)
      }

      if (this.token) {
        return cb(new Error('failed to delete token'), res, data)
      }

      this.signup(auth, cb)
    }.bind(this))
  }

  // make a new user record.
  var newSalt = crypto.randomBytes(30).toString('hex')
  , newSha = sha(auth.password + newSalt)
  , user = { _id: 'org.couchdb.user:' + auth.name
           , name: auth.name
           , roles: []
           , type: 'user'
           , password_sha: newSha
           , salt: newSalt
           , date: new Date().toISOString() }

  Object.keys(auth).forEach(function (k) {
    if (k === 'name' || k === 'password') return
    user[k] = auth[k]
  })

  var u = '/_users/' + user._id
  makeReq('put', true, true).call(this, u, user, function (er, res, data) {
    if (er || res.statusCode >= 400) {
      return cb(er, res, data)
    }

    // it worked! log in as that user and get their record
    this.login(auth, function (er, res, data) {
      if (er || (res && res.statusCode >= 400) || data && data.error) {
        return cb(er, res, data)
      }
      this.get(u, cb)
    }.bind(this))
  }.bind(this))
}

function addToken (res) {
  assert(this instanceof CouchLogin)
  // not doing the whole login session cookie thing.
  if (this.token === BASIC)
    return

  // attach the token, if a new one was provided.
  var sc = res.headers['set-cookie']
  if (!sc) return
  if (!Array.isArray(sc)) sc = [sc]

  sc = sc.filter(function (c) {
    return c.match(/^AuthSession=/)
  })[0]

  if (!sc.length) return

  sc = sc.split(/\s*;\s*/).map(function (p) {
    return p.split('=')
  }).reduce(function (set, p) {
    var k = p[0] === 'AuthSession' ? p[0] : p[0].toLowerCase()
    , v = k === 'expires' ? Date.parse(p[1])
        : p[1] === '' || p[1] === undefined ? true // HttpOnly
        : p[1]
    set[k] = v
    return set
  }, {})

  if (sc.hasOwnProperty('max-age')) {
    var ma = sc['max-age']
    sc.expires = (ma <= 0) ? 0 : Date.now() + (ma * 1000)
    delete sc['max-age']
  }

  // expire the session after 1 year, even if couch won't.
  if (!sc.hasOwnProperty('expires')) {
    sc.expires = Date.now() + YEAR
  }

  if (!isNaN(this.maxAge)) {
    sc.expires = Math.min(sc.expires, Date.now() + this.maxAge)
  }

  this.token = sc
  if (this.tokenSet) this.tokenSet(this.token)
}


function logout (cb) {
  assert(this instanceof CouchLogin)
  if (!this.token && this.tokenGet) {
    return this.tokenGet(function (er, tok) {
      if (er || !tok)
        return cb(null, { statusCode: 200 }, {})
      this.token = tok
      this.logout(cb)
    }.bind(this))
  }

  if (!valid(this.token)) {
    this.token = null
    if (this.tokenDel) this.tokenDel()
    return process.nextTick(cb.bind(this, null, { statusCode: 200 }, {}))
  }

  var h = { cookie: 'AuthSession=' + this.token.AuthSession }
  , u = url.resolve(this.couch, '_session')
  , req = { uri: u, headers: h, json: true }

  request.del(req, function (er, res, data) {
    if (er || (res.statusCode !== 200 && res.statusCode !== 404)) {
      return cb(er, res, data)
    }

    this.token = null
    if (this.tokenDel)
      this.tokenDel()
    cb(er, res, data)
  }.bind(this))
}

function valid (token) {
  if (token === BASIC) return true
  if (!token) return false
  if (!token.hasOwnProperty('expires')) return true
  return token.expires > Date.now()
}

function sha (s) {
  return crypto.createHash("sha1").update(s).digest("hex")
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),require("buffer").Buffer)
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"assert":7,"buffer":10,"crypto":15,"request":136,"url":43}],129:[function(require,module,exports){
(function (process){
// defaults, types, and shorthands.


var path = require("path")
  , url = require("url")
  , Stream = require("stream").Stream
  , semver = require("semver")
  , stableFamily = semver.parse(process.version)
  , nopt = require("nopt")
  , os = require('os')
  , osenv = require("osenv")

try {
  var log = require("npmlog")
} catch (er) {
  var util = require('util')
  var log = { warn: function (m) {
    console.warn(m + util.format.apply(util, [].slice.call(arguments, 1)))
  } }
}

exports.Octal = Octal
function Octal () {}
function validateOctal (data, k, val) {
  // must be either an integer or an octal string.
  if (typeof val === "number") {
    data[k] = val
    return true
  }

  if (typeof val === "string") {
    if (val.charAt(0) !== "0" || isNaN(val)) return false
    data[k] = parseInt(val, 8).toString(8)
  }
}

function validateSemver (data, k, val) {
  if (!semver.valid(val)) return false
  data[k] = semver.valid(val)
}

function validateStream (data, k, val) {
  if (!(val instanceof Stream)) return false
  data[k] = val
}

nopt.typeDefs.semver = { type: semver, validate: validateSemver }
nopt.typeDefs.Octal = { type: Octal, validate: validateOctal }
nopt.typeDefs.Stream = { type: Stream, validate: validateStream }

nopt.invalidHandler = function (k, val, type, data) {
  log.warn("invalid config", k + "=" + JSON.stringify(val))

  if (Array.isArray(type)) {
    if (type.indexOf(url) !== -1) type = url
    else if (type.indexOf(path) !== -1) type = path
  }

  switch (type) {
    case Octal:
      log.warn("invalid config", "Must be octal number, starting with 0")
      break
    case url:
      log.warn("invalid config", "Must be a full url with 'http://'")
      break
    case path:
      log.warn("invalid config", "Must be a valid filesystem path")
      break
    case Number:
      log.warn("invalid config", "Must be a numeric value")
      break
    case Stream:
      log.warn("invalid config", "Must be an instance of the Stream class")
      break
  }
}

if (!stableFamily || (+stableFamily.minor % 2)) stableFamily = null
else stableFamily = stableFamily.major + "." + stableFamily.minor

var defaults

var temp = osenv.tmpdir()
var home = osenv.home()

var uidOrPid = process.getuid ? process.getuid() : process.pid

if (home) process.env.HOME = home
else home = path.resolve(temp, "npm-" + uidOrPid)

var cacheExtra = process.platform === "win32" ? "npm-cache" : ".npm"
var cacheRoot = process.platform === "win32" && process.env.APPDATA || home
var cache = path.resolve(cacheRoot, cacheExtra)


var globalPrefix
Object.defineProperty(exports, "defaults", {get: function () {
  if (defaults) return defaults

  if (process.env.PREFIX) {
    globalPrefix = process.env.PREFIX
  } else if (process.platform === "win32") {
    // c:\node\node.exe --> prefix=c:\node\
    globalPrefix = path.dirname(process.execPath)
  } else {
    // /usr/local/bin/node --> prefix=/usr/local
    globalPrefix = path.dirname(path.dirname(process.execPath))

    // destdir only is respected on Unix
    if (process.env.DESTDIR) {
      globalPrefix = path.join(process.env.DESTDIR, globalPrefix)
    }
  }

  return defaults =
    { "always-auth" : false
    , "bin-links" : true
    , browser : null

    , ca: null

    , cache : cache

    , "cache-lock-stale": 60000
    , "cache-lock-retries": 10
    , "cache-lock-wait": 10000

    , "cache-max": Infinity
    , "cache-min": 10

    , cert: null

    , color : true
    , depth: Infinity
    , description : true
    , dev : false
    , editor : osenv.editor()
    , email: ""
    , "engine-strict": false
    , force : false

    , "fetch-retries": 2
    , "fetch-retry-factor": 10
    , "fetch-retry-mintimeout": 10000
    , "fetch-retry-maxtimeout": 60000

    , git: "git"
    , "git-tag-version": true

    , global : false
    , globalconfig : path.resolve(globalPrefix, "etc", "npmrc")
    , group : process.platform === "win32" ? 0
            : process.env.SUDO_GID || (process.getgid && process.getgid())
    , heading: "npm"
    , "ignore-scripts": false
    , "init-module": path.resolve(home, '.npm-init.js')
    , "init.author.name" : ""
    , "init.author.email" : ""
    , "init.author.url" : ""
    , "init.license": "ISC"
    , json: false
    , key: null
    , link: false
    , "local-address" : undefined
    , loglevel : "http"
    , logstream : process.stderr
    , long : false
    , message : "%s"
    , "node-version" : process.version
    , npat : false
    , "onload-script" : false
    , optional: true
    , parseable : false
    , prefix : globalPrefix
    , production: process.env.NODE_ENV === "production"
    , "proprietary-attribs": true
    , proxy : process.env.HTTP_PROXY || process.env.http_proxy || null
    , "https-proxy" : process.env.HTTPS_PROXY || process.env.https_proxy ||
                      process.env.HTTP_PROXY || process.env.http_proxy || null
    , "user-agent" : "node/" + process.version
                     + ' ' + process.platform
                     + ' ' + process.arch
    , "rebuild-bundle" : true
    , registry : "https://registry.npmjs.org/"
    , rollback : true
    , save : false
    , "save-bundle": false
    , "save-dev" : false
    , "save-optional" : false
    , searchopts: ""
    , searchexclude: null
    , searchsort: "name"
    , shell : osenv.shell()
    , shrinkwrap: true
    , "sign-git-tag": false
    , "strict-ssl": true
    , tag : "latest"
    , tmp : temp
    , unicode : true
    , "unsafe-perm" : process.platform === "win32"
                    || process.platform === "cygwin"
                    || !( process.getuid && process.setuid
                       && process.getgid && process.setgid )
                    || process.getuid() !== 0
    , usage : false
    , user : process.platform === "win32" ? 0 : "nobody"
    , username : ""
    , userconfig : path.resolve(home, ".npmrc")
    , umask: 022
    , version : false
    , versions : false
    , viewer: process.platform === "win32" ? "browser" : "man"

    , _exit : true
    }
}})

exports.types =
  { "always-auth" : Boolean
  , "bin-links": Boolean
  , browser : [null, String]
  , ca: [null, String, Array]
  , cache : path
  , "cache-lock-stale": Number
  , "cache-lock-retries": Number
  , "cache-lock-wait": Number
  , "cache-max": Number
  , "cache-min": Number
  , cert: [null, String]
  , color : ["always", Boolean]
  , depth : Number
  , description : Boolean
  , dev : Boolean
  , editor : String
  , email: [null, String]
  , "engine-strict": Boolean
  , force : Boolean
  , "fetch-retries": Number
  , "fetch-retry-factor": Number
  , "fetch-retry-mintimeout": Number
  , "fetch-retry-maxtimeout": Number
  , git: String
  , "git-tag-version": Boolean
  , global : Boolean
  , globalconfig : path
  , group : [Number, String]
  , "https-proxy" : [null, url]
  , "user-agent" : String
  , "heading": String
  , "ignore-scripts": Boolean
  , "init-module": path
  , "init.author.name" : String
  , "init.author.email" : String
  , "init.author.url" : ["", url]
  , "init.license": String
  , json: Boolean
  , key: [null, String]
  , link: Boolean
  // local-address must be listed as an IP for a local network interface
  // must be IPv4 due to node bug
  , "local-address" : Object.keys(os.networkInterfaces()).map(function (nic) {
                   return os.networkInterfaces()[nic].filter(function (addr) {
                    return addr.family === "IPv4"
                   })
                   .map(function (addr) {
                     return addr.address
                   })
                 }).reduce(function (curr, next) {
                  return curr.concat(next)
                 }, [])
  , loglevel : ["silent","win","error","warn","http","info","verbose","silly"]
  , logstream : Stream
  , long : Boolean
  , message: String
  , "node-version" : [null, semver]
  , npat : Boolean
  , "onload-script" : [null, String]
  , optional: Boolean
  , parseable : Boolean
  , prefix: path
  , production: Boolean
  , "proprietary-attribs": Boolean
  , proxy : [null, url]
  , "rebuild-bundle" : Boolean
  , registry : [null, url]
  , rollback : Boolean
  , save : Boolean
  , "save-bundle": Boolean
  , "save-dev" : Boolean
  , "save-optional" : Boolean
  , searchopts : String
  , searchexclude: [null, String]
  , searchsort: [ "name", "-name"
                , "description", "-description"
                , "author", "-author"
                , "date", "-date"
                , "keywords", "-keywords" ]
  , shell : String
  , shrinkwrap: Boolean
  , "sign-git-tag": Boolean
  , "strict-ssl": Boolean
  , tag : String
  , tmp : path
  , unicode : Boolean
  , "unsafe-perm" : Boolean
  , usage : Boolean
  , user : [Number, String]
  , username : String
  , userconfig : path
  , umask: Octal
  , version : Boolean
  , versions : Boolean
  , viewer: String
  , _exit : Boolean
  , _password: String
  }

exports.shorthands =
  { s : ["--loglevel", "silent"]
  , d : ["--loglevel", "info"]
  , dd : ["--loglevel", "verbose"]
  , ddd : ["--loglevel", "silly"]
  , noreg : ["--no-registry"]
  , N : ["--no-registry"]
  , reg : ["--registry"]
  , "no-reg" : ["--no-registry"]
  , silent : ["--loglevel", "silent"]
  , verbose : ["--loglevel", "verbose"]
  , quiet: ["--loglevel", "warn"]
  , q: ["--loglevel", "warn"]
  , h : ["--usage"]
  , H : ["--usage"]
  , "?" : ["--usage"]
  , help : ["--usage"]
  , v : ["--version"]
  , f : ["--force"]
  , gangster : ["--force"]
  , gangsta : ["--force"]
  , desc : ["--description"]
  , "no-desc" : ["--no-description"]
  , "local" : ["--no-global"]
  , l : ["--long"]
  , m : ["--message"]
  , p : ["--parseable"]
  , porcelain : ["--parseable"]
  , g : ["--global"]
  , S : ["--save"]
  , D : ["--save-dev"]
  , O : ["--save-optional"]
  , y : ["--yes"]
  , n : ["--no-yes"]
  , B : ["--save-bundle"]
  }

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"nopt":126,"npmlog":133,"os":28,"osenv":135,"path":29,"semver":148,"stream":35,"url":43,"util":45}],130:[function(require,module,exports){
(function (process,Buffer,__dirname){
var ProtoList = require('proto-list')
  , path = require('path')
  , fs = require('fs')
  , ini = require('ini')
  , EE = require('events').EventEmitter
  , url = require('url')
  , http = require('http')

var exports = module.exports = function () {
  var args = [].slice.call(arguments)
    , conf = new ConfigChain()

  while(args.length) {
    var a = args.shift()
    if(a) conf.push
          ( 'string' === typeof a
            ? json(a)
            : a )
  }

  return conf
}

//recursively find a file...

var find = exports.find = function () {
  var rel = path.join.apply(null, [].slice.call(arguments))

  function find(start, rel) {
    var file = path.join(start, rel)
    try {
      fs.statSync(file)
      return file
    } catch (err) {
      if(path.dirname(start) !== start) // root
        return find(path.dirname(start), rel)
    }
  }
  return find(__dirname, rel)
}

var parse = exports.parse = function (content, file, type) {
  content = '' + content
  // if we don't know what it is, try json and fall back to ini
  // if we know what it is, then it must be that.
  if (!type) {
    try { return JSON.parse(content) }
    catch (er) { return ini.parse(content) }
  } else if (type === 'json') {
    if (this.emit) {
      try { return JSON.parse(content) }
      catch (er) { this.emit('error', er) }
    } else {
      return JSON.parse(content)
    }
  } else {
    return ini.parse(content)
  }
}

var json = exports.json = function () {
  var args = [].slice.call(arguments).filter(function (arg) { return arg != null })
  var file = path.join.apply(null, args)
  var content
  try {
    content = fs.readFileSync(file,'utf-8')
  } catch (err) {
    return
  }
  return parse(content, file, 'json')
}

var env = exports.env = function (prefix, env) {
  env = env || process.env
  var obj = {}
  var l = prefix.length
  for(var k in env) {
    if(k.indexOf(prefix) === 0)
      obj[k.substring(l)] = env[k]
  }

  return obj
}

exports.ConfigChain = ConfigChain
function ConfigChain () {
  EE.apply(this)
  ProtoList.apply(this, arguments)
  this._awaiting = 0
  this._saving = 0
  this.sources = {}
}

// multi-inheritance-ish
var extras = {
  constructor: { value: ConfigChain }
}
Object.keys(EE.prototype).forEach(function (k) {
  extras[k] = Object.getOwnPropertyDescriptor(EE.prototype, k)
})
ConfigChain.prototype = Object.create(ProtoList.prototype, extras)

ConfigChain.prototype.del = function (key, where) {
  // if not specified where, then delete from the whole chain, scorched
  // earth style
  if (where) {
    var target = this.sources[where]
    target = target && target.data
    if (!target) {
      return this.emit('error', new Error('not found '+where))
    }
    delete target[key]
  } else {
    for (var i = 0, l = this.list.length; i < l; i ++) {
      delete this.list[i][key]
    }
  }
  return this
}

ConfigChain.prototype.set = function (key, value, where) {
  var target

  if (where) {
    target = this.sources[where]
    target = target && target.data
    if (!target) {
      return this.emit('error', new Error('not found '+where))
    }
  } else {
    target = this.list[0]
    if (!target) {
      return this.emit('error', new Error('cannot set, no confs!'))
    }
  }
  target[key] = value
  return this
}

ConfigChain.prototype.get = function (key, where) {
  if (where) {
    where = this.sources[where]
    if (where) where = where.data
    if (where && Object.hasOwnProperty.call(where, key)) return where[key]
    return undefined
  }
  return this.list[0][key]
}

ConfigChain.prototype.save = function (where, type, cb) {
  if (typeof type === 'function') cb = type, type = null
  var target = this.sources[where]
  if (!target || !(target.path || target.source) || !target.data) {
    // TODO: maybe save() to a url target could be a PUT or something?
    // would be easy to swap out with a reddis type thing, too
    return this.emit('error', new Error('bad save target: '+where))
  }

  if (target.source) {
    var pref = target.prefix || ''
    Object.keys(target.data).forEach(function (k) {
      target.source[pref + k] = target.data[k]
    })
    return this
  }

  var type = type || target.type
  var data = target.data
  if (target.type === 'json') {
    data = JSON.stringify(data)
  } else {
    data = ini.stringify(data)
  }

  this._saving ++
  fs.writeFile(target.path, data, 'utf8', function (er) {
    this._saving --
    if (er) {
      if (cb) return cb(er)
      else return this.emit('error', er)
    }
    if (this._saving === 0) {
      if (cb) cb()
      this.emit('save')
    }
  }.bind(this))
  return this
}

ConfigChain.prototype.addFile = function (file, type, name) {
  name = name || file
  var marker = {__source__:name}
  this.sources[name] = { path: file, type: type }
  this.push(marker)
  this._await()
  fs.readFile(file, 'utf8', function (er, data) {
    if (er) this.emit('error', er)
    this.addString(data, file, type, marker)
  }.bind(this))
  return this
}

ConfigChain.prototype.addEnv = function (prefix, env, name) {
  name = name || 'env'
  var data = exports.env(prefix, env)
  this.sources[name] = { data: data, source: env, prefix: prefix }
  return this.add(data, name)
}

ConfigChain.prototype.addUrl = function (req, type, name) {
  this._await()
  var href = url.format(req)
  name = name || href
  var marker = {__source__:name}
  this.sources[name] = { href: href, type: type }
  this.push(marker)
  http.request(req, function (res) {
    var c = []
    var ct = res.headers['content-type']
    if (!type) {
      type = ct.indexOf('json') !== -1 ? 'json'
           : ct.indexOf('ini') !== -1 ? 'ini'
           : href.match(/\.json$/) ? 'json'
           : href.match(/\.ini$/) ? 'ini'
           : null
      marker.type = type
    }

    res.on('data', c.push.bind(c))
    .on('end', function () {
      this.addString(Buffer.concat(c), href, type, marker)
    }.bind(this))
    .on('error', this.emit.bind(this, 'error'))

  }.bind(this))
  .on('error', this.emit.bind(this, 'error'))
  .end()

  return this
}

ConfigChain.prototype.addString = function (data, file, type, marker) {
  data = this.parse(data, file, type)
  this.add(data, marker)
  return this
}

ConfigChain.prototype.add = function (data, marker) {
  if (marker && typeof marker === 'object') {
    var i = this.list.indexOf(marker)
    if (i === -1) {
      return this.emit('error', new Error('bad marker'))
    }
    this.splice(i, 1, data)
    marker = marker.__source__
    this.sources[marker] = this.sources[marker] || {}
    this.sources[marker].data = data
    // we were waiting for this.  maybe emit 'load'
    this._resolve()
  } else {
    if (typeof marker === 'string') {
      this.sources[marker] = this.sources[marker] || {}
      this.sources[marker].data = data
    }
    // trigger the load event if nothing was already going to do so.
    this._await()
    this.push(data)
    process.nextTick(this._resolve.bind(this))
  }
  return this
}

ConfigChain.prototype.parse = exports.parse

ConfigChain.prototype._await = function () {
  this._awaiting++
}

ConfigChain.prototype._resolve = function () {
  this._awaiting--
  if (this._awaiting === 0) this.emit('load', this)
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),require("buffer").Buffer,"/node_modules/dat-transformer/node_modules/npm-installer/node_modules/npm/node_modules/npmconf/node_modules/config-chain")
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"buffer":10,"events":20,"fs":"liyfGr","http":21,"ini":124,"path":29,"proto-list":131,"url":43}],131:[function(require,module,exports){

module.exports = ProtoList

function ProtoList () {
  this.list = []
  var root = null
  Object.defineProperty(this, 'root', {
    get: function () { return root },
    set: function (r) {
      root = r
      if (this.list.length) {
        this.list[this.list.length - 1].__proto__ = r
      }
    },
    enumerable: true,
    configurable: true
  })
}

ProtoList.prototype =
  { get length () { return this.list.length }
  , get keys () {
      var k = []
      for (var i in this.list[0]) k.push(i)
      return k
    }
  , get snapshot () {
      var o = {}
      this.keys.forEach(function (k) { o[k] = this.get(k) }, this)
      return o
    }
  , get store () {
      return this.list[0]
    }
  , push : function (obj) {
      if (typeof obj !== "object") obj = {valueOf:obj}
      if (this.list.length >= 1) {
        this.list[this.list.length - 1].__proto__ = obj
      }
      obj.__proto__ = this.root
      return this.list.push(obj)
    }
  , pop : function () {
      if (this.list.length >= 2) {
        this.list[this.list.length - 2].__proto__ = this.root
      }
      return this.list.pop()
    }
  , unshift : function (obj) {
      obj.__proto__ = this.list[0] || this.root
      return this.list.unshift(obj)
    }
  , shift : function () {
      if (this.list.length === 1) {
        this.list[0].__proto__ = this.root
      }
      return this.list.shift()
    }
  , get : function (key) {
      return this.list[0][key]
    }
  , set : function (key, val, save) {
      if (!this.length) this.push({})
      if (save && this.list[0].hasOwnProperty(key)) this.push({})
      return this.list[0][key] = val
    }
  , forEach : function (fn, thisp) {
      for (var key in this.list[0]) fn.call(thisp, key, this.list[0][key])
    }
  , slice : function () {
      return this.list.slice.apply(this.list, arguments)
    }
  , splice : function () {
      // handle injections
      var ret = this.list.splice.apply(this.list, arguments)
      for (var i = 0, l = this.list.length; i < l; i++) {
        this.list[i].__proto__ = this.list[i + 1] || this.root
      }
      return ret
    }
  }

},{}],132:[function(require,module,exports){
(function (process,Buffer){

var CC = require('config-chain').ConfigChain
var inherits = require('inherits')
var configDefs = require('./config-defs.js')
var types = configDefs.types
var once = require('once')
var fs = require('fs')
var path = require('path')
var nopt = require('nopt')
var ini = require('ini')
var Octal = configDefs.Octal
var mkdirp = require('mkdirp')

exports.load = load
exports.Conf = Conf
exports.loaded = false
exports.rootConf = null
exports.usingBuiltin = false
exports.defs = configDefs
Object.defineProperty(exports, 'defaults', { get: function () {
  return configDefs.defaults
}, enumerable: true })
Object.defineProperty(exports, 'types', { get: function () {
  return configDefs.types
}, enumerable: true })

exports.validate = validate

var myUid = process.env.SUDO_UID !== undefined
          ? process.env.SUDO_UID : (process.getuid && process.getuid())
var myGid = process.env.SUDO_GID !== undefined
          ? process.env.SUDO_GID : (process.getgid && process.getgid())


var loading = false
var loadCbs = []
function load (cli_, builtin_, cb_) {
  var cli, builtin, cb
  for (var i = 0; i < arguments.length; i++)
    switch (typeof arguments[i]) {
      case 'string': builtin = arguments[i]; break
      case 'object': cli = arguments[i]; break
      case 'function': cb = arguments[i]; break
    }

  if (!cb)
    cb = function () {}

  if (exports.loaded) {
    var ret = exports.loaded
    if (cli) {
      ret = new Conf(ret)
      ret.unshift(cli)
    }
    return process.nextTick(cb.bind(null, null, ret))
  }

  // either a fresh object, or a clone of the passed in obj
  if (!cli)
    cli = {}
  else
    cli = Object.keys(cli).reduce(function (c, k) {
      c[k] = cli[k]
      return c
    }, {})

  loadCbs.push(cb)
  if (loading)
    return
  loading = true

  cb = once(function (er, conf) {
    if (!er)
      exports.loaded = conf
    loadCbs.forEach(function (fn) {
      fn(er, conf)
    })
    loadCbs.length = 0
  })

  // check for a builtin if provided.
  exports.usingBuiltin = !!builtin
  var rc = exports.rootConf = new Conf()
  var defaults = configDefs.defaults
  if (builtin)
    rc.addFile(builtin, 'builtin')
  else
    rc.add({}, 'builtin')

  rc.on('load', function () {
    var conf = new Conf(rc)
    conf.usingBuiltin = !!builtin
    conf.add(cli, 'cli')
    conf.addEnv()
    conf.addFile(conf.get('userconfig'), 'user')
    conf.once('error', cb)
    conf.once('load', function () {
      // globalconfig and globalignorefile defaults
      // need to respond to the "prefix" setting up to this point.
      // Eg, `npm config get globalconfig --prefix ~/local` should
      // return `~/local/etc/npmrc`
      // annoying humans and their expectations!
      if (conf.get('prefix')) {
        var etc = path.resolve(conf.get("prefix"), "etc")
        defaults.globalconfig = path.resolve(etc, "npmrc")
        defaults.globalignorefile = path.resolve(etc, "npmignore")
      }
      conf.addFile(conf.get('globalconfig'), 'global')

      // move the builtin into the conf stack now.
      conf.root = defaults
      conf.add(rc.shift(), 'builtin')
      conf.once('load', function () {
        // warn about invalid bits.
        validate(conf)
        exports.loaded = conf
        cb(null, conf)
      })
    })
  })
}


// Basically the same as CC, but:
// 1. Always ini
// 2. Parses environment variable names in field values
// 3. Field values that start with ~/ are replaced with process.env.HOME
// 4. Can inherit from another Conf object, using it as the base.
inherits(Conf, CC)
function Conf (base) {
  if (!(this instanceof Conf))
    return new Conf(base)

  CC.apply(this)

  if (base)
    if (base instanceof Conf)
      this.root = base.list[0] || base.root
    else
      this.root = base
  else
    this.root = configDefs.defaults
}

Conf.prototype.save = function (where, cb) {
  var target = this.sources[where]
  if (!target || !(target.path || target.source) || !target.data) {
    if (where !== 'builtin')
      var er = new Error('bad save target: '+where)
    if (cb) {
      process.nextTick(cb.bind(null, er))
      return this
    }
    return this.emit('error', er)
  }

  if (target.source) {
    var pref = target.prefix || ''
    Object.keys(target.data).forEach(function (k) {
      target.source[pref + k] = target.data[k]
    })
    if (cb) process.nextTick(cb)
    return this
  }

  var data = target.data

  if (typeof data._password === 'string' &&
      typeof data.username === 'string') {
    var auth = data.username + ':' + data._password
    data = Object.keys(data).reduce(function (c, k) {
      if (k === 'username' || k === '_password')
        return c
      c[k] = data[k]
      return c
    }, { _auth: new Buffer(auth, 'utf8').toString('base64') })
    delete data.username
    delete data._password
  }

  data = ini.stringify(data)

  then = then.bind(this)
  done = done.bind(this)
  this._saving ++

  var mode = where === 'user' ? 0600 : 0666
  if (!data.trim())
    fs.unlink(target.path, done)
  else {
    mkdirp(path.dirname(target.path), function (er) {
      if (er)
        return then(er)
      fs.writeFile(target.path, data, 'utf8', function (er) {
        if (er)
          return then(er)
        if (where === 'user' && myUid && myGid)
          fs.chown(target.path, +myUid, +myGid, then)
        else
          then()
      })
    })
  }

  function then (er) {
    if (er)
      return done(er)
    fs.chmod(target.path, mode, done)
  }

  function done (er) {
    if (er) {
      if (cb) return cb(er)
      else return this.emit('error', er)
    }
    this._saving --
    if (this._saving === 0) {
      if (cb) cb()
      this.emit('save')
    }
  }

  return this
}

Conf.prototype.addFile = function (file, name) {
  name = name || file
  var marker = {__source__:name}
  this.sources[name] = { path: file, type: 'ini' }
  this.push(marker)
  this._await()
  fs.readFile(file, 'utf8', function (er, data) {
    if (er) // just ignore missing files.
      return this.add({}, marker)
    this.addString(data, file, 'ini', marker)
  }.bind(this))
  return this
}

// always ini files.
Conf.prototype.parse = function (content, file) {
  return CC.prototype.parse.call(this, content, file, 'ini')
}

Conf.prototype.add = function (data, marker) {
  Object.keys(data).forEach(function (k) {
    data[k] = parseField(data[k], k)
  })
  if (Object.prototype.hasOwnProperty.call(data, '_auth')) {
    var auth = new Buffer(data._auth, 'base64').toString('utf8').split(':')
    var username = auth.shift()
    var password = auth.join(':')
    data.username = username
    data._password = password
  }
  return CC.prototype.add.call(this, data, marker)
}

Conf.prototype.addEnv = function (env) {
  env = env || process.env
  var conf = {}
  Object.keys(env)
    .filter(function (k) { return k.match(/^npm_config_[^_]/i) })
    .forEach(function (k) {
      if (!env[k])
        return

      conf[k.replace(/^npm_config_/i, '')
            .toLowerCase()
            .replace(/_/g, '-')] = env[k]
    })
  return CC.prototype.addEnv.call(this, '', conf, 'env')
}

function parseField (f, k, emptyIsFalse) {
  if (typeof f !== 'string' && !(f instanceof String))
    return f

  // type can be an array or single thing.
  var typeList = [].concat(types[k])
  var isPath = -1 !== typeList.indexOf(path)
  var isBool = -1 !== typeList.indexOf(Boolean)
  var isString = -1 !== typeList.indexOf(String)
  var isOctal = -1 !== typeList.indexOf(Octal)
  var isNumber = isOctal || (-1 !== typeList.indexOf(Number))

  f = (''+f).trim()

  if (f.match(/^".*"$/))
    f = JSON.parse(f)

  if (isBool && !isString && f === '')
    return true

  switch (f) {
    case 'true': return true
    case 'false': return false
    case 'null': return null
    case 'undefined': return undefined
  }

  f = envReplace(f)

  if (isPath) {
    var homePattern = process.platform === 'win32' ? /^~(\/|\\)/ : /^~\//
    if (f.match(homePattern) && process.env.HOME) {
      f = path.resolve(process.env.HOME, f.substr(2))
    }
    f = path.resolve(f)
  }

  if (isNumber && !isNaN(f))
    f = isOctal ? parseInt(f, 8) : +f

  return f
}

function envReplace (f) {
  if (typeof f !== "string" || !f) return f

  // replace any ${ENV} values with the appropriate environ.
  var envExpr = /(\\*)\$\{([^}]+)\}/g
  return f.replace(envExpr, function (orig, esc, name, i, s) {
    esc = esc.length && esc.length % 2
    if (esc)
      return orig
    if (undefined === process.env[name])
      throw new Error("Failed to replace env in config: "+orig)
    return process.env[name]
  })
}

function validate (cl) {
  // warn about invalid configs at every level.
  cl.list.forEach(function (conf, level) {
    nopt.clean(conf, configDefs.types)
  })
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),require("buffer").Buffer)
},{"./config-defs.js":129,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"buffer":10,"config-chain":130,"fs":"liyfGr","inherits":123,"ini":124,"mkdirp":125,"nopt":126,"once":134,"path":29}],133:[function(require,module,exports){
(function (process){
var EE = require('events').EventEmitter
var log = exports = module.exports = new EE
var util = require('util')

var ansi = require('ansi')
log.cursor = ansi(process.stderr)
log.stream = process.stderr

// by default, let ansi decide based on tty-ness.
var colorEnabled = undefined
log.enableColor = function () {
  colorEnabled = true
  this.cursor.enabled = true
}
log.disableColor = function () {
  colorEnabled = false
  this.cursor.enabled = false
}

// default level
log.level = 'info'

// temporarily stop emitting, but don't drop
log.pause = function () {
  this._paused = true
}

log.resume = function () {
  if (!this._paused) return
  this._paused = false

  var b = this._buffer
  this._buffer = []
  b.forEach(function (m) {
    this.emitLog(m)
  }, this)
}

log._buffer = []

var id = 0
log.record = []
log.maxRecordSize = 10000
log.log = function (lvl, prefix, message) {
  var l = this.levels[lvl]
  if (l === undefined) {
    return this.emit('error', new Error(util.format(
      'Undefined log level: %j', lvl)))
  }

  var a = new Array(arguments.length - 2)
  var stack = null
  for (var i = 2; i < arguments.length; i ++) {
    var arg = a[i-2] = arguments[i]

    // resolve stack traces to a plain string.
    if (typeof arg === 'object' && arg &&
        (arg instanceof Error) && arg.stack) {
      arg.stack = stack = arg.stack + ''
    }
  }
  if (stack) a.unshift(stack + '\n')
  message = util.format.apply(util, a)

  var m = { id: id++,
            level: lvl,
            prefix: String(prefix || ''),
            message: message,
            messageRaw: a }

  this.emit('log', m)
  this.emit('log.' + lvl, m)
  if (m.prefix) this.emit(m.prefix, m)

  this.record.push(m)
  var mrs = this.maxRecordSize
  var n = this.record.length - mrs
  if (n > mrs / 10) {
    var newSize = Math.floor(mrs * 0.9)
    this.record = this.record.slice(-1 * newSize)
  }

  this.emitLog(m)
}.bind(log)

log.emitLog = function (m) {
  if (this._paused) {
    this._buffer.push(m)
    return
  }
  var l = this.levels[m.level]
  if (l === undefined) return
  if (l < this.levels[this.level]) return
  if (l > 0 && !isFinite(l)) return

  var style = log.style[m.level]
  var disp = log.disp[m.level] || m.level
  m.message.split(/\r?\n/).forEach(function (line) {
    if (this.heading) {
      this.write(this.heading, this.headingStyle)
      this.write(' ')
    }
    this.write(disp, log.style[m.level])
    var p = m.prefix || ''
    if (p) this.write(' ')
    this.write(p, this.prefixStyle)
    this.write(' ' + line + '\n')
  }, this)
}

log.write = function (msg, style) {
  if (!this.cursor) return
  if (this.stream !== this.cursor.stream) {
    this.cursor = ansi(this.stream, { enabled: colorEnabled })
  }

  style = style || {}
  if (style.fg) this.cursor.fg[style.fg]()
  if (style.bg) this.cursor.bg[style.bg]()
  if (style.bold) this.cursor.bold()
  if (style.underline) this.cursor.underline()
  if (style.inverse) this.cursor.inverse()
  if (style.beep) this.cursor.beep()
  this.cursor.write(msg).reset()
}

log.addLevel = function (lvl, n, style, disp) {
  if (!disp) disp = lvl
  this.levels[lvl] = n
  this.style[lvl] = style
  if (!this[lvl]) this[lvl] = function () {
    var a = new Array(arguments.length + 1)
    a[0] = lvl
    for (var i = 0; i < arguments.length; i ++) {
      a[i + 1] = arguments[i]
    }
    return this.log.apply(this, a)
  }.bind(this)
  this.disp[lvl] = disp
}

log.prefixStyle = { fg: 'magenta' }
log.headingStyle = { fg: 'white', bg: 'black' }

log.style = {}
log.levels = {}
log.disp = {}
log.addLevel('silly', -Infinity, { inverse: true }, 'sill')
log.addLevel('verbose', 1000, { fg: 'blue', bg: 'black' }, 'verb')
log.addLevel('info', 2000, { fg: 'green' })
log.addLevel('http', 3000, { fg: 'green', bg: 'black' })
log.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, 'WARN')
log.addLevel('error', 5000, { fg: 'red', bg: 'black' }, 'ERR!')
log.addLevel('silent', Infinity)

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"ansi":117,"events":20,"util":45}],134:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

},{}],135:[function(require,module,exports){
(function (process){
var isWindows = process.platform === 'win32'
var windir = isWindows ? process.env.windir || 'C:\\Windows' : null
var path = require('path')
var exec = require('child_process').exec

// looking up envs is a bit costly.
// Also, sometimes we want to have a fallback
// Pass in a callback to wait for the fallback on failures
// After the first lookup, always returns the same thing.
function memo (key, lookup, fallback) {
  var fell = false
  var falling = false
  exports[key] = function (cb) {
    var val = lookup()
    if (!val && !fell && !falling && fallback) {
      fell = true
      falling = true
      exec(fallback, function (er, output, stderr) {
        falling = false
        if (er) return // oh well, we tried
        val = output.trim()
      })
    }
    exports[key] = function (cb) {
      if (cb) process.nextTick(cb.bind(null, null, val))
      return val
    }
    if (cb && !falling) process.nextTick(cb.bind(null, null, val))
    return val
  }
}

memo('user', function () {
  return ( isWindows
         ? process.env.USERDOMAIN + '\\' + process.env.USERNAME
         : process.env.USER
         )
}, 'whoami')

memo('prompt', function () {
  return isWindows ? process.env.PROMPT : process.env.PS1
})

memo('hostname', function () {
  return isWindows ? process.env.COMPUTERNAME : process.env.HOSTNAME
}, 'hostname')

memo('tmpdir', function () {
  var t = isWindows ? 'temp' : 'tmp'
  return process.env.TMPDIR ||
         process.env.TMP ||
         process.env.TEMP ||
         ( exports.home() ? path.resolve(exports.home(), t)
         : isWindows ? path.resolve(windir, t)
         : '/tmp'
         )
})

memo('home', function () {
  return ( isWindows ? process.env.USERPROFILE
         : process.env.HOME
         )
})

memo('path', function () {
  return (process.env.PATH ||
          process.env.Path ||
          process.env.path).split(isWindows ? ';' : ':')
})

memo('editor', function () {
  return process.env.EDITOR ||
         process.env.VISUAL ||
         (isWindows ? 'notepad.exe' : 'vi')
})

memo('shell', function () {
  return isWindows ? process.env.ComSpec || 'cmd'
         : process.env.SHELL || 'bash'
})

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"child_process":"liyfGr","path":29}],136:[function(require,module,exports){
(function (process){
// Copyright 2010-2012 Mikeal Rogers
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

var optional = require('./lib/optional')
  , cookie = optional('tough-cookie')
  , Cookie = cookie && cookie.Cookie
  , CookieJar = cookie && cookie.CookieJar
  , cookieJar = CookieJar && new CookieJar

  , copy = require('./lib/copy')
  , Request = require('./request')
  ;



// organize params for patch, post, put, head, del
function initParams(uri, options, callback) {
  if ((typeof options === 'function') && !callback) callback = options
  if (options && typeof options === 'object') {
    options.uri = uri
  } else if (typeof uri === 'string') {
    options = {uri:uri}
  } else {
    options = uri
    uri = options.uri
  }
  return { uri: uri, options: options, callback: callback }
}

function request (uri, options, callback) {
  if (typeof uri === 'undefined') throw new Error('undefined is not a valid uri or options object.')
  if ((typeof options === 'function') && !callback) callback = options
  if (options && typeof options === 'object') {
    options.uri = uri
  } else if (typeof uri === 'string') {
    options = {uri:uri}
  } else {
    options = uri
  }

  options = copy(options)

  if (callback) options.callback = callback
  var r = new Request(options)
  return r
}

module.exports = request

request.Request = Request;

request.debug = process.env.NODE_DEBUG && /request/.test(process.env.NODE_DEBUG)

request.initParams = initParams

request.defaults = function (options, requester) {
  var def = function (method) {
    var d = function (uri, opts, callback) {
      var params = initParams(uri, opts, callback)
      for (var i in options) {
        if (params.options[i] === undefined) params.options[i] = options[i]
      }
      if(typeof requester === 'function') {
        if(method === request) {
          method = requester
        } else {
          params.options._requester = requester
        }
      }
      return method(params.options, params.callback)
    }
    return d
  }
  var de = def(request)
  de.get = def(request.get)
  de.patch = def(request.patch)
  de.post = def(request.post)
  de.put = def(request.put)
  de.head = def(request.head)
  de.del = def(request.del)
  de.cookie = def(request.cookie)
  de.jar = request.jar
  return de
}

function requester(params) {
  if(typeof params.options._requester === 'function') {
    return params.options._requester
  } else {
    return request
  }
}

request.forever = function (agentOptions, optionsArg) {
  var options = {}
  if (optionsArg) {
    for (var option in optionsArg) {
      options[option] = optionsArg[option]
    }
  }
  if (agentOptions) options.agentOptions = agentOptions
  options.forever = true
  return request.defaults(options)
}

request.get = request
request.post = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'POST'
  return requester(params)(params.uri || null, params.options, params.callback)
}
request.put = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'PUT'
  return requester(params)(params.uri || null, params.options, params.callback)
}
request.patch = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'PATCH'
  return requester(params)(params.uri || null, params.options, params.callback)
}
request.head = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'HEAD'
  if (params.options.body ||
      params.options.requestBodyStream ||
      (params.options.json && typeof params.options.json !== 'boolean') ||
      params.options.multipart) {
    throw new Error("HTTP HEAD requests MUST NOT include a request body.")
  }

  return requester(params)(params.uri || null, params.options, params.callback)
}
request.del = function (uri, options, callback) {
  var params = initParams(uri, options, callback)
  params.options.method = 'DELETE'
  return requester(params)(params.uri || null, params.options, params.callback)
}
request.jar = function () {
  return new CookieJar
}
request.cookie = function (str) {
  if (str && str.uri) str = str.uri
  if (typeof str !== 'string') throw new Error("The cookie function only accepts STRING as param")
  return new Cookie(str)
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"./lib/copy":137,"./lib/optional":140,"./request":146,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27}],137:[function(require,module,exports){
module.exports =
function copy (obj) {
  var o = {}
  Object.keys(obj).forEach(function (i) {
    o[i] = obj[i]
  })
  return o
}
},{}],138:[function(require,module,exports){
(function (process){
var util = require('util')

module.exports =
function debug () {
  if (/\brequest\b/.test(process.env.NODE_DEBUG))
    console.error('REQUEST %s', util.format.apply(util, arguments))
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"util":45}],139:[function(require,module,exports){
// Safe toJSON
module.exports =
function getSafe (self, uuid) {
  if (typeof self === 'object' || typeof self === 'function') var safe = {}
  if (Array.isArray(self)) var safe = []

  var recurse = []

  Object.defineProperty(self, uuid, {})

  var attrs = Object.keys(self).filter(function (i) {
    if (i === uuid) return false
    if ( (typeof self[i] !== 'object' && typeof self[i] !== 'function') || self[i] === null) return true
    return !(Object.getOwnPropertyDescriptor(self[i], uuid))
  })


  for (var i=0;i<attrs.length;i++) {
    if ( (typeof self[attrs[i]] !== 'object' && typeof self[attrs[i]] !== 'function') ||
          self[attrs[i]] === null
        ) {
      safe[attrs[i]] = self[attrs[i]]
    } else {
      recurse.push(attrs[i])
      Object.defineProperty(self[attrs[i]], uuid, {})
    }
  }

  for (var i=0;i<recurse.length;i++) {
    safe[recurse[i]] = getSafe(self[recurse[i]], uuid)
  }

  return safe
}
},{}],140:[function(require,module,exports){
module.exports = function(module) {
  try {
    return require(module);
  } catch (e) {}
};

},{}],141:[function(require,module,exports){
module.exports = ForeverAgent
ForeverAgent.SSL = ForeverAgentSSL

var util = require('util')
  , Agent = require('http').Agent
  , net = require('net')
  , tls = require('tls')
  , AgentSSL = require('https').Agent

function ForeverAgent(options) {
  var self = this
  self.options = options || {}
  self.requests = {}
  self.sockets = {}
  self.freeSockets = {}
  self.maxSockets = self.options.maxSockets || Agent.defaultMaxSockets
  self.minSockets = self.options.minSockets || ForeverAgent.defaultMinSockets
  self.on('free', function(socket, host, port) {
    var name = host + ':' + port
    if (self.requests[name] && self.requests[name].length) {
      self.requests[name].shift().onSocket(socket)
    } else if (self.sockets[name].length < self.minSockets) {
      if (!self.freeSockets[name]) self.freeSockets[name] = []
      self.freeSockets[name].push(socket)
      
      // if an error happens while we don't use the socket anyway, meh, throw the socket away
      function onIdleError() {
        socket.destroy()
      }
      socket._onIdleError = onIdleError
      socket.on('error', onIdleError)
    } else {
      // If there are no pending requests just destroy the
      // socket and it will get removed from the pool. This
      // gets us out of timeout issues and allows us to
      // default to Connection:keep-alive.
      socket.destroy()
    }
  })

}
util.inherits(ForeverAgent, Agent)

ForeverAgent.defaultMinSockets = 5


ForeverAgent.prototype.createConnection = net.createConnection
ForeverAgent.prototype.addRequestNoreuse = Agent.prototype.addRequest
ForeverAgent.prototype.addRequest = function(req, host, port) {
  var name = host + ':' + port
  if (this.freeSockets[name] && this.freeSockets[name].length > 0 && !req.useChunkedEncodingByDefault) {
    var idleSocket = this.freeSockets[name].pop()
    idleSocket.removeListener('error', idleSocket._onIdleError)
    delete idleSocket._onIdleError
    req._reusedSocket = true
    req.onSocket(idleSocket)
  } else {
    this.addRequestNoreuse(req, host, port)
  }
}

ForeverAgent.prototype.removeSocket = function(s, name, host, port) {
  if (this.sockets[name]) {
    var index = this.sockets[name].indexOf(s)
    if (index !== -1) {
      this.sockets[name].splice(index, 1)
    }
  } else if (this.sockets[name] && this.sockets[name].length === 0) {
    // don't leak
    delete this.sockets[name]
    delete this.requests[name]
  }
  
  if (this.freeSockets[name]) {
    var index = this.freeSockets[name].indexOf(s)
    if (index !== -1) {
      this.freeSockets[name].splice(index, 1)
      if (this.freeSockets[name].length === 0) {
        delete this.freeSockets[name]
      }
    }
  }

  if (this.requests[name] && this.requests[name].length) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(name, host, port).emit('free')
  }
}

function ForeverAgentSSL (options) {
  ForeverAgent.call(this, options)
}
util.inherits(ForeverAgentSSL, ForeverAgent)

ForeverAgentSSL.prototype.createConnection = createConnectionSSL
ForeverAgentSSL.prototype.addRequestNoreuse = AgentSSL.prototype.addRequest

function createConnectionSSL (port, host, options) {
  if (typeof port === 'object') {
    options = port;
  } else if (typeof host === 'object') {
    options = host;
  } else if (typeof options === 'object') {
    options = options;
  } else {
    options = {};
  }

  if (typeof port === 'number') {
    options.port = port;
  }

  if (typeof host === 'string') {
    options.host = host;
  }

  return tls.connect(options);
}

},{"http":21,"https":25,"net":"liyfGr","tls":"liyfGr","util":45}],142:[function(require,module,exports){
module.exports = stringify;

function getSerialize (fn, decycle) {
  var seen = [], keys = [];
  decycle = decycle || function(key, value) {
    return '[Circular ' + getPath(value, seen, keys) + ']'
  };
  return function(key, value) {
    var ret = value;
    if (typeof value === 'object' && value) {
      if (seen.indexOf(value) !== -1)
        ret = decycle(key, value);
      else {
        seen.push(value);
        keys.push(key);
      }
    }
    if (fn) ret = fn(key, ret);
    return ret;
  }
}

function getPath (value, seen, keys) {
  var index = seen.indexOf(value);
  var path = [ keys[index] ];
  for (index--; index >= 0; index--) {
    if (seen[index][ path[0] ] === value) {
      value = seen[index];
      path.unshift(keys[index]);
    }
  }
  return '~' + path.join('.');
}

function stringify(obj, fn, spaces, decycle) {
  return JSON.stringify(obj, getSerialize(fn, decycle), spaces);
}

stringify.getSerialize = getSerialize;

},{}],143:[function(require,module,exports){
(function (process,__dirname){
var path = require('path');
var fs = require('fs');

function Mime() {
  // Map of extension -> mime type
  this.types = Object.create(null);

  // Map of mime type -> extension
  this.extensions = Object.create(null);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * @param map (Object) type definitions
 */
Mime.prototype.define = function (map) {
  for (var type in map) {
    var exts = map[type];

    for (var i = 0; i < exts.length; i++) {
      if (process.env.DEBUG_MIME && this.types[exts]) {
        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
          this.types[exts] + ' to ' + type);
      }

      this.types[exts[i]] = type;
    }

    // Default extension is the first one we encounter
    if (!this.extensions[type]) {
      this.extensions[type] = exts[0];
    }
  }
};

/**
 * Load an Apache2-style ".types" file
 *
 * This may be called multiple times (it's expected).  Where files declare
 * overlapping types/extensions, the last file wins.
 *
 * @param file (String) path of file to load.
 */
Mime.prototype.load = function(file) {

  this._loading = file;
  // Read file and split into lines
  var map = {},
      content = fs.readFileSync(file, 'ascii'),
      lines = content.split(/[\r\n]+/);

  lines.forEach(function(line) {
    // Clean up whitespace/comments, and split into fields
    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
    map[fields.shift()] = fields;
  });

  this.define(map);

  this._loading = null;
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.lookup = function(path, fallback) {
  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

  return this.types[ext] || fallback || this.default_type;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.extension = function(mimeType) {
  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
  return this.extensions[type];
};

// Default instance
var mime = new Mime();

// Load local copy of
// http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
mime.load(path.join(__dirname, 'types/mime.types'));

// Load additional types from node.js community
mime.load(path.join(__dirname, 'types/node.types'));

// Default type
mime.default_type = mime.lookup('bin');

//
// Additional API specific to the default instance
//

mime.Mime = Mime;

/**
 * Lookup a charset based on mime type.
 */
mime.charsets = {
  lookup: function(mimeType, fallback) {
    // Assume text types are utf8
    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
  }
};

module.exports = mime;

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),"/node_modules/dat-transformer/node_modules/npm-installer/node_modules/npm/node_modules/request/node_modules/mime")
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"fs":"liyfGr","path":29}],144:[function(require,module,exports){
(function (Buffer){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(require) == 'function') {
    try {
      var _rb = require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
  } else if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);

}).call(this,require("buffer").Buffer)
},{"buffer":10,"crypto":15}],145:[function(require,module,exports){
/**
 * Object#toString() ref for stringify().
 */

var toString = Object.prototype.toString;

/**
 * Object#hasOwnProperty ref
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Array#indexOf shim.
 */

var indexOf = typeof Array.prototype.indexOf === 'function'
  ? function(arr, el) { return arr.indexOf(el); }
  : function(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === el) return i;
      }
      return -1;
    };

/**
 * Array.isArray shim.
 */

var isArray = Array.isArray || function(arr) {
  return toString.call(arr) == '[object Array]';
};

/**
 * Object.keys shim.
 */

var objectKeys = Object.keys || function(obj) {
  var ret = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret.push(key);
    }
  }
  return ret;
};

/**
 * Array#forEach shim.
 */

var forEach = typeof Array.prototype.forEach === 'function'
  ? function(arr, fn) { return arr.forEach(fn); }
  : function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i]);
    };

/**
 * Array#reduce shim.
 */

var reduce = function(arr, fn, initial) {
  if (typeof arr.reduce === 'function') return arr.reduce(fn, initial);
  var res = initial;
  for (var i = 0; i < arr.length; i++) res = fn(res, arr[i]);
  return res;
};

/**
 * Cache non-integer test regexp.
 */

var isint = /^[0-9]+$/;

function promote(parent, key) {
  if (parent[key].length == 0) return parent[key] = {}
  var t = {};
  for (var i in parent[key]) {
    if (hasOwnProperty.call(parent[key], i)) {
      t[i] = parent[key][i];
    }
  }
  parent[key] = t;
  return t;
}

function parse(parts, parent, key, val) {
  var part = parts.shift();
  
  // illegal
  if (Object.getOwnPropertyDescriptor(Object.prototype, key)) return;
  
  // end
  if (!part) {
    if (isArray(parent[key])) {
      parent[key].push(val);
    } else if ('object' == typeof parent[key]) {
      parent[key] = val;
    } else if ('undefined' == typeof parent[key]) {
      parent[key] = val;
    } else {
      parent[key] = [parent[key], val];
    }
    // array
  } else {
    var obj = parent[key] = parent[key] || [];
    if (']' == part) {
      if (isArray(obj)) {
        if ('' != val) obj.push(val);
      } else if ('object' == typeof obj) {
        obj[objectKeys(obj).length] = val;
      } else {
        obj = parent[key] = [parent[key], val];
      }
      // prop
    } else if (~indexOf(part, ']')) {
      part = part.substr(0, part.length - 1);
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
      // key
    } else {
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
    }
  }
}

/**
 * Merge parent key/val pair.
 */

function merge(parent, key, val){
  if (~indexOf(key, ']')) {
    var parts = key.split('[')
      , len = parts.length
      , last = len - 1;
    parse(parts, parent, 'base', val);
    // optimize
  } else {
    if (!isint.test(key) && isArray(parent.base)) {
      var t = {};
      for (var k in parent.base) t[k] = parent.base[k];
      parent.base = t;
    }
    set(parent.base, key, val);
  }

  return parent;
}

/**
 * Compact sparse arrays.
 */

function compact(obj) {
  if ('object' != typeof obj) return obj;

  if (isArray(obj)) {
    var ret = [];

    for (var i in obj) {
      if (hasOwnProperty.call(obj, i)) {
        ret.push(obj[i]);
      }
    }

    return ret;
  }

  for (var key in obj) {
    obj[key] = compact(obj[key]);
  }

  return obj;
}

/**
 * Parse the given obj.
 */

function parseObject(obj){
  var ret = { base: {} };

  forEach(objectKeys(obj), function(name){
    merge(ret, name, obj[name]);
  });

  return compact(ret.base);
}

/**
 * Parse the given str.
 */

function parseString(str){
  var ret = reduce(String(str).split('&'), function(ret, pair){
    var eql = indexOf(pair, '=')
      , brace = lastBraceInKey(pair)
      , key = pair.substr(0, brace || eql)
      , val = pair.substr(brace || eql, pair.length)
      , val = val.substr(indexOf(val, '=') + 1, val.length);

    // ?foo
    if ('' == key) key = pair, val = '';
    if ('' == key) return ret;

    return merge(ret, decode(key), decode(val));
  }, { base: {} }).base;

  return compact(ret);
}

/**
 * Parse the given query `str` or `obj`, returning an object.
 *
 * @param {String} str | {Object} obj
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if (null == str || '' == str) return {};
  return 'object' == typeof str
    ? parseObject(str)
    : parseString(str);
};

/**
 * Turn the given `obj` into a query string
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

var stringify = exports.stringify = function(obj, prefix) {
  if (isArray(obj)) {
    return stringifyArray(obj, prefix);
  } else if ('[object Object]' == toString.call(obj)) {
    return stringifyObject(obj, prefix);
  } else if ('string' == typeof obj) {
    return stringifyString(obj, prefix);
  } else {
    return prefix + '=' + encodeURIComponent(String(obj));
  }
};

/**
 * Stringify the given `str`.
 *
 * @param {String} str
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyString(str, prefix) {
  if (!prefix) throw new TypeError('stringify expects an object');
  return prefix + '=' + encodeURIComponent(str);
}

/**
 * Stringify the given `arr`.
 *
 * @param {Array} arr
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyArray(arr, prefix) {
  var ret = [];
  if (!prefix) throw new TypeError('stringify expects an object');
  for (var i = 0; i < arr.length; i++) {
    ret.push(stringify(arr[i], prefix + '[' + i + ']'));
  }
  return ret.join('&');
}

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyObject(obj, prefix) {
  var ret = []
    , keys = objectKeys(obj)
    , key;

  for (var i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    if ('' == key) continue;
    if (null == obj[key]) {
      ret.push(encodeURIComponent(key) + '=');
    } else {
      ret.push(stringify(obj[key], prefix
        ? prefix + '[' + encodeURIComponent(key) + ']'
        : encodeURIComponent(key)));
    }
  }

  return ret.join('&');
}

/**
 * Set `obj`'s `key` to `val` respecting
 * the weird and wonderful syntax of a qs,
 * where "foo=bar&foo=baz" becomes an array.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {String} val
 * @api private
 */

function set(obj, key, val) {
  var v = obj[key];
  if (Object.getOwnPropertyDescriptor(Object.prototype, key)) return;
  if (undefined === v) {
    obj[key] = val;
  } else if (isArray(v)) {
    v.push(val);
  } else {
    obj[key] = [v, val];
  }
}

/**
 * Locate last brace in `str` within the key.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function lastBraceInKey(str) {
  var len = str.length
    , brace
    , c;
  for (var i = 0; i < len; ++i) {
    c = str[i];
    if (']' == c) brace = false;
    if ('[' == c) brace = true;
    if ('=' == c && !brace) return i;
  }
}

/**
 * Decode `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function decode(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (err) {
    return str;
  }
}

},{}],146:[function(require,module,exports){
(function (process,Buffer){
var optional = require('./lib/optional')
  , http = require('http')
  , https = optional('https')
  , tls = optional('tls')
  , url = require('url')
  , util = require('util')
  , stream = require('stream')
  , qs = require('qs')
  , querystring = require('querystring')
  , crypto = require('crypto')

  , oauth = optional('oauth-sign')
  , hawk = optional('hawk')
  , aws = optional('aws-sign')
  , httpSignature = optional('http-signature')
  , uuid = require('node-uuid')
  , mime = require('mime')
  , tunnel = optional('tunnel-agent')
  , _safeStringify = require('json-stringify-safe')

  , ForeverAgent = require('forever-agent')
  , FormData = optional('form-data')

  , Cookie = optional('tough-cookie')
  , CookieJar = Cookie && Cookie.CookieJar
  , cookieJar = CookieJar && new CookieJar

  , copy = require('./lib/copy')
  , debug = require('./lib/debug')
  , getSafe = require('./lib/getSafe')
  ;

function safeStringify (obj) {
  var ret
  try { ret = JSON.stringify(obj) }
  catch (e) { ret = _safeStringify(obj) }
  return ret
}

var globalPool = {}
var isUrl = /^https?:/i


// Hacky fix for pre-0.4.4 https
if (https && !https.Agent) {
  https.Agent = function (options) {
    http.Agent.call(this, options)
  }
  util.inherits(https.Agent, http.Agent)
  https.Agent.prototype._getConnection = function (host, port, cb) {
    var s = tls.connect(port, host, this.options, function () {
      // do other checks here?
      if (cb) cb()
    })
    return s
  }
}

function isReadStream (rs) {
  if (rs.readable && rs.path && rs.mode) {
    return true
  }
}

function toBase64 (str) {
  return (new Buffer(str || "", "ascii")).toString("base64")
}

function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

function Request (options) {
  stream.Stream.call(this)
  this.readable = true
  this.writable = true

  if (typeof options === 'string') {
    options = {uri:options}
  }

  var reserved = Object.keys(Request.prototype)
  for (var i in options) {
    if (reserved.indexOf(i) === -1) {
      this[i] = options[i]
    } else {
      if (typeof options[i] === 'function') {
        delete options[i]
      }
    }
  }

  if (options.method) {
    this.explicitMethod = true
  }

  this.canTunnel = options.tunnel !== false && tunnel;

  this.init(options)
}
util.inherits(Request, stream.Stream)
Request.prototype.init = function (options) {
  // init() contains all the code to setup the request object.
  // the actual outgoing request is not started until start() is called
  // this function is called from both the constructor and on redirect.
  var self = this
  if (!options) options = {}

  if (!self.method) self.method = options.method || 'GET'
  self.localAddress = options.localAddress

  debug(options)
  if (!self.pool && self.pool !== false) self.pool = globalPool
  self.dests = self.dests || []
  self.__isRequestRequest = true

  // Protect against double callback
  if (!self._callback && self.callback) {
    self._callback = self.callback
    self.callback = function () {
      if (self._callbackCalled) return // Print a warning maybe?
      self._callbackCalled = true
      self._callback.apply(self, arguments)
    }
    self.on('error', self.callback.bind())
    self.on('complete', self.callback.bind(self, null))
  }

  if (self.url && !self.uri) {
    // People use this property instead all the time so why not just support it.
    self.uri = self.url
    delete self.url
  }

  if (!self.uri) {
    // this will throw if unhandled but is handleable when in a redirect
    return self.emit('error', new Error("options.uri is a required argument"))
  } else {
    if (typeof self.uri == "string") self.uri = url.parse(self.uri)
  }

  if (self.strictSSL === false) {
    self.rejectUnauthorized = false
  }

  if (self.proxy) {
    if (typeof self.proxy == 'string') self.proxy = url.parse(self.proxy)

    // do the HTTP CONNECT dance using koichik/node-tunnel
    if (http.globalAgent && self.uri.protocol === "https:" && self.canTunnel) {
      var tunnelFn = self.proxy.protocol === "http:"
                   ? tunnel.httpsOverHttp : tunnel.httpsOverHttps

      var tunnelOptions = { proxy: { host: self.proxy.hostname
                                   , port: +self.proxy.port
                                   , proxyAuth: self.proxy.auth
                                   , headers: { Host: self.uri.hostname + ':' +
                                        (self.uri.port || self.uri.protocol === 'https:' ? 443 : 80) }}
                          , rejectUnauthorized: self.rejectUnauthorized
                          , ca: this.ca }

      self.agent = tunnelFn(tunnelOptions)
      self.tunnel = true
    }
  }

  if (!self.uri.pathname) {self.uri.pathname = '/'}

  if (!self.uri.host) {
    // Invalid URI: it may generate lot of bad errors, like "TypeError: Cannot call method 'indexOf' of undefined" in CookieJar
    // Detect and reject it as soon as possible
    var faultyUri = url.format(self.uri)
    var message = 'Invalid URI "' + faultyUri + '"'
    if (Object.keys(options).length === 0) {
      // No option ? This can be the sign of a redirect
      // As this is a case where the user cannot do anything (they didn't call request directly with this URL)
      // they should be warned that it can be caused by a redirection (can save some hair)
      message += '. This can be caused by a crappy redirection.'
    }
    self.emit('error', new Error(message))
    return // This error was fatal
  }

  self._redirectsFollowed = self._redirectsFollowed || 0
  self.maxRedirects = (self.maxRedirects !== undefined) ? self.maxRedirects : 10
  self.followRedirect = (self.followRedirect !== undefined) ? self.followRedirect : true
  self.followAllRedirects = (self.followAllRedirects !== undefined) ? self.followAllRedirects : false
  if (self.followRedirect || self.followAllRedirects)
    self.redirects = self.redirects || []

  self.headers = self.headers ? copy(self.headers) : {}

  self.setHost = false
  if (!self.hasHeader('host')) {
    self.setHeader('host', self.uri.hostname)
    if (self.uri.port) {
      if ( !(self.uri.port === 80 && self.uri.protocol === 'http:') &&
           !(self.uri.port === 443 && self.uri.protocol === 'https:') )
      self.setHeader('host', self.getHeader('host') + (':'+self.uri.port) )
    }
    self.setHost = true
  }

  self.jar(self._jar || options.jar)

  if (!self.uri.port) {
    if (self.uri.protocol == 'http:') {self.uri.port = 80}
    else if (self.uri.protocol == 'https:') {self.uri.port = 443}
  }

  if (self.proxy && !self.tunnel) {
    self.port = self.proxy.port
    self.host = self.proxy.hostname
  } else {
    self.port = self.uri.port
    self.host = self.uri.hostname
  }

  self.clientErrorHandler = function (error) {
    if (self._aborted) return
    if (self.req && self.req._reusedSocket && error.code === 'ECONNRESET'
        && self.agent.addRequestNoreuse) {
      self.agent = { addRequest: self.agent.addRequestNoreuse.bind(self.agent) }
      self.start()
      self.req.end()
      return
    }
    if (self.timeout && self.timeoutTimer) {
      clearTimeout(self.timeoutTimer)
      self.timeoutTimer = null
    }
    self.emit('error', error)
  }

  self._parserErrorHandler = function (error) {
    if (this.res) {
      if (this.res.request) {
        this.res.request.emit('error', error)
      } else {
        this.res.emit('error', error)
      }
    } else {
      this._httpMessage.emit('error', error)
    }
  }

  if (options.form) {
    self.form(options.form)
  }

  if (options.qs) self.qs(options.qs)

  if (self.uri.path) {
    self.path = self.uri.path
  } else {
    self.path = self.uri.pathname + (self.uri.search || "")
  }

  if (self.path.length === 0) self.path = '/'


  // Auth must happen last in case signing is dependent on other headers
  if (options.oauth) {
    self.oauth(options.oauth)
  }

  if (options.aws) {
    self.aws(options.aws)
  }

  if (options.hawk) {
    self.hawk(options.hawk)
  }

  if (options.httpSignature) {
    self.httpSignature(options.httpSignature)
  }

  if (options.auth) {
    if (Object.prototype.hasOwnProperty.call(options.auth, 'username')) options.auth.user = options.auth.username
    if (Object.prototype.hasOwnProperty.call(options.auth, 'password')) options.auth.pass = options.auth.password
    
    self.auth(
      options.auth.user,
      options.auth.pass,
      options.auth.sendImmediately
    )
  }

  if (self.uri.auth && !self.hasHeader('authorization')) {
    var authPieces = self.uri.auth.split(':').map(function(item){ return querystring.unescape(item) })
    self.auth(authPieces[0], authPieces.slice(1).join(':'), true)
  }
  if (self.proxy && self.proxy.auth && !self.hasHeader('proxy-authorization') && !self.tunnel) {
    self.setHeader('proxy-authorization', "Basic " + toBase64(self.proxy.auth.split(':').map(function(item){ return querystring.unescape(item)}).join(':')))
  }


  if (self.proxy && !self.tunnel) self.path = (self.uri.protocol + '//' + self.uri.host + self.path)

  if (options.json) {
    self.json(options.json)
  } else if (options.multipart) {
    self.boundary = uuid()
    self.multipart(options.multipart)
  }

  if (self.body) {
    var length = 0
    if (!Buffer.isBuffer(self.body)) {
      if (Array.isArray(self.body)) {
        for (var i = 0; i < self.body.length; i++) {
          length += self.body[i].length
        }
      } else {
        self.body = new Buffer(self.body)
        length = self.body.length
      }
    } else {
      length = self.body.length
    }
    if (length) {
      if (!self.hasHeader('content-length')) self.setHeader('content-length', length)
    } else {
      throw new Error('Argument error, options.body.')
    }
  }

  var protocol = self.proxy && !self.tunnel ? self.proxy.protocol : self.uri.protocol
    , defaultModules = {'http:':http, 'https:':https}
    , httpModules = self.httpModules || {}
    ;
  self.httpModule = httpModules[protocol] || defaultModules[protocol]

  if (!self.httpModule) return this.emit('error', new Error("Invalid protocol"))

  if (options.ca) self.ca = options.ca

  if (!self.agent) {
    if (options.agentOptions) self.agentOptions = options.agentOptions

    if (options.agentClass) {
      self.agentClass = options.agentClass
    } else if (options.forever) {
      self.agentClass = protocol === 'http:' ? ForeverAgent : ForeverAgent.SSL
    } else {
      self.agentClass = self.httpModule.Agent
    }
  }

  if (self.pool === false) {
    self.agent = false
  } else {
    self.agent = self.agent || self.getAgent()
    if (self.maxSockets) {
      // Don't use our pooling if node has the refactored client
      self.agent.maxSockets = self.maxSockets
    }
    if (self.pool.maxSockets) {
      // Don't use our pooling if node has the refactored client
      self.agent.maxSockets = self.pool.maxSockets
    }
  }

  self.on('pipe', function (src) {
    if (self.ntick && self._started) throw new Error("You cannot pipe to this stream after the outbound request has started.")
    self.src = src
    if (isReadStream(src)) {
      if (!self.hasHeader('content-type')) self.setHeader('content-type', mime.lookup(src.path))
    } else {
      if (src.headers) {
        for (var i in src.headers) {
          if (!self.hasHeader(i)) {
            self.setHeader(i, src.headers[i])
          }
        }
      }
      if (self._json && !self.hasHeader('content-type'))
        self.setHeader('content-type', 'application/json')
      if (src.method && !self.explicitMethod) {
        self.method = src.method
      }
    }

    // self.on('pipe', function () {
    //   console.error("You have already piped to this stream. Pipeing twice is likely to break the request.")
    // })
  })

  process.nextTick(function () {
    if (self._aborted) return

    if (self._form) {
      self.setHeaders(self._form.getHeaders())
      self._form.pipe(self)
    }
    if (self.body) {
      if (Array.isArray(self.body)) {
        self.body.forEach(function (part) {
          self.write(part)
        })
      } else {
        self.write(self.body)
      }
      self.end()
    } else if (self.requestBodyStream) {
      console.warn("options.requestBodyStream is deprecated, please pass the request object to stream.pipe.")
      self.requestBodyStream.pipe(self)
    } else if (!self.src) {
      if (self.method !== 'GET' && typeof self.method !== 'undefined') {
        self.setHeader('content-length', 0)
      }
      self.end()
    }
    self.ntick = true
  })
}

// Must call this when following a redirect from https to http or vice versa
// Attempts to keep everything as identical as possible, but update the
// httpModule, Tunneling agent, and/or Forever Agent in use.
Request.prototype._updateProtocol = function () {
  var self = this
  var protocol = self.uri.protocol

  if (protocol === 'https:') {
    // previously was doing http, now doing https
    // if it's https, then we might need to tunnel now.
    if (self.proxy && self.canTunnel) {
      self.tunnel = true
      var tunnelFn = self.proxy.protocol === 'http:'
                   ? tunnel.httpsOverHttp : tunnel.httpsOverHttps
      var tunnelOptions = { proxy: { host: self.proxy.hostname
                                   , port: +self.proxy.port
                                   , proxyAuth: self.proxy.auth }
                          , rejectUnauthorized: self.rejectUnauthorized
                          , ca: self.ca }
      self.agent = tunnelFn(tunnelOptions)
      return
    }

    self.httpModule = https
    switch (self.agentClass) {
      case ForeverAgent:
        self.agentClass = ForeverAgent.SSL
        break
      case http.Agent:
        self.agentClass = https.Agent
        break
      default:
        // nothing we can do.  Just hope for the best.
        return
    }

    // if there's an agent, we need to get a new one.
    if (self.agent) self.agent = self.getAgent()

  } else {
    // previously was doing https, now doing http
    // stop any tunneling.
    if (self.tunnel) self.tunnel = false
    self.httpModule = http
    switch (self.agentClass) {
      case ForeverAgent.SSL:
        self.agentClass = ForeverAgent
        break
      case https.Agent:
        self.agentClass = http.Agent
        break
      default:
        // nothing we can do.  just hope for the best
        return
    }

    // if there's an agent, then get a new one.
    if (self.agent) {
      self.agent = null
      self.agent = self.getAgent()
    }
  }
}

Request.prototype.getAgent = function () {
  var Agent = this.agentClass
  var options = {}
  if (this.agentOptions) {
    for (var i in this.agentOptions) {
      options[i] = this.agentOptions[i]
    }
  }
  if (this.ca) options.ca = this.ca
  if (this.ciphers) options.ciphers = this.ciphers
  if (this.secureProtocol) options.secureProtocol = this.secureProtocol
  if (typeof this.rejectUnauthorized !== 'undefined') options.rejectUnauthorized = this.rejectUnauthorized

  if (this.cert && this.key) {
    options.key = this.key
    options.cert = this.cert
  }

  var poolKey = ''

  // different types of agents are in different pools
  if (Agent !== this.httpModule.Agent) {
    poolKey += Agent.name
  }

  if (!this.httpModule.globalAgent) {
    // node 0.4.x
    options.host = this.host
    options.port = this.port
    if (poolKey) poolKey += ':'
    poolKey += this.host + ':' + this.port
  }

  // ca option is only relevant if proxy or destination are https
  var proxy = this.proxy
  if (typeof proxy === 'string') proxy = url.parse(proxy)
  var isHttps = (proxy && proxy.protocol === 'https:') || this.uri.protocol === 'https:'
  if (isHttps) {
    if (options.ca) {
      if (poolKey) poolKey += ':'
      poolKey += options.ca
    }

    if (typeof options.rejectUnauthorized !== 'undefined') {
      if (poolKey) poolKey += ':'
      poolKey += options.rejectUnauthorized
    }

    if (options.cert)
      poolKey += options.cert.toString('ascii') + options.key.toString('ascii')

    if (options.ciphers) {
      if (poolKey) poolKey += ':'
      poolKey += options.ciphers
    }

    if (options.secureProtocol) {
      if (poolKey) poolKey += ':'
      poolKey += options.secureProtocol
    }
  }

  if (this.pool === globalPool && !poolKey && Object.keys(options).length === 0 && this.httpModule.globalAgent) {
    // not doing anything special.  Use the globalAgent
    return this.httpModule.globalAgent
  }

  // we're using a stored agent.  Make sure it's protocol-specific
  poolKey = this.uri.protocol + poolKey

  // already generated an agent for this setting
  if (this.pool[poolKey]) return this.pool[poolKey]

  return this.pool[poolKey] = new Agent(options)
}

Request.prototype.start = function () {
  // start() is called once we are ready to send the outgoing HTTP request.
  // this is usually called on the first write(), end() or on nextTick()
  var self = this

  if (self._aborted) return

  self._started = true
  self.method = self.method || 'GET'
  self.href = self.uri.href

  if (self.src && self.src.stat && self.src.stat.size && !self.hasHeader('content-length')) {
    self.setHeader('content-length', self.src.stat.size)
  }
  if (self._aws) {
    self.aws(self._aws, true)
  }

  // We have a method named auth, which is completely different from the http.request
  // auth option.  If we don't remove it, we're gonna have a bad time.
  var reqOptions = copy(self)
  delete reqOptions.auth

  debug('make request', self.uri.href)
  self.req = self.httpModule.request(reqOptions, self.onResponse.bind(self))

  if (self.timeout && !self.timeoutTimer) {
    self.timeoutTimer = setTimeout(function () {
      self.req.abort()
      var e = new Error("ETIMEDOUT")
      e.code = "ETIMEDOUT"
      self.emit("error", e)
    }, self.timeout)

    // Set additional timeout on socket - in case if remote
    // server freeze after sending headers
    if (self.req.setTimeout) { // only works on node 0.6+
      self.req.setTimeout(self.timeout, function () {
        if (self.req) {
          self.req.abort()
          var e = new Error("ESOCKETTIMEDOUT")
          e.code = "ESOCKETTIMEDOUT"
          self.emit("error", e)
        }
      })
    }
  }

  self.req.on('error', self.clientErrorHandler)
  self.req.on('drain', function() {
    self.emit('drain')
  })
  self.on('end', function() {
    if ( self.req.connection ) self.req.connection.removeListener('error', self._parserErrorHandler)
  })
  self.emit('request', self.req)
}
Request.prototype.onResponse = function (response) {
  var self = this
  debug('onResponse', self.uri.href, response.statusCode, response.headers)
  response.on('end', function() {
    debug('response end', self.uri.href, response.statusCode, response.headers)
  });

  if (response.connection.listeners('error').indexOf(self._parserErrorHandler) === -1) {
    response.connection.once('error', self._parserErrorHandler)
  }
  if (self._aborted) {
    debug('aborted', self.uri.href)
    response.resume()
    return
  }
  if (self._paused) response.pause()
  else response.resume()

  self.response = response
  response.request = self
  response.toJSON = toJSON

  // XXX This is different on 0.10, because SSL is strict by default
  if (self.httpModule === https &&
      self.strictSSL &&
      !response.client.authorized) {
    debug('strict ssl error', self.uri.href)
    var sslErr = response.client.authorizationError
    self.emit('error', new Error('SSL Error: '+ sslErr))
    return
  }

  if (self.setHost && self.hasHeader('host')) delete self.headers[self.hasHeader('host')]
  if (self.timeout && self.timeoutTimer) {
    clearTimeout(self.timeoutTimer)
    self.timeoutTimer = null
  }

  var addCookie = function (cookie) {
    if (self._jar){
      var targetCookieJar = self._jar.setCookie?self._jar:cookieJar;

      //set the cookie if it's domain in the href's domain.
      targetCookieJar.setCookie(cookie, self.uri.href, function(err){
        if (err){
            console.warn('set cookie failed,'+ err)
        }
      })
    }

  }

  if (hasHeader('set-cookie', response.headers) && (!self._disableCookies)) {
    var headerName = hasHeader('set-cookie', response.headers)
    if (Array.isArray(response.headers[headerName])) response.headers[headerName].forEach(addCookie)
    else addCookie(response.headers[headerName])
  }

  var redirectTo = null
  if (response.statusCode >= 300 && response.statusCode < 400 && hasHeader('location', response.headers)) {
    var location = response.headers[hasHeader('location', response.headers)]
    debug('redirect', location)

    if (self.followAllRedirects) {
      redirectTo = location
    } else if (self.followRedirect) {
      switch (self.method) {
        case 'PATCH':
        case 'PUT':
        case 'POST':
        case 'DELETE':
          // Do not follow redirects
          break
        default:
          redirectTo = location
          break
      }
    }
  } else if (response.statusCode == 401 && self._hasAuth && !self._sentAuth) {
    var authHeader = response.headers[hasHeader('www-authenticate', response.headers)]
    var authVerb = authHeader && authHeader.split(' ')[0]
    debug('reauth', authVerb)

    switch (authVerb) {
      case 'Basic':
        self.auth(self._user, self._pass, true)
        redirectTo = self.uri
        break

      case 'Digest':
        // TODO: More complete implementation of RFC 2617.
        //   - check challenge.algorithm
        //   - support algorithm="MD5-sess"
        //   - handle challenge.domain
        //   - support qop="auth-int" only
        //   - handle Authentication-Info (not necessarily?)
        //   - check challenge.stale (not necessarily?)
        //   - increase nc (not necessarily?)
        // For reference:
        // http://tools.ietf.org/html/rfc2617#section-3
        // https://github.com/bagder/curl/blob/master/lib/http_digest.c

        var challenge = {}
        var re = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi
        for (;;) {
          var match = re.exec(authHeader)
          if (!match) break
          challenge[match[1]] = match[2] || match[3];
        }

        var ha1 = md5(self._user + ':' + challenge.realm + ':' + self._pass)
        var ha2 = md5(self.method + ':' + self.uri.path)
        var qop = /(^|,)\s*auth\s*($|,)/.test(challenge.qop) && 'auth'
        var nc = qop && '00000001'
        var cnonce = qop && uuid().replace(/-/g, '')
        var digestResponse = qop ? md5(ha1 + ':' + challenge.nonce + ':' + nc + ':' + cnonce + ':' + qop + ':' + ha2) : md5(ha1 + ':' + challenge.nonce + ':' + ha2)
        var authValues = {
          username: self._user,
          realm: challenge.realm,
          nonce: challenge.nonce,
          uri: self.uri.path,
          qop: qop,
          response: digestResponse,
          nc: nc,
          cnonce: cnonce,
          algorithm: challenge.algorithm,
          opaque: challenge.opaque
        }

        authHeader = []
        for (var k in authValues) {
          if (!authValues[k]) {
            //ignore
          } else if (k === 'qop' || k === 'nc' || k === 'algorithm') {
            authHeader.push(k + '=' + authValues[k])
          } else {
            authHeader.push(k + '="' + authValues[k] + '"')
          }
        }
        authHeader = 'Digest ' + authHeader.join(', ')
        self.setHeader('authorization', authHeader)
        self._sentAuth = true

        redirectTo = self.uri
        break
    }
  }

  if (redirectTo) {
    debug('redirect to', redirectTo)

    // ignore any potential response body.  it cannot possibly be useful
    // to us at this point.
    if (self._paused) response.resume()

    if (self._redirectsFollowed >= self.maxRedirects) {
      self.emit('error', new Error("Exceeded maxRedirects. Probably stuck in a redirect loop "+self.uri.href))
      return
    }
    self._redirectsFollowed += 1

    if (!isUrl.test(redirectTo)) {
      redirectTo = url.resolve(self.uri.href, redirectTo)
    }

    var uriPrev = self.uri
    self.uri = url.parse(redirectTo)

    // handle the case where we change protocol from https to http or vice versa
    if (self.uri.protocol !== uriPrev.protocol) {
      self._updateProtocol()
    }

    self.redirects.push(
      { statusCode : response.statusCode
      , redirectUri: redirectTo
      }
    )
    if (self.followAllRedirects && response.statusCode != 401) self.method = 'GET'
    // self.method = 'GET' // Force all redirects to use GET || commented out fixes #215
    delete self.src
    delete self.req
    delete self.agent
    delete self._started
    if (response.statusCode != 401) {
      // Remove parameters from the previous response, unless this is the second request
      // for a server that requires digest authentication.
      delete self.body
      delete self._form
      if (self.headers) {
        if (self.hasHeader('host')) delete self.headers[self.hasHeader('host')]
        if (self.hasHeader('content-type')) delete self.headers[self.hasHeader('content-type')]
        if (self.hasHeader('content-length')) delete self.headers[self.hasHeader('content-length')]
      }
    }

    self.emit('redirect');

    self.init()
    return // Ignore the rest of the response
  } else {
    self._redirectsFollowed = self._redirectsFollowed || 0
    // Be a good stream and emit end when the response is finished.
    // Hack to emit end on close because of a core bug that never fires end
    response.on('close', function () {
      if (!self._ended) self.response.emit('end')
    })

    if (self.encoding) {
      if (self.dests.length !== 0) {
        console.error("Ignoring encoding parameter as this stream is being piped to another stream which makes the encoding option invalid.")
      } else {
        response.setEncoding(self.encoding)
      }
    }

    self.emit('response', response)

    self.dests.forEach(function (dest) {
      self.pipeDest(dest)
    })

    response.on("data", function (chunk) {
      self._destdata = true
      self.emit("data", chunk)
    })
    response.on("end", function (chunk) {
      self._ended = true
      self.emit("end", chunk)
    })
    response.on("close", function () {self.emit("close")})

    if (self.callback) {
      var buffer = []
      var bodyLen = 0
      self.on("data", function (chunk) {
        buffer.push(chunk)
        bodyLen += chunk.length
      })
      self.on("end", function () {
        debug('end event', self.uri.href)
        if (self._aborted) {
          debug('aborted', self.uri.href)
          return
        }

        if (buffer.length && Buffer.isBuffer(buffer[0])) {
          debug('has body', self.uri.href, bodyLen)
          var body = new Buffer(bodyLen)
          var i = 0
          buffer.forEach(function (chunk) {
            chunk.copy(body, i, 0, chunk.length)
            i += chunk.length
          })
          if (self.encoding === null) {
            response.body = body
          } else {
            response.body = body.toString(self.encoding)
          }
        } else if (buffer.length) {
          // The UTF8 BOM [0xEF,0xBB,0xBF] is converted to [0xFE,0xFF] in the JS UTC16/UCS2 representation.
          // Strip this value out when the encoding is set to 'utf8', as upstream consumers won't expect it and it breaks JSON.parse().
          if (self.encoding === 'utf8' && buffer[0].length > 0 && buffer[0][0] === "\uFEFF") {
            buffer[0] = buffer[0].substring(1)
          }
          response.body = buffer.join('')
        }

        if (self._json) {
          try {
            response.body = JSON.parse(response.body)
          } catch (e) {}
        }
        debug('emitting complete', self.uri.href)
        if(response.body == undefined && !self._json) {
          response.body = "";
        }
        self.emit('complete', response, response.body)
      })
    }
    //if no callback
    else{
      self.on("end", function () {
        if (self._aborted) {
          debug('aborted', self.uri.href)
          return
        }
        self.emit('complete', response);
      });
    }
  }
  debug('finish init function', self.uri.href)
}

Request.prototype.abort = function () {
  this._aborted = true

  if (this.req) {
    this.req.abort()
  }
  else if (this.response) {
    this.response.abort()
  }

  this.emit("abort")
}

Request.prototype.pipeDest = function (dest) {
  var response = this.response
  // Called after the response is received
  if (dest.headers && !dest.headersSent) {
    if (hasHeader('content-type', response.headers)) {
      var ctname = hasHeader('content-type', response.headers)
      if (dest.setHeader) dest.setHeader(ctname, response.headers[ctname])
      else dest.headers[ctname] = response.headers[ctname]
    }

    if (hasHeader('content-length', response.headers)) {
      var clname = hasHeader('content-length', response.headers)
      if (dest.setHeader) dest.setHeader(clname, response.headers[clname])
      else dest.headers[clname] = response.headers[clname]
    }
  }
  if (dest.setHeader && !dest.headersSent) {
    for (var i in response.headers) {
      dest.setHeader(i, response.headers[i])
    }
    dest.statusCode = response.statusCode
  }
  if (this.pipefilter) this.pipefilter(response, dest)
}

// Composable API
Request.prototype.setHeader = function (name, value, clobber) {
  if (clobber === undefined) clobber = true
  if (clobber || !this.hasHeader(name)) this.headers[name] = value
  else this.headers[this.hasHeader(name)] += ',' + value
  return this
}
Request.prototype.setHeaders = function (headers) {
  for (var i in headers) {this.setHeader(i, headers[i])}
  return this
}
Request.prototype.hasHeader = function (header, headers) {
  var headers = Object.keys(headers || this.headers)
    , lheaders = headers.map(function (h) {return h.toLowerCase()})
    ;
  header = header.toLowerCase()
  for (var i=0;i<lheaders.length;i++) {
    if (lheaders[i] === header) return headers[i]
  }
  return false
}

var hasHeader = Request.prototype.hasHeader

Request.prototype.qs = function (q, clobber) {
  var base
  if (!clobber && this.uri.query) base = qs.parse(this.uri.query)
  else base = {}

  for (var i in q) {
    base[i] = q[i]
  }

  if (qs.stringify(base) === ''){
    return this
  }

  this.uri = url.parse(this.uri.href.split('?')[0] + '?' + qs.stringify(base))
  this.url = this.uri
  this.path = this.uri.path

  return this
}
Request.prototype.form = function (form) {
  if (form) {
    this.setHeader('content-type', 'application/x-www-form-urlencoded; charset=utf-8')
    this.body = qs.stringify(form).toString('utf8')
    return this
  }
  // create form-data object
  this._form = new FormData()
  return this._form
}
Request.prototype.multipart = function (multipart) {
  var self = this
  self.body = []

  if (!self.hasHeader('content-type')) {
    self.setHeader('content-type', 'multipart/related; boundary=' + self.boundary)
  } else {
    var headerName = self.hasHeader('content-type');
    self.setHeader(headerName, self.headers[headerName].split(';')[0] + '; boundary=' + self.boundary)
  }

  if (!multipart.forEach) throw new Error('Argument error, options.multipart.')

  if (self.preambleCRLF) {
    self.body.push(new Buffer('\r\n'))
  }

  multipart.forEach(function (part) {
    var body = part.body
    if(body == null) throw Error('Body attribute missing in multipart.')
    delete part.body
    var preamble = '--' + self.boundary + '\r\n'
    Object.keys(part).forEach(function (key) {
      preamble += key + ': ' + part[key] + '\r\n'
    })
    preamble += '\r\n'
    self.body.push(new Buffer(preamble))
    self.body.push(new Buffer(body))
    self.body.push(new Buffer('\r\n'))
  })
  self.body.push(new Buffer('--' + self.boundary + '--'))
  return self
}
Request.prototype.json = function (val) {
  var self = this

  if (!self.hasHeader('accept')) self.setHeader('accept', 'application/json')

  this._json = true
  if (typeof val === 'boolean') {
    if (typeof this.body === 'object') {
      this.body = safeStringify(this.body)
      self.setHeader('content-type', 'application/json')
    }
  } else {
    this.body = safeStringify(val)
    self.setHeader('content-type', 'application/json')
  }
  return this
}
Request.prototype.getHeader = function (name, headers) {
  var result, re, match
  if (!headers) headers = this.headers
  Object.keys(headers).forEach(function (key) {
    re = new RegExp(name, 'i')
    match = key.match(re)
    if (match) result = headers[key]
  })
  return result
}
var getHeader = Request.prototype.getHeader

Request.prototype.auth = function (user, pass, sendImmediately) {
  if (typeof user !== 'string' || (pass !== undefined && typeof pass !== 'string')) {
    throw new Error('auth() received invalid user or password')
  }
  this._user = user
  this._pass = pass
  this._hasAuth = true
  var header = typeof pass !== 'undefined' ? user + ':' + pass : user
  if (sendImmediately || typeof sendImmediately == 'undefined') {
    this.setHeader('authorization', 'Basic ' + toBase64(header))
    this._sentAuth = true
  }
  return this
}
Request.prototype.aws = function (opts, now) {
  if (!now) {
    this._aws = opts
    return this
  }
  var date = new Date()
  this.setHeader('date', date.toUTCString())
  var auth =
    { key: opts.key
    , secret: opts.secret
    , verb: this.method.toUpperCase()
    , date: date
    , contentType: this.getHeader('content-type') || ''
    , md5: this.getHeader('content-md5') || ''
    , amazonHeaders: aws.canonicalizeHeaders(this.headers)
    }
  if (opts.bucket && this.path) {
    auth.resource = '/' + opts.bucket + this.path
  } else if (opts.bucket && !this.path) {
    auth.resource = '/' + opts.bucket
  } else if (!opts.bucket && this.path) {
    auth.resource = this.path
  } else if (!opts.bucket && !this.path) {
    auth.resource = '/'
  }
  auth.resource = aws.canonicalizeResource(auth.resource)
  this.setHeader('authorization', aws.authorization(auth))

  return this
}
Request.prototype.httpSignature = function (opts) {
  var req = this
  httpSignature.signRequest({
    getHeader: function(header) {
      return getHeader(header, req.headers)
    },
    setHeader: function(header, value) {
      req.setHeader(header, value)
    },
    method: this.method,
    path: this.path
  }, opts)
  debug('httpSignature authorization', this.getHeader('authorization'))

  return this
}

Request.prototype.hawk = function (opts) {
  this.setHeader('Authorization', hawk.client.header(this.uri, this.method, opts).field)
}

Request.prototype.oauth = function (_oauth) {
  var form
  if (this.hasHeader('content-type') &&
      this.getHeader('content-type').slice(0, 'application/x-www-form-urlencoded'.length) ===
        'application/x-www-form-urlencoded'
     ) {
    form = qs.parse(this.body)
  }
  if (this.uri.query) {
    form = qs.parse(this.uri.query)
  }
  if (!form) form = {}
  var oa = {}
  for (var i in form) oa[i] = form[i]
  for (var i in _oauth) oa['oauth_'+i] = _oauth[i]
  if (!oa.oauth_version) oa.oauth_version = '1.0'
  if (!oa.oauth_timestamp) oa.oauth_timestamp = Math.floor( Date.now() / 1000 ).toString()
  if (!oa.oauth_nonce) oa.oauth_nonce = uuid().replace(/-/g, '')

  oa.oauth_signature_method = 'HMAC-SHA1'

  var consumer_secret = oa.oauth_consumer_secret
  delete oa.oauth_consumer_secret
  var token_secret = oa.oauth_token_secret
  delete oa.oauth_token_secret
  var timestamp = oa.oauth_timestamp

  var baseurl = this.uri.protocol + '//' + this.uri.host + this.uri.pathname
  var signature = oauth.hmacsign(this.method, baseurl, oa, consumer_secret, token_secret)

  // oa.oauth_signature = signature
  for (var i in form) {
    if ( i.slice(0, 'oauth_') in _oauth) {
      // skip
    } else {
      delete oa['oauth_'+i]
      if (i !== 'x_auth_mode') delete oa[i]
    }
  }
  oa.oauth_timestamp = timestamp
  var authHeader = 'OAuth '+Object.keys(oa).sort().map(function (i) {return i+'="'+oauth.rfc3986(oa[i])+'"'}).join(',')
  authHeader += ',oauth_signature="' + oauth.rfc3986(signature) + '"'
  this.setHeader('Authorization', authHeader)
  return this
}
Request.prototype.jar = function (jar) {
  var cookies

  if (this._redirectsFollowed === 0) {
    this.originalCookieHeader = this.getHeader('cookie')
  }

  if (!jar) {
    // disable cookies
    cookies = false
    this._disableCookies = true
  } else {
    var targetCookieJar = (jar && jar.getCookieString)?jar:cookieJar;
    var urihref = this.uri.href

    //fetch cookie in the Specified host
    targetCookieJar.getCookieString(urihref, function(err, hrefCookie){
      if (err){
        console.warn('get cookieString failed,' +err)
      } else {
        cookies = hrefCookie
      }
    })

  }

  //if need cookie and cookie is not empty
  if (cookies && cookies.length) {
    if (this.originalCookieHeader) {
      // Don't overwrite existing Cookie header
      this.setHeader('cookie', this.originalCookieHeader + '; ' + cookies)
    } else {
      this.setHeader('cookie', cookies)
    }
  }
  this._jar = jar
  return this
}


// Stream API
Request.prototype.pipe = function (dest, opts) {
  if (this.response) {
    if (this._destdata) {
      throw new Error("You cannot pipe after data has been emitted from the response.")
    } else if (this._ended) {
      throw new Error("You cannot pipe after the response has been ended.")
    } else {
      stream.Stream.prototype.pipe.call(this, dest, opts)
      this.pipeDest(dest)
      return dest
    }
  } else {
    this.dests.push(dest)
    stream.Stream.prototype.pipe.call(this, dest, opts)
    return dest
  }
}
Request.prototype.write = function () {
  if (!this._started) this.start()
  return this.req.write.apply(this.req, arguments)
}
Request.prototype.end = function (chunk) {
  if (chunk) this.write(chunk)
  if (!this._started) this.start()
  this.req.end()
}
Request.prototype.pause = function () {
  if (!this.response) this._paused = true
  else this.response.pause.apply(this.response, arguments)
}
Request.prototype.resume = function () {
  if (!this.response) this._paused = false
  else this.response.resume.apply(this.response, arguments)
}
Request.prototype.destroy = function () {
  if (!this._ended) this.end()
  else if (this.response) this.response.destroy()
}

function toJSON () {
  return getSafe(this, '__' + (((1+Math.random())*0x10000)|0).toString(16))
}

Request.prototype.toJSON = toJSON


module.exports = Request

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),require("buffer").Buffer)
},{"./lib/copy":137,"./lib/debug":138,"./lib/getSafe":139,"./lib/optional":140,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"buffer":10,"crypto":15,"forever-agent":141,"http":21,"json-stringify-safe":142,"mime":143,"node-uuid":144,"qs":145,"querystring":33,"stream":35,"url":43,"util":45}],147:[function(require,module,exports){
(function (process){
module.exports = rimraf
rimraf.sync = rimrafSync

var path = require("path")
var fs = require("fs")

// for EMFILE handling
var timeout = 0
exports.EMFILE_MAX = 1000
exports.BUSYTRIES_MAX = 3

var isWindows = (process.platform === "win32")

function rimraf (p, cb) {
  if (!cb) throw new Error("No callback passed to rimraf()")

  var busyTries = 0
  rimraf_(p, function CB (er) {
    if (er) {
      if (isWindows && (er.code === "EBUSY" || er.code === "ENOTEMPTY") &&
          busyTries < exports.BUSYTRIES_MAX) {
        busyTries ++
        var time = busyTries * 100
        // try again, with the same exact callback as this one.
        return setTimeout(function () {
          rimraf_(p, CB)
        }, time)
      }

      // this one won't happen if graceful-fs is used.
      if (er.code === "EMFILE" && timeout < exports.EMFILE_MAX) {
        return setTimeout(function () {
          rimraf_(p, CB)
        }, timeout ++)
      }

      // already gone
      if (er.code === "ENOENT") er = null
    }

    timeout = 0
    cb(er)
  })
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, cb) {
  fs.unlink(p, function (er) {
    if (er) {
      if (er.code === "ENOENT")
        return cb(null)
      if (er.code === "EPERM")
        return (isWindows) ? fixWinEPERM(p, er, cb) : rmdir(p, er, cb)
      if (er.code === "EISDIR")
        return rmdir(p, er, cb)
    }
    return cb(er)
  })
}

function fixWinEPERM (p, er, cb) {
  fs.chmod(p, 666, function (er2) {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      fs.stat(p, function(er3, stats) {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, er, cb)
        else
          fs.unlink(p, cb)
      })
  })
}

function fixWinEPERMSync (p, er, cb) {
  try {
    fs.chmodSync(p, 666)
  } catch (er2) {
    if (er2.code !== "ENOENT")
      throw er
  }

  try {
    var stats = fs.statSync(p)
  } catch (er3) {
    if (er3 !== "ENOENT")
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, er)
  else
    fs.unlinkSync(p)
}

function rmdir (p, originalEr, cb) {
  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  fs.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

function rmkids(p, cb) {
  fs.readdir(p, function (er, files) {
    if (er)
      return cb(er)
    var n = files.length
    if (n === 0)
      return fs.rmdir(p, cb)
    var errState
    files.forEach(function (f) {
      rimraf(path.join(p, f), function (er) {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          fs.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p) {
  try {
    fs.unlinkSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "EPERM")
      return isWindows ? fixWinEPERMSync(p, er) : rmdirSync(p, er)
    if (er.code !== "EISDIR")
      throw er
    rmdirSync(p, er)
  }
}

function rmdirSync (p, originalEr) {
  try {
    fs.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p)
  }
}

function rmkidsSync (p) {
  fs.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f))
  })
  fs.rmdirSync(p)
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"fs":"liyfGr","path":29}],148:[function(require,module,exports){
;(function(exports) {

// export the class if we are in a Node-like system.
if (typeof module === 'object' && module.exports === exports)
  exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:(' + src[PRERELEASE] + ')' +
                   ')?)?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:(' + src[PRERELEASELOOSE] + ')' +
                        ')?)?)?';

// >=2.x, for example, means >=2.0.0-0
// <1.x would be the same as "<1.0.0-0", though.
var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  ;
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  var r = loose ? re[LOOSE] : re[FULL];
  return (r.test(version)) ? new SemVer(version, loose) : null;
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version, loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  }

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  ;
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      return (/^[0-9]+$/.test(id)) ? +id : id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.inspect = function() {
  return '<SemVer "' + this + '">';
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  ;
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.lenth && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    ;
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

SemVer.prototype.inc = function(release) {
  switch (release) {
    case 'major':
      this.major++;
      this.minor = -1;
    case 'minor':
      this.minor++;
      this.patch = -1;
    case 'patch':
      this.patch++;
      this.prerelease = [];
      break;
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  return this;
};

exports.inc = inc;
function inc(version, release, loose) {
  try {
    return new SemVer(version, loose).inc(release).version;
  } catch (er) {
    return null;
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(b);
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===': ret = a === b; break;
    case '!==': ret = a !== b; break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  ;
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else {
    this.semver = new SemVer(m[2], this.loose);

    // <1.2.3-rc DOES allow 1.2.3-beta (has prerelease)
    // >=1.2.3 DOES NOT allow 1.2.3-beta
    // <=1.2.3 DOES allow 1.2.3-beta
    // However, <1.2.3 does NOT allow 1.2.3-beta,
    // even though `1.2.3-beta < 1.2.3`
    // The assumption is that the 1.2.3 version has something you
    // *don't* want, so we push the prerelease down to the minimum.
    if (this.operator === '<' && !this.semver.prerelease.length) {
      this.semver.prerelease = ['0'];
      this.semver.format();
    }
  }
};

Comparator.prototype.inspect = function() {
  return '<SemVer Comparator "' + this + '">';
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  ;
  return (this.semver === ANY) ? true :
         cmp(version, this.operator, this.semver, this.loose);
};


exports.Range = Range;
function Range(range, loose) {
  if ((range instanceof Range) && range.loose === loose)
    return range;

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.inspect = function() {
  return '<SemVer Range "' + this.range + '">';
};

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  ;
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  ;
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  ;

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  ;
  comp = replaceCarets(comp, loose);
  ;
  comp = replaceTildes(comp, loose);
  ;
  comp = replaceXRanges(comp, loose);
  ;
  comp = replaceStars(comp, loose);
  ;
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    ;
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0-0 <' + (+M + 1) + '.0.0-0';
    else if (isX(p))
      // ~1.2 == >=1.2.0- <1.3.0-
      ret = '>=' + M + '.' + m + '.0-0 <' + M + '.' + (+m + 1) + '.0-0';
    else if (pr) {
      ;
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0-0';
    } else
      // ~1.2.3 == >=1.2.3-0 <1.3.0-0
      ret = '>=' + M + '.' + m + '.' + p + '-0' +
            ' <' + M + '.' + (+m + 1) + '.0-0';

    ;
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    ;
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0-0 <' + (+M + 1) + '.0.0-0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0-0 <' + M + '.' + (+m + 1) + '.0-0';
      else
        ret = '>=' + M + '.' + m + '.0-0 <' + (+M + 1) + '.0.0-0';
    } else if (pr) {
      ;
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '=' + M + '.' + m + '.' + p + pr;
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0-0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0-0';
    } else {
      if (M === '0') {
        if (m === '0')
          ret = '=' + M + '.' + m + '.' + p;
        else
          ret = '>=' + M + '.' + m + '.' + p + '-0' +
                ' <' + M + '.' + (+m + 1) + '.0-0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + '-0' +
              ' <' + (+M + 1) + '.0.0-0';
    }

    ;
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  ;
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    ;
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (gtlt && anyX) {
      // replace X with 0, and then append the -0 min-prerelease
      if (xM)
        M = 0;
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0-0
        // >1.2 => >=1.3.0-0
        // >1.2.3 => >= 1.2.4-0
        gtlt = '>=';
        if (xM) {
          // no change
        } else if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      }


      ret = gtlt + M + '.' + m + '.' + p + '-0';
    } else if (xM) {
      // allow any
      ret = '*';
    } else if (xm) {
      // append '-0' onto the version, otherwise
      // '1.x.x' matches '2.0.0-beta', since the tag
      // *lowers* the version value
      ret = '>=' + M + '.0.0-0 <' + (+M + 1) + '.0.0-0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0-0 <' + M + '.' + (+m + 1) + '.0-0';
    }

    ;

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  ;
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0-0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0-0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0-0 <3.5.0-0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0-0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0-0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0-0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0-0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;
  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }
  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  return versions.filter(function(version) {
    return satisfies(version, range, loose);
  }).sort(function(a, b) {
    return rcompare(a, b, loose);
  })[0] || null;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

// Use the define() function if we're in AMD land
if (typeof define === 'function' && define.amd)
  define(exports);

})(
  typeof exports === 'object' ? exports :
  typeof define === 'function' && define.amd ? {} :
  semver = {}
);

},{}],149:[function(require,module,exports){
(function (process){

/*
usage:

// do something to a list of things
asyncMap(myListOfStuff, function (thing, cb) { doSomething(thing.foo, cb) }, cb)
// do more than one thing to each item
asyncMap(list, fooFn, barFn, cb)

*/

module.exports = asyncMap

function asyncMap () {
  var steps = Array.prototype.slice.call(arguments)
    , list = steps.shift() || []
    , cb_ = steps.pop()
  if (typeof cb_ !== "function") throw new Error(
    "No callback provided to asyncMap")
  if (!list) return cb_(null, [])
  if (!Array.isArray(list)) list = [list]
  var n = steps.length
    , data = [] // 2d array
    , errState = null
    , l = list.length
    , a = l * n
  if (!a) return cb_(null, [])
  function cb (er) {
    if (errState) return
    var argLen = arguments.length
    for (var i = 1; i < argLen; i ++) if (arguments[i] !== undefined) {
      data[i - 1] = (data[i - 1] || []).concat(arguments[i])
    }
    // see if any new things have been added.
    if (list.length > l) {
      var newList = list.slice(l)
      a += (list.length - l) * n
      l = list.length
      process.nextTick(function () {
        newList.forEach(function (ar) {
          steps.forEach(function (fn) { fn(ar, cb) })
        })
      })
    }

    if (er || --a === 0) {
      errState = er
      cb_.apply(null, [errState].concat(data))
    }
  }
  // expect the supplied cb function to be called
  // "n" times for each thing in the array.
  list.forEach(function (ar) {
    steps.forEach(function (fn) { fn(ar, cb) })
  })
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27}],150:[function(require,module,exports){
module.exports = bindActor
function bindActor () {
  var args = 
        Array.prototype.slice.call
        (arguments) // jswtf.
    , obj = null
    , fn
  if (typeof args[0] === "object") {
    obj = args.shift()
    fn = args.shift()
    if (typeof fn === "string")
      fn = obj[ fn ]
  } else fn = args.shift()
  return function (cb) {
    fn.apply(obj, args.concat(cb)) }
}

},{}],151:[function(require,module,exports){
module.exports = chain
var bindActor = require("./bind-actor.js")
chain.first = {} ; chain.last = {}
function chain (things, cb) {
  var res = []
  ;(function LOOP (i, len) {
    if (i >= len) return cb(null,res)
    if (Array.isArray(things[i]))
      things[i] = bindActor.apply(null,
        things[i].map(function(i){
          return (i===chain.first) ? res[0]
           : (i===chain.last)
             ? res[res.length - 1] : i }))
    if (!things[i]) return LOOP(i + 1, len)
    things[i](function (er, data) {
      if (er) return cb(er, res)
      if (data !== undefined) res = res.concat(data)
      LOOP(i + 1, len)
    })
  })(0, things.length) }

},{"./bind-actor.js":150}],152:[function(require,module,exports){
exports.asyncMap = require("./async-map")
exports.bindActor = require("./bind-actor")
exports.chain = require("./chain")

},{"./async-map":149,"./bind-actor":150,"./chain":151}],153:[function(require,module,exports){
(function (process){
module.exports = uidNumber

// This module calls into get-uid-gid.js, which sets the
// uid and gid to the supplied argument, in order to find out their
// numeric value.  This can't be done in the main node process,
// because otherwise node would be running as that user from this
// point on.

var child_process = require("child_process")
  , path = require("path")
  , uidSupport = process.getuid && process.setuid
  , uidCache = {}
  , gidCache = {}

function uidNumber (uid, gid, cb) {
  if (!uidSupport) return cb()
  if (typeof cb !== "function") cb = gid, gid = null
  if (typeof cb !== "function") cb = uid, uid = null
  if (gid == null) gid = process.getgid()
  if (uid == null) uid = process.getuid()
  if (!isNaN(gid)) gid = uidCache[gid] = +gid
  if (!isNaN(uid)) uid = uidCache[uid] = +uid

  if (uidCache.hasOwnProperty(uid)) uid = uidCache[uid]
  if (gidCache.hasOwnProperty(gid)) gid = gidCache[gid]

  if (typeof gid === "number" && typeof uid === "number") {
    return process.nextTick(cb.bind(null, null, uid, gid))
  }

  var getter = require.resolve("./get-uid-gid.js")

  child_process.execFile( process.execPath
                        , [getter, uid, gid]
                        , function (code, out, err) {
    if (er) return cb(new Error("could not get uid/gid\n" + err))
    try {
      out = JSON.parse(out+"")
    } catch (ex) {
      return cb(ex)
    }

    if (out.error) {
      var er = new Error(out.error)
      er.errno = out.errno
      return cb(er)
    }

    if (isNaN(out.uid) || isNaN(out.gid)) return cb(new Error(
      "Could not get uid/gid: "+JSON.stringify(out)))

    cb(null, uidCache[uid] = +out.uid, uidCache[gid] = +out.gid)
  })
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"child_process":"liyfGr","path":29}],154:[function(require,module,exports){
(function (process){
module.exports = which
which.sync = whichSync

var path = require("path")
  , fs
  , COLON = process.platform === "win32" ? ";" : ":"
  , isExe

try {
  fs = require("graceful-fs")
} catch (ex) {
  fs = require("fs")
}

if (process.platform == "win32") {
  // On windows, there is no good way to check that a file is executable
  isExe = function isExe () { return true }
} else {
  isExe = function isExe (mod, uid, gid) {
    //console.error(mod, uid, gid);
    //console.error("isExe?", (mod & 0111).toString(8))
    var ret = (mod & 0001)
        || (mod & 0010) && process.getgid && gid === process.getgid()
        || (mod & 0100) && process.getuid && uid === process.getuid()
    //console.error("isExe?", ret)
    return ret
  }
}



function which (cmd, cb) {
  if (isAbsolute(cmd)) return cb(null, cmd)
  var pathEnv = (process.env.PATH || "").split(COLON)
    , pathExt = [""]
  if (process.platform === "win32") {
    pathEnv.push(process.cwd())
    pathExt = (process.env.PATHEXT || ".EXE").split(COLON)
    if (cmd.indexOf(".") !== -1) pathExt.unshift("")
  }
  //console.error("pathEnv", pathEnv)
  ;(function F (i, l) {
    if (i === l) return cb(new Error("not found: "+cmd))
    var p = path.resolve(pathEnv[i], cmd)
    ;(function E (ii, ll) {
      if (ii === ll) return F(i + 1, l)
      var ext = pathExt[ii]
      //console.error(p + ext)
      fs.stat(p + ext, function (er, stat) {
        if (!er &&
            stat &&
            stat.isFile() &&
            isExe(stat.mode, stat.uid, stat.gid)) {
          //console.error("yes, exe!", p + ext)
          return cb(null, p + ext)
        }
        return E(ii + 1, ll)
      })
    })(0, pathExt.length)
  })(0, pathEnv.length)
}

function whichSync (cmd) {
  if (isAbsolute(cmd)) return cmd
  var pathEnv = (process.env.PATH || "").split(COLON)
    , pathExt = [""]
  if (process.platform === "win32") {
    pathEnv.push(process.cwd())
    pathExt = (process.env.PATHEXT || ".EXE").split(COLON)
    if (cmd.indexOf(".") !== -1) pathExt.unshift("")
  }
  for (var i = 0, l = pathEnv.length; i < l; i ++) {
    var p = path.join(pathEnv[i], cmd)
    for (var j = 0, ll = pathExt.length; j < ll; j ++) {
      var cur = p + pathExt[j]
      var stat
      try { stat = fs.statSync(cur) } catch (ex) {}
      if (stat &&
          stat.isFile() &&
          isExe(stat.mode, stat.uid, stat.gid)) return cur
    }
  }
  throw new Error("not found: "+cmd)
}

var isAbsolute = process.platform === "win32" ? absWin : absUnix

function absWin (p) {
  if (absUnix(p)) return true
  // pull off the device/UNC bit from a windows path.
  // from node's lib/path.js
  var splitDeviceRe =
        /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?([\\\/])?/
    , result = splitDeviceRe.exec(p)
    , device = result[1] || ''
    , isUnc = device && device.charAt(1) !== ':'
    , isAbsolute = !!result[2] || isUnc // UNC paths are always absolute

  return isAbsolute
}

function absUnix (p) {
  return p.charAt(0) === "/" || p === ""
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"fs":"liyfGr","graceful-fs":121,"path":29}],155:[function(require,module,exports){
(function (process){
// defaults, types, and shorthands.


var path = require("path")
  , url = require("url")
  , Stream = require("stream").Stream
  , semver = require("semver")
  , stableFamily = semver.parse(process.version)
  , nopt = require("nopt")
  , os = require('os')
  , osenv = require("osenv")

try {
  var log = require("npmlog")
} catch (er) {
  var util = require('util')
  var log = { warn: function (m) {
    console.warn(m + util.format.apply(util, [].slice.call(arguments, 1)))
  } }
}

exports.Octal = Octal
function Octal () {}
function validateOctal (data, k, val) {
  // must be either an integer or an octal string.
  if (typeof val === "number") {
    data[k] = val
    return true
  }

  if (typeof val === "string") {
    if (val.charAt(0) !== "0" || isNaN(val)) return false
    data[k] = parseInt(val, 8).toString(8)
  }
}

function validateSemver (data, k, val) {
  if (!semver.valid(val)) return false
  data[k] = semver.valid(val)
}

function validateStream (data, k, val) {
  if (!(val instanceof Stream)) return false
  data[k] = val
}

nopt.typeDefs.semver = { type: semver, validate: validateSemver }
nopt.typeDefs.Octal = { type: Octal, validate: validateOctal }
nopt.typeDefs.Stream = { type: Stream, validate: validateStream }

nopt.invalidHandler = function (k, val, type, data) {
  log.warn("invalid config", k + "=" + JSON.stringify(val))

  if (Array.isArray(type)) {
    if (type.indexOf(url) !== -1) type = url
    else if (type.indexOf(path) !== -1) type = path
  }

  switch (type) {
    case Octal:
      log.warn("invalid config", "Must be octal number, starting with 0")
      break
    case url:
      log.warn("invalid config", "Must be a full url with 'http://'")
      break
    case path:
      log.warn("invalid config", "Must be a valid filesystem path")
      break
    case Number:
      log.warn("invalid config", "Must be a numeric value")
      break
    case Stream:
      log.warn("invalid config", "Must be an instance of the Stream class")
      break
  }
}

if (!stableFamily || (+stableFamily.minor % 2)) stableFamily = null
else stableFamily = stableFamily.major + "." + stableFamily.minor

var defaults

var temp = osenv.tmpdir()
var home = osenv.home()

var uidOrPid = process.getuid ? process.getuid() : process.pid

if (home) process.env.HOME = home
else home = path.resolve(temp, "npm-" + uidOrPid)

var cacheExtra = process.platform === "win32" ? "npm-cache" : ".npm"
var cacheRoot = process.platform === "win32" && process.env.APPDATA || home
var cache = path.resolve(cacheRoot, cacheExtra)


var globalPrefix
Object.defineProperty(exports, "defaults", {get: function () {
  if (defaults) return defaults

  if (process.env.PREFIX) {
    globalPrefix = process.env.PREFIX
  } else if (process.platform === "win32") {
    // c:\node\node.exe --> prefix=c:\node\
    globalPrefix = path.dirname(process.execPath)
  } else {
    // /usr/local/bin/node --> prefix=/usr/local
    globalPrefix = path.dirname(path.dirname(process.execPath))

    // destdir only is respected on Unix
    if (process.env.DESTDIR) {
      globalPrefix = path.join(process.env.DESTDIR, globalPrefix)
    }
  }

  return defaults =
    { "always-auth" : false
    , "bin-links" : true
    , browser : null

    , ca: null

    , cache : cache

    , "cache-lock-stale": 60000
    , "cache-lock-retries": 10
    , "cache-lock-wait": 10000

    , "cache-max": Infinity
    , "cache-min": 10

    , cert: null

    , color : true
    , depth: Infinity
    , description : true
    , dev : false
    , editor : osenv.editor()
    , email: ""
    , "engine-strict": false
    , force : false

    , "fetch-retries": 2
    , "fetch-retry-factor": 10
    , "fetch-retry-mintimeout": 10000
    , "fetch-retry-maxtimeout": 60000

    , git: "git"
    , "git-tag-version": true

    , global : false
    , globalconfig : path.resolve(globalPrefix, "etc", "npmrc")
    , group : process.platform === "win32" ? 0
            : process.env.SUDO_GID || (process.getgid && process.getgid())
    , heading: "npm"
    , "ignore-scripts": false
    , "init-module": path.resolve(home, '.npm-init.js')
    , "init.author.name" : ""
    , "init.author.email" : ""
    , "init.author.url" : ""
    , "init.license": "ISC"
    , json: false
    , key: null
    , link: false
    , "local-address" : undefined
    , loglevel : "http"
    , logstream : process.stderr
    , long : false
    , message : "%s"
    , "node-version" : process.version
    , npat : false
    , "onload-script" : false
    , optional: true
    , parseable : false
    , prefix : globalPrefix
    , production: process.env.NODE_ENV === "production"
    , "proprietary-attribs": true
    , proxy : process.env.HTTP_PROXY || process.env.http_proxy || null
    , "https-proxy" : process.env.HTTPS_PROXY || process.env.https_proxy ||
                      process.env.HTTP_PROXY || process.env.http_proxy || null
    , "user-agent" : "npm/{npm-version} "
                     + "node/{node-version} "
                     + "{platform} "
                     + "{arch}"
    , "rebuild-bundle" : true
    , registry : "https://registry.npmjs.org/"
    , rollback : true
    , save : false
    , "save-bundle": false
    , "save-dev" : false
    , "save-exact" : false
    , "save-optional" : false
    , "save-prefix": "^"
    , searchopts: ""
    , searchexclude: null
    , searchsort: "name"
    , shell : osenv.shell()
    , shrinkwrap: true
    , "sign-git-tag": false
    , spin: true
    , "strict-ssl": true
    , tag : "latest"
    , tmp : temp
    , unicode : true
    , "unsafe-perm" : process.platform === "win32"
                    || process.platform === "cygwin"
                    || !( process.getuid && process.setuid
                       && process.getgid && process.setgid )
                    || process.getuid() !== 0
    , usage : false
    , user : process.platform === "win32" ? 0 : "nobody"
    , username : ""
    , userconfig : path.resolve(home, ".npmrc")
    , umask: 022
    , version : false
    , versions : false
    , viewer: process.platform === "win32" ? "browser" : "man"

    , _exit : true
    }
}})

exports.types =
  { "always-auth" : Boolean
  , "bin-links": Boolean
  , browser : [null, String]
  , ca: [null, String, Array]
  , cache : path
  , "cache-lock-stale": Number
  , "cache-lock-retries": Number
  , "cache-lock-wait": Number
  , "cache-max": Number
  , "cache-min": Number
  , cert: [null, String]
  , color : ["always", Boolean]
  , depth : Number
  , description : Boolean
  , dev : Boolean
  , editor : String
  , email: [null, String]
  , "engine-strict": Boolean
  , force : Boolean
  , "fetch-retries": Number
  , "fetch-retry-factor": Number
  , "fetch-retry-mintimeout": Number
  , "fetch-retry-maxtimeout": Number
  , git: String
  , "git-tag-version": Boolean
  , global : Boolean
  , globalconfig : path
  , group : [Number, String]
  , "https-proxy" : [null, url]
  , "user-agent" : String
  , "heading": String
  , "ignore-scripts": Boolean
  , "init-module": path
  , "init.author.name" : String
  , "init.author.email" : String
  , "init.author.url" : ["", url]
  , "init.license": String
  , json: Boolean
  , key: [null, String]
  , link: Boolean
  // local-address must be listed as an IP for a local network interface
  // must be IPv4 due to node bug
  , "local-address" : Object.keys(os.networkInterfaces()).map(function (nic) {
                   return os.networkInterfaces()[nic].filter(function (addr) {
                    return addr.family === "IPv4"
                   })
                   .map(function (addr) {
                     return addr.address
                   })
                 }).reduce(function (curr, next) {
                  return curr.concat(next)
                 }, [])
  , loglevel : ["silent","win","error","warn","http","info","verbose","silly"]
  , logstream : Stream
  , long : Boolean
  , message: String
  , "node-version" : [null, semver]
  , npat : Boolean
  , "onload-script" : [null, String]
  , optional: Boolean
  , parseable : Boolean
  , prefix: path
  , production: Boolean
  , "proprietary-attribs": Boolean
  , proxy : [null, url]
  , "rebuild-bundle" : Boolean
  , registry : [null, url]
  , rollback : Boolean
  , save : Boolean
  , "save-bundle": Boolean
  , "save-dev" : Boolean
  , "save-exact" : Boolean
  , "save-optional" : Boolean
  , "save-prefix": String
  , searchopts : String
  , searchexclude: [null, String]
  , searchsort: [ "name", "-name"
                , "description", "-description"
                , "author", "-author"
                , "date", "-date"
                , "keywords", "-keywords" ]
  , shell : String
  , shrinkwrap: Boolean
  , "sign-git-tag": Boolean
  , spin: [Boolean, "always"]
  , "strict-ssl": Boolean
  , tag : String
  , tmp : path
  , unicode : Boolean
  , "unsafe-perm" : Boolean
  , usage : Boolean
  , user : [Number, String]
  , username : String
  , userconfig : path
  , umask: Octal
  , version : Boolean
  , versions : Boolean
  , viewer: String
  , _exit : Boolean
  , _password: String
  }

exports.shorthands =
  { s : ["--loglevel", "silent"]
  , d : ["--loglevel", "info"]
  , dd : ["--loglevel", "verbose"]
  , ddd : ["--loglevel", "silly"]
  , noreg : ["--no-registry"]
  , N : ["--no-registry"]
  , reg : ["--registry"]
  , "no-reg" : ["--no-registry"]
  , silent : ["--loglevel", "silent"]
  , verbose : ["--loglevel", "verbose"]
  , quiet: ["--loglevel", "warn"]
  , q: ["--loglevel", "warn"]
  , h : ["--usage"]
  , H : ["--usage"]
  , "?" : ["--usage"]
  , help : ["--usage"]
  , v : ["--version"]
  , f : ["--force"]
  , gangster : ["--force"]
  , gangsta : ["--force"]
  , desc : ["--description"]
  , "no-desc" : ["--no-description"]
  , "local" : ["--no-global"]
  , l : ["--long"]
  , m : ["--message"]
  , p : ["--parseable"]
  , porcelain : ["--parseable"]
  , g : ["--global"]
  , S : ["--save"]
  , D : ["--save-dev"]
  , E : ["--save-exact"]
  , O : ["--save-optional"]
  , y : ["--yes"]
  , n : ["--no-yes"]
  , B : ["--save-bundle"]
  }

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"))
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"nopt":109,"npmlog":160,"os":28,"osenv":164,"path":29,"semver":165,"stream":35,"url":43,"util":45}],156:[function(require,module,exports){
(function (process,Buffer,__dirname){
var ProtoList = require('proto-list')
  , path = require('path')
  , fs = require('fs')
  , ini = require('ini')
  , EE = require('events').EventEmitter
  , url = require('url')
  , http = require('http')

var exports = module.exports = function () {
  var args = [].slice.call(arguments)
    , conf = new ConfigChain()

  while(args.length) {
    var a = args.shift()
    if(a) conf.push
          ( 'string' === typeof a
            ? json(a)
            : a )
  }

  return conf
}

//recursively find a file...

var find = exports.find = function () {
  var rel = path.join.apply(null, [].slice.call(arguments))

  function find(start, rel) {
    var file = path.join(start, rel)
    try {
      fs.statSync(file)
      return file
    } catch (err) {
      if(path.dirname(start) !== start) // root
        return find(path.dirname(start), rel)
    }
  }
  return find(__dirname, rel)
}

var parse = exports.parse = function (content, file, type) {
  content = '' + content
  // if we don't know what it is, try json and fall back to ini
  // if we know what it is, then it must be that.
  if (!type) {
    try { return JSON.parse(content) }
    catch (er) { return ini.parse(content) }
  } else if (type === 'json') {
    if (this.emit) {
      try { return JSON.parse(content) }
      catch (er) { this.emit('error', er) }
    } else {
      return JSON.parse(content)
    }
  } else {
    return ini.parse(content)
  }
}

var json = exports.json = function () {
  var args = [].slice.call(arguments).filter(function (arg) { return arg != null })
  var file = path.join.apply(null, args)
  var content
  try {
    content = fs.readFileSync(file,'utf-8')
  } catch (err) {
    return
  }
  return parse(content, file, 'json')
}

var env = exports.env = function (prefix, env) {
  env = env || process.env
  var obj = {}
  var l = prefix.length
  for(var k in env) {
    if(k.indexOf(prefix) === 0)
      obj[k.substring(l)] = env[k]
  }

  return obj
}

exports.ConfigChain = ConfigChain
function ConfigChain () {
  EE.apply(this)
  ProtoList.apply(this, arguments)
  this._awaiting = 0
  this._saving = 0
  this.sources = {}
}

// multi-inheritance-ish
var extras = {
  constructor: { value: ConfigChain }
}
Object.keys(EE.prototype).forEach(function (k) {
  extras[k] = Object.getOwnPropertyDescriptor(EE.prototype, k)
})
ConfigChain.prototype = Object.create(ProtoList.prototype, extras)

ConfigChain.prototype.del = function (key, where) {
  // if not specified where, then delete from the whole chain, scorched
  // earth style
  if (where) {
    var target = this.sources[where]
    target = target && target.data
    if (!target) {
      return this.emit('error', new Error('not found '+where))
    }
    delete target[key]
  } else {
    for (var i = 0, l = this.list.length; i < l; i ++) {
      delete this.list[i][key]
    }
  }
  return this
}

ConfigChain.prototype.set = function (key, value, where) {
  var target

  if (where) {
    target = this.sources[where]
    target = target && target.data
    if (!target) {
      return this.emit('error', new Error('not found '+where))
    }
  } else {
    target = this.list[0]
    if (!target) {
      return this.emit('error', new Error('cannot set, no confs!'))
    }
  }
  target[key] = value
  return this
}

ConfigChain.prototype.get = function (key, where) {
  if (where) {
    where = this.sources[where]
    if (where) where = where.data
    if (where && Object.hasOwnProperty.call(where, key)) return where[key]
    return undefined
  }
  return this.list[0][key]
}

ConfigChain.prototype.save = function (where, type, cb) {
  if (typeof type === 'function') cb = type, type = null
  var target = this.sources[where]
  if (!target || !(target.path || target.source) || !target.data) {
    // TODO: maybe save() to a url target could be a PUT or something?
    // would be easy to swap out with a reddis type thing, too
    return this.emit('error', new Error('bad save target: '+where))
  }

  if (target.source) {
    var pref = target.prefix || ''
    Object.keys(target.data).forEach(function (k) {
      target.source[pref + k] = target.data[k]
    })
    return this
  }

  var type = type || target.type
  var data = target.data
  if (target.type === 'json') {
    data = JSON.stringify(data)
  } else {
    data = ini.stringify(data)
  }

  this._saving ++
  fs.writeFile(target.path, data, 'utf8', function (er) {
    this._saving --
    if (er) {
      if (cb) return cb(er)
      else return this.emit('error', er)
    }
    if (this._saving === 0) {
      if (cb) cb()
      this.emit('save')
    }
  }.bind(this))
  return this
}

ConfigChain.prototype.addFile = function (file, type, name) {
  name = name || file
  var marker = {__source__:name}
  this.sources[name] = { path: file, type: type }
  this.push(marker)
  this._await()
  fs.readFile(file, 'utf8', function (er, data) {
    if (er) this.emit('error', er)
    this.addString(data, file, type, marker)
  }.bind(this))
  return this
}

ConfigChain.prototype.addEnv = function (prefix, env, name) {
  name = name || 'env'
  var data = exports.env(prefix, env)
  this.sources[name] = { data: data, source: env, prefix: prefix }
  return this.add(data, name)
}

ConfigChain.prototype.addUrl = function (req, type, name) {
  this._await()
  var href = url.format(req)
  name = name || href
  var marker = {__source__:name}
  this.sources[name] = { href: href, type: type }
  this.push(marker)
  http.request(req, function (res) {
    var c = []
    var ct = res.headers['content-type']
    if (!type) {
      type = ct.indexOf('json') !== -1 ? 'json'
           : ct.indexOf('ini') !== -1 ? 'ini'
           : href.match(/\.json$/) ? 'json'
           : href.match(/\.ini$/) ? 'ini'
           : null
      marker.type = type
    }

    res.on('data', c.push.bind(c))
    .on('end', function () {
      this.addString(Buffer.concat(c), href, type, marker)
    }.bind(this))
    .on('error', this.emit.bind(this, 'error'))

  }.bind(this))
  .on('error', this.emit.bind(this, 'error'))
  .end()

  return this
}

ConfigChain.prototype.addString = function (data, file, type, marker) {
  data = this.parse(data, file, type)
  this.add(data, marker)
  return this
}

ConfigChain.prototype.add = function (data, marker) {
  if (marker && typeof marker === 'object') {
    var i = this.list.indexOf(marker)
    if (i === -1) {
      return this.emit('error', new Error('bad marker'))
    }
    this.splice(i, 1, data)
    marker = marker.__source__
    this.sources[marker] = this.sources[marker] || {}
    this.sources[marker].data = data
    // we were waiting for this.  maybe emit 'load'
    this._resolve()
  } else {
    if (typeof marker === 'string') {
      this.sources[marker] = this.sources[marker] || {}
      this.sources[marker].data = data
    }
    // trigger the load event if nothing was already going to do so.
    this._await()
    this.push(data)
    process.nextTick(this._resolve.bind(this))
  }
  return this
}

ConfigChain.prototype.parse = exports.parse

ConfigChain.prototype._await = function () {
  this._awaiting++
}

ConfigChain.prototype._resolve = function () {
  this._awaiting--
  if (this._awaiting === 0) this.emit('load', this)
}

}).call(this,require("/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),require("buffer").Buffer,"/node_modules/dat-transformer/node_modules/npm-installer/node_modules/npmconf/node_modules/config-chain")
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"buffer":10,"events":20,"fs":"liyfGr","http":21,"ini":158,"path":29,"proto-list":157,"url":43}],157:[function(require,module,exports){
module.exports=require(131)
},{}],158:[function(require,module,exports){
module.exports=require(124)
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27}],159:[function(require,module,exports){
module.exports=require(125)
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"fs":"liyfGr","path":29}],160:[function(require,module,exports){
module.exports=require(133)
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"ansi":161,"events":20,"util":45}],161:[function(require,module,exports){
module.exports=require(117)
},{"./newlines":162}],162:[function(require,module,exports){
module.exports=require(118)
},{"assert":7}],163:[function(require,module,exports){
module.exports=require(134)
},{}],164:[function(require,module,exports){
module.exports=require(135)
},{"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"child_process":"liyfGr","path":29}],165:[function(require,module,exports){
;(function(exports) {

// export the class if we are in a Node-like system.
if (typeof module === 'object' && module.exports === exports)
  exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:(' + src[PRERELEASE] + ')' +
                   ')?)?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:(' + src[PRERELEASELOOSE] + ')' +
                        ')?)?)?';

// >=2.x, for example, means >=2.0.0-0
// <1.x would be the same as "<1.0.0-0", though.
var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  ;
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  var r = loose ? re[LOOSE] : re[FULL];
  return (r.test(version)) ? new SemVer(version, loose) : null;
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version, loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  ;
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      return (/^[0-9]+$/.test(id)) ? +id : id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.inspect = function() {
  return '<SemVer "' + this + '">';
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  ;
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    ;
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release) {
  switch (release) {
    case 'premajor':
      this.inc('major');
      this.inc('pre');
      break;
    case 'preminor':
      this.inc('minor');
      this.inc('pre');
      break;
    case 'prepatch':
      this.inc('patch');
      this.inc('pre');
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch');
      this.inc('pre');
      break;
    case 'major':
      this.major++;
      this.minor = -1;
    case 'minor':
      this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publically.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  return this;
};

exports.inc = inc;
function inc(version, release, loose) {
  try {
    return new SemVer(version, loose).inc(release).version;
  } catch (er) {
    return null;
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(b);
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===': ret = a === b; break;
    case '!==': ret = a !== b; break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  ;
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else {
    this.semver = new SemVer(m[2], this.loose);

    // <1.2.3-rc DOES allow 1.2.3-beta (has prerelease)
    // >=1.2.3 DOES NOT allow 1.2.3-beta
    // <=1.2.3 DOES allow 1.2.3-beta
    // However, <1.2.3 does NOT allow 1.2.3-beta,
    // even though `1.2.3-beta < 1.2.3`
    // The assumption is that the 1.2.3 version has something you
    // *don't* want, so we push the prerelease down to the minimum.
    if (this.operator === '<' && !this.semver.prerelease.length) {
      this.semver.prerelease = ['0'];
      this.semver.format();
    }
  }
};

Comparator.prototype.inspect = function() {
  return '<SemVer Comparator "' + this + '">';
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  ;
  return (this.semver === ANY) ? true :
         cmp(version, this.operator, this.semver, this.loose);
};


exports.Range = Range;
function Range(range, loose) {
  if ((range instanceof Range) && range.loose === loose)
    return range;

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.inspect = function() {
  return '<SemVer Range "' + this.range + '">';
};

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  ;
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  ;
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  ;

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  ;
  comp = replaceCarets(comp, loose);
  ;
  comp = replaceTildes(comp, loose);
  ;
  comp = replaceXRanges(comp, loose);
  ;
  comp = replaceStars(comp, loose);
  ;
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    ;
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0-0 <' + (+M + 1) + '.0.0-0';
    else if (isX(p))
      // ~1.2 == >=1.2.0- <1.3.0-
      ret = '>=' + M + '.' + m + '.0-0 <' + M + '.' + (+m + 1) + '.0-0';
    else if (pr) {
      ;
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0-0';
    } else
      // ~1.2.3 == >=1.2.3-0 <1.3.0-0
      ret = '>=' + M + '.' + m + '.' + p + '-0' +
            ' <' + M + '.' + (+m + 1) + '.0-0';

    ;
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    ;
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0-0 <' + (+M + 1) + '.0.0-0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0-0 <' + M + '.' + (+m + 1) + '.0-0';
      else
        ret = '>=' + M + '.' + m + '.0-0 <' + (+M + 1) + '.0.0-0';
    } else if (pr) {
      ;
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '=' + M + '.' + m + '.' + p + pr;
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0-0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0-0';
    } else {
      if (M === '0') {
        if (m === '0')
          ret = '=' + M + '.' + m + '.' + p;
        else
          ret = '>=' + M + '.' + m + '.' + p + '-0' +
                ' <' + M + '.' + (+m + 1) + '.0-0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + '-0' +
              ' <' + (+M + 1) + '.0.0-0';
    }

    ;
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  ;
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    ;
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (gtlt && anyX) {
      // replace X with 0, and then append the -0 min-prerelease
      if (xM)
        M = 0;
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0-0
        // >1.2 => >=1.3.0-0
        // >1.2.3 => >= 1.2.4-0
        gtlt = '>=';
        if (xM) {
          // no change
        } else if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      }


      ret = gtlt + M + '.' + m + '.' + p + '-0';
    } else if (xM) {
      // allow any
      ret = '*';
    } else if (xm) {
      // append '-0' onto the version, otherwise
      // '1.x.x' matches '2.0.0-beta', since the tag
      // *lowers* the version value
      ret = '>=' + M + '.0.0-0 <' + (+M + 1) + '.0.0-0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0-0 <' + M + '.' + (+m + 1) + '.0-0';
    }

    ;

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  ;
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0-0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0-0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0-0 <3.5.0-0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0-0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0-0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0-0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0-0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;
  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }
  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  return versions.filter(function(version) {
    return satisfies(version, range, loose);
  }).sort(function(a, b) {
    return rcompare(a, b, loose);
  })[0] || null;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

// Use the define() function if we're in AMD land
if (typeof define === 'function' && define.amd)
  define(exports);

})(
  typeof exports === 'object' ? exports :
  typeof define === 'function' && define.amd ? {} :
  semver = {}
);

},{}],166:[function(require,module,exports){
arguments[4][132][0].apply(exports,arguments)
},{"./config-defs.js":155,"/Users/jbenet/git/dat/transformer/transformer-website/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":27,"buffer":10,"config-chain":156,"fs":"liyfGr","inherits":105,"ini":158,"mkdirp":159,"nopt":109,"once":163,"path":29}],167:[function(require,module,exports){
/*
string.js - Copyright (C) 2012-2013, JP Richardson <jprichardson@gmail.com>
*/

!(function() {
  "use strict";

  var VERSION = '1.8.0';

  var ENTITIES = {};

//******************************************************************************
// Added an initialize function which is essentially the code from the S
// constructor.  Now, the S constructor calls this and a new method named
// setValue calls it as well.  The setValue function allows constructors for
// modules that extend string.js to set the initial value of an object without
// knowing the internal workings of string.js.
//
// Also, all methods which return a new S object now call:
//
//      return new this.constructor(s);
//
// instead of:
//
//      return new S(s);
//
// This allows extended objects to keep their proper instanceOf and constructor.
//******************************************************************************

  function initialize (object, s) {
    if (s !== null && s !== undefined) {
      if (typeof s === 'string')
        object.s = s;
      else
        object.s = s.toString();
    } else {
      object.s = s; //null or undefined
    }

    object.orig = s; //original object, currently only used by toCSV() and toBoolean()

    if (s !== null && s !== undefined) {
      if (object.__defineGetter__) {
        object.__defineGetter__('length', function() {
          return object.s.length;
        })
      } else {
        object.length = s.length;
      }
    } else {
      object.length = -1;
    }
  }

  function S(s) {
  	initialize(this, s);
  }

  var __nsp = String.prototype;
  var __sp = S.prototype = {

    between: function(left, right) {
      var s = this.s;
      var startPos = s.indexOf(left);
      var endPos = s.indexOf(right, startPos + left.length);
      if (endPos == -1 && right != null) 
        return new this.constructor('')
      else if (endPos == -1 && right == null)
        return new this.constructor(s.substring(startPos + left.length))
      else 
        return new this.constructor(s.slice(startPos + left.length, endPos));
    },

    //# modified slightly from https://github.com/epeli/underscore.string
    camelize: function() {
      var s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function(mathc, sep, c) {
        return (c ? c.toUpperCase() : '');
      });
      return new this.constructor(s);
    },

    capitalize: function() {
      return new this.constructor(this.s.substr(0, 1).toUpperCase() + this.s.substring(1).toLowerCase());
    },

    charAt: function(index) {
      return this.s.charAt(index);
    },

    chompLeft: function(prefix) {
      var s = this.s;
      if (s.indexOf(prefix) === 0) {
         s = s.slice(prefix.length);
         return new this.constructor(s);
      } else {
        return this;
      }
    },

    chompRight: function(suffix) {
      if (this.endsWith(suffix)) {
        var s = this.s;
        s = s.slice(0, s.length - suffix.length);
        return new this.constructor(s);
      } else {
        return this;
      }
    },

    //#thanks Google
    collapseWhitespace: function() {
      var s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
      return new this.constructor(s);
    },

    contains: function(ss) {
      return this.s.indexOf(ss) >= 0;
    },

    count: function(ss) {
      var count = 0
        , pos = this.s.indexOf(ss)

      while (pos >= 0) {
        count += 1
        pos = this.s.indexOf(ss, pos + 1)
      }

      return count
    },

    //#modified from https://github.com/epeli/underscore.string
    dasherize: function() {
      var s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
      return new this.constructor(s);
    },

    decodeHtmlEntities: function() { //https://github.com/substack/node-ent/blob/master/index.js
      var s = this.s;
      s = s.replace(/&#(\d+);?/g, function (_, code) {
        return String.fromCharCode(code);
      })
      .replace(/&#[xX]([A-Fa-f0-9]+);?/g, function (_, hex) {
        return String.fromCharCode(parseInt(hex, 16));
      })
      .replace(/&([^;\W]+;?)/g, function (m, e) {
        var ee = e.replace(/;$/, '');
        var target = ENTITIES[e] || (e.match(/;$/) && ENTITIES[ee]);
            
        if (typeof target === 'number') {
          return String.fromCharCode(target);
        }
        else if (typeof target === 'string') {
          return target;
        }
        else {
          return m;
        }
      })

      return new this.constructor(s);
    },

    endsWith: function(suffix) {
      var l  = this.s.length - suffix.length;
      return l >= 0 && this.s.indexOf(suffix, l) === l;
    },

    escapeHTML: function() { //from underscore.string
      return new this.constructor(this.s.replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; }));
    },

    ensureLeft: function(prefix) {
      var s = this.s;
      if (s.indexOf(prefix) === 0) {
        return this;
      } else {
        return new this.constructor(prefix + s);
      }
    },

    ensureRight: function(suffix) {
      var s = this.s;
      if (this.endsWith(suffix))  {
        return this;
      } else {
        return new this.constructor(s + suffix);
      }
    },

    humanize: function() { //modified from underscore.string
      if (this.s === null || this.s === undefined)
        return new this.constructor('')
      var s = this.underscore().replace(/_id$/,'').replace(/_/g, ' ').trim().capitalize()
      return new this.constructor(s)
    },

    isAlpha: function() {
      return !/[^a-z\xC0-\xFF]/.test(this.s.toLowerCase());
    },

    isAlphaNumeric: function() {
      return !/[^0-9a-z\xC0-\xFF]/.test(this.s.toLowerCase());
    },

    isEmpty: function() {
      return this.s === null || this.s === undefined ? true : /^[\s\xa0]*$/.test(this.s);
    },

    isLower: function() {
      return this.isAlpha() && this.s.toLowerCase() === this.s;
    },

    isNumeric: function() {
      return !/[^0-9]/.test(this.s);
    },

    isUpper: function() {
      return this.isAlpha() && this.s.toUpperCase() === this.s;
    },

    left: function(N) {
      if (N >= 0) {
        var s = this.s.substr(0, N);
        return new this.constructor(s);
      } else {
        return this.right(-N);
      }
    },
    
    lines: function() { //convert windows newlines to unix newlines then convert to an Array of lines
      return this.replaceAll('\r\n', '\n').s.split('\n');
    },

    pad: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      len = len - this.s.length;
      var left = Array(Math.ceil(len / 2) + 1).join(ch);
      var right = Array(Math.floor(len / 2) + 1).join(ch);
      return new this.constructor(left + this.s + right);
    },

    padLeft: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(Array(len - this.s.length + 1).join(ch) + this.s);
    },

    padRight: function(len, ch) { //https://github.com/component/pad
      if (ch == null) ch = ' ';
      if (this.s.length >= len) return new this.constructor(this.s);
      return new this.constructor(this.s + Array(len - this.s.length + 1).join(ch));
    },

    parseCSV: function(delimiter, qualifier, escape, lineDelimiter) { //try to parse no matter what
      delimiter = delimiter || ',';
      escape = escape || '\\'
      if (typeof qualifier == 'undefined')
        qualifier = '"';

      var i = 0, fieldBuffer = [], fields = [], len = this.s.length, inField = false, self = this;
      var ca = function(i){return self.s.charAt(i)};
      if (typeof lineDelimiter !== 'undefined') var rows = [];

      if (!qualifier)
        inField = true;

      while (i < len) {
        var current = ca(i);
        switch (current) {
          case escape:
          //fix for issues #32 and #35
          if (inField && ((escape !== qualifier) || ca(i+1) === qualifier)) {
              i += 1;
              fieldBuffer.push(ca(i));
              break;
          }
          if (escape !== qualifier) break;
          case qualifier:
            inField = !inField;
            break;
          case delimiter:
            if (inField && qualifier)
              fieldBuffer.push(current);
            else {
              fields.push(fieldBuffer.join(''))
              fieldBuffer.length = 0;
            }
            break;
          case lineDelimiter:
            if (inField) {
                fieldBuffer.push(current);
            } else {
                if (rows) {
                    fields.push(fieldBuffer.join(''))
                    rows.push(fields);
                    fields = [];
                    fieldBuffer.length = 0;
                }
            }
            break;
          default:
            if (inField)
              fieldBuffer.push(current);
            break;
        }
        i += 1;
      }

      fields.push(fieldBuffer.join(''));
      if (rows) {
        rows.push(fields);
        return rows;
      }
      return fields;
    },

    replaceAll: function(ss, r) {
      //var s = this.s.replace(new RegExp(ss, 'g'), r);
      var s = this.s.split(ss).join(r)
      return new this.constructor(s);
    },

    right: function(N) {
      if (N >= 0) {
        var s = this.s.substr(this.s.length - N, N);
        return new this.constructor(s);
      } else {
        return this.left(-N);
      }
    },

    setValue: function (s) {
	  initialize(this, s);
	  return this;
    },

    slugify: function() {
      var sl = (new S(this.s.replace(/[^\w\s-]/g, '').toLowerCase())).dasherize().s;
      if (sl.charAt(0) === '-')
        sl = sl.substr(1);
      return new this.constructor(sl);
    },

    startsWith: function(prefix) {
      return this.s.lastIndexOf(prefix, 0) === 0;
    },

    stripPunctuation: function() {
      //return new this.constructor(this.s.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      return new this.constructor(this.s.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
    },

    stripTags: function() { //from sugar.js
      var s = this.s, args = arguments.length > 0 ? arguments : [''];
      multiArgs(args, function(tag) {
        s = s.replace(RegExp('<\/?' + tag + '[^<>]*>', 'gi'), '');
      });
      return new this.constructor(s);
    },

    template: function(values, opening, closing) {
      var s = this.s
      var opening = opening || Export.TMPL_OPEN
      var closing = closing || Export.TMPL_CLOSE

      var open = opening.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$')
      var close = closing.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$')
      var r = new RegExp(open + '(.+?)' + close, 'g')
        //, r = /\{\{(.+?)\}\}/g
      var matches = s.match(r) || [];

      matches.forEach(function(match) {
        var key = match.substring(opening.length, match.length - closing.length);//chop {{ and }}
        if (typeof values[key] != 'undefined')
          s = s.replace(match, values[key]);
      });
      return new this.constructor(s);
    },

    times: function(n) {
      return new this.constructor(new Array(n + 1).join(this.s));
    },

    toBoolean: function() {
      if (typeof this.orig === 'string') {
        var s = this.s.toLowerCase();
        return s === 'true' || s === 'yes' || s === 'on' || s === '1';
      } else
        return this.orig === true || this.orig === 1;
    },

    toFloat: function(precision) {
      var num = parseFloat(this.s)
      if (precision)
        return parseFloat(num.toFixed(precision))
      else
        return num
    },

    toInt: function() { //thanks Google
      // If the string starts with '0x' or '-0x', parse as hex.
      return /^\s*-?0x/i.test(this.s) ? parseInt(this.s, 16) : parseInt(this.s, 10)
    },

    trim: function() {
      var s;
      if (typeof __nsp.trim === 'undefined') 
        s = this.s.replace(/(^\s*|\s*$)/g, '')
      else 
        s = this.s.trim()
      return new this.constructor(s);
    },

    trimLeft: function() {
      var s;
      if (__nsp.trimLeft)
        s = this.s.trimLeft();
      else
        s = this.s.replace(/(^\s*)/g, '');
      return new this.constructor(s);
    },

    trimRight: function() {
      var s;
      if (__nsp.trimRight)
        s = this.s.trimRight();
      else
        s = this.s.replace(/\s+$/, '');
      return new this.constructor(s);
    },

    truncate: function(length, pruneStr) { //from underscore.string, author: github.com/rwz
      var str = this.s;

      length = ~~length;
      pruneStr = pruneStr || '...';

      if (str.length <= length) return new this.constructor(str);

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = new S(template.slice(0, template.length-1)).trimRight().s;

      return (template+pruneStr).length > str.length ? new S(str) : new S(str.slice(0, template.length)+pruneStr);
    },

    toCSV: function() {
      var delim = ',', qualifier = '"', escape = '\\', encloseNumbers = true, keys = false;
      var dataArray = [];

      function hasVal(it) {
        return it !== null && it !== '';
      }

      if (typeof arguments[0] === 'object') {
        delim = arguments[0].delimiter || delim;
        delim = arguments[0].separator || delim;
        qualifier = arguments[0].qualifier || qualifier;
        encloseNumbers = !!arguments[0].encloseNumbers;
        escape = arguments[0].escape || escape;
        keys = !!arguments[0].keys;
      } else if (typeof arguments[0] === 'string') {
        delim = arguments[0];
      }

      if (typeof arguments[1] === 'string')
        qualifier = arguments[1];

      if (arguments[1] === null)
        qualifier = null;

       if (this.orig instanceof Array)
        dataArray  = this.orig;
      else { //object
        for (var key in this.orig)
          if (this.orig.hasOwnProperty(key))
            if (keys)
              dataArray.push(key);
            else
              dataArray.push(this.orig[key]);
      }

      var rep = escape + qualifier;
      var buildString = [];
      for (var i = 0; i < dataArray.length; ++i) {
        var shouldQualify = hasVal(qualifier)
        if (typeof dataArray[i] == 'number')
          shouldQualify &= encloseNumbers;
        
        if (shouldQualify)
          buildString.push(qualifier);
        
        if (dataArray[i] !== null && dataArray[i] !== undefined) {
          var d = new S(dataArray[i]).replaceAll(qualifier, rep).s;
          buildString.push(d);
        } else 
          buildString.push('')

        if (shouldQualify)
          buildString.push(qualifier);
        
        if (delim)
          buildString.push(delim);
      }

      //chop last delim
      //console.log(buildString.length)
      buildString.length = buildString.length - 1;
      return new this.constructor(buildString.join(''));
    },

    toString: function() {
      return this.s;
    },

    //#modified from https://github.com/epeli/underscore.string
    underscore: function() {
      var s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
      if ((new S(this.s.charAt(0))).isUpper()) {
        s = '_' + s;
      }
      return new this.constructor(s);
    },

    unescapeHTML: function() { //from underscore.string
      return new this.constructor(this.s.replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      }));
    },

    valueOf: function() {
      return this.s.valueOf();
    }

  }

  var methodsAdded = [];
  function extendPrototype() {
    for (var name in __sp) {
      (function(name){
        var func = __sp[name];
        if (!__nsp.hasOwnProperty(name)) {
          methodsAdded.push(name);
          __nsp[name] = function() {
            String.prototype.s = this;
            return func.apply(this, arguments);
          }
        }
      })(name);
    }
  }

  function restorePrototype() {
    for (var i = 0; i < methodsAdded.length; ++i)
      delete String.prototype[methodsAdded[i]];
    methodsAdded.length = 0;
  }


/*************************************
/* Attach Native JavaScript String Properties
/*************************************/

  var nativeProperties = getNativeStringProperties();
  for (var name in nativeProperties) {
    (function(name) {
      var stringProp = __nsp[name];
      if (typeof stringProp == 'function') {
        //console.log(stringProp)
        if (!__sp[name]) {
          if (nativeProperties[name] === 'string') {
            __sp[name] = function() {
              //console.log(name)
              return new this.constructor(stringProp.apply(this, arguments));
            }
          } else {
            __sp[name] = stringProp;
          }
        }
      }
    })(name);
  }


/*************************************
/* Function Aliases
/*************************************/

  __sp.repeat = __sp.times;
  __sp.include = __sp.contains;
  __sp.toInteger = __sp.toInt;
  __sp.toBool = __sp.toBoolean;
  __sp.decodeHTMLEntities = __sp.decodeHtmlEntities //ensure consistent casing scheme of 'HTML'


//******************************************************************************
// Set the constructor.  Without this, string.js objects are instances of
// Object instead of S.
//******************************************************************************

  __sp.constructor = S;


/*************************************
/* Private Functions
/*************************************/

  function getNativeStringProperties() {
    var names = getNativeStringPropertyNames();
    var retObj = {};

    for (var i = 0; i < names.length; ++i) {
      var name = names[i];
      var func = __nsp[name];
      try {
        var type = typeof func.apply('teststring', []);
        retObj[name] = type;
      } catch (e) {}
    }
    return retObj;
  }

  function getNativeStringPropertyNames() {
    var results = [];
    if (Object.getOwnPropertyNames) {
      results = Object.getOwnPropertyNames(__nsp);
      results.splice(results.indexOf('valueOf'), 1);
      results.splice(results.indexOf('toString'), 1);
      return results;
    } else { //meant for legacy cruft, this could probably be made more efficient
      var stringNames = {};
      var objectNames = [];
      for (var name in String.prototype)
        stringNames[name] = name;

      for (var name in Object.prototype)
        delete stringNames[name];

      //stringNames['toString'] = 'toString'; //this was deleted with the rest of the object names
      for (var name in stringNames) {
        results.push(name);
      }
      return results;
    }
  }

  function Export(str) {
    return new S(str);
  };

  //attach exports to StringJSWrapper
  Export.extendPrototype = extendPrototype;
  Export.restorePrototype = restorePrototype;
  Export.VERSION = VERSION;
  Export.TMPL_OPEN = '{{';
  Export.TMPL_CLOSE = '}}';
  Export.ENTITIES = ENTITIES;



/*************************************
/* Exports
/*************************************/

  if (typeof module !== 'undefined'  && typeof module.exports !== 'undefined') {
    module.exports = Export;

  } else {

    if(typeof define === "function" && define.amd) {
      define([], function() {
        return Export;
      });
    } else {
      window.S = Export;
    }
  }


/*************************************
/* 3rd Party Private Functions
/*************************************/

  //from sugar.js
  function multiArgs(args, fn) {
    var result = [], i;
    for(i = 0; i < args.length; i++) {
      result.push(args[i]);
      if(fn) fn.call(args, args[i], i);
    }
    return result;
  }

  //from underscore.string
  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    amp: '&'
  };

  //from underscore.string
  var reversedEscapeChars = {};
  for(var key in escapeChars){ reversedEscapeChars[escapeChars[key]] = key; }

  ENTITIES = {
    "amp" : "&",
    "gt" : ">",
    "lt" : "<",
    "quot" : "\"",
    "apos" : "'",
    "AElig" : 198,
    "Aacute" : 193,
    "Acirc" : 194,
    "Agrave" : 192,
    "Aring" : 197,
    "Atilde" : 195,
    "Auml" : 196,
    "Ccedil" : 199,
    "ETH" : 208,
    "Eacute" : 201,
    "Ecirc" : 202,
    "Egrave" : 200,
    "Euml" : 203,
    "Iacute" : 205,
    "Icirc" : 206,
    "Igrave" : 204,
    "Iuml" : 207,
    "Ntilde" : 209,
    "Oacute" : 211,
    "Ocirc" : 212,
    "Ograve" : 210,
    "Oslash" : 216,
    "Otilde" : 213,
    "Ouml" : 214,
    "THORN" : 222,
    "Uacute" : 218,
    "Ucirc" : 219,
    "Ugrave" : 217,
    "Uuml" : 220,
    "Yacute" : 221,
    "aacute" : 225,
    "acirc" : 226,
    "aelig" : 230,
    "agrave" : 224,
    "aring" : 229,
    "atilde" : 227,
    "auml" : 228,
    "ccedil" : 231,
    "eacute" : 233,
    "ecirc" : 234,
    "egrave" : 232,
    "eth" : 240,
    "euml" : 235,
    "iacute" : 237,
    "icirc" : 238,
    "igrave" : 236,
    "iuml" : 239,
    "ntilde" : 241,
    "oacute" : 243,
    "ocirc" : 244,
    "ograve" : 242,
    "oslash" : 248,
    "otilde" : 245,
    "ouml" : 246,
    "szlig" : 223,
    "thorn" : 254,
    "uacute" : 250,
    "ucirc" : 251,
    "ugrave" : 249,
    "uuml" : 252,
    "yacute" : 253,
    "yuml" : 255,
    "copy" : 169,
    "reg" : 174,
    "nbsp" : 160,
    "iexcl" : 161,
    "cent" : 162,
    "pound" : 163,
    "curren" : 164,
    "yen" : 165,
    "brvbar" : 166,
    "sect" : 167,
    "uml" : 168,
    "ordf" : 170,
    "laquo" : 171,
    "not" : 172,
    "shy" : 173,
    "macr" : 175,
    "deg" : 176,
    "plusmn" : 177,
    "sup1" : 185,
    "sup2" : 178,
    "sup3" : 179,
    "acute" : 180,
    "micro" : 181,
    "para" : 182,
    "middot" : 183,
    "cedil" : 184,
    "ordm" : 186,
    "raquo" : 187,
    "frac14" : 188,
    "frac12" : 189,
    "frac34" : 190,
    "iquest" : 191,
    "times" : 215,
    "divide" : 247,
    "OElig;" : 338,
    "oelig;" : 339,
    "Scaron;" : 352,
    "scaron;" : 353,
    "Yuml;" : 376,
    "fnof;" : 402,
    "circ;" : 710,
    "tilde;" : 732,
    "Alpha;" : 913,
    "Beta;" : 914,
    "Gamma;" : 915,
    "Delta;" : 916,
    "Epsilon;" : 917,
    "Zeta;" : 918,
    "Eta;" : 919,
    "Theta;" : 920,
    "Iota;" : 921,
    "Kappa;" : 922,
    "Lambda;" : 923,
    "Mu;" : 924,
    "Nu;" : 925,
    "Xi;" : 926,
    "Omicron;" : 927,
    "Pi;" : 928,
    "Rho;" : 929,
    "Sigma;" : 931,
    "Tau;" : 932,
    "Upsilon;" : 933,
    "Phi;" : 934,
    "Chi;" : 935,
    "Psi;" : 936,
    "Omega;" : 937,
    "alpha;" : 945,
    "beta;" : 946,
    "gamma;" : 947,
    "delta;" : 948,
    "epsilon;" : 949,
    "zeta;" : 950,
    "eta;" : 951,
    "theta;" : 952,
    "iota;" : 953,
    "kappa;" : 954,
    "lambda;" : 955,
    "mu;" : 956,
    "nu;" : 957,
    "xi;" : 958,
    "omicron;" : 959,
    "pi;" : 960,
    "rho;" : 961,
    "sigmaf;" : 962,
    "sigma;" : 963,
    "tau;" : 964,
    "upsilon;" : 965,
    "phi;" : 966,
    "chi;" : 967,
    "psi;" : 968,
    "omega;" : 969,
    "thetasym;" : 977,
    "upsih;" : 978,
    "piv;" : 982,
    "ensp;" : 8194,
    "emsp;" : 8195,
    "thinsp;" : 8201,
    "zwnj;" : 8204,
    "zwj;" : 8205,
    "lrm;" : 8206,
    "rlm;" : 8207,
    "ndash;" : 8211,
    "mdash;" : 8212,
    "lsquo;" : 8216,
    "rsquo;" : 8217,
    "sbquo;" : 8218,
    "ldquo;" : 8220,
    "rdquo;" : 8221,
    "bdquo;" : 8222,
    "dagger;" : 8224,
    "Dagger;" : 8225,
    "bull;" : 8226,
    "hellip;" : 8230,
    "permil;" : 8240,
    "prime;" : 8242,
    "Prime;" : 8243,
    "lsaquo;" : 8249,
    "rsaquo;" : 8250,
    "oline;" : 8254,
    "frasl;" : 8260,
    "euro;" : 8364,
    "image;" : 8465,
    "weierp;" : 8472,
    "real;" : 8476,
    "trade;" : 8482,
    "alefsym;" : 8501,
    "larr;" : 8592,
    "uarr;" : 8593,
    "rarr;" : 8594,
    "darr;" : 8595,
    "harr;" : 8596,
    "crarr;" : 8629,
    "lArr;" : 8656,
    "uArr;" : 8657,
    "rArr;" : 8658,
    "dArr;" : 8659,
    "hArr;" : 8660,
    "forall;" : 8704,
    "part;" : 8706,
    "exist;" : 8707,
    "empty;" : 8709,
    "nabla;" : 8711,
    "isin;" : 8712,
    "notin;" : 8713,
    "ni;" : 8715,
    "prod;" : 8719,
    "sum;" : 8721,
    "minus;" : 8722,
    "lowast;" : 8727,
    "radic;" : 8730,
    "prop;" : 8733,
    "infin;" : 8734,
    "ang;" : 8736,
    "and;" : 8743,
    "or;" : 8744,
    "cap;" : 8745,
    "cup;" : 8746,
    "int;" : 8747,
    "there4;" : 8756,
    "sim;" : 8764,
    "cong;" : 8773,
    "asymp;" : 8776,
    "ne;" : 8800,
    "equiv;" : 8801,
    "le;" : 8804,
    "ge;" : 8805,
    "sub;" : 8834,
    "sup;" : 8835,
    "nsub;" : 8836,
    "sube;" : 8838,
    "supe;" : 8839,
    "oplus;" : 8853,
    "otimes;" : 8855,
    "perp;" : 8869,
    "sdot;" : 8901,
    "lceil;" : 8968,
    "rceil;" : 8969,
    "lfloor;" : 8970,
    "rfloor;" : 8971,
    "lang;" : 9001,
    "rang;" : 9002,
    "loz;" : 9674,
    "spades;" : 9824,
    "clubs;" : 9827,
    "hearts;" : 9829,
    "diams;" : 9830
  }


}).call(this);

},{}],168:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

},{}]},{},[4])