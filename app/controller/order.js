'use strict';
const tenpay = require('tenpay');
const Controller = require('egg').Controller;
const xml2js = require('xml2js').parseString;

class OrderController extends Controller {
  async wxpay() {
    const api = new tenpay(this.config.WXPayConfig);
    const total_fee = this.ctx.request.body.total_fee;
    var out_trade_no = await this.service.tools.gen32RandomOrder('', '');
    console.log('out_trade_no length:',out_trade_no.length);
    const sendData = {
      out_trade_no: out_trade_no,
      body: '商品简单描述',
      trade_type: 'APP',
      total_fee,
    };
    const result = await api.getAppParams(sendData);
    console.log('result:', result);
    this.ctx.body = {
      result: {
        success: true,
        msg: result,
      },
    };
  }

  async notify() {
    // console.log('back:', this.ctx.request.body);
    // this.ctx.body={
    //   result:{
    //     msg:this.ctx.request.body || 'no callback data'
    //   }
    // }
    // let that = this;
    // let data = '';
    // this.ctx.req.on('data', function (chunk) {
    //   data += chunk;
    // });

    // this.ctx.req.on('end', function () {
    //   xml2js(data, {
    //     explicitArray: false
    //   }, function (err, json) {
    //     console.log(json); //这里的json便是xml转为json的内容

    //     var mySign = that.service.weixinpay.weixinpayNotify(json.xml);



    //     console.log(mySign);

    //     console.log('-------------');


    //     console.log(json.xml.sign);


    //   });

    // });
    this.ctx.body = '111';
  }
}

module.exports = OrderController;