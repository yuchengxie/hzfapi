/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-10 18:39:49
 */
'use strict';
let BaseController = require('./default/base.js');
class MarketController extends BaseController {

  async index() {
  

  //存  console.log(new Date('2018-12-21').getTime())
  console.log(new Date().getTime())
  console.log(1)
    var res = await this.ctx.model.Trace.aggregate(
      [
        {
        $group: {
          _id: "$title",
          avg_price: {
            $avg: "$fee"
          },
          max_price: {
            $max: "$fee"
          },
          min_price: {
            $min: "$fee"
          },
        },
      }]
    )

    console.log(res)
    this.success(res)
  }

  async bk() {
    let title = this.ctx.request.body.title
    var result=await this.ctx.model.Trace.find({"title": title}).sort( { create_time: 1} )
    this.success(result)
  }

}

module.exports = MarketController;