<script>
import { onMount } from "svelte"
export let data;
onMount(()=>{
    data.map(e=>{
        if(typeof e === "object"){
            if(!e.length){
                let {btn,menu,content} = e;
                if(!menu){
                    let menu = document.getElementsByTagName("menuc")[0];
                    menu.appendChild(btn);
                }
            }
        }
    })
})
</script>
<menuc>
</menuc>