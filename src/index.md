

<div class="centered splash">
  <img id="animation" src="/static/img/transformer.gif" />
  <h1 id="transformer">TRANSFORMER</h1>
  <h3 id="subtitle" class="large-font">
    Transformer lets you
    <span class="emph">convert</span>(<span class="string">'from_format'</span>, <span class="string">'to_format'</span>)
   using a growing library of
    <span class="emph">types</span> and
    <span class="emph">conversions</span>.
  </h3>
</div>

<div class="centered">
<iframe src="http://ghbtns.com/github-btn.html?user=jbenet&repo=transformer&type=watch&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="152px" height="30px"></iframe>
</div>

## Transform the Terminal

<div class="subtitle">Pipe-ready conversion utility</div>

First [install node](http://nodejs.org/download/), which ships with [npm](https://www.npmjs.org/). Then do:

```
> npm install -g dat-transformer
```

Now you can convert between formats:

```
> echo '1398513743' | transform unix-time iso-date
2014-04-26T12:02:23.000Z
```

Boom. Can it do something more complicated?

```
> echo '3301 Lyon St, 94123' | transform us-street-address us-city
San Francisco, CA
```

Yep.


## Transform Javascript

<div class="subtitle">For Node and the Browser</div>

Install the module

```
> npm install dat-transformer
```

Now you can convert between formats:

```js
var transformer = require('transformer');
var unix2iso = transformer('unix-time', 'iso-date');
unix2iso(1397788143)

var iso2unix = transformer('iso-date', 'unix-time');
iso2unix('2014-04-18T02:29:03')
```

Boom. Does it work in the browser? You bet. [Check it out](/browser).

## What is Transformer?

<div class="subtitle">Universal Conversion Framework</div>


Transformer is an open-source tool and library that enables universal format conversion. It uses a psuedo type system to describe data formats and find appropriate conversion functions. Transformer:

- decomposes complex format conversions into conversions of simpler types, and
- leverages intermediate representations to reduce the number of conversions.

Transformer is open source and you can fork it [on GitHub](https://github.com/jbenet/transformer).

Transformer is part of the [Dat Project](http://dat-data.com), an effort to make collaboration on data easier. The goal is an ecosystem of tools that afford similar workflows to what git offers for source code. Find out more [here](http://dat-data.com).

<br />
<div class="centered">
  <a href="http://dat-data.com"><img src="/static/img/dat.png" /></a>
</div>


## Why use Transformer?

<div class="subtitle">Code reuse and modularity</div>

Converting files from one format to another can be a huge pain. Often:

- There isn't a `this_to_that` converter program.
- Custom programs have to be written for trivial conversions like `(123) 456-7890` to `123.456.7890`.
- Complicated data formatting can be a pain: `2014-04-26T11:34:13.000Z` or `1398512030` or `Apr 26 11:34:13 +0000 2014` or `1398512030000`?
- Turning data like `3301 Lyon St, 94123` into related values like `San Francisco, CA` should be easier.
- Complex "glue" programs to decode, parse, convert, and re-encode data have to be written over and over again.

So let computers do the heavy lifting! If you can *describe precisely* what you *have* and what you *want*, the computer may already know how to do the conversion. Transformer does this using community written types, codecs, and conversions. You can make your own, and publish them too. [Viva la modularidade](https://www.youtube.com/watch?v=DCQNm6yiZh0)!

## Transformer Modules

<div class="subtitle">Contribute to the library</div>


- Transformer works its magic through a large library of modules.
- See the growing list [here](https://github.com/jbenet/transformer/tree/master/js/transformer).
- Want more? Help us write some, there's many [todo](https://github.com/jbenet/transformer/blob/master/todo.md).

<!--
- Test your modules in all the browsers with [testling-ci](http://ci.testling.com/). Many modules known to work with transformer will have a [testling-ci](http://ci.testling.com/) badge:

[![testling-badge](/static/img/testling_badge.png)](http://ci.testling.com/)
-->

## Transformer Community

<div class="subtitle">For Help, Issues, and Discussion</div>

For help, post an [issue](http://github.com/jbenet/transformer/issues), join [irc.freenode.net/#dat](irc://irc.freenode.net/#dat), or tweet [@juanbenet](https://twitter.com/intent/user?screen_name=juanbenet).
