<script>
import compLoad from './load.svelte';
import compError from "./error.svelte";
import { onMount } from "svelte";
export let json;
export let state;
onMount(()=>{
    let e = document.getElementById("error")
    let l = document.getElementById("load");
    if(!e){
        new compLoad({
            target:l,
            props:{
                d:json
            }
        })
    }else{
        new compError({
            target:e,
            props:{
                m:[{
                    title:"not exist json",
                    msg:"require json data"
                }]
            }
        })
    }
})
</script>
{#if state}
<div class="container" id="load"></div>
{:else}
<div class="container" id="error"></div>
{/if}