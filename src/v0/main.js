import App from './App.svelte';
let i = 0;
let data = [];
let require = [
	"./json/base.json",
	"./json/myinfo.json"
];
async function get(file){
	try{
		let data = [];
		if(typeof file === "object"){
			if(file.length){
			return file.map(async e=>{
				let c = await fetch(e);let json = await c.json();
				if(c.ok){data.push(json);return json;}else{throw "not file"}
			})}else{throw "not list object"}
		}else if(typeof file === "string"){
			data = await fetch(file).then(e=>e.json());
		}
		return data;
	}catch(err){return err;}
}
let time = setInterval(()=>{
	if(data.length===require.length){
		new App({
			target:document.body,
			props:{
				load:data,
				time:i
			}
		})
		clearInterval(time)
	}else{
		i++;
		if(i>=1000){
			new App({
				target:document.body,
				props:{
					load:data,
					time:i
				}
			})
			clearInterval(time)
		}
	}
});
require.map(e=>{get(e).then(e=>data.push(e))});
export default app;