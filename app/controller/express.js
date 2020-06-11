'use strict';

var BaseController = require('./default/base.js');

class ExpressController extends BaseController {
  async co() {
    let res = await this.service.express.getAllExpressComp();
    if (res && res.data) {
      this.ctx.body = {
        list: res.data
      }
    }
  }

  async num() {
    let number = this.ctx.query.number;
    console.log('number:', number);
    if (!number) {
      this.ctx.body = {
        msg: 'invailid number'
      }
      return;
    }
    let res = await this.service.express.queryExpressByNumber(number);
    if (res && res.data) {
      this.ctx.body = {
        list: res.data
      }
    }
  }

  async trace() {
    let number = this.ctx.query.number;
    console.log('number:', number);
    if (!number) {
      this.ctx.body = {
        msg: 'invailid number'
      }
      return;
    }
    let res = await this.service.express.queryTraceByNumber(number);
    if (res && res.data) {
      this.ctx.body = {
        list: res.data
      }
    }
  }

}
module.exports = ExpressController;