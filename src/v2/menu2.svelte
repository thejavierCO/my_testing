<script>
import View from "./content.svelte";
import Btn from "./btn.svelte";
import {onMount} from "svelte";
export let menu;
export let boton;
let sm = false;
let swid = "Menu";
let m = [];
let bm = false;
let sw=(a)=>a?sm=!sm:sm;
let id=(a)=>a?swid=a:swid;
</script>