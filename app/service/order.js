/*
 * @Date: 2020-02-04 22:37:40
 * @LastEditors: wangbingqi
 * @LastEditTime : 2020-02-05 01:55:33
 */

'use strict';
//支付模块
const tenpay = require('tenpay');
const config = require('../../config/pay')
const uuid = require('node-uuid');
const Service = require('egg').Service;
const api = new tenpay(config.wxpayConf, true);

class PayService extends Service {

    async  appPay({
      total_fee,
      unionId
    }) {
      let uid = uuid.v1();
      uid = uid.replace(/\-/g, '');
      let sendData = {
        out_trade_no: uid,
        body: unionId,
        trade_type: "APP",
        notify_url:'https://www.mengtaiqi.wang/v1/pay/callback',
        total_fee:1,
      }
      let result = await api.getAppParams(sendData);
      return result
    }
}
module.exports = PayService;