// import App from "./v1/App.svelte";
import RS from "./RunService.v2";
// import db from "./v2/db";
// let rs = new RS([
//     "./json/base.json",
//     "./json/myinfo.json"
// ]);
// rs.getData((a,b,c)=>{
//     let {ct,local,session,delsw} = c;
//     console.log(new db(a));
//     // new App({
//     //     target:document.body,
//     //     props:{
//     //         json:a,
//     //         state:b
//     //     }
//     // });
//     delsw();
//     local().setItem("json",JSON.stringify(a))
// });
let rs = new RS({require:["./json/base.json","./json/myinfo.json"],serviceWorker:"./sw.js"});
rs.state("del");
rs.get().then(a=>{
    let { gen } = rs.getMethods();
    let info = new gen(a);
    console.log(info.setFormat("document"));
    console.log(info.setFormat("main"));
}).catch(a=>{
    console.warn(a);
});
export default app;