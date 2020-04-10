/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-03 14:51:42
 */
'use strict';
var BaseController = require('./default/base.js');
// const Core = require('@alicloud/pop-core');
// const timeCountDown = require('zhf.time-count-down');
var code
class LoginController extends BaseController {
  
  //注册
  async register() {
    var data = this.ctx.request.body.phone_code;
    // if (code !== data) {
    //   this.error("验证码错误")
    //   return false
    // }
    var phone = this.ctx.request.body.phone;
    var isRegister = await this.ctx.model.User.find({
      "phone": phone
    })
    var password = await this.awaitWrap(this.service.tools.md5(this.ctx.request.body.password));
    if (isRegister.length) {
      this.error("该手机号码已被注册")
      return false
    } else {
      if (password.code === 0) {
        let sendDate = {
          phone: phone,
          password: password.msg,
          type_from: 1
        }
        // 保存数据库 生成token
        const userInfo = await this.ctx.service.user.register(sendDate);
        this.success(userInfo)
      } else {
        this.error("验证码发送失败")
      }
    }
  }
  //登陆
  async login() {
    //  账户密码登陆
    if (this.ctx.request.body.phone) {
      var password = await this.service.tools.md5(this.ctx.request.body.password);
      var phone = this.ctx.request.body.phone;
      var islogin = await this.ctx.model.User.find({
        "phone": phone,
      })
      console.log("islogin", islogin)
      if (islogin.length) {
        if (islogin[0].password === password) {
          console.log("密码正确", islogin[0])
          //调用服务
          const userInfo = await this.ctx.service.user.login(islogin[0]);
          this.success(userInfo)
        } else {
          this.error("用户名密码错误")
        }
      } else {
        this.error("该用户还未注册")
      }
    }
    //微信登陆-unionId
    if (this.ctx.request.body.unionId) {
      var unionId = this.ctx.request.body.unionId;
      var islogin = await this.ctx.model.User.find({
        "unionId": unionId,
      })
      if (islogin.length) {
        const userInfo = await this.ctx.service.user.login(islogin[0]);
        this.success(userInfo)
      } else {
        //注册
        let sendDate = {
          ...this.ctx.request.body ,
          type_from: 1,
          credit_value: 75.8,
        }

        var userDate = new this.ctx.model.User(sendDate);
        await  userDate.save()
        // 保存数据库 
        var isloginRegister  = await this.ctx.model.User.find({
          "unionId": unionId,
        })
        const userInfoRegister = await this.ctx.service.user.login(isloginRegister[0]);
        //创建资金账户表
        let addAccount = {
          balance: 1000,
          unionId: unionId,
        }
        let Account = new this.ctx.model.Account(addAccount);
        await Account.save()
        this.success(userInfoRegister)
      }
    }
    //查询 电话唯一
  }
  
  //登出
  async loginOut() {
    this.ctx.session.userinfo = null;
  }

}
module.exports = LoginController;