"use strict";

const Service = require("egg").Service;

class RegularService extends Service {
  //校验手机号码
  checkPhone(s) {
    if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(s)) {
      return false;
    }
    return true;
  }

  //校验手机短信验证码
  checkPhoneCode(s) {
    var reg=/^\d{6}$/;
    if (!reg.test(s)) {
      return false;
    }
    return true;
  }

  //校验密码：只能输入6-20个字母、数字、下划线
  checkPasswd(s) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(s)) return false;
    return true;
  }
}

module.exports = RegularService;
