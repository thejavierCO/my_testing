<script>
import { onMount } from "svelte"; 
import db from "./db.js";
import doc from "./components/loadDoc";
import main from "./components/loadMain";
import M from "./components/menu.svelte";
export let d;
let btn=[],menu=[];
let sw=false,swid="menu";
let info = new db(d[1],d[0]);
let metd = (new main()).getMets();
let metds = new doc(info.getdoc());
let data = new main(info.getmain());
let { getkeys, gettype } = metds;
if(gettype(data)==="key"){
    getkeys(data).map(e=>{
        switch (e) {
            case "btn":
                if(gettype(data[e])==="list"){getkeys(data[e][0]).map(e=>{if(gettype(e)==="list"){btn.push(e);}})}
            break;
            case "menu":
                if(gettype(data[e])==="list"){getkeys(data[e][0]).map(e=>{if(gettype(e)==="list"){menu.push(e);}})}
            break;
            default:
                console.log(data[e]);
            break;
        }
    })
}
</script>
{#if btn != []}
    <main id="load">
        <div id="btn">
            <M boton={btn} menu={menu} methods={[metd,metds]}></M>
        </div>
        <div id="btn-content"></div>
    </main>
{/if}