import RS from "../RunService.v2";
const rs = new RS();
const get = rs.getMethods();
class main{
    constructor(a){
        this.accions = [];
        this.btn = [];
        this.menu = [];
        let { createTag,genlist } = this.getMets();
        let {gettype,getkeys} = get;
        if(a){
            if(gettype(a)==="key"){
                getkeys(a).map(e=>{
                    switch(e){
                        case "botton":
                            if(gettype(a[e])==="list"){
                                this.btn.push(getkeys(a[e]).map(e=>{
                                    let div = createTag("div");
                                    let item = e;
                                    if(gettype(item)==="key"){
                                        getkeys(item).map(e=>{
                                            switch(e){
                                                case "name":
                                                    div.setAttribute("id",item[e]);
                                                    break;
                                                case "icon":
                                                    if(gettype(item[e])==="key"){
                                                        let icon = item[e];
                                                        getkeys(icon).map(e=>{
                                                            switch(e){
                                                                case "img":
                                                                    let img = createTag("img");
                                                                    img.setAttribute("src",icon[e])
                                                                    img.setAttribute("id","boton");
                                                                    div.appendChild(img);
                                                                break;
                                                                case "style":
                                                                    let i = createTag("i");
                                                                    i.setAttribute("class",icon[e]);
                                                                    i.setAttribute("id","boton");
                                                                    div.appendChild(i);
                                                                break;
                                                                case "accions":
                                                                    if(gettype(icon[e])==="list"){
                                                                        getkeys(icon[e]).map(f=>{
                                                                            this.accions.push({accions:f,id:item["name"]});
                                                                        })
                                                                    }else if(gettype(icon[e])==="key"){
                                                                        console.warn(icon[e],"key");
                                                                    }else{
                                                                        console.warn(icon[e]);
                                                                    }
                                                                break;
                                                                default:
                                                                    console.log(icon[e],e);
                                                            }
                                                        })
                                                    }else if(gettype(item[e])==="list"){
                                                        console.warn(item[e])
                                                    }else{
                                                        console.warn(item[e]);
                                                    }
                                                    break;
                                                default:
                                                    console.log(item[e])
                                            }
                                        })
                                    }
                                    return [div,e["name"]?e["name"]:""];
                                }))
                            }else if(gettype(a[e])==="key"){
                                console.warn(a[e],"key");
                            }else{
                                console.warn(a[e]);
                            }
                        break;
                        case "menu":
                            if(gettype(a[e])==="list"){
                                this.menu.push(getkeys(a[e]).map(e=>{
                                    let div = createTag("div");
                                    let btnid = "";
                                    let btntitle = "";
                                    let item = e;
                                    if(gettype(item)==="key"){
                                        getkeys(item).map(e=>{
                                            let menu = item[e];
                                            switch(e){
                                                case "name":
                                                    if(gettype(menu)==="string"){
                                                        div.setAttribute("name",menu);
                                                        let t = createTag("span");
                                                        t.innerHTML = menu;
                                                        btntitle=t
                                                    }
                                                break;
                                                case "btn"://btn
                                                    if(menu["id"]&&gettype(menu["id"])==="string"){div.setAttribute("id",menu["id"]+"-menu");btnid = menu["id"]}
                                                break;
                                                case "content":
                                                    if(gettype(menu)==="list"){
                                                        console.warn(menu,"list")
                                                    }else if(gettype(menu)==="key"){
                                                        let conet = createTag("div");
                                                        conet.setAttribute("id","menu-content");
                                                        getkeys(menu).sort((a,b)=>a>b?-1:0).map(e=>{
                                                            switch(e) {
                                                                case "title":
                                                                    let title = createTag("div");
                                                                    if(gettype(menu[e])==="key"){
                                                                        getkeys(menu[e]).sort((a,b)=>a>b?-1:0).map(f=>{
                                                                            switch(f){
                                                                                case "style":
                                                                                    title.setAttribute("class",menu[e][f]);
                                                                                break;
                                                                                case "content":
                                                                                    if(gettype(menu[e][f])==="list"){
                                                                                        console.warn(menu[e][f]);
                                                                                    }else if(gettype(menu[e][f])==="key"){
                                                                                        console.log(menu[e][f]);
                                                                                    }else if(gettype(menu[e][f])==="string"){
                                                                                        title.innerHTML = menu[e][f];
                                                                                    }else{
                                                                                        console.warn(menu[e][f],gettype(menu[e][f]));
                                                                                    }
                                                                                break;
                                                                                default:
                                                                                console.log(menu[e][f]);
                                                                            }
                                                                        })
                                                                    }else if(gettype(menu[e])==="list"){
                                                                        console.warn(menu[e],"list");
                                                                    }else{
                                                                        console.warn(menu[e])
                                                                    }
                                                                    conet.appendChild(title);
                                                                break;
                                                                case "subtitle":
                                                                    let subtitle = createTag("div");
                                                                    if(gettype(menu[e])==="key"){
                                                                        getkeys(menu[e]).sort((a,b)=>a>b?-1:0).map(f=>{
                                                                            switch(f){
                                                                                case "style":
                                                                                    subtitle.setAttribute("class",menu[e][f]);
                                                                                break;
                                                                                case "content":
                                                                                    if(gettype(menu[e][f])==="list"){
                                                                                        console.warn(menu[e][f]);
                                                                                    }else if(gettype(menu[e][f])==="key"){
                                                                                        console.log(menu[e][f]);
                                                                                    }else if(gettype(menu[e][f])==="string"){
                                                                                        subtitle.innerHTML = menu[e][f];
                                                                                    }else{
                                                                                        console.warn(menu[e][f],gettype(menu[e][f]));
                                                                                    }
                                                                                break;
                                                                                default:
                                                                                console.log(menu[e][f]);
                                                                            }
                                                                        })
                                                                    }else if(gettype(menu[e])==="list"){
                                                                        console.warn(menu[e],"list");
                                                                    }else{
                                                                        console.warn(menu[e])
                                                                    }
                                                                    conet.appendChild(subtitle);
                                                                break;
                                                                case "list":
                                                                    let list = createTag("div");
                                                                    list.setAttribute("class","list-content");
                                                                    if(gettype(menu[e])==="list"){
                                                                        getkeys(menu[e]).map(e=>{
                                                                            if(gettype(genlist(e))==="list"){
                                                                                getkeys(genlist(e)).map(e=>{
                                                                                    list.appendChild(e);
                                                                                })
                                                                            }else{
                                                                                console.warn(e);
                                                                            }
                                                                        })
                                                                    }else{
                                                                        console.warn(menu[e]);
                                                                    }
                                                                    conet.appendChild(list);
                                                                break;
                                                                default:
                                                                    console.log(menu[e]);
                                                            }
                                                        })
                                                        div.appendChild(conet);
                                                    }else{
                                                        console.warn(menu);
                                                    }
                                                break;
                                                default:
                                                    console.log(item[e],e,"default");
                                            }
                                        })
                                    }else if(gettype(item)==="list"){
                                        console.warn(item,"list");
                                    }else{
                                        console.warn(item);
                                    }
                                    return [div,btnid,btntitle];
                                }))
                            }else if(gettype(a[e])==="key"){
                                console.warn(a[e],"key");
                            }else{
                                console.warn(a[e]);
                            }
                        break;
                        default:
                            console.log(a[e])
                    }
                })
            }
            return {"btn":this.btn,"menu":this.menu};
        }
    }
    getMets(){
        return {
            createTag:(a)=>document.createElement(a),
            genlist:(a,type)=>{
                let { gettype , getkeys } = get;
                let { createTag , genlist } = this.getMets();
                if(gettype(a)==="key"){
                    return (getkeys(a).map(b=>{
                        let c = createTag("div");
                        switch(b){
                            case "title":
                                if(gettype(a[b])==="string"){
                                    c.setAttribute("class","list-title");
                                    c.innerHTML = a[b];
                                }else{
                                    console.warn(a[b])
                                }
                            break;
                            case "text":
                                if(gettype(a[b])==="string"){
                                    c.setAttribute("class","list-text");
                                    c.innerHTML = a[b];
                                }else{
                                    console.warn(a[b])
                                }
                            break;
                            case "list":
                                c.setAttribute("class","list-list");
                                if(gettype(a[b])==="string"){
                                    c.innerHTML = a[b];
                                }else if(gettype(a[b]==="key")){
                                    let tlist = createTag("div");
                                    tlist.setAttribute("class","list-list");
                                    getkeys(a[b]).map(d=>{
                                        let t
                                        switch(d){
                                            case "title":
                                                t = createTag("div");
                                                t.setAttribute("class","title-list");
                                                if(gettype(a[b][d])==="string"){
                                                    t.innerHTML =  a[b][d];
                                                }else{
                                                    console.warn(a[b][d]);
                                                }
                                                tlist.appendChild(t);
                                            break;
                                            case "list":
                                                t = createTag("div");
                                                t.setAttribute("class","list-list");
                                                let items_list = genlist(a[b][d],"list");
                                                if(gettype(items_list)==="list"){
                                                    getkeys(items_list).map(e=>{
                                                        t.appendChild(e);
                                                    })
                                                }else{
                                                    console.log(items_list);
                                                }
                                                tlist.appendChild(t);
                                            break;
                                            case "footer":
                                                t = createTag("div");
                                                t.setAttribute("class","footer-list");
                                                if(gettype(a[b][d])==="string"){
                                                    t.innerHTML =  a[b][d];
                                                }else{
                                                    console.warn(a[b][d]);
                                                }
                                                tlist.appendChild(t);
                                            break;
                                        }
                                    })
                                    c.appendChild(tlist);
                                }else if(gettype(a[b]==="list")){
                                    console.warn(a[b]);
                                }
                            break;
                            case "link":
                                c.setAttribute("class","list-link");
                                if(gettype(a[b])==="string"){
                                    c.innerHTML = a[b];
                                }else if(gettype(a[b]==="key")){
                                    let tlink = createTag("div");
                                    tlink.setAttribute("class","list-link");
                                    getkeys(a[b]).map(d=>{
                                        let t
                                        switch(d){
                                            case "title":
                                                t = createTag("div");
                                                t.setAttribute("class","title-list");
                                                if(gettype(a[b][d])==="string"){
                                                    t.innerHTML =  a[b][d];
                                                }else{
                                                    console.warn(a[b][d]);
                                                }
                                                tlink.appendChild(t);
                                            break;
                                            case "list":
                                                t = createTag("div");
                                                t.setAttribute("class","link-list");
                                                let items_list = genlist(a[b][d],"link");
                                                if(gettype(items_list)==="list"){
                                                    getkeys(items_list).map(e=>{
                                                        t.appendChild(e);
                                                    })
                                                }else{
                                                    console.log(items_list);
                                                }
                                                tlink.appendChild(t);
                                            break;
                                        }
                                    })
                                    c.appendChild(tlink);
                                }else if(gettype(a[b]==="list")){
                                    console.warn(a[b]);
                                }
                            break;
                            case "image":
                                c.setAttribute("class","list-image");
                                if(gettype(a[b])==="string"){
                                    c.innerHTML = a[b];
                                }else if(gettype(a[b]==="key")){
                                    let im = createTag("img");
                                    getkeys(a[b]).map(d=>{
                                        switch(d){
                                            case "url":
                                                im.setAttribute("src",a[b][d]);
                                            break;
                                            case "style":
                                                im.setAttribute("class",a[b][d]);
                                            break;
                                        }
                                    })
                                    c.appendChild(im);
                                }else if(gettype(a[b]==="list")){
                                    console.warn(a[b]);
                                }
                            break;
                            case "phone":
                                c.setAttribute("class","list-phone");
                                if(gettype(a[b])==="string"){
                                    c.innerHTML = a[b];
                                }else if(gettype(a[b]==="key")){
                                    let tphone = createTag("div");
                                    tphone.setAttribute("class","list-phone");
                                    getkeys(a[b]).map(d=>{
                                        let t
                                        switch(d){
                                            case "title":
                                                t = createTag("div");
                                                t.setAttribute("class","title-list");
                                                if(gettype(a[b][d])==="string"){
                                                    t.innerHTML =  a[b][d];
                                                }else{
                                                    console.warn(a[b][d]);
                                                }
                                                tphone.appendChild(t);
                                            break;
                                            case "list":
                                                t = createTag("div");
                                                t.setAttribute("class","phone-list");
                                                let items_list = genlist(a[b][d],"phone");
                                                if(gettype(items_list)==="list"){
                                                    getkeys(items_list).map(e=>{
                                                        t.appendChild(e);
                                                    })
                                                }else{
                                                    console.log(items_list);
                                                }
                                                tphone.appendChild(t);
                                            break;
                                        }
                                    })
                                    c.appendChild(tphone);
                                }else if(gettype(a[b]==="list")){
                                    console.warn(a[b]);
                                }
                            break;
                        }
                        return c;
                    }))
                }else if(gettype(a)==="list"){
                    return getkeys(a).map(e=>{
                        if(gettype(e)==="string"){
                            switch(type){
                                case "link":
                                    let link = createTag("a");
                                    link.setAttribute("class","item");
                                    link.setAttribute("href",e);
                                    link.innerHTML = e;
                                    return link;
                                case "phone":
                                    let phone = createTag("span");
                                    phone.setAttribute("class","item");
                                    phone.innerHTML = e;
                                    return phone;
                                case "list":
                                    let lit = createTag("span");
                                    lit.setAttribute("class","item");
                                    lit.innerHTML = e;
                                    return lit;
                            }
                        }else{
                            console.warn(e);
                        }
                    })
                }else{
                    console.warn(a);
                }
            }
        }
    }
}
export default main; 