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
rs.get().then(a=>{
    console.log(a);
})
export default app;