<script>
  export let comments;
</script>

<div class="comments">
  {#each comments as oneSerie}
    <div class="serie">
      {#each oneSerie as oneComment}
        <div class="comment">
          {oneComment}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .comments {
    border-top: 1px solid #666;
  }
  .comment {
    border-top: 1px solid #666;
    padding: 5px 5px;
    font-size: 15px;
    font-weight: 100;
    line-height: 26px;
  }
  .comment:first-child {
    margin-left: -20px;
  }
  .serie {
    margin-left: 20px;
  }
</style>
