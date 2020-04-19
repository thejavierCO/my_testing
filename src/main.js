import App from "./v1/App.svelte";
import RS from "./RunService";
let rs = new RS([
    "./json/base.json",
    "./json/myinfo.json"
]);
rs.getData((a,b,c)=>{
    let {ct,local,session,delsw} = c;
    new App({
        target:document.body,
        props:{
            json:a,
            state:b
        }
    });
    delsw();
    local().setItem("json",JSON.stringify(a))
});
export default app;