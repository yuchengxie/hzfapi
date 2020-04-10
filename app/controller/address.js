/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime : 2020-02-03 23:42:37
 */
'use strict';

let BaseController = require('./default/base.js');
class AddressController extends BaseController {
  async address() {
    //获取轮播图的数据
    console.log("地址", this.ctx.request.body)
    let user_id = this.ctx.request.body.user_id
    console.log("地址", user_id)
    var res = await this.ctx.model.Address.find({
      "user_id": user_id
    })
    this.success(res)
  }
  async add() {
    let addResult = this.ctx.request.body
    var Address = new this.ctx.model.Address(addResult);
    let res = await Address.save()
    console.log(res)
    this.success(res)
  }
  async edit() {

    let _id = this.ctx.request.body._id
    let user_id = this.ctx.request.body.user_id
    
    //默认
    if(this.ctx.request.body.default){
      var result=await this.ctx.model.Address.find({"user_id":user_id});
      console.log(result)

      result.forEach(async(item, index) => {
        console.log(index)
        let defaultDate={
          default:false
        }
        await this.ctx.model.Address.updateOne({"_id":item._id},defaultDate)
      })
    }


    let sendDate = {
      userName: this.ctx.request.body.userName,
      phone: this.ctx.request.body.phone,
      valueDefault: this.ctx.request.body.valueDefault,
      province: this.ctx.request.body.province,
      city: this.ctx.request.body.city,
      area: this.ctx.request.body.area,
      street: this.ctx.request.body.street,
      default: this.ctx.request.body.default,
    }
    await this.ctx.model.Address.updateOne({"_id":_id},sendDate)
    this.success()
  }
}

module.exports = AddressController;