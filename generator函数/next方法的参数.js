//yield语句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，
 //该参数会被当作上一条yield语句的返回值.
 function *f(){
 	for (var i = 0;true; i++) {
 		var reset = yield i;
 		if(reset) {i=-1};
 	}
 }

 var g= f();
 g.next()// {value:0,done:false}
 g.next()// {value:1,done:false}
 g.next(true)// {value:0,done:true}	
 //这个功能用很重要的语法意义，也就是说。可以在Generator函数运行的不同阶段
 //从外部向内部注入不同的值，从而调整函数行为。
    //******列一   
  function *foo(){
  	var y=2*(yield (x+1));
  	var z= yield (y/3);
  	return (x+y+z);
  }
  var g = foo(5);
  g.next()  //   {value:6,done:fasle}
  g.next(12) //{value:8,done:false}
  g.next(13) //{value:42,done:true}



//如果想要第一次调用next方法时就能够输入值。可以在Generator外面包一层

function Wrapper(generatorFn){
	return function(...args){
		let G = generatorFn(...args);
		G.next();
		return G;
	}
}
let gen =Wrapper(function *(){
	console.log(`First input:${yield}`);
	return 'DONE';
});

// *******Generator函数应用-处理异步请求**********

var res1 = function(){
    var _p=new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({"a":11}) 
            }, 2000);

    })
     return _p;
}
var res2 = function(){
    var _p= new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({"b":22}) 
            }, 2000);
    });
    return _p;
}

function *G(){
    var a= yield res1();
    var b= yield res2();
    return;
};
let obj={

}
var result = G();
var aa = (result.next()).value;
aa.then(res=>{
    console.log(res)
});












































