<script>
export let m = false;
</script>
{#if m}
{#each m as {title,msg}}
<div class="error">
    <div class="title">{title}</div>
    <div class="msg">{msg}</div>
</div>
{/each}
<style>
div.error{
    border:1px sold #000;
    background:#fff;
    color:#000;
}
</style>
{/if}