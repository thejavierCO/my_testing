// import App from "./v3/App.svelte";
import RS from "./RunService.v3";
const rs = new RS({
    require:["./json/base.json","./json/myinfo.json"],
    serviceWorker:"./js/sw.js"
});
let { data , sw , methods } = rs;
sw().then(e=>e).catch(e=>e)
.then(sw=>data().then(data=>({"files":data,sw})).catch(data=>({"files":data,sw})))
.then(result=>{
    let {db} = methods;
    let {data} = result.files;
    let info = new db(data);
    console.log(info.get(),info.get("main"),info.get("document"));
}).catch(e=>{
    console.warn(e);
})
export default app;