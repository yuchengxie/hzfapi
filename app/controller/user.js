"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {

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
        msg: "hello v1"
      }
    };
  }

  async register() {
    let fields = this.ctx.request.body, phone, password, phone_code;
    console.log('register:', fields);
    if (fields) {
      phone = fields.phone;
      password = fields.password;
      phone_code = fields.phone_code;
    }
    if (!phone || !this.service.regular.checkPhone(phone)) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "phone invalid"
        }
      }
      return;
    }

    if (!phone_code || !this.service.regular.checkPhoneCode(phone_code)) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "phone code invalid"
        }
      }
      return;
    }

    if (!password || !this.service.regular.checkPasswd(password)) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "password invalid"
        }
      }
      return;
    }

    fields.password = await this.service.tools.md5(fields.password);

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
    //send
    let user = new this.ctx.model.User({
      phone,
      password: await this.service.tools.md5(password),
    });

    let u = await user.save();

    console.log('u:',u);
    if (u) {
      u.unionId = u._id;
      await this.ctx.model.User.updateOne({ _id: u._id }, { unionId: u.unionId });
    }

    //
    let addAccount = {
      balance: 1000,
      unionId: u.unionId,
    }
    let Account = new this.ctx.model.Account(addAccount);
    await Account.save()

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
    var password = data.password;
    if (phone) {//手机登录
      //登录验证
      if (!phone || !this.service.regular.checkPhone(phone)) {
        this.ctx.body = {
          result: {
            success: false,
            msg: "phone invalid"
          }
        }
        return;
      }

      if (!password || !this.service.regular.checkPasswd(password)) {
        this.ctx.body = {
          result: {
            success: false,
            msg: "password invalid"
          }
        }
        return;
      }

      var user = await this.ctx.model.User.find({
        phone: phone,
      });
      if (user.length <= 0) {
        this.ctx.body = {
          result: {
            success: false,
            msg: "phone not exist"
          }
        };
        return;
      }

      var md5_password = await this.service.tools.md5(data.password);
      if (u[0].password != md5_password) {
        this.ctx.body = {
          result: {
            success: false,
            msg: "password error"
          }
        };
        return;
      }

      console.log('phone login user:', user);

      //2.验证成功,将token更新到redis缓存
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
    } else if (unionId) {//微信登录
      this.ctx.body = {
        result: {
          success: true,
          msg: '微信登录'
        }
      };
    }
  }

  async sendPhoneCode() {
    let data = this.ctx.request.body,
      phone = data.phone;
    console.log('data:', data);
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
        msg: r.phone_code ? r.phone_code : "err"
      }
    };
  }
}

module.exports = UserController;