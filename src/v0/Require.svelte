<script>
import Main from "./Main.svelte";
import db from "./db.js";
export let data;
export let model;
let content = new db(data,model);
if(content.getdoc()){
	if(typeof content.getdoc() === "object"){
		let doc = content.getdoc();
		if(!doc.length){
			Object.keys(doc).map(e=>{
				switch(e){
					case "title":
						document.title = doc[e]
					break;
					case "styles":
						if(typeof doc[e] === "object"){
							let a = doc[e];
							if(a.length){
								a.map(e=>{
									let tag = document.createElement("link");
									tag.setAttribute("href",e);
									tag.setAttribute("type", "text/css");
									tag.setAttribute("rel","stylesheet");
									document.head.appendChild(tag);
								})
							}else{
								Object.keys(a).map(e=>{
									console.log(e)
								})
							}
						}else if(typeof doc[e] === "string"){
							console.log(doc[e])
						}
					break;
					case "manifest":
						if(typeof doc[e] === "object"){
							let a = doc[e];
							if(a.length){
								a.map(e=>{
									let tag = document.createElement("link");
									tag.setAttribute("src",e);
									tag.setAttribute("ref","manifest");
									document.head.appendChild(tag);
								})
							}else{
								Object.keys(a).map(e=>{
									console.log(e)
								})
							}
						}else if(typeof doc[e] === "string"){							
							let tag = document.createElement("link");
							tag.setAttribute("src",doc[e]);
							tag.setAttribute("ref","");
							document.head.appendChild(tag);
						}
					break;
					default:
						console.warn(doc,e);
				}
			});
		}
	}
}
</script>

<Main main={content.getmain()}>
	<div slot="loading">loading data</div>
	<div slot="load-info">loading data for info</div>
</Main>

<style>
</style>