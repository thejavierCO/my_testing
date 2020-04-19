<script>
import View from "./content.svelte";
import Btn from "./btn.svelte";
import {onMount} from "svelte";
export let boton;
export let menu;
export let methods;
let sm = false;
let swid = "Menu";
let m = [];
let bm = false;
let sw=(a)=>a?sm=!sm:sm;
let id=(a)=>a?swid=a:swid;
boton.map(a=>{
    menu.map(b=>{
        if(a[1]==b[1]){
            let bot = (Array.from(a[0].children))[0];
            bot.addEventListener("click",(b)=>{
                let name = a[0].id;
                id(name);sw(true);
            })
            if(b[2]){
                b[1]==="about"||b[1]==="menu"?"":a[0].appendChild(b[2]);
            }
            if(b[1]==="about"||b[1]==="menu"){
                bm = !bm;
                m.push({"menu":a[0],"content":b[0]});
            }else{
                m.push({"btn":a[0],"content":b[0]});
            }
        }
    })
})
onMount(()=>{
    let nc = document.getElementsByTagName("navc")[0];
    let {getkeys,gettype} = methods[1];
    m.map(e=>{
        if(e["menu"]){
            nc.appendChild(e["menu"]);
        }else if(!bm){
            let mc = document.getElementsByTagName("menuc")[0];
            mc.appendChild(e["btn"]);
        }
    })
    return ()=>bm=!bm;
})
</script>
{#if bm}
    <navc></navc>
    {#if !sm}
        <Btn data={m}/>
    {:else}
        <View data={m} id={id}/>
    {/if}
{:else}
    <menuc></menuc>
    <navc></navc>
{/if}