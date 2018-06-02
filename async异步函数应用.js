var res1 = function(){
    var _p=new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({"a":11}) 
            }, 2000);

    })
     return _p;
}
var res2 = function(d){
    var _p= new Promise((resolve,reject)=>{
        Object.assign(d,{"b":22})
        setTimeout(() => {
            resolve(d) 
            }, 2000);
    });
    return _p;
}

var ss =async function(){
    var data1 = await res1();
    console.log(data1)
    var data2 = await res2(data1);
    console.log(data2)

};
ss();