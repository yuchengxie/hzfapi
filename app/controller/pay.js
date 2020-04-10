/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-06 20:31:21
 */

'use strict';

let BaseController = require('./default/base.js');
let xml = require('xml2js')
const xml2js = require('xml2js').parseString;
class PayController extends BaseController {
  async wxpay() {
    let {
      total_fee,unionId
    } = this.ctx.request.body
    const res = await this.ctx.service.order.appPay({
      total_fee,
      unionId
    });
    this.success(res)
  }
  // async wxpay() {
  //   let {
  //     total_fee,
  //     out_trade_no
  //   } = this.ctx.request.body
  //   const res = await this.ctx.service.order.appPay({
  //     total_fee,
  //     out_trade_no
  //   });
  //   this.success(res)
  // }
  
  async callback() {
    const {
      ctx,
    } = this;
    let data = '';
    ctx.req.setEncoding('utf8');
    ctx.req.on('data', function (chunk) {
      data += chunk;
    });
    const getxml = await new Promise(function (resolve) {
      ctx.req.on('end', function () {
        resolve(data);
      });
    });
    const parseObj = await new Promise(function (resolve) {
      xml2js(getxml, {
        explicitArray: false,
      }, function (err, json) {
        resolve(json);
      });
    });
    let body = parseObj.xml.body
    console.log("body", body)
    // let sendData = {
    //   "out_trade_no": out_trade_no
    // }
    // console.log("发送的数据", sendData)

    // let res = await this.ctx.model.Order.findOne(sendData)
    // console.log("返回的数据", res)

    // let upData = {
    //   "state": 2
    // }
    // console.log("回调查询的订单数据", res)
    // if (res) {
    //   this.ctx.model.Order.updateOne(sendData, upData)
    // } else {
    // }

  }

}

module.exports = PayController;