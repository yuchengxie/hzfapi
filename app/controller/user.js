"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  async sendPhoneCode() {
    let data = this.ctx.request.body,
      phone = data.phone;
    if (!phone || !this.service.regular.checkPhone(phone)) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "args invalid"
        }
      };
      return;
    }
    var r = await this.service.message.sendPhoneVerifyCode(phone);
    var success = false;
    if (r.code && r.code == "000000") {
      success = true;
      this.ctx.session.phone_code = r.phone_code;
    } else {
      success = false;
    }

    this.ctx.body = {
      result: {
        success: success,
        msg: r ? r : "err"
      }
    };
  }

  async index() {
    this.ctx.body = {
      result: {
        success: true,
        msg: "/v1"
      }
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
      password = data.password,
      phone_code = data.phone_code,
      blockchain_account = data.blockchain_account;
    if (
      !phone ||
      !password ||
      !phone_code ||
      !this.service.regular.checkPhone(phone) ||
      !this.service.regular.checkPasswd(password) ||
      !this.service.regular.checkPhoneCode(phone_code)
    ) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "args invalid"
        }
      };
      return;
    }
    data.password = await this.service.tools.md5(data.password);
    console.log(data);
    //1.checkout phone code
    if (phone_code != this.ctx.session.phone_code) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "phone_code incorrect"
        }
      };
      return;
    }
    let res = await this.ctx.model.User.find({
      phone: phone
    });
    if (res && res.length > 0) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "The phone has been registered"
        }
      };
      return;
    }
    let user = new this.ctx.model.User({
      phone,
      password: this.service.tools.md5(password),
      blockchain_account
    });
    console.log("ready register:", user);

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
    const {
      app
    } = this;
    var data = this.ctx.request.body;
    var phone = data.phone;
    var password = await this.service.tools.md5(data.password);

    if (!phone || !password) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "args invalid"
        }
      };
      return;
    }
    //1.判断数据库是否存在用户
    var user = await this.ctx.model.User.find({
      phone: phone,
      password: password
    });
    console.log('user:', user);
    if (user.length <= 0) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "phone or password invalid"
        }
      };
      return;
    }
    //2.如果存在,将token更新到redis缓存
    var token = app.jwt.sign({
      data
    }, this.config.jwt.secret, {
      expiresIn: this.config.expired || 60 * 60
    });
    var _token = "Bearer " + token;
    if (data.phone) {
      await this.ctx.service.cache.setToken("userId_" + data.phone, _token);
    }

    this.ctx.body = {
      result: {
        success: true,
        msg: _token
      }
    };
  }
}

module.exports = UserController;