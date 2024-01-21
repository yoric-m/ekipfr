<script>
  import ToggleTheme from "./ToggleTheme.svelte";
  import { createEventDispatcher } from "svelte";
  import TextSize from "./TextSize.svelte";
  const dispatch = createEventDispatcher();

  export let url = "";
  export let inputSize = 2;
  let lastFetchUrl = 0;
  let showArticle = false;
  let lastUrl = "";

  const handleKeyup = () => {
    // if we already handled the request we don't do anything more
    if (showArticle && new Date() - lastFetchUrl < 100) return;
    if (url === lastUrl) return;

    // regex with http.../234235523
    const regexUrl = /^http.+\/(\d{4,})$/i;
    const returnMatches = url.match(regexUrl);
    showArticle = returnMatches !== null;

    // No matches we exit early
    if (!showArticle) return;

    // Record the time we fetched a valid url
    lastFetchUrl = new Date();
    lastUrl = url;
    dispatch("validUrl", url);
  };
</script>

<div class="header">
  <ToggleTheme />
  <h1>EkipTenis</h1>
  <input
    type="text"
    on:keyup={handleKeyup}
    on:click={handleKeyup}
    bind:value={url}
    placeholder="Enter a url..."
  />

  <TextSize bind:inputSize />
</div>

<style>
  h1 {
    color: var(--primary-color);
    padding-right: 40px;
    display: inline;
  }
  .header {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    height: 70px;
    background-color: var(--background-color);
    position: sticky;
    top: 0;
  }
  input {
    width: 1000px;
    padding: 5px 10px;
    font-size: 1.3em;
    display: inline;
  }
  input[type="text"] {
    margin-top: 10px;
    background-color: var(--background-color);
    color: gray;
    border-width: 0px;
    border-style: none;
  }
</style>
