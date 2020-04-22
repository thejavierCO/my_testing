class tools{
    getMethods(){
        return {
            sw:(a,b=false)=>'serviceWorker' in navigator?(b?(!navigator.serviceWorker.controller?(a?(navigator.serviceWorker.register(a)):[false,a]):[navigator.serviceWorker.controller.state,navigator.serviceWorker.controller.scriptURL].toString()):a?(navigator.serviceWorker.register(a)):[false,b]
            ):[false,navigator],
            delsw:()=>navigator.serviceWorker.getRegistrations().then(function(registrations) {for(let registration of registrations) {registration.unregister()}}),
            ct:()=>'caches' in self?caches:false,
            local:()=>'localStorage' in self?localStorage:false,
            session:()=>'sessionStorage' in self?sessionStorage:false,
            getfile:async (file)=>{let {gettype,getkeys,getfile,ct} = this.getMethods();try{if(gettype(file)==="list"){return await getkeys(file).map(async (e)=>await getfile(e));}else if(gettype(file)==="string"){return await fetch(file);}else{throw file;}}catch(err){console.warn(err);}},
            getkeys:(a)=>{let {gettype} = this.getMethods();if(typeof a === "object"){return gettype(a)==="list"?a:Object.keys(a);}else{throw "require object"}},
            gettype:(a)=>{try{return a?typeof a==="object"?a.length?"list":"key":typeof a:"";}catch(e){console.warn([e],a);}},
            createTag:(a)=>document.createElement(a),
            w:(a)=>console.warn(a),
            gen:json_parser
        }
    }
}

class json_parser extends tools{
    constructor(a){
        super(a);
        const { gettype , getkeys , w} = this.getMethods();
        if(gettype(a)==="list"){
            if(a.length<=2){
                getkeys(a).map(e=>{
                    if(e["document"]&&e["main"]){
                        if(e["document"]["body"]){this.model = e;return [e,"model"]
                        }else{this.db = e;return [e,"db"]}
                    }else{w(["require document and main in array",a]);}
                })
            }else{
                throw "require two elements"
            }
        }else{
            throw "require list"
        }
    }
    checkBody(mol,db){
        const {gettype,getkeys} = this.getMethods();
        let { body , elements , options, reference} = mol;
        if(body){
            let elem = this.checkType(body,db);
            if(elem){
                return {"get":elements?elements:options?options:reference?reference:"","data":db,"body":elem["body"]};
            }else{
                return false;
            }
        }else if(gettype(mol)==="string"){
            return this.checkType(mol,db)?db:false;
        }
    }
    checkType(type,element){
        const { gettype , getkeys} = this.getMethods();
        if(gettype(type)==="string"){
            if(typeof element === type){
                return {"element":element,"body":type};
            }else{
                return false;
            }
        }else if(gettype(type)==="list"){
            let result =  false;
            getkeys(type).map(e=>{
                if(typeof element === e){
                    result = {"element":element,"body":e};
                }
            });
            return result;
        }else{
            throw "require string or list object"
        }
    }
    checkElements(mol,db,body=""){
        const { gettype , getkeys} = this.getMethods();
        let base = db;
        let model = mol;
        mol = gettype(mol)==="key"?getkeys(mol):false;
        db = gettype(db)==="key"?getkeys(db):false;
        if(mol&&db){
            let result = {};
            mol.map(a=>db.map(b=>{if(a===b){
                result[a] = this.checkBody(model[a],base[a]);
            }}))
            return result;
        }else if(gettype(base)==="list"){
            let result = [];
            getkeys(base).map(e=>{
                result.push(this.checkElements(model,e));
            })
            return result;
        }else if(gettype(base)==="string"){
            let result = {};
            result["text"] = base;
            return result;
        }else{
            console.warn(base,model);
        }
    }
    loopFormat(model,db){
        const {gettype,getkeys} = this.getMethods();
        let a = this.checkElements(model,db);
        let result = [];
        if(gettype(a)==="key"){
            getkeys(a).map(b=>{
                if(gettype(a[b])==="string"){
                    result[b] = a[b];
                }else if(gettype(a[b])==="list"){
                    result[b] = [];
                    getkeys(a[b]).map(c=>{
                        if(gettype(c)==="string"){
                            result[b].push(c);
                        }else if(gettype(c)==="list"){
                            console.warn(c,"list")
                        }else if(gettype(c)==="key"){
                            console.warn(c,"key")
                        }
                    })
                }else if(gettype(a[b])==="key"){
                    let {get,data} = a[b];
                    if(get&&data){
                        result[b] = this.loopFormat(get,data);
                    }else{
                        console.log("require get and data");
                    }
                }else{
                    console.error(a[b])
                }
            });
            return result;
        }else if(gettype(a)==="list"){
            return getkeys(a).map(b=>{
                let result=[];
                if(gettype(b)==="string"){
                    console.log(b,"string")
                }else if(gettype(b)==="list"){
                    console.log(b,"list");
                }else if(gettype(b)==="key"){
                    getkeys(b).map(c=>{
                        result[c] = [];
                        if(gettype(b[c])==="string"){
                            result[c] = b[c];
                        }else if(gettype(b[c])==="list"){
                            console.warn(c,"list")
                        }else if(gettype(b[c])==="key"){
                            let {get,data} = b[c];
                            if(get&&data){
                                result[c] = this.loopFormat(get,data);
                            }else{
                                console.log("require get and data");
                            }
                        }
                    })
                }else{
                    console.error(model,db,a)
                }
                return result;
            })
        }else{
            console.warn(a)
        }
    }
    setFormat(a){
        const {gettype} = this.getMethods();
        let model = this.model?(this.model):false;
        let db = this.db?(this.db):false;
        if(a){
            if(model[a]&&db[a]){
                model = model[a];db = db[a];
                if(gettype(model)==="key"){
                    let {get,data} = this.checkBody(model,db);
                    if(get&&data){
                        return this.loopFormat(get,data);
                    }else{
                        console.log("require get and data");
                    }
                }
            }else{
                console.warn(a);
            }
        }else{
            if(model&&db){
                console.log(model,db);
            }
        }
    }
}
export default tools;