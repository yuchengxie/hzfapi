/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-04 22:31:29
 */
'use strict';

let BaseController = require('./default/base.js');
class CollectController extends BaseController {
  async index() {
    console.log("收藏", this.ctx.request.body)
    let user_id = this.ctx.request.body.user_id
    console.log("收藏", user_id)
    var res = await this.ctx.model.Collect.find({
      "user_id": user_id
    })
    this.success(res)
  }
  async search() {
    console.log("收藏查询", this.ctx.request.body)
    let user_id = this.ctx.request.body.user_id
    let goods_id = this.ctx.request.body.goods_id
    console.log("收藏查询", user_id)
    var res = await this.ctx.model.Collect.findOne({
      $and:[
        {
          "user_id": user_id,
        },
        {
          "goods_id":goods_id
        }
      ]
    })
    this.success(res)
  }
  async add() {
    let addResult = this.ctx.request.body
    var Collect = new this.ctx.model.Collect(addResult);
    let res = await Collect.save()
    this.success(res)
  }
  async delGood() {
    let user_id = this.ctx.request.body.user_id
    let goods_id = this.ctx.request.body.goods_id
    var result =await this.ctx.model.Collect.deleteMany({  "user_id": user_id,"goods_id":goods_id })
    this.success(result)
  }
  async delId() {
    console.log('删除收藏',this.ctx.request.body)
    let _id = this.ctx.request.body._id
    var result =await this.ctx.model.Collect.deleteOne({  "_id": _id,})
    this.success(result)
  }
  //userID+商品ID单个查询
}

module.exports = CollectController;