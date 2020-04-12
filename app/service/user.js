/*
 * @Date: 2019-12-29 15:50:37
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-07 17:12:50
 */
'use strict';


const Service = require('egg').Service;
const Jwt = require('jsonwebtoken')
const secret = "mengtaiqi"
class UserService extends Service {
  async login(data) {
    let userToken = {
      // sub: data.phone ? data.phone : data.nickName
      sub: data.unionId
    }
    //生成token
    let token = Jwt.sign(userToken, secret, {
      expiresIn: '2h'
    })
    let res = {
      user: {
        _id: data._id,
        type_from: data.type_from === 1 ? 'app用户' : '小程序用户',
        penId: data.penId ? data.penId : '',
        phone: data.phone ? data.phone : '',
        nickName: data.nickName ? data.nickName : '',
        unionId: data.unionId ? data.unionId : '',
        credit_value: data.credit_value ? data.credit_value : '',
        gender: data.gender ? data.gender : '',
        city: data.city ? data.city : '',
        province: data.province ? data.province : '',
        country: data.country ? data.country : '',
        avatarUrl: data.avatarUrl ? data.avatarUrl : '',
      },
      token
    }
    if (token) {
      return res
    }
  }
  //注册🆕用户
  async register(data) {
    //生成token
    let userToken = {
      sub: data.unionId
    }
    //生成token
    let token = Jwt.sign(userToken, secret, {
      expiresIn: '2h'
    })
    var userDate = new this.ctx.model.User(data);
    try {
      userDate.save()
      let res = {
        user: {
          type_from: data.type_from === 1 ? 'app用户' : '小程序用户',
          penId: data.penId ? data.penId : '',
          phone: data.phone ? data.phone : '',
          nickName: data.nickName ? data.nickName : '',
          unionId: data.unionId ? data.unionId : '',
          credit_value: data.credit_value ? data.credit_value : '',
          gender: data.gender ? data.gender : '',
          city: data.city ? data.city : '',
          province: data.province ? data.province : '',
          country: data.country ? data.country : '',
          avatarUrl: data.avatarUrl ? data.avatarUrl : '',
        },
        token
      }
      if (token) {
        return res
      }

    } catch (error) {
      console.log("error", error)

      return error

    }
  }
}

module.exports = UserService;