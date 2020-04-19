<script>
import { onMount } from 'svelte';
export let info;
onMount(()=>{
    // let view = document.getElementById("content-info"),
    // vc = document.createElement("div");
    // if(typeof info === "object"){
    //     if(!info.length){
    //         let inf = Object.keys(info).map(e=>{
    //             switch(e){
    //                 case "name":
    //                     return vc.setAttribute("title",info[e]);
    //                 break;
    //                 case "content":
    //                     if(typeof info[e] === "object"){
    //                         if(!info[e].length){
    //                             return (Object.keys(info[e]).map(f=>{
    //                                 let item;
    //                                 switch(f){
    //                                     case "title":
    //                                         item = info[e][f];
    //                                         if(typeof item === "object"){
    //                                             if(!item.length){
    //                                                 let i = document.createElement("h3");
    //                                                 Object.keys(item).map(e=>{
    //                                                     switch(e){
    //                                                         case "content":
    //                                                             i.innerHTML = item[e];
    //                                                         case "style":
    //                                                             i.setAttribute("class",item[e]);
    //                                                         break;
    //                                                         default:
    //                                                             console.log(e);
    //                                                     }
    //                                                 });
    //                                                 return [i,f];
    //                                             }
    //                                         }
    //                                     break;
    //                                     case "subtitle":
    //                                         item = info[e][f];
    //                                         if(typeof item === "object"){
    //                                             if(!item.length){
    //                                                 let i = document.createElement("h4");
    //                                                 Object.keys(item).map(e=>{
    //                                                     switch(e){
    //                                                         case "content":
    //                                                             i.innerHTML = item[e];
    //                                                         case "style":
    //                                                             i.setAttribute("class",item[e]);
    //                                                         break;
    //                                                         default:
    //                                                             console.log(e);
    //                                                     }
    //                                                 });
    //                                                 return [i,f];
    //                                             }
    //                                         }
    //                                     break;
    //                                     case "list":
    //                                         item = info[e][f];
    //                                         if(typeof item === "object"){
    //                                             if(item.length){
    //                                                 let i = document.createElement("div");
    //                                                 item.map(f=>{ 
    //                                                     let j;
    //                                                     Object.keys(f).map(e=>{
    //                                                         switch(e){
    //                                                             case "title":
    //                                                                 j = document.createElement("h5");
    //                                                                 if(typeof f[e] === "string"){
    //                                                                     j.innerHTML = f[e];   
    //                                                                 }
    //                                                             break;
    //                                                             case "text":
    //                                                                 j = document.createElement("span");
    //                                                                 if(typeof f[e] === "string"){
    //                                                                     j.innerHTML = f[e];
    //                                                                 }
    //                                                             break;
    //                                                             case "list":
    //                                                                 j = document.createElement("div");
    //                                                                 j.setAttribute("class","list_item");
    //                                                                 if(typeof f[e] === "string"){
    //                                                                     i.innerHTML = f[e];
    //                                                                 }
    //                                                                 if(typeof f[e] === "object"){
    //                                                                     if(!f[e].length){
    //                                                                         return Object.keys(f[e]).map(n=>{
    //                                                                             let k;
    //                                                                             switch(n){
    //                                                                                 case "title":
    //                                                                                     k = document.createElement("div");
    //                                                                                     k.setAttribute("class","list_title");
    //                                                                                     if(typeof f[e][n] === "string"){
    //                                                                                         k.innerHTML = f[e][n]
    //                                                                                     }
    //                                                                                     j.appendChild(k);
    //                                                                                 break;
    //                                                                                 case "list":
    //                                                                                     k = document.createElement("div");
    //                                                                                     k.setAttribute("class","list_list");
    //                                                                                     if(typeof f[e][n] === "object"){
    //                                                                                         f[e][n].map(e=>{
    //                                                                                             if(typeof e === "string"){
    //                                                                                                 let h = document.createElement("div");
    //                                                                                                 h.setAttribute("class","list_list item");
    //                                                                                                 h.innerHTML = e;
    //                                                                                                 k.appendChild(h);
    //                                                                                             }
    //                                                                                         })
    //                                                                                     }
    //                                                                                     j.appendChild(k);
    //                                                                                 break;
    //                                                                                 case "footer":
    //                                                                                     k = document.createElement("div");
    //                                                                                     k.setAttribute("class","list_footer");
    //                                                                                     if(typeof f[e][n] === "string"){
    //                                                                                         k.innerHTML = f[e][n]
    //                                                                                     }
    //                                                                                     j.appendChild(k);
    //                                                                                 break;
    //                                                                                 default:
    //                                                                                     return null;
    //                                                                             }
    //                                                                             return k;
    //                                                                         })
    //                                                                     }
    //                                                                 }
    //                                                             break;
    //                                                             case "link":
    //                                                                 j = document.createElement("div");
    //                                                                 j.setAttribute("class","list_item link");
    //                                                                 if(typeof f[e] === "string"){
    //                                                                     i.innerHTML = f[e];
    //                                                                 }
    //                                                                 if(typeof f[e] === "object"){
    //                                                                     if(!f[e].length){
    //                                                                         Object.keys(f[e]).map(n=>{
    //                                                                             let k;
    //                                                                             switch(n){
    //                                                                                 case "title":
    //                                                                                     k = document.createElement("div");
    //                                                                                     k.setAttribute("class","list_title");
    //                                                                                     if(typeof f[e][n] === "string"){
    //                                                                                         k.innerHTML = f[e][n]
    //                                                                                     }
    //                                                                                     j.appendChild(k);
    //                                                                                 break;
    //                                                                                 case "list":
    //                                                                                     k = document.createElement("div");
    //                                                                                     k.setAttribute("class","list_link");
    //                                                                                     if(typeof f[e][n] === "object"){
    //                                                                                         f[e][n].map(e=>{
    //                                                                                             if(typeof e === "string"){
    //                                                                                                 let h = document.createElement("a");
    //                                                                                                 h.setAttribute("class","list_link item");
    //                                                                                                 h.setAttribute("href",e)
    //                                                                                                 h.innerHTML = e;
    //                                                                                                 k.appendChild(h);
    //                                                                                             }
    //                                                                                         })
    //                                                                                     }
    //                                                                                     j.appendChild(k);
    //                                                                                 break;
    //                                                                                 case "footer":
    //                                                                                     k = document.createElement("div");
    //                                                                                     k.setAttribute("class","list_footer");
    //                                                                                     if(typeof f[e][n] === "string"){
    //                                                                                         k.innerHTML = f[e][n]
    //                                                                                     }
    //                                                                                     j.appendChild(k);
    //                                                                                 break;
    //                                                                                 default:
    //                                                                                     return null;
    //                                                                             }
    //                                                                             return k;
    //                                                                         })
    //                                                                     }
    //                                                                 }
    //                                                             break;
    //                                                             case "phone":
    //                                                         console.log(f[e])
    //                                                             break;
    //                                                             case "image":
    //                                                         console.log(f[e])
    //                                                             break;
    //                                                             default:
    //                                                                 console.log(f[e])
    //                                                         }
    //                                                     })
    //                                                     console.log(j);
    //                                                     i.appendChild(j);
    //                                                     return j;
    //                                                 })
    //                                                 return [i,f]
    //                                             }
    //                                         }
    //                                     break;
    //                                     default:
    //                                         console.log(f);
    //                                 }
    //                             })).map(e=>{
    //                                 if(e){
    //                                     if(typeof e === "object"){
    //                                         if(e.length){
    //                                             return e[0];
    //                                         }
    //                                     }
    //                                 }
    //                             })
    //                         }
    //                     }
    //                 break;
    //             }
    //         })
    //         vc.setAttribute("class","grid-content");
    //         inf.map(e=>{
    //             if(e){
    //                 if(typeof e === "object"){
    //                     if(e.length){
    //                         e.map(e=>{
    //                             vc.appendChild(e);
    //                         })
    //                     }
    //                 }
    //             }
    //         })
    //         view.appendChild(vc);
    //     }
    // }
})
</script>
{#if !info.length}
    <div id="content-info"></div>
{/if}