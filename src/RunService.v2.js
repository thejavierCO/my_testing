import tools from "./tools";
class rs extends tools{
    constructor(a){
        super(a);
        this.req = [];
        this.sw = [];
        const {gettype,getkeys,getfile,w,ct} = this.getMethods();
        if(gettype(a)==="key"){
            getkeys(a).map(e=>{
            switch(e){
                case "require":if(gettype(a[e])==="list"){this.reqB=a[e].length;getkeys(a[e]).map(e=>{if(gettype(e)==="string"){getfile(e).then(async e=>this.req.push(await e.json()))}else{w(e);}})}else{w(a[e]);}break;
                case "serviceWorker":if(gettype(a[e])==="string"){this.sw = a[e];}else{w(a[e]);}break;
                default:w(a);
            }})
        }else{w(a);}
    }
    state(a=false){const {gettype,w,sw,delsw} = this.getMethods();return a?(gettype(a)=="string"?(sw()?(a==="run"?(sw(this.sw,true)):a==="del"?(delsw()):[a]):false):gettype(a)):w("require run or del")}
    get(a=100){return new Promise((res,rec)=>{let i = 0;let time = setInterval(()=>{i++;if(this.req.length===this.reqB){res(this.req);clearInterval(time);}else if(i>a){rec(null);clearInterval(time);}});})}
}
export default rs;