"use strict";

var BaseController = require('./default/base.js');

class UserController extends BaseController {
  async index() {
    let fields = this.ctx.request.body;
    let _id=fields._id;

    // let unionId = this.ctx.request.body.unionId
    var res = await this.ctx.model.User.aggregate([{
      $lookup: {
        from: 'asset',
        localField: 'unionId',
        foreignField: 'unionId',
        as: 'asset'
      },
    },{
      $match:{
        "unionId":unionId
      }
   } ])
    console.log("account", res)
    this.success(res)

    // let user=await this.ctx.model.User.find({_id})
    // this.ctx.body={
    //   result:{
    //     success:true,
    //     msg:user[0]
    //   }
    // }
    // this.ctx.body = {
    //   result: {
    //     success: true,
    //     msg: "/v1"
    //   }
    // };
  }

  async login() {
    const {
      app
    } = this;
    var data = this.ctx.request.body;
    var phone = data.phone;
    var password = data.password;
    var unionId = data.unionId;
    console.log('data:', data);
    if (phone) {//手机登录
      //登录验证
      console.log('手机登录');
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

      var md5_password = await this.service.tools.md5(password);
      if (user[0].password != md5_password) {
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
          
          msg: [user[0],_token]
        }
      };
    } else{//微信登录
      console.log('微信登录');
      var unionId = this.ctx.request.body.unionId;
      console.log('unionId:', unionId);
      var islogin = await this.ctx.model.User.find({
        "unionId": unionId,
      })
      console.log('islogin:', islogin);
      if (islogin.length) {
        console.log('微信登录 不需要写入user表');
        const userInfo = await this.ctx.service.user.login(islogin[0]);
        this.success(userInfo)
      } else {
        console.log('微信登录 写入user表');
        //注册
        let sendDate = {
          ...this.ctx.request.body,
          type_from: 1,
          credit_value: 75.8,
        }

        //新增数据库
        var userDate = new this.ctx.model.User(sendDate);
        await userDate.save()
        // console.log('isloginRegister1:', isloginRegister);



        // 更改微信数据unionId
        // await this.ctx.model.User.updateOne({
        //   _id: userDate._id
        // }, { unionId: userDate._id });
    
        let loginData = await this.ctx.model.User.find({
          _id: userDate._id
        })

        const userInfoRegister = await this.ctx.service.user.login(loginData[0]);
        console.log('微信登录 userInfoRegister:', userInfoRegister);
        // //创建资金账户表
        let addAccount = {
          balance: 1000,
          unionId: loginData[0].unionId,
        }
        let Account = new this.ctx.model.Account(addAccount);
        await Account.save()
        this.success(userInfoRegister)
        console.log('微信登录成功');
        // this.ctx.body = {
        //   code: 1,
        //   msg: '微信登录成功'
        // }
        // var token = app.jwt.sign({
        //   data
        // }, this.config.jwt.secret, {
        //   expiresIn: this.config.expired || 60 * 60
        // });
        // var _token = "Bearer " + token;
        // if (data.phone) {
        //   await this.ctx.service.cache.setToken("userId_" + data.phone, _token);
        // }

        // this.ctx.body = {
        //   result: {
        //     success: true,
        //     msg: _token
        //   }
        // };
      }

      // this.ctx.body = {
      //   result: {
      //     success: true,
      //     msg: '微信登录'
      //   }
      // };
    }
  }

  async bind(){
    let fields = this.ctx.request.body, phone, password, phone_code;
    console.log('bind:', fields);
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
          msg: "The phone has been binded"
        }
      };
      return;
    }


    await this.ctx.model.User.updateOne({
      _id:fields._id
    },{phone,password:fields.password})


    let user = await this.ctx.model.User.find({_id:fields._id});

    this.ctx.body={
      result: {
        success: true,
        msg: user
      }
    }
  }

  async unbind(){
    let fields = this.ctx.request.body, phone, password, phone_code;
    console.log('bind:', fields);
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

    if (res && res.length <= 0) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "The phone not exist"
        }
      };
    }


    await this.ctx.model.User.updateOne({
      _id:fields._id
    },{phone:'',password:''})


    let user = await this.ctx.model.User.find({_id:fields._id});

    this.ctx.body={
      result: {
        success: true,
        msg: user
      }
    }
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


    console.log('phone_code:',phone_code);
    console.log('this.ctx.session.phone_code:',this.ctx.session.phone_code);

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
      balance:'1000'
    });

    await user.save();



    // console.log('u:', u);
    // if (u) {
    //   u.unionId = u._id;
    //   await this.ctx.model.User.updateOne({ _id: u._id }, { unionId: u.unionId });
    // }

    //
    let addAccount = {
      balance: 1000,
      unionId:'',
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
    //
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