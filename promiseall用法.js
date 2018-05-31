
//Promise.all()   用法处理多个异步任务同时请求
let p1 = new Promise((resolve,reject)=>{
    let obj1={"aaa":111}
    setTimeout(()=>{

        resolve({"obj1":obj1})
    },500)
})
let p2 = new Promise((resolve,reject)=>{
    let obj2={"bbb":222}
    setTimeout(()=>{

        resolve({"obj2":obj2})
    },1000)
})

const p = Promise.all([p1, p2]).then(arr=>{
    var obj = {};
    for([index,value] of arr.entries()){
        Object.assign(obj,value);
    }
    console.log(JSON.stringify(obj));
   
})