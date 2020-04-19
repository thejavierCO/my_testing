<script>
import Box from "./Components/box.svelte";
import Bar from "./Components/bar.svelte";
import Btn from "./Components/btn.svelte";
import View from "./Components/render.svelte";
export let main;
let { botton , menu } = main,
error = false,
msg =  "";
if(!botton&&!menu){error=!error;msg = "require botton and menu";}
let menubtn = botton.find(e=>e.name=="menu"||e.name=="about");
let sw = false, id = "";
function swMenu(){
    return {
        sw:(a=false)=>a?sw=!sw:sw,
        id:(a=false)=>a?id=a:id,
        view:(a,b)=>a.find(a=>a.btn?a.btn.id===b:false)
    }
}
</script>
{#if !error}
<div class="container main">
    <div class="app-content">
    {#if menubtn}
        <Bar><Btn id={menubtn} infoMenu={menu} sw={swMenu}/></Bar>
        <div class="content menu-btn">
        {#if !sw}
            {#each botton as btn}
                <div><Btn id={btn} isMenu={menubtn} infoMenu={menu} sw={swMenu}/></div>
            {:else}
                <Box><slot name="loading"></slot></Box>
            {/each}
        {:else}
            <View menu={swMenu().view(menu,id)}>
                <slot></slot>
                <slot name="load-info">load</slot>
            </View>
        {/if}
        </div>
    {:else}
        <div class="content menu-btn">
        {#if !sw}
            {#each botton as btn}
                <div><Btn id={btn} isMenu={menubtn} infoMenu={menu} sw={swMenu}/></div>
            {:else}
                <Box><slot name="loading"></slot></Box>
            {/each}
        {:else}
            <View menu={swMenu().view(menu,id)}>
                <slot></slot>
                <slot name="load-info">load</slot>
            </View>
        {/if}
        </div>
    {/if}
    </div>
</div>
{:else}
<Box><div class="title error">Error</div><div class="subtitle msg">{msg}</div></Box>    
<style>
div.error{color:red;}
div.msg{background:red;}
div.title{font-size:30vw;}
div.subtitle{font-size:5vw;}
</style>
{/if}