/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-06 11:39:15
 */
'use strict';

let BaseController = require('./default/base.js');
class GoodsSellController extends BaseController {
  //溯源查询 
  async trace() {
    let rfid = this.ctx.request.body.rfid
    var result = await this.ctx.model.Trace.aggregate([{
        $match: {
          "out_trade_no": rfid
        }
      },
      {
        $sort: {
          create_time: 1
        }
      },
      
    ]);
    console.log("防伪溯源", result)
    this.success(result)
  }
}
module.exports = GoodsSellController;