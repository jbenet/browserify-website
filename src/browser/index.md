# Transform in the Browser

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
