'use strict';

const Controller = require('egg').Controller;


const xml2js = require('xml2js').parseString;


class WeixinpayController extends Controller {

  //异步通知
  async weixinpayNotify() {
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
  }
}

module.exports = WeixinpayController;