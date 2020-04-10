/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-03 16:00:15
 */
'use strict';

let BaseController = require('./default/base.js');
class GoodsSellController extends BaseController {

  //添加
  async add() {
    let add = this.ctx.request.body
    var GoodsSell = new this.ctx.model.GoodsSell(add);
    let res = await GoodsSell.save()
    //订单状态跟新为转卖
    let user_id = GoodsSell.user_id
    let out_trade_no = GoodsSell.out_trade_no
    let sendData = {
      "state": 4
    }
    let resOrder = await this.ctx.model.Order.updateOne({
      "user_id": user_id,
      "out_trade_no": out_trade_no
    }, sendData)
    console.log("更新订单数据", resOrder)
    this.success(res)
  }


  async reduce() {
    console.log("——————————————")
    console.log("下架商品")

    let out_trade_no = this.ctx.request.body.out_trade_no
    //卖出表里面去掉
    let resDel = await this.ctx.model.GoodsSell.deleteOne({
      "out_trade_no": out_trade_no
    })

    console.log("卖出表删除数据", resDel)
    console.log("——————————————")
    this.success(resDel)
  }
  async cancel() {
    console.log("——————————————")
    console.log("取消订单")
    let user_id = this.ctx.request.body.user_id
    let out_trade_no = this.ctx.request.body.out_trade_no
    let sendData = {
      "state": 2
    }
    let Order =  await this.ctx.model.Order.updateOne({
      "user_id": user_id,
      "out_trade_no": out_trade_no
    }, sendData)
    console.log("订单表更新数据", Order)
    console.log("——————————————")
    //卖出表里面去掉
    let resDel = await this.ctx.model.GoodsSell.deleteOne({
      // "user_id": user_id,
      "out_trade_no": out_trade_no
    })

    console.log("卖出表删除数据", resDel)
    console.log("——————————————")
    this.success(resDel)
  }

  async good() {
    console.log("查询卖出数据")
    let _id = this.ctx.request.body._id
    var res = await this.ctx.model.GoodsSell.findOne({
      "_id": _id
    })
    console.log("单个卖出数据查询", res)
    this.success(res)
  }
  
  async index() {
    console.log("查询卖出数据")
    let user_id = this.ctx.request.body.user_id
    var resUser = await this.ctx.model.GoodsSell.find({
      "user_id": user_id
    })
    //排除了用户自己的
    var resAll = await this.ctx.model.GoodsSell.find({})
    let obj = {
      user: resUser,
      all: resAll
    }
    console.log("卖出数据", obj)
    this.success(obj)
  }

}

module.exports = GoodsSellController;