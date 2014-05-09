# Transform in the Browser

Transformer aims to be fully compatible with browsers, so you can run any conversion from any website. Try some right here! You can use the input boxes below, or even [open the console](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers) and use it directly. And, see how to use [transformer in your website](#web-deployment).

<form id="browser-transformer" class="centered" role="form">
  <h4 class="subtitle">1. Enter input data</h4>
  <textarea id="text-1" class="form-control" placeholder="beep boop"></textarea>
  <a href="#browser-transformer" class="btn btn-default" id="btn-example">
    Try a random example.</a>

  <h4 class="subtitle">2. Enter transformer types to convert</h4>
  <div class="input-group">
    <input id="type-chain" type="text" class="form-control" placeholder="ascii base32" />
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" data-toggle="tooltip"
        data-placement="top" title="Reverse" id="btn-reverse">
        <i class="fa fa-arrows-h"></i></button>
    </span>
  </div>

  <h4 class="subtitle">3. Click a button</h4>
  <button id="btn-transform" class="btn btn-lg btn-danger">
    &nbsp;<i class="fa fa-flash"></i> &nbsp;&nbsp;
    TRANSFORM
    &nbsp;&nbsp; <i class="fa fa-flash"></i>&nbsp;
  </button>

  <h4 class="subtitle">4. Receive the transformed text</h4>
  <textarea id="text-2" class="form-control"
    placeholder="-- Transformed data will go here --"></textarea>
</form>



## Web Deployment

<div class="subtitle">Transform your webpage</div>

This page uses [Browserify](http://browserify.org). Right now, all modules are [patched into the bundle](https://github.com/jbenet/transformer-website/blob/master/js/modules.js), because [browserify does not handle dynamic requires](https://github.com/substack/node-browserify/issues/664#issuecomment-35615649), which [transformer uses to load its modules](https://github.com/jbenet/transformer/blob/master/js/loader.js).

Once modules are separated into their own proper npm modules (and [the modules page works](/modules)), there will be a module/library to facilitate loading transformer modules directly in the browser with [browserify-cdn](http://wzrd.in/) (like what [RequireBin](http://requirebin.com) does).

Watch <http://github.com/jbenet/transformer> to stay tuned! :)
