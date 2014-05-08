# Transform in the Browser

<form id="browser-transformer" class="centered" role="form">
  <h4 class="subtitle">1. Enter input data</h4>
  <textarea id="text-1" class="form-control" placeholder="beep boop"></textarea>

  <h4 class="subtitle">2. Enter transformer types to convert</h4>
  <input id="type-chain" type="text" class="form-control" placeholder="ascii base32" />

  <h4 class="subtitle">3. Click a button</h4>
  <button id="transform-button" class="btn btn-lg btn-danger">
    &nbsp;<i class="fa fa-flash"></i> &nbsp;&nbsp;
    TRANSFORM
    &nbsp;&nbsp; <i class="fa fa-flash"></i>&nbsp;
  </button>

  <h4 class="subtitle">4. Receive the transformed text</h4>
  <textarea id="text-2" class="form-control">-- Transformed data will go here --</textarea>
</form>
