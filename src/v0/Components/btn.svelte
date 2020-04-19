<script>
export let id;
export let infoMenu = false;
export let sw = false;
export let isMenu = false;
let { name , icon } = id;
let img = false, style = false, error = false,swS = false,swI = false;
if(sw){
    setInterval(() => {
        swS = sw().sw();
        swI = sw().id();
    });
}
if(!name&&!icon){error = true; }else if(icon.img){img = icon.img;}else if(icon.style){style = icon.style;}
function switchbtn(a){
    if(sw){        
        sw().sw(true);
        sw().id(a);
        sw().view(infoMenu,a);
    }
}
</script>
{#if infoMenu}
    {#if sw}    
        {#if isMenu}
            {#if isMenu.name!==name}
                {#if !error}
                <div class="btn-body">
                {#if img}
                    <div id={name} on:click={()=>switchbtn(name)}><img src={img} alt={name}/></div>
                {/if}
                {#if style}
                    <div id={name} on:click={()=>switchbtn(name)}><i class={style}></i></div>
                {/if}
                </div>
                <style>div.btn-body>div>img{width: 100%;}</style>
                {:else}
                <div class="btn-body">error</div>
                {/if}
            {/if}
        {:else}
            {#if !error}
            <div class="btn-body">
                {#if img}
                    <div id={name} on:click={()=>switchbtn(name)}><img src={img} alt={name}/></div>
                {/if}
                {#if style}
                    <div id={name} on:click={()=>switchbtn(name)}><i class={style}></i></div>
                {/if}
            </div>
            <style>div.btn-body>div>img{width: 100%;}</style>
            {:else}
            <div class="btn-body">error</div>
            {/if}
        {/if}
    {:else}
        <div class="btn-body">error require sw</div>
    {/if}
{:else}
    {#if isMenu}
        {#if isMenu.name!==name}        
            {#if !error}
            <div class="btn-body">
            {#if img}
                <div id={name}><img src={img} alt={name}/></div>
            {/if}
            {#if style}
                <div id={name}><i class={style}></i></div>
            {/if}
            </div>
            <style>div.btn-body>div>img{width: 100%;}</style>
            {:else}
            <div class="btn-body">error</div>
            {/if}
        {/if}
    {:else}
        {#if !error}
        <div class="btn-body">
        {#if img}
            <div id={name}><img src={img} alt={name}/></div>
        {/if}
        {#if style}
            <div id={name}><i class={style}></i></div>
        {/if}
        </div>
        <style>div.btn-body>div>img{width: 100%;}</style>
        {:else}
        <div class="btn-body">error</div>
        {/if}
    {/if}
{/if}