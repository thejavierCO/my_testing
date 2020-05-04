function offline_app(a){
    if('caches' in self){
        return caches.open("my-app-offline").then(ct=>{
            return fetch(a.request).then(e=>{
                ct.put(e.url?e.url:a.request.url,e.clone());
                return e;
            }).catch(e=>{
                return ct.match(a.request).then(e=>{
                    return e;
                }).catch(f=>{
                    console.log(e,f);
                })
            })
        });
    }else{
        throw "require caches";
    }
}
self.addEventListener('fetch',(a)=>{
    a.respondWith(offline_app(a));
});
self.addEventListener('sync',(a)=>{
    console.log(a);
});
self.addEventListener('active',(a)=>{
    console.log(a);
});