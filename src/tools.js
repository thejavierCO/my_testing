class tools{
    getMethods(){
        return {
            sw:(a,b)=>'serviceWorker' in navigator?b?!navigator.serviceWorker.controller?a?navigator.serviceWorker.register(a):false:navigator:a?navigator.serviceWorker.register(a):false:false,
            delsw:()=>navigator.serviceWorker.getRegistrations().then(function(registrations) {for(let registration of registrations) {registration.unregister()}}),
            ct:()=>'caches' in self?caches:false,
            local:()=>'localStorage' in self?localStorage:false,
            session:()=>'sessionStorage' in self?sessionStorage:false,
            getfile:async (file)=>{
                let {gettype,getkeys,getfile,ct} = this.getMethods();
                try{
                    if(gettype(file)==="list"){
                        return await getkeys(file).map(async (e)=>await getfile(e));
                    }else if(gettype(file)==="string"){
                        return await fetch(file).then(r=>{
                            if(ct()){
                                ct().open("json").then(e=>e.put(file,new Response(r)))
                            }
                            return r;
                        })
                    }else{throw file;}}catch(err){console.warn(err);}},
            getkeys:(a)=>{let {gettype} = this.getMethods();if(typeof a === "object"){return gettype(a)==="list"?a:Object.keys(a);}else{throw "require object"}},
            gettype:(a)=>{try{return a?typeof a==="object"?a.length?"list":"key":typeof a:"";}catch(e){console.warn([e],a);}},
            createTag:(a)=>document.createElement(a),
            w:(a)=>console.warn(a)
        }
    }
}
export default tools;