class db{
    constructor(a,b){
        this.data = this.init(a,b);
    }
    init(a,b){
        return this.render(a,b);
    }
    getdoc(){
        let { document } = this.data;
        if(document){
            return document
        }else{
            return null;
        }
    }
    getmain(){
        let { main } = this.data;
        if(main){
            return main;
        }else{
            return null;
        }
    }
    render(info,model){
        let { getkeys , orden }= this.getMetods();
        try{
            let result = {};
            let molkeys = getkeys(model).keys;
            let dbkeys = getkeys(info).keys;
            molkeys.map(a=>{
                dbkeys.map(b=>{
                    if(a===b){
                        if(getkeys(model[a]).type === "object-keys"){
                            let { elements , body } = model[a];
                            if(typeof info[b]===body){
                                if(getkeys(info[b]).type ==="object-keys"){
                                    result[b] = orden(elements,info[b],b)
                                }else{
                                    throw "require object in"+info[b];
                                }
                            }else{
                                throw "require "+body+" in element "+a;
                            }
                        }else if(getkeys(model[a]).type === "object-list"){
                            throw [model[a],this]
                        }else{
                            throw ["not_defined",this]
                        }
                    }
                })
            })
            return result;
        }catch(err){
            return [err,this];
        }
    }
    getMetods(){
        return {
            getkeys:(a)=>{
                if(typeof a === "object"){
                    if(a.length){
                        return {
                            type:"object-list",
                            keys:Object.keys(a)
                        };
                    }else{
                        return {
                            type:"object-keys",
                            keys:Object.keys(a)
                        };
                    }
                }else{
                    throw ["require object",a,"getkeys"]
                }
            },
            submodel:(a,b)=>{
                let { getkeys , submodel} = b, 
                    { item , referencia , id} = a,
                    { options , body} = referencia,
                    result = {};
                if(typeof id === "string"){
                    if(body){
                        if(typeof item == body){
                            if(body === "object"){
                                let b = getkeys(options);
                                if(b.type === "object-keys"){
                                    b.keys.map(e=>{
                                        if(item[e]){
                                            if(typeof options[e] === "string"){
                                                if(typeof item[e] === options[e]){
                                                    result[e] = item[e];
                                                }else{
                                                    throw "require "+options[e];
                                                }
                                            }else if(typeof options[e] === "object"){
                                                let { body } = options[e];
                                                if(body){
                                                    if(typeof body === "string"){
                                                        if(typeof item[e]=== body){
                                                            let values = getkeys(item[e]);
                                                            if(values.type === "object-keys"){
                                                                result[e] = submodel({referencia:options[e],item:item[e],id:e},this.getMetods());
                                                            }else if(values.type === "object-list"){
                                                                result[e] = [];
                                                                values.keys.map(f=>{
                                                                    result[e].push(submodel({item:item[e][f],referencia:options[e],id:e},this.getMetods()));
                                                                })
                                                            }
                                                        }else{
                                                            throw ["require "+body+" is "+(typeof item[e])+" by "+e,id,94,item[e]];
                                                        }
                                                    }else if(typeof body === "object"){
                                                        let val = getkeys(body);
                                                        if(val.type === "object-list"){
                                                            if(typeof item[e] === "object"){
                                                                let values = getkeys(item[e]);
                                                                if(values.type==="object-list"){
                                                                    result[e] = values.keys.map(g=>{
                                                                        if(typeof item[e][g] === "object"){
                                                                            val.keys.map(f=>{
                                                                                if(typeof item[e] === body[f]){
                                                                                    if(body[f]==="object"){
                                                                                        options[e]["body"] = body[f];
                                                                                        return submodel({item:item[e][g],referencia:options[e],id:e},this.getMetods())
                                                                                    }else if(body[f]==="string"){
                                                                                        return item[e];
                                                                                    }else{
                                                                                        console.warn(item[e]);
                                                                                    }
                                                                                }
                                                                            })
                                                                        }else if(typeof item[e][g] === "string"){
                                                                            let l0 = {text:item[e][g]}
                                                                            let l1 = result[e];
                                                                            return l0;
                                                                        }else{
                                                                            console.warn(item[e][g]);
                                                                        }
                                                                        return item[e][g];
                                                                    })
                                                                }else{
                                                                    console.log(e);   
                                                                }
                                                            }else if(typeof item[e]==="string"){
                                                                val.keys.map(f=>{
                                                                    if(typeof item[e]===body[f]){
                                                                        result[e] = item[e];
                                                                    }
                                                                })
                                                            }
                                                        }else if(values.keys === "object-keys"){
                                                            console.warn(values);
                                                        }else{
                                                            console.warn(body,item[e]);
                                                        }
                                                    }else{
                                                        console.warn(body);
                                                    }
                                                }else{
                                                    throw ["require body in "+(typeof item[e])+" by "+e,id];
                                                }
                                            }else{
                                                console.warn(e);
                                            }
                                        }
                                    })
                                }else if(b.type === "object-list"){
                                    console.warn(b);
                                }
                            }else{
                                console.warn(body);
                            }
                        }else{
                            throw ["require "+body,a];
                        }
                        return result;
                    }else{
                        throw "require body";
                    }
                }else{
                    throw "require string";
                }
            },
            subcontent:(a,b)=>{
                let { item , referencia , id} = a;
                let { getkeys , submodel} = b;
                let { reference, body } = id;
                let result = [];
                if(body){
                    if(typeof item === body){
                        if(body === "object"){
                            let a = getkeys(item);
                            if(a.type === "object-list"){
                                a.keys.map(e=>{
                                    let { options , body } = referencia[reference];
                                    let b = item[e];
                                    if(body){
                                        if(typeof b === body){
                                            if(options){
                                                let get = getkeys(options)
                                                if(get.type === "object-keys"){
                                                    let res = {};
                                                    get.keys.map(e=>{
                                                        if(b[e]){
                                                            res[e] = {};
                                                            if(options[e]){
                                                                if(typeof options[e] === "object"){
                                                                    res[e] = submodel({
                                                                        item:b[e],
                                                                        referencia:options[e],
                                                                        id:e
                                                                    },this.getMetods())
                                                                }else if(typeof options[e] === "string"){
                                                                    if(typeof b[e] === options[e]){
                                                                        res[e] = b[e];
                                                                    }else{
                                                                        throw "require "+options[e];
                                                                    }
                                                                }else{
                                                                    throw typeof options[e];
                                                                }
                                                            }else{
                                                                throw e;
                                                            }
                                                        }
                                                    })
                                                    result.push(res);
                                                }else if(get.type === "object-list"){
                                                    console.warn(options,b,get,"list")
                                                }
                                            }else{
                                                throw "require options";
                                            }
                                        }else{
                                            throw "require "+body+" in"+(typeof b);
                                        }
                                    }else{
                                        throw "require body "+(typeof b);
                                    }
                                })
                            }else if(a.type === "object-keys"){
                                console.warn(a);
                            }
                        }
                    }else{
                        throw "require "+body+" in"+(typeof item);
                    }
                }else{
                    throw "require body "+(typeof item);
                }
                return result;
            },
            orden:(model,db,type)=>{
                let requires = [];
                let result = {};
                let {getkeys,subcontent} = this.getMetods();
                let mkeys = getkeys(model).keys;
                let dkeys = getkeys(db).keys;
                mkeys.map(a=>{
                    if(a==="reference"){
                        requires[a] = model[a];
                    }
                    dkeys.map(b=>{
                        if(a==b){
                            if(getkeys(requires).keys.length){
                                const mly = model[a];
                                const ely = db[a];
                                let elm = getkeys(mly);
                                let body;
                                let refe = {}
                                elm.keys.map(e=>{
                                    if(e === "reference"){
                                        const l = mly[e];
                                        if(typeof l ==="object"){
                                            if(l.length){
                                                l.map(e=>{
                                                    let c = getkeys(requires);
                                                    if(c.type === "object-keys"){
                                                        c.keys.map(f=>{
                                                            if(f==="reference"){
                                                                let ref = requires[f];
                                                                if(ref["elements"]){
                                                                    ref = ref["elements"];
                                                                    if(ref[e]){
                                                                        refe[e] = ref[e]
                                                                    }else{
                                                                        refe[e] = {};
                                                                    }
                                                                }
                                                            }
                                                        })
                                                    }
                                                })
                                            }else{
                                                console.warn(l,"object");
                                            }
                                        }else if(typeof l === "string"){
                                            let c = getkeys(requires);
                                            if(c.type === "object-keys"){
                                                c.keys.map(e=>{
                                                    if(e==="reference"){
                                                        let ref = requires[e];
                                                        if(ref["elements"]){
                                                            ref = ref["elements"];
                                                            if(ref[l]){
                                                                refe[l] = ref[l]
                                                            }else{
                                                                refe[l] = {};
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }else if(e==="body"){
                                        body = mly[e];
                                    }
                                })
                                if(typeof ely === body){
                                    if(body==="object"){
                                        if(ely.length){
                                            result[a] = [];
                                            result[a] = subcontent({
                                                item:ely,
                                                referencia:refe,
                                                id:mly
                                            },this.getMetods())
                                        }else{
                                            console.warn(ely);
                                        }
                                    }else{
                                        console.warn(ely);
                                    }
                                }else{
                                    throw "require "+body+" is "+ (typeof ely) + " in "+a+" by "+type;
                                }
                            }else{
                                if(typeof model[a] === "string"){
                                    if(typeof db[a] === model[a]){
                                        result[a] = db[a];
                                    }else{
                                        console.warn(a);
                                    }
                                }else if(typeof model[a]==="object"){
                                    console.warn(model[a]);
                                }else{
                                    console.error(model[a])
                                }
                            }
                        }
                    })
                })
                return result;
            }
        }
    }
}
export default db;