<script>
  export let inputSize;
</script>

<input type="range" bind:value={inputSize} min="1.0" max="3.0" step="0.01" />

<style>
  input {
    width: 1000px;
    padding: 5px 10px;
    font-size: 1.3em;
    background-color: lightgrey;
    display: inline;
  }
  input[type="range"] {
    width: 100%;
  }
</style>
