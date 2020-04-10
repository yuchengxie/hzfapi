/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-29 08:34:30
 */
'use strict';

let BaseController = require('./default/base.js');
class TraceController extends BaseController {

 //查询 
  async index() {
    let out_trade_no = this.ctx.request.body.out_trade_no
    var res = await this.ctx.model.Trace.find({
      "out_trade_no": out_trade_no
    })
    this.success(res)
  }
//添加
  async add() {
    let add = this.ctx.request.body
    var Trace = new this.ctx.model.Trace(add);
    let res = await Trace.save()
    this.success(res)
  }

// 后面没有用到

  async search() {
    console.log("收藏查询", this.ctx.request.body)
    let user_id = this.ctx.request.body.user_id
    let goods_id = this.ctx.request.body.goods_id
    console.log("收藏查询", user_id)
    var res = await this.ctx.model.Trace.findOne({
      $and: [{
          "user_id": user_id,
        },
        {
          "goods_id": goods_id
        }
      ]
    })
    this.success(res)
  }

  async delGood() {
    let user_id = this.ctx.request.body.user_id
    let goods_id = this.ctx.request.body.goods_id
    var result = await this.ctx.model.Trace.deleteMany({
      "user_id": user_id,
      "goods_id": goods_id
    })
    this.success(result)
  }

  async delId() {
    console.log('删除收藏', this.ctx.request.body)
    let _id = this.ctx.request.body._id
    var result = await this.ctx.model.Trace.deleteOne({
      "_id": _id,
    })
    this.success(result)
  }

  //userID+商品ID单个查询
}

module.exports = TraceController;