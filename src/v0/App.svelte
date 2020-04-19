<script>
import Require from "./Require.svelte";
export let load;
export let time;
let base;
let db;
try{
	if(load){
		load.map(e=>{
		if(typeof e === "object"){!e.length?Object.keys(e).map(f=>{
			let t1 = e[f];
			typeof t1==="object"?!t1.length?Object.keys(t1).map(g=>g==="elements"||g==="body"?base=e:db=e):undefined:undefined;
		}):""}})
	}else{
		throw time;
	}
}catch(err){console.warn(err)}
</script>
{#if base}
<main>
	<Require data={db} model={base}/>
</main>
{:else}
<error>
	<div>{time}</div>
</error>
{/if}
<style>
</style>