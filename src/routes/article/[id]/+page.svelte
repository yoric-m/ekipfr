<script>
    import Comments from "./components/Comments.svelte";
    import Title from "./components/Title.svelte";
    import Body from "./components/Body.svelte";
    import { fetchData } from "./fetchData";
    export let data;
    let inputSize = 2;
    let article = fetchData(data.id);
</script>

<div class="main">

{#await article}
    <span>Loading...</span>
{:then article}
    <div class="content" >
        <Title title={article.title} />
        <Body body={article.body} />
        <Comments comments={article.comments} />
    </div>
{/await}

</div>

<style>
    .content {
      justify-content: center;
      /* font-size: var(--fontSizeEm); */
      padding: 0px 20px;
    }
</style>