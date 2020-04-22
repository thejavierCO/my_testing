<script>
import M from "./menu.svelte";
import RS from "../RunService.v2.js";
import { onMount } from "svelte";
import Mn from "./loadMain.js";
export let menu;
let m = menu;
let btnM = false;
let botton = false;
let content = false;
if(m.botton&&m.menu){
    m = new Mn(menu);
    botton = m.btn[0];
    content = m.menu[0];
}
</script>
{#if botton&&content}
    <main class="content">
        <div class="container" id="load">
            <M boton={botton} menu={content}></M>
        </div>
    </main>
    {:else}
    <main>
        <div id="error" class="container">
            <div id="title">title</div>
            <div id="msg">msg</div>
        </div>
    </main>
{/if}