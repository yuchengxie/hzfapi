const Service = require('egg').Service;

class ExressService extends Service {
  async getAllExpressComp() {//快递公司查询
    let res = await this.ctx.curl('https://api09.aliyun.venuscn.com/express/com', { method: 'GET', data: {}, headers: { Authorization: this.config.express.appCode }, dataType: 'json' });
    return res;
  }

  async queryExpressByNumber(number) {//快递单号识别
    let res = await this.ctx.curl('https://api09.aliyun.venuscn.com/express/com/auto', { method: 'GET', data: {number}, headers: { Authorization: this.config.express.appCode }, dataType: 'json' });
    return res;
  }
  
  async queryTraceByNumber(number){
    let res = await this.ctx.curl('https://api09.aliyun.venuscn.com/express/trace/query', { method: 'GET', data: {number}, headers: { Authorization: this.config.express.appCode }, dataType: 'json' });
    return res;
  }

}

module.exports = ExressService;