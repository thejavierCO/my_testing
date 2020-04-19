<script>
import Gen from "./generador.svelte";
export let menu;
let error = false;
if(!menu){
    error = !error;
}
if(typeof menu !== "object"){
    error = !error;
}
</script>
{#if !error}
    <Gen info={menu}></Gen>
{:else}
    <slot>error</slot>
    <slot name="load"><em>loading</em></slot>
{/if}