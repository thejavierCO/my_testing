<script>
export let data;
export let id;
let i = id()+"-menu";
</script>
{#each data as {content}}
    {#if content.id === i}
        {@html content.innerHTML}
    {/if}
{/each}