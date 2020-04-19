import tools from "./tools";
class rs extends tools{
    constructor(a){
        super(a);
        this.data = [];
        const {gettype,getkeys,getfile,w} = this.getMethods();
        if(gettype(a)==="key"){
            getkeys(a).map(e=>{
                switch(e){
                    case "require":
                        this.req = a[e];
                    break;
                    case "serviceWorker":
                        this.sw = a[e];
                    break;
                    default:
                        w(a);
                }
            })
        }else{
            w(a);
        }
    }
    async db(base,require){
        console.log(await base, await require);
    }
    get(f){
        let data = [];
        const {ct,getfile} = this.getMethods();
        getfile(this.req).then(async a=>{
            return a.map(async e=>{
                let i = await e;
                if(ct()){ct().open("require_info").then(f=>{
                    console.log(i.json());
                })}
                data.push(i);
            })
        })
        let t = setInterval(()=>{
            if(this.req.length===data.length){
                if(f){f(data,this.getMethods())}
                clearInterval(t);
            }
        })
    }
    Run(){
        let { sw } = this.getMethods();
        sw(this.sw);
    }
    del(){
        let { delsw } = this.getMethods();
        delsw();
    }
}
export default rs;