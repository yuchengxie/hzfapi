/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-03 16:22:40
 */
'use strict';

let BaseController = require('./default/base.js');

class AccountController extends BaseController {
  //查询的时候求和
  async index() {
    // console.log("请求资金账户", this.ctx.request.body)

    let unionId = this.ctx.request.body.unionId
    var res = await this.ctx.model.Account.aggregate([{
      $lookup: {
        from: 'asset',
        localField: 'unionId',
        foreignField: 'unionId',
        as: 'asset'
      },
      
    },{
      $match:{
        "unionId":unionId
      }
   } ])
    console.log("account", res)
    this.success(res)
  }

  async reduce() {
    let unionId = this.ctx.request.body.unionId
    let shop_price = this.ctx.request.body.shop_price
    let out_trade_no = this.ctx.request.body.out_trade_no
    // findOneAndUpdate 试一下
    // 交易明细表
    console.log("unionId",unionId)
    console.log("shop_price",shop_price)

    let findResult = await this.ctx.model.Account.find({
      "unionId": unionId
    });
    console.log("findResult", findResult)
    let balance = findResult[0].balance + shop_price

    console.log("balance", balance)
    let findResult2 = await this.ctx.model.Account.updateOne({
      "unionId": unionId
    }, {
      balance: balance
    })
    console.log("findResult2", findResult2)
    let deleteOne =  await this.ctx.model.Asset.deleteOne({out_trade_no: out_trade_no})
    console.log("deleteOne", deleteOne)
    this.success()
  }
  async add() {
    let unionId = this.ctx.request.body.unionId
    let shop_price = this.ctx.request.body.shop_price
    let title = this.ctx.request.body.title
    let out_trade_no = this.ctx.request.body.out_trade_no
    // findOneAndUpdate 试一下
    // 交易明细表
    let findResult = await this.ctx.model.Account.find({
      "unionId": unionId
    });
    console.log("findResult", findResult)
    let balance = findResult[0].balance - shop_price

    console.log("balance", balance)
    let findResult2 = await this.ctx.model.Account.updateOne({
      "unionId": unionId
    }, {
      balance: balance
    })

    console.log("findResult2", findResult2)

    let objDate = {
      unionId,
      shop_price,
      out_trade_no,
      title
    }

    console.log("777777777777777")
    console.log(objDate)

    //账户类型添加
    let updateAccount = new this.ctx.model.Asset(objDate)
    let res = await updateAccount.save()
    console.log("updateAccount", res)
    console.log("777777777777777")
    this.success(res)
  }

  async transfer() {
    //新用户的
    let unionId = this.ctx.request.body.unionId
    let asset = this.ctx.request.body.asset
    let findResult = await this.ctx.model.Account.find({
      "unionId": unionId
    });
    console.log("查询的资金账户数据", findResult)
    let findAsset = findResult.asset
    let newAsset = [...findAsset, ...asset]
    let objDate = {
      asset: newAsset
    }
    //数组去重复更新
    //更行
    let updateAccount = await this.ctx.model.Account.updateOne({
      "unionId": unionId
    }, objDate)
    this.success(updateAccount)
  }


}

module.exports = AccountController;