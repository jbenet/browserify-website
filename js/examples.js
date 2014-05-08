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