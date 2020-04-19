class sw{
    constructor(require,serviceWorker){
        let {getfile,getkeys,sw} = this.getMethods();
        this.require = require;
        this.data = [];
        if(require||serviceWorker){
            if(require){
                getfile(require).then(async e=>getkeys(e).map(async e=>{
                    let data = await e;data = await data.json();this.data.push(data);
                }))
            }
            if(serviceWorker){
                sw(serviceWorker,true)
            }
        }

    }
    getMethods(){
        return {
            sw:(a,b)=>'serviceWorker' in navigator?b?!navigator.serviceWorker.controller?a?navigator.serviceWorker.register(a):false:navigator:a?navigator.serviceWorker.register(a):false:false,
            delsw:()=>navigator.serviceWorker.getRegistrations().then(function(registrations) {for(let registration of registrations) {registration.unregister()}}),
            ct:()=>'caches' in self?caches:false,
            local:()=>'localStorage' in self?localStorage:false,
            session:()=>'sessionStorage' in self?sessionStorage:false,
            getfile:async (file)=>{
                let {gettype,getkeys,getfile} = this.getMethods();
                try{
                    if(gettype(file)==="list"){
                        return await getkeys(file).map(async (e)=>await getfile(e));
                    }else if(gettype(file)==="string"){
                        return await fetch(file);
                    }else{throw file;}
                }catch(err){console.warn(err);}
            },
            getkeys:(a)=>{
                let {gettype} = this.getMethods();
                if(typeof a === "object"){return gettype(a)==="list"?a:Object.keys(a);}else{throw "require object"}
            },
            gettype:(a)=>{
                try{return typeof a==="object"?a.length?"list":"key":typeof a;
                }catch(e){
                    console.warn(e);
                }
            }
        }
    }
    getData(f,t=1000){
        let {gettype} = this.getMethods();
        if(gettype(f)==="function"){
            let i = 0;
            let time = setInterval(()=>{i++;
                if(this.require.length==this.data.length){
                    f(this.data,true,this.getMethods());clearInterval(time);
                }else if(i>=t){
                    f(this.data,false,this.getMethods());clearInterval(time);
                }
            })
        }
    }
}
export default sw;