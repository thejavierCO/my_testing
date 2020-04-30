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
            gen:json_parser,
            html_parser
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
class html_parser extends tools{
    constructor(a){
        super(a);
        let {botton,menu} = a;
        if(botton&&menu){
            this.data = a;
        }
    }
    getcontent(event){
        const {gettype,getkeys,createTag,w} = this.getMethods();
        let data = this.data;
        if(data){
            let {botton,menu} = data;
            if(gettype(botton)==="list"&&gettype(menu)==="list"){
                let content = getkeys(menu).map(e=>{
                    let {btn} = e;
                    getkeys(botton).map(f=>{if(f.name===btn.id){e.btn = f;}})
                    return e;
                });
                console.log(getkeys(content).map((e,n)=>{
                    return getkeys(e).map(f=>{
                        if(gettype(e[f])==="string"){
                            let div = createTag("div");
                            let title = createTag("h2");
                            title.innerHTML = e[f];
                            title.setAttribute("class","title");
                            div.setAttribute("class","M");
                            div.setAttribute("id","Menu"+n);
                            div.appendChild(title);
                            return div;
                        }else if(gettype(e[f])==="key"){
                            let div = createTag("div");
                            if(f==="btn"){
                                if(gettype(e[f])==="key"){
                                    getkeys(e[f]).map(g=>{
                                        let item = e[f];
                                        if(g==="name"){
                                            div.setAttribute("id",item[g]);
                                        }
                                        if(g==="icon"){
                                            let {style,img,image,accions} = item[g];
                                            if(style||img||image){
                                                let i = false,imgTag = false;
                                                if(style&&gettype(style)==="string"){
                                                    i = createTag("i");
                                                    i.setAttribute("class",style);
                                                }else if(img||image){
                                                    imgTag = createTag("img");
                                                    let src = img?gettype(img)==="string"?img:w("require string",img):image?gettpe(image)==="string"?image:w("require string",image):w("require src");
                                                    imgTag.setAttribute("src",src);
                                                }
                                                let tag = i?i:imgTag?imgTag:w("require tag");
                                                tag.onclick = event?event:()=>{w("require event in getcontent")};
                                                div.appendChild(tag);
                                            }
                                            if(accions){
                                                console.warn(accions);
                                            }
                                        }
                                    })
                                }
                            }else if(f==="content"){
                                console.log(this.setTitle(e[f]),f);
                            }
                            return div;
                        }else{
                            console.warn(e[f]);
                            return e[f];
                        }
                    })
                }))
            }
        }
    }
    setTitle(a){
        const { gettype , getkeys , w , createTag} = this.getMethods();
        const {title, subtitle, list} = a;
        let div = createTag("div");
        if(title){
            let { content , style} = title;
            let t = createTag("span");
            t.setAttribute("class",style?style:"t");
            t.innerHTML = content;
            div.appendChild(t);
        }
        if(subtitle){
            let { content , style} = subtitle;
            let st = createTag("span");
            st.setAttribute("class",style?style:"st");
            st.innerHTML = content;
            div.appendChild(st);
        }
        if(list){
            console.log(this.setList(list),"result list");
        }
        return div;
    }
    setList(a){
        const { gettype, getkeys ,w , createTag} = this.getMethods();
        if(gettype(a)==="list"){
            return getkeys(a).map(e=>{
                console.log(this.setList(e),"result");
                return e;
            })
        }else if(gettype(a)==="key"){
            let {title,subtitle,text,list,link,image,phone,footer} = a;
            if(title){
                if(gettype(title)==="string"){
                    let div = createTag("div");
                    div.setAttribute("class","title");
                    div.innerHTML = title;
                    return div
                }
            }else if(subtitle){
                if(gettype(subtitle)==="string"){
                    let div = createTag("div");
                    div.setAttribute("class","subtitle");
                    div.innerHTML = subtitle;
                    return div
                }
            }else if(text){
                if(gettype(text)==="string"){
                    let div = createTag("span");
                    div.setAttribute("class","text");
                    div.innerHTML = text;
                    return div
                }
            }else if(list){
                if(gettype(list)==="key"){
                    let div = createTag("div");
                    div.setAttribute("class","list");
                    let {title,footer} = list;
                    list = list.list;
                    if(title){
                        div.appendChild(this.setList({title}));
                    }
                    if(list){
                        let l = createTag("ul");
                        l.setAttribute("class","list");
                        getkeys(this.setList({list})).map(e=>{
                            let u = createTag("li");
                            u.setAttribute("class","item");
                            u.appendChild(e);
                            l.appendChild(u);
                        })
                        div.appendChild(l);
                    }
                    if(footer){
                        div.appendChild(this.setList({title}));
                    }
                    return div;
                }else if(gettype(list)==="list"){
                    return getkeys(list).map(e=>{
                        return this.setList(e);
                    })
                }else{
                    console.warn(list);
                }
            }else if(link){
                console.log(link);
            }else if(image){
                console.log(image);
            }else if(phone){
                console.log(phone);
            }else if(footer){
                if(gettype(footer)==="string"){
                    let div = createTag("span");
                    div.setAttribute("class","footer");
                    div.innerHTML = footer;
                    return div
                }
            }else{console.warn(a)}
        }else{
            console.warn(a);
        }
    }
    getboton(){}
    getmenu(){}
}
export default tools;