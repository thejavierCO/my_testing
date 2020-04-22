import App from "./v2/App.svelte";
import RS from "./RunService.v2";
let rs = new RS({require:["./json/base.json","./json/myinfo.json"],serviceWorker:"./sw.js"});
rs.state("del");
rs.get().then(a=>{
    let { gen } = rs.getMethods();
    let info = new gen(a);
    rs.setDoc(info.setFormat("document")).then(e=>{
        new App({
            target:document.body,
            props:{
                menu:info.setFormat("main")
            }
        });
        return e;
    }).catch(a=>{
        console.warn(a);
    })
}).catch(a=>{
    console.warn(a);
});
export default app;