/*
*获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
*
*/
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    date.getHours() +
    seperator2 +
    date.getMinutes() +
    seperator2 +
    date.getSeconds();
  return currentdate;
}

var ua = navigator.userAgent.toUpperCase();
var ms = sessionStorage.getItem("mediasource"); // true为好车主App【HCZANDROID：Android系统；HCZIOS：IOS系统】
var hcz = ua.indexOf("HCZANDROID") != -1 || ua.indexOf("HCZIOS") != -1;
////判断微信环境
let isWxEnv = /MICROMESSENGER/.test(navigator.userAgent.toUpperCase());
var env = {
  wx: !WxAuth.inH5, // true为微信
  hcz: hcz, // true为好车主App
  IS_ANDROID: ua.indexOf("ANDROID") != -1,
  IS_IOS: ua.indexOf("IPHONE OS") != -1
};

function createScript() {
  var script = document.createElement("script");
  script.setAttribute("src", "../js/third-party/require2.1.15-min.js");
  script.setAttribute(
    "data-main",
    "js/myService.js?" +
      Math.random()
        .toString()
        .substring(5)
  );
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(script);
}

//判断浏览器已开启Cookie
if (!navigator.cookieEnabled) {
  alert(
    "请确认您当前的浏览器已开启Cookie，如果您是IOS设备，请在  设置=>safari=>接受Cookie 中选择“总是”"
  );
}


//---------在URL后面最加参数 -------------------------------
function json2url(obj){
    var rtn = "", sign = "&";
    if(typeof obj != "undefined" && obj != null){
       for(var item in obj){
          rtn += item + "=" + obj[item] + sign;
       }
       if(rtn.substring(rtn.length-1) == sign){
          rtn += Math.random();
       }
    }
    return rtn;
 }
 function appendParams(url, params){
    if(arguments.length == 1){
       params = arguments[0];
       url = "";
    }
    if(typeof url != "undefined" && url != null && url != "" && url != "null"){
       var pms = json2url(params);
       if(pms == ""){
          pms += Math.random();
       }
       return url += ((url.indexOf('?') != -1) ? '&' : '?') + location.search.substring(1) + "&" + pms;
    }else{
       return "";
    }
 }

 //--------获取地址栏search参数对象----------------------
// 获取地址栏search参数对象
function getSearchObj(search) {
    var obj = {};
    search = search.charAt(0) == "?" ? search.substring(1) : search;
    if(search == ''){return obj};
    var a_search = search.split('&');
    if(a_search){
        for(var i = 0, len = a_search.length; i < len; i++){
            var el = a_search[i];
            if(el){
                var els = el.split('=');
                obj[els[0]] = els[1];
            }
        }
    }
    return obj;
};
/**
 * 随机数
 */
function rand() {
    var d = new Date();
    return d.getMilliseconds();
 }

 //------在URL后面最加参数------
 function objBecomeArr(objData){
    var arr = [];
    for(item in objData){
       arr.push(item+'='+objData[item])
    }
    return arr;
 }

//获取url的所有参数，转变为object调用
function getUrlParams(){
    var index = location.href.indexOf("?"),
        query = location.href.slice(index + 1);
    
    var queryArr = query.split("&"),
        i = 0 ,
        len = queryArr.length,
        data = {};
    
    for(; i < len; i++){
        var arr = queryArr[i].split("=");
        data[arr[0]] = decodeURI(arr[1]);
    }
    
    return data;
}
////-----使用js计算N天前后的日期-------
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0    
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0    
    return y+"-"+m+"-"+d;
} 










