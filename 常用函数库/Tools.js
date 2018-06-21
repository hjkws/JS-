'use strict'
import _$ from '@/utils/zepto.v1.1.3.min.js'
import _ from 'lodash'

const Tools = {

    
    
    /**
     * [getParams 获取url参数]
     * @param  {[type]} sName [：参数名]
     * @return {[type]}       [返回参数值（没有的时候返回空）]
     */
    getParams(sName) {
        let reg = new RegExp("(^|&)" + sName + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURIComponent(r[2]); // (r[2]);
        return "";
    },
    authorize() {
        let encodeUrl =
          encodeURIComponent(location.origin + location.pathname) +
          encodeURIComponent(encodeURIComponent(location.search));
        let _urlTest =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx09769f16184874e7&redirect_uri=http%3A%2F%2Feim-talk-stg.dmzstg.pingan.com.cn%2Fpacx-pir%2Fredirect%3FbackUrl%3D" +
          encodeUrl +
          "%26weappNo%3DPINGAN_4008000000_01&response_type=code&scope=snsapi_base&state=sig#wechat_redirect";
        let _urlProduct = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx83cc2d83b5d02c9f&redirect_uri=http%3A%2F%2Feim.pingan.com.cn%2Fpacx%2Fredirect%3FbackUrl%3D"+encodeUrl+"%26weappNo%3DPINGAN_4008000000_01&response_type=code&scope=snsapi_base&state=sig#wechat_redirect"
          // let _url=/u.pingan.com/.test(location.href) ? 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx83cc2d83b5d02c9f&redirect_uri=https%3A%2F%2Feim.pingan.com.cn%2Fpacx%2FsimpleRedirect%3FbackUrl%3D' + encodeUrl + '&response_type=code&scope=snsapi_base#wechat_redirect': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx09769f16184874e7&redirect_uri=http%3A%2F%2Feim-talk-stg.dmzstg.pingan.com.cn%2Fpacx-pir%2FsimpleRedirect%3FbackUrl%3D' + encodeUrl + '&response_type=code&scope=snsapi_base#wechat_redirect';
          let _url=/u.pingan.com/.test(location.href) ?_urlProduct:_urlTest;
        location.href = _url;
    },
    getURIParams() {
        var openId = this.getParams('openId') || this.getParams('openid') || this.Cookie('openId') || '';
        var signature = this.getParams('signature') || this.getParams('signature') || this.Cookie('signature') || '';
        var nonce = this.getParams('nonce') || this.getParams('nonce') || this.Cookie('nonce') || '';
        var timestamp = this.getParams('timestamp') || this.getParams('timestamp') || this.Cookie('timestamp') || '';
        var unionId = this.getParams('unionid') || this.getParams('unionid') || this.Cookie('unionid') || '';
        if (openId != null && openId != '') {
            this.Cookie('openId', openId, { path: "/" });
        }
        if (signature != null && signature != '') {
            this.Cookie('signature', signature, { path: "/" });
        }
        if (nonce != null && nonce != '') {
            this.Cookie('nonce', nonce, { path: "/" });
        }
        if (timestamp != null && timestamp != '') {
            this.Cookie('timestamp', timestamp, { path: "/" });
        }
        if (unionId != null && unionId != '') {
            this.Cookie('unionId', unionId, { path: "/" });
        }
        return {
            openId: openId,
            signature: signature,
            nonce: nonce,
            timestamp: timestamp,
            unionId:unionId
        };
    },
    /**
     * [Cookie 获取Cookie参数]
     * @param  {[String]} key [：参数名]
     * @param  {[type]} key [：参数名]
     * @return {[type]}     [返回参数值（没有的时候返回null）]
     */
    Cookie(key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = options || {};

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);

            return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
        }
        options = value || {};
        var decode = options.raw ? function(s) {
            return s;
        } : decodeURIComponent;
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key)
                return decode(pair[1] || '');
        }
        return null;
    },
    /**
     * [extends 合并对象]
     * @param  {[object]} target [对象]
     * @return {[object]}        [合并后对象]
     */
    extends(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    },

    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    },
    mergeJSON() {
        var target, options, len, copy;
        i = 1;
        target = arguments[0],
            len = arguments.length;

        if (len === 1) { return target; }
        for (; i < len; i++) {
            if ((options = arguments[i]) != null) {
                for (var _ in options) {
                    target[_] = options[_];
                }
            }
        }
        return target;
    },
    //url  callback is require  
    $getData(_url, callback, errorCallback, _params, method) {
        var isErr = false;
        if (!method) {
            _params ? (method = 'POST') : (method = 'GET');
        }
        var httpJSON = {
            method: method,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            url: _url
        };

        if (_params) {
            httpJSON.params = _params;
        }

        this.$http(httpJSON).then(response => {
            callback && callback(response);
        }).catch(response => {
            errorCallback && errorCallback(response);
        });
    },
    formatDate(time) {
        if (typeof time != 'string') {
            return;
        }
        time = time.replace(/-/g, '/');
        let date = new Date(time);
        let year = date.getFullYear();
        let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
        let dateStr = year + '年' + month + '月' + day + '日';
        return dateStr
    },
    validateMobile(str, callback, errorCallback) {
        var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/,
            mes = '';
        if (typeof(str) == 'string' && str.trim() == '') {
            mes = '手机号不能为空！';
            errorCallback && errorCallback(mes);
            return false;
        }
        if (reg.test(str)) {
            callback && callback();
            return true;
        }
        mes = '您填入的手机号格式有误！';
        errorCallback && errorCallback(mes);
        return false;
    },
    validateEmail(str, callback, errorCallback) {
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            mes = '';
        if (typeof(str) == 'string' && str.trim() == '') {
            mes = '邮箱地址不能为空！';
            errorCallback && errorCallback(mes);
            return false;
        }
        if (reg.test(str)) {
            callback && callback();
            return true;
        }
        mes = '您填入的邮箱格式有误！'
        errorCallback && errorCallback(mes);
        return false;

    },
    // 检查是否车牌号码
    isLicenseNo(str) {
        var reg = /^(([\u4e00-\u9fa5][a-zA-Z]|[\u4e00-\u9fa5]{2}\d{2}|[\u4e00-\u9fa5]{2}[a-zA-Z])[-]?|([wW][Jj][\u4e00-\u9fa5]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{5}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    },
    //身份证号合法性验证 
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    IdentityCodeValid(code) {
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var tip = "";
        var pass = true;

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        return pass;
    },
    //校验车架号
    checkframeNoFormat(str) {
        if (!/^[a-zA-Z0-9]{17}/.test(str)) {
            return false;
        }
        return true;
    },
    //校验发动机号
    checkEngineNo(str) {
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (!str || reg.test(str) || str.length > 16 || str.length < 1) {
            return false;
        }
        return true;
    },
    /*
     *校验姓名
     */
    validateName(objValue) {
        objValue = $.trim(objValue.toUpperCase());
        //改成大写
        objValue = objValue.replace(/\s+/g, ' ');

        /*<%--只能输入字母和中文--%>*/
        if (objValue == ' ')
            return '姓名不能为空';
        var totalLength = objValue.length;
        /*<%--中文--%>*/
        var cnArray = objValue.match(/[\u4e00-\u9fa5]/g);
        if (cnArray)
            totalLength += cnArray.length;
        for (var i = 0; i < objValue.length; i++) {
            if (objValue.charCodeAt(i) == 183) {
                if (i == 0 || i == objValue.length - 1)
                    return "姓名格式不正确";
                if (objValue.charCodeAt(i + 1) == 183)
                    return "姓名格式不正确";
            }
        }

        var filterArr2 = ['不详', '不祥', '不知道', '未知'],
            filterLen2 = filterArr2.length;
        while (filterLen2--) {
            if (objValue.indexOf(filterArr2[filterLen2]) > -1) {
                return "姓名格式不正确，请重新输入";
            }
        }
        if (totalLength > 12 || totalLength < 4) {
            return "姓名需为2-6个中文字符或4-20个英文字符,请您重新检查";
        }

        var namegi = /^(([\u4e00-\u9fa5a-zA-Z·]*[\u4e00-\u9fa5]+[\u4e00-\u9fa5a-zA-Z·]*)|([a-zA-Z\s]+))$/;
        if (!namegi.test(objValue)) { //字符逐个判断
            return "姓名需为2-6个中文字符或4-20个英文字符,请您重新检查";
        }

        return true;
    },
    trim(data) {　　
        return data.replace(/(^\s*)|(\s*$)/g, "");
    },
    param(data) {
        let url = ''
        for (var k in data) {
            let value = data[k] !== undefined ? data[k] : ''
            url += '&' + k + '=' + encodeURIComponent(value)
        }
        return url ? url.substring(1) : ''
    },
    /**
     * 自动删除字符串中符合匹配内容的字符
     * @param {String} str
     * @param {Array} chars
     */
    deleteChars(str, chars) {
        var result = '',
            s = '',
            c = '',
            r = false,
            clen = chars.length,
            n = true;

        if (!Object.prototype.toString.call(chars) == '[object Array]') {
            chars = [chars];
        }

        for (var i = 0, len = str.length; i < len; i++) {
            s = str[i];
            n = true;

            for (var j = 0; j < clen; j++) {
                c = chars[j];

                if (_.isRegExp(c)) {
                    if (c.test(s)) {
                        n = false;
                        break;
                    }
                } else if (s == c) {
                    n = false;
                    break;
                }
            }

            if (n) {
                result += s;
            }
        }

        return result;
    },
    param(data) {
        let url = ''
        for (var k in data) {
            let value = data[k] !== undefined ? data[k] : ''
            url += '&' + k + '=' + encodeURIComponent(value)
        }
        return url ? url.substring(1) : ''
    },
    getJson(url,params){
        let _p = new Promise((resolve, reject) => {
            var callBack= function(res){
                console.log(res)
                resolve(res);
            }
            $.ajax({
                url: url,
                async: false,
                cache: false,
                data:params ,
                contentType:"application/json",
                dataType: "jsonp",
                jsonp: 'callBack',
                success: function(response) {
                    callBack&&callBack(response);
                    resolve(response);
                },
                error: function(error) {
                
                    console.log(JSON.stringify(error))
                    reject(error);
                    //errorFunc && errorFunc(response)
                }
            });
       
      })
      return _p;
    },
    zeptoGet(url,params){
        let _p = new Promise((resolve, reject) => {
        $.ajax({
            type : "GET",                        
            url : url,
            data : params,
            contentType:"application/x-www-form-urlencoded",
            success:function(data){
                resolve(data);
            },
            error:function(err){
                reject(err);
            }
        });
    })
    return _p;
    },
    /**
     * 深度拷贝
     */
    deepClone(initalObj, finalObj) {    
        let obj = finalObj || {};    
        for (let i in initalObj) {        
            let prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
            if(prop === obj) {            
                continue;
            }        
            if (typeof prop === 'object') {
                if(prop.constructor === Array){
                    obj[i]=[];
                    this.deepClone(prop,obj[i]);
                }else{
                   obj[i]=Object.create(prop);
                }
            } else {
                obj[i] = prop;
            }
        }    
        return obj;
    },
    getJsonpData(_url, params,callback) {
        let _p = new Promise((resolve, reject) => {
            Zepto.ajax({
                url: _url,
                type: 'GET',
                async: false,
                dataType: 'jsonp',
                timeout: 5000,
                data: params,
                jsonp: 'callBack',
                success: function(res) {
                    callback&& callback(res)
                    resolve(res);
                },
                error: function(err) {
                    reject(err);
                }
            })
        })
        return _p;
    },
    filterMaskValue(obj) {
        if (!obj) {
            return false;
        }
        var keys = [];
        for (var key in obj) {
            var val = obj[key];
            if (typeof val === 'string' && val.indexOf('*') != -1) {
                keys.push(key);
            }
        }
        return _.omit(obj, keys);
    },
    //跳转主账户
    gotoIconPAP() {
        new Promise((resolve, reject) => {
            if (qysource && qysource == 'offercenter') {
                Zepto.ajax({
                    url: App.ServerHost + "member/do/icorepap/userisgray",
                    type: "GET",
                    dataType: 'json',
                    error: function(event) {
                        reject();
                    },
                    success: function(data) {
                        if (data.resultCode == 'Y' && data.isGray == 'Y') {
                            $.ajax({
                                url: App.ServerHost + "customer/do/login/addsign",
                                type: "GET",
                                dataType: 'json',
                                success: function(result) {
                                    let urlCallback = decodeURIComponent(getParams('urlCallback')) + '&token=' + encodeURIComponent(result.sign) + '&src=pa18&tel=' + Cookie('userMobile');
                                    location.href = urlCallback;
                                },
                                error: function(r) {
                                    reject();
                                }
                            });
                        } else {
                            reject();
                        }
                    }
                });
            } else {
                reject();
            }
        });

    }
}
export default Tools