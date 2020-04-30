<script>
import M from "./menu.svelte";
import tools from "../tools.js";
import { onMount } from "svelte";
import Mn from "./loadMain.js";
export let menu;
let m = menu;
let btnM = false;
let botton = false;
let content = false;
if(m.botton&&m.menu){
    let { html_parser } = new tools().getMethods();
    m = new html_parser(menu);
    //botton = m.btn[0];
    //content = m.menu[0];
    console.log(m.getcontent((a)=>{
        console.log(a);
    }));
}
</script>
{#if botton&&content}
    <main class="content">
        <div class="container" id="load">
            <!-- <M boton={botton} menu={content}></M> -->
        </div>
    </main>
    {:else}
    <main>
        <div id="error" class="container">
            <div id="title">Load Content</div>
            <div id="msg">Please reload page</div>
        </div>
    </main>
{/if}