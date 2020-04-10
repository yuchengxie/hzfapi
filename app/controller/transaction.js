/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-30 01:05:15
 */
'use strict';

let BaseController = require('./default/base.js');
class TransactionController extends BaseController {

 //查询 
  async index() {
    let user_id = this.ctx.request.body.user_id
    var res = await this.ctx.model.Transaction.find({
      "user_id": user_id
    })
    this.success(res)
  }
//添加
  async add() {
    let add = this.ctx.request.body
    var Transaction = new this.ctx.model.Transaction(add);
    let res = await Transaction.save()
    this.success(res)
  }

// 后面没有用到

  async search() {
    console.log("收藏查询", this.ctx.request.body)
    let user_id = this.ctx.request.body.user_id
    let goods_id = this.ctx.request.body.goods_id
    console.log("收藏查询", user_id)
    var res = await this.ctx.model.Transaction.findOne({
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
    var result = await this.ctx.model.Transaction.deleteMany({
      "user_id": user_id,
      "goods_id": goods_id
    })
    this.success(result)
  }

  async delId() {
    console.log('删除收藏', this.ctx.request.body)
    let _id = this.ctx.request.body.f_id
    var result = await this.ctx.model.Transaction.deleteOne({
      "_id": _id,
    })
    this.success(result)
  }

  //userID+商品ID单个查询
}

module.exports = TransactionController;