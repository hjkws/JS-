'use strict';
/**
 * [Verification 公共正则文件]
 */
const Verification = {
    /**
     * [licenseNo 验证车牌]
     * @param     {[Sring]}        licenseNo [车架号]
     * @return    {Boolean}           [验证信息]
     */
    checkLicenseNo(licenseNo) {
        let result = true;
        let patter = /^(?:(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][a-zA-Z]-?(?:\*|[a-zA-Z0-9]{5,6}))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][a-zA-Z]))$/g;
        if (!patter.test(licenseNo)) {
            result = false;
        }
        return result;
    },
    /**
     * [date 验证日期]
     * @param     {[string]}        date [日期]
     * @return    {[boolean]}            [验证信息]
     */
    checkDate(date) {
        let regDate = /^20[0-9]\d|1\d{3}|[1-9]\d-(0[1-9]|1[1-2])-(0[1-9]|2[0-9]|3[0-1])$/;
        if (!regDate.test(date)) {
            return '请输入初登日期！';
        }
        return true;
    },
    checkImgCode(code) {
        let regCode = /^[0-9a-zA-Z]{4}$/;
        if (!code) {
            return '亲，请输入验证码！'
        }
        if (!regCode.test(code)) {
            return '亲，请输入正确的验证码！'
        }
        return true;
    },
    /**
     * [birthday 验证日期]
     * @param     {[string]}        date [日期]
     * @return    {[boolean]}            [验证信息]
     */
    checkBirthday(date) {
        let regDate = /^(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
        if (!regDate.test(date)) {
            return false;
        }
        return true;
    },
    /**
     * [mobile 验证手机]
     * @param     {[string]}        mobile [手机]
     * @return    {[boolean]}          [验证信息]
     */
    mobile(mobile) {
        //let phonegi = /^((13|14|15|18)\d{9,10})?$/;
        let phonegi = /^1[3456789]\d{1}(\*{4}\d{4}|\d{8})$/; // 支持 "139****8888"中间带*号匹配
        let mes = [true, '请填写手机号！', '手机号码不合规范,请您重新检查！', '手机号码为11位数字,请您重新检查！'];
        if (mobile.length === 0) {
            return mes[1];
        }

        if (!phonegi.test(mobile)) {
            return mes[2];
        }
        return mes[0];
    },
    /**
     * 验证银行卡
     * @param {string}  cardId 信用卡类型id
     * @param {string}  cardNo 信用卡卡号
     */
    validatorCardNo(cardNo, cardId) {
        let c = cardNo.replace(/\s/ig, "");
        let d = cardId;
        if (c == '') {
            return "卡号不能为空";
        } else if (c.length < 13) {
            return "卡号输入不能少于13位";
        } else if (c.length > 32) {
            return "卡号输入不能大于32位";
        } else if (!/^\d*$/.test(c)) {
            return "您输入的卡号错误";
        }
        let a = /^(45181[0|1]\d*)|(45806[0-9]\d*)|(53098[0-9]\d*)|(62221[0|5]\d*)|(622205\d*)|(622220\d*)|(451804\d*)|(458071\d*)|(427062\d*)$/;
        let b = /^(622722\d*)|(628211\d*)|(625500\d*)|(550150\d*)|(532588\d*)|(556668\d*)|(552408\d*)$/;
        if (d == "0003" || d == "1003") {
            if (a.test(c)) {
                return "您的信用卡据工行反馈不支持网上支付，详情请咨询工行。建议您换其他信用卡或银行卡重新支付。";
            }
        } else {
            if (d == "0017") {
                if (b.test(c)) {
                    return "您的信用卡据上海农商行反馈不支持网上支付，详情请咨询上海农商行。建议您换其他信用卡或银行卡重新支付。";
                }
            }
        }
        return true;
    },
    /**
     * 验证证件号码
     * @param {string} c 证件 类型
     * @param {string} a 证件号码
     */
    checkIdNo(c, a) {
        if (c == '')
            return '请选择证件类型';
        if (a == "") {
            return "证件号码不能为空";
        }
        let b = "您输入的证件号码错误";
        if (c == "0" && Verification.checkIdCard(a) != true) {
            return Verification.checkIdCard(a);
        } else {
            if (c == "1" && !Verification.byteLength(a, 3, 20)) {
                return b;
            } else {
                if ((c == "2" || c == "3") && !Verification.byteLength(a, 6, 20)) {
                    return b;
                } else {
                    if ((c == "4" || c == "18") && !Verification.byteLength(a, 5, 20)) {
                        return b;
                    } else {
                        if (!Verification.byteLength(a, 1, 30)) {
                            return b;
                        }
                    }
                }
            }
        }
        return true;
    },
    /**
     * 检测用户名
     * @param {string} name
     */
    checkName(name) {
        let n = name.replace(/^\s|(\s$)/, "");
        if (n == '') {
            return "姓名不能为空";
        } else if (!/^([a-zA-Z]{4,50}|[\u4e00-\u9fa5]{1,25})$/.test(name)) {
            return '姓名只能由2位至25位中文或4位及50位英文字符构成,请正确填写';
        }
        return true;
    },
    /**
     *手机号码验证信息
     */
    checkMobile(number) {
        let patrn = /^1[3|4|5|6|7|8|9]\d{9}$/;
        number = number.trim();
        if (number == '') {
            return "手机号码不能为空";
        } else if (!patrn.test(number)) {
            return '手机号码不符合规范，请正确填写';
        }
        return true;
    },
    /**
     * 检测手机验证码
     * @param {string} code
     */
    checkPhoneCode(code) {
        if (code == '') {
            return "验证码不能为空";
        } else if (code.length != 6 && code.length != 4) { //增加code = 4位情况，因为联动优势的验证码为4位
            return '验证码位数不对，请查看短信后，重新输入';
        } else if (!/(^[0-9|a-z|A-Z]*$)/.test(code)) {
            return "您输入的验证码格式不正确";
        } else {
            return true;
        }

    },
    /**
     * 获取字符串真正长度,并检测合法性
     * @param  {string} e 证件号
     * @param  {string} d 最小长度
     * @param  {string} c 最大长度
     */
    byteLength(e, d, c) {
        if (e == null) {
            return false;
        }
        let a = e.length;
        let b = 0;
        for (let i = 0; i < a; i++) {
            if ((e.charCodeAt(i) & 65280) != 0) {
                b++;
            }
            b++;
        }
        if (b > c || b < d) {
            return false;
        }
        return true;
    },
    /**
     * [checkIdCard 验证身份证]
     * @param     {[string]}        idNo [身份证号码]
     * @return    {[boolean]}          [验证信息]
     */
    checkIdCard(idNo) {
        let resArr = [true, "您输入的身份证号码位数不对!", "您输入的身份证号码错误!", "请输入身份证号码"];

        let pa = {};

        if (typeof idNo == "undefined") {
            // console.log("未传入id参数")
            return
        }

        idNo = idNo.toUpperCase();

        let c = {
            11: "\u5317\u4eac",
            12: "\u5929\u6d25",
            13: "\u6cb3\u5317",
            14: "\u5c71\u897f",
            15: "\u5185\u8499\u53e4",
            21: "\u8fbd\u5b81",
            22: "\u5409\u6797",
            23: "\u9ed1\u9f99\u6c5f",
            31: "\u4e0a\u6d77",
            32: "\u6c5f\u82cf",
            33: "\u6d59\u6c5f",
            34: "\u5b89\u5fbd",
            35: "\u798f\u5efa",
            36: "\u6c5f\u897f",
            37: "\u5c71\u4e1c",
            41: "\u6cb3\u5357",
            42: "\u6e56\u5317",
            43: "\u6e56\u5357",
            44: "\u5e7f\u4e1c",
            45: "\u5e7f\u897f",
            46: "\u6d77\u5357",
            50: "\u91cd\u5e86",
            51: "\u56db\u5ddd",
            52: "\u8d35\u5dde",
            53: "\u4e91\u5357",
            54: "\u897f\u85cf",
            61: "\u9655\u897f",
            62: "\u7518\u8083",
            63: "\u9752\u6d77",
            64: "\u5b81\u590f",
            65: "\u65b0\u7586",
            71: "\u53f0\u6e7e",
            81: "\u9999\u6e2f",
            82: "\u6fb3\u95e8",
            91: "\u56fd\u5916"
        };
        let b, l;
        let e, j;
        let a = new Array();
        let ereg, g, i;
        // 前后各四位为明文中间为掩码验证
        let checkMask15Reg = /^[1-9][0-9]{3}\*{7}[0-9]{4}$/,
            checkMask18Reg = /^[1-9][0-9]{3}\*{10}[0-9]{3}(\d|[Xx]){1}$/;

        a = idNo.split("");
        if (idNo == "") {
            return resArr[3];
        }

        if (parseInt(idNo.substr(0, 4)) == 1234) {
            //测试环境上，数据库为做信息保护，测试人员提供数据一律是1234开头的测试身份证号码
            return true;
        }
        // 放宽身份证城市的验证，因为有些测试数据不规范
        if (c[parseInt(idNo.substr(0, 2))] == null) {
            return resArr[2];
        }
        let checkMask = false;
        switch (idNo.length) {
            case 18:
                if (parseInt(idNo.substr(6, 4)) % 4 == 0 || (parseInt(idNo.substr(6, 4)) % 100 == 0 && parseInt(idNo.substr(6, 4)) % 4 == 0)) {
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
                } else {
                    ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
                }
                checkMask = checkMask18Reg.test(idNo);
                if (ereg.test(idNo) || checkMask) {
                    if (checkMask) return true;
                    e = (parseInt(a[0]) + parseInt(a[10])) * 7 + (parseInt(a[1]) + parseInt(a[11])) * 9 + (parseInt(a[2]) + parseInt(a[12])) * 10 + (parseInt(a[3]) + parseInt(a[13])) * 5 + (parseInt(a[4]) + parseInt(a[14])) * 8 + (parseInt(a[5]) + parseInt(a[15])) * 4 + (parseInt(a[6]) + parseInt(a[16])) * 2 + parseInt(a[7]) * 1 + parseInt(a[8]) * 6 + parseInt(a[9]) * 3;
                    b = e % 11;
                    j = "F";
                    l = "10X98765432";
                    j = l.substr(b, 1);
                    if (j == a[17]) {
                        let o = idNo.substr(6, 4);
                        let f = idNo.substr(10, 2);
                        let n = idNo.substr(12, 2);
                        if (pa && pa.oServerDate) {
                            g = pa.oServerDate;
                        } else {
                            let h = new Date();
                            g = new Date(h.getFullYear(), h.getMonth(), h.getDate());
                        }
                        let d = new Date(o, parseInt(f, 10) - 1, n);
                        if ((Date.parse(d) - Date.parse(g)) >= 0) {
                            return resArr[2];
                        }
                        return resArr[0];
                    } else {
                        return resArr[2];
                    }
                } else {
                    return resArr[2];
                }
                break;
            default:
                return resArr[1];
                break;
        }
        return true;
    }
};
export default Verification