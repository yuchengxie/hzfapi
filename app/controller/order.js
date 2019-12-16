'use strict';
const tenpay = require('tenpay');
const Controller = require('egg').Controller;

class OrderController extends Controller {
  async wxpay() {
    const api = new tenpay(this.config.WXPayConfig);
    const total_fee = this.ctx.request.body.total_fee;
    var out_trade_no = this.service.tools.gen32RandomOrder('', '');
    const sendData = {
      out_trade_no: out_trade_no,
      body: '商品简单描述',
      trade_type: 'APP',
      total_fee,
    };
    const result = await api.getAppParams(sendData);
    console.log('result:',result);
    this.ctx.body = {
      result: {
        success: true,
        msg: result,
      },
    };
  }

  async notify() {
    console.log('back:', this.ctx.request.body);
  }
}

module.exports = OrderController;