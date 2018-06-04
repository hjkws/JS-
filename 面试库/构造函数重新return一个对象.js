

//构造函数重新return一个对象指向将会发生改变；
function Ack(){
    this.name = "hjkws";
    this.sayName=function(){
        console.log(this.name)
    }
    return {
        sayName(){
            console.log("hjk")
        } 
    };
}

var obj =new Ack();
obj.sayName();   //输出 hjk


1、如果我能进入贵公司将会触及到那些内容呢？
2、年终奖
3、薪酬调整周期大概是多长调整一次呢。
4、