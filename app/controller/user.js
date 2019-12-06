"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async index() {
    this.ctx.body = {
      result: "v1/api"
    };
  }

  async hello() {
    this.ctx.body = {
      result: {
        success: true,
        msg: "hello"
      }
    };
  }

  async register() {
    let data = this.ctx.request.body,
      phone = data.phone,
      password = data.password;
    if (
      !phone ||
      !password ||
      !this.service.regular.checkPhone(phone) ||
      !this.service.regular.checkPasswd(password)
    ) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "args invalid"
        }
      };
      return;
    }
    console.log(data);
    let res = await this.ctx.model.User.find({ phone: phone });
    if (res && res.length > 0) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "The phone has been registered"
        }
      };
      return;
    }
    let user = new this.ctx.model.User({ phone, password:this.service.tools.md5(password) });
    console.log('ready register:',user);
    await user.save();
    this.ctx.body = {
      result: {
        success: true,
        msg: user
      }
    };
  }

  async logout() {
    let userId = this.ctx.request.body.phone || "";
    let key = "userId_" + userId;
    //将对应的token删除
    this.ctx.service.cache.setToken(key, "");
    this.ctx.body = {
      result: {
        success: true,
        msg: "already logged out"
      }
    };
  }

  async login() {
    const { app } = this;
    //登陆成功后
    //1.判断数据库是否存在用户
    const data = this.ctx.request.body;
    //2.如果存在,将token更新到redis缓存
    var token = app.jwt.sign({ data }, this.config.jwt.secret, {
      expiresIn: this.config.expired || 60 * 60
    });
    var _token = "Bearer " + token;
    await this.ctx.service.cache.setToken("userId_" + data.phone, _token);

    this.ctx.body = {
      result: {
        success: true,
        token: _token
      }
    };
  }
}

module.exports = UserController;
