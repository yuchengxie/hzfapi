/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-01 11:50:17
 */
'use strict';
const uuid = require('node-uuid');
let BaseController = require('./default/base.js');
class OrdersController extends BaseController {
  async add() {
    let addResult = this.ctx.request.body
    let uid = uuid.v1();
    uid = uid.replace(/\-/g, '');
    addResult.out_trade_no=uid
    var Order = new this.ctx.model.Order(addResult);
    let res = await Order.save()
    this.success(res)
  }
  async confirm() {
    let user_id = this.ctx.request.body.user_id
    let out_trade_no = this.ctx.request.body.out_trade_no
    let sendData = {
      "state":2
    }
    let res = await this.ctx.model.Order.updateOne({"user_id":user_id,"out_trade_no":out_trade_no},sendData)
    console.log("确认订单数据",res)
    this.success(res)
  }
  async change() {
    let out_trade_no = this.ctx.request.body.out_trade_no
    let sendData = this.ctx.request.body
    let res = await this.ctx.model.Order.updateOne({"out_trade_no":out_trade_no},sendData)
    console.log("修改订单数据",res)
    this.success(res)
  }

  //查询订单
  async index() {
    //获取订单状态查询
    let user_id = this.ctx.request.body.user_id
    let state = this.ctx.request.body.state
    let sendData = {
      "user_id":user_id
    }
    if (state !== 0) {
      sendData.state = state
    }
    console.log("发送的数据",sendData)

    let res = await this.ctx.model.Order.find(sendData)
    console.log("返回的数据",res)
    this.success(res)
  }
}

module.exports = OrdersController;