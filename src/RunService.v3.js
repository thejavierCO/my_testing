
class db{
    constructor(a){
        const {gettype,getkeys,w,err,log} = tools;
        if(gettype(a)==="list"){
            getkeys(a).map(b=>{
                getkeys(b).map(c=>{
                    if(b[c].elements){
                        this.model = b;
                    }else{
                        this.data = b;
                    }
                })
            })
        }
        this.get = (type)=>this.setloop(type&&gettype(type)==="string"?this.model[type]:this.model,type&&gettype(type)==="string"?this.data[type]:this.data);
    }
    check(data,model,id){
        console.log(id);
        const {gettype,getkeys,w,err,log} = tools;
        let { base , db } = this.getbody(model,data);
        if(base==="null")throw [base,db,20];
        return {
            base,
            db:gettype(db)==="list"?db.map(e=>{
                return this.getbody(base[id],e);
            }):gettype(db)==="key"?console.warn(db,id):db
        }
    }
    getbody(model,data){
        let {body} = model;
        if(body){
            if(typeof body === "string"){
                if(typeof data === body){
                    let {elements,options} = model;
                    return {
                        base:elements?elements:options?options:null,
                        db:data
                    }
                }else{
                    throw {error:[data,model,body]}
                }
            }else{
                console.warn(body);
            }
        }else if(typeof data === "string"){
            console.warn(data,47);
            return data;
        }else{
            console.warn(data,50)
        }
    }
    setloop(model,data){
        const {gettype,getkeys,w,err,log} = tools;
        if(gettype(data)==="key"){
            let result = {};
            getkeys(data).map(e=>{
                result[e] = {};
                console.log(this.check(typeof data[e]==="object"?data[e]:data,model[e]?model[e]:model,e));
            })
            return result;
        }else{
            console.log(model,data);
        }
    }
}

const tools = {
    sw:(a,b=false)=>'serviceWorker' in navigator?(b?(!navigator.serviceWorker.controller?(a?(navigator.serviceWorker.register(a)):[false,a]):[navigator.serviceWorker.controller.state,navigator.serviceWorker.controller.scriptURL].toString()):a?(navigator.serviceWorker.register(a)):[false,b]
    ):[false,navigator],
    delsw:()=>{
        return new Promise((res,req)=>{const {sw,gettype} = tools;
            if(sw()){
                navigator.serviceWorker.getRegistrations().then(e=>gettype(e)==="list"?{list:e}:{error:e}).then(e=>{let {list,error} = e;if(list){list.map(e=>{e.unregister()});res({status:true});}else if(error){req({status:null})}})
            }else{
                req({status:false});
            }
        })
    },
    ct:()=>'caches' in self?caches:false,
    local:()=>'localStorage' in self?localStorage:false,
    session:()=>'sessionStorage' in self?sessionStorage:false,
    getfile:async (file)=>{
        const {gettype,getkeys,getfile} = tools;
        try{
            if(gettype(file)==="list"){return await getkeys(file).map(async (e)=>await getfile(e));
            }else if(gettype(file)==="string"){return await fetch(file);
            }else{throw file;}
        }catch(err){console.warn(err)}
    },
    getkeys:(a)=>{const{gettype}=tools;if(typeof a === "object"){return gettype(a)==="list"?a:Object.keys(a);}else{throw "require object"}},
    gettype:(a)=>{try{return a?typeof a==="object"?a.length?"list":"key":typeof a:"";}catch(e){console.warn([e],a);}},
    createTag:(a)=>document.createElement(a),
    w:(a)=>console.warn(a),
    err:(a)=>console.error(a),
    log:(a)=>console.log(a),
    db:db
}

function RS(a){
    const {getfile,gettype,getkeys,w,err,log,sw,delsw} = tools; 
    const {require,serviceWorker} = a;
    if(require?gettype(require)==="list":false){
        this.data = (t=1000)=>new Promise((res,req)=>{
            let data = [],i = 0;
            require.map(e=>{getfile(e).then(e=>e.json()).then(e=>data.push(e)).catch(e=>data.push(e))})
            let time = setInterval(()=>{
                if(data.length===require.length){res({data:data,time:i});clearInterval(time);
                }else if(i>t){req({data:data,time:i});clearInterval(time);}
                i++;
            })
        })
    }
    if(serviceWorker?gettype(serviceWorker)==="string":false){
        this.sw = (a)=>new Promise((res,req)=>a?(gettype(a)==="string"?(sw()?(a==="run"?res(sw(serviceWorker,true)):a==="del"?res(delsw()):req({status:null,msg:a})):req({status:false,msg:sw()})):gettype(a)):req({status:false,msg:"require run or del"}))
    }
    this.methods = tools;
}

export default RS;