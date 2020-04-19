import RS from "../../RunService";
const rs = new RS();
const get = rs.getMethods();
class doc{
    constructor(a){
        let {gettype,getkeys} = get;
        if(gettype(a)==="key"){
            getkeys(a).map(e=>{
                switch(e){
                    case "title":
                        document.title = a[e];
                    break;
                    case "styles":
                        if(gettype(a[e])==="list"){
                            getkeys(a[e]).map(e=>{
                                let tag = document.createElement("link");
                                tag.setAttribute("href",e);
                                tag.setAttribute("type", "text/css");
                                tag.setAttribute("rel","stylesheet");
                                document.head.appendChild(tag);
                            })
                        }else if(gettype(a[e])==="key"){
                            console.warn(a[e]);
                        }
                    break;
                    case "scripts":
                    if(gettype(a[e])==="list"){
                        getkeys(a[e]).map(e=>{
                            let tag = document.createElement("script");
                            tag.setAttribute("src",e);
                            document.head.appendChild(tag);
                        })
                    }else if(gettype(a[e])==="key"){
                        console.warn(a[e]);
                    }
                    break;
                }
            })
        }
        return get;
    }
}
export default doc;