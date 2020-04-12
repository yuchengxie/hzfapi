/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-04 22:26:08
 */
'use strict';

let BaseController = require('./default/base.js');
class GoodsCateController extends BaseController {
  async cartDelMany() {
    let user_id = this.ctx.request.body.user_id
    console.log("user_id", user_id)
    var res = await this.ctx.model.Cart.deleteMany({
      "user_id": user_id
    })
    this.success(res)
  }
  async cart() {
    let user_id = this.ctx.request.body.user_id
    console.log("user_id", user_id)
    var res = await this.ctx.model.Cart.find({
      "user_id": user_id
    })
    this.success(res)
  }

  async addCart() {
    //查询是否有相同的表 有的话判断类型属否相同，不相同增加，相同数量加一
    let data = this.ctx.request.body
    console.log("data", data)
    let addCart = new this.ctx.model.Cart(data)
    var res = await addCart.save();
    this.success(res)
  }




  async cate() {
    console.time('time')
    var GoodsCate = await this.ctx.service.cache.get('goods_GoodsCate')
    if (!GoodsCate) {
      GoodsCate = await this.ctx.model.GoodsCate.aggregate([
        {
          $lookup: {
            from: 'goods_cate',
            localField: '_id',
            foreignField: 'pid',
            as: 'items'
          }
        },
        {
          $match: {
            "pid": '0'
          }
        }
      ])
      await this.ctx.service.cache.set('goods_GoodsCate', GoodsCate, 60 * 60)
    }
    console.timeEnd('time')
    this.success(GoodsCate)
  }

  //商品列表
  async index() {
    var page = Number(this.ctx.request.query.page) || 1;
    var json = {};
    var cate_id = this.ctx.query.cate_id
    if (cate_id) {
      json = Object.assign({
        cate_id
      });
    }
    var pageSize = Number(this.ctx.request.query.pageSize) || 15;
    console.log("json", json)
    console.log("pageSize", pageSize)
    console.log("page", page)
    //获取当前数据表的总数量
    var totalNum = await this.ctx.model.Goods.find(json).count();
    var goodsResult = await this.ctx.model.Goods.find(json).skip((page - 1) * pageSize).limit(pageSize);
    let res = {
      goodsResult,
    }
    this.success(res)
  }
  
  //商品详情 信息
  async info() {
    var id = this.ctx.query.id
    console.log(id)
    var productInfo = await this.ctx.model.Goods.find({
      _id: id
    });
    var goodsAttr = await this.ctx.model.GoodsAttr.find({
      goods_id: id
    });
    var goodsImageResult = await this.ctx.model.GoodsImage.find({
      goods_id: id
    });
    var goodsColor = await this.ctx.model.GoodsColor.find({});

    console.log("productInfo", productInfo)

    //预留商品属性的选择
    var goodsRelation = []
    // if(productInfo[0].length){
    //   goodsRelation = await this.ctx.model.GoodsTypeAttribute.find({type_id:productInfo[0].goods_type_id});
    // }else{
    //   goodsRelation=[]
    // }

    let res = {
      productInfo,
      goodsAttr,
      goodsImageResult,
      goodsColor,
      goodsRelation
    }
    this.success(res)
    // this.productInfo = res.data.msg.productInfo
    // 				this.goodsImageResult = res.data.msg.goodsImageResult
    // 				this.goodsAttr = res.data.msg.goodsAttr
  }



  //点击  搜索页面时候 调用  或者 点击分类查询页面点用
  async goodsCate() {
    console.time('time2')
    var page = this.ctx.request.query.page || 1;
    //输入框搜索的时候会调用
    var keyword = this.ctx.request.query.keyword;
    var json = {};
    if (keyword) {
      json = Object.assign({
        "title": {
          $regex: new RegExp(keyword)
        }
      });
    }
    var pageSize = this.ctx.request.query.pageSize || 15;
    //获取当前数据表的总数量
    var totalNum = await this.ctx.model.Goods.find(json).count();
    var goodsResult = await this.ctx.model.Goods.find(json).skip((page - 1) * pageSize).limit(pageSize);
    var goodsColor = await this.ctx.model.GoodsColor.find({});
    let res = {
      goodsResult,
      goodsColor,
      totalNum
    }
    console.timeEnd('time2')
    console.log(res)
    this.success(res)
  }
}

module.exports = GoodsCateController;