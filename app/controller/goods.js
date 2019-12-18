"use strict";

const Controller = require("egg").Controller;

class GoodsController extends Controller {
  async list() {
    var cate_id = this.ctx.request.query.cate_id;
    var page = this.ctx.request.query.page || 1;
    page = Math.ceil(page);
    var pageSize = this.ctx.request.query.pageSize || 20;
    pageSize = Math.ceil(pageSize);

    if (!cate_id || !pageSize || !page) {
      this.ctx.body = {
        result: {
          success: false,
          msg: "args invalid"
        }
      };
      return;
    }
    // var goods=await this.ctx.model.Goods.find({"cate_id":cate_id});
    let json = {
      cate_id: cate_id
    };
    // var totalNum=await this.ctx.model.Goods.find(json).count();
    // var totalPages
    let goods = await this.ctx.model.Goods.find(json)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    // for (var i = 0; i < goods.length; i++) {
    //   console.log('goods_img:',goods[i].goods_img);
    //   if (goods[i].goods_img) {
    //     goods[i].goods_img = this.service.tools.convertImagePath(
    //       goods[i].goods_img
    //     );
    //   }
    // }

    this.ctx.body = {
      result: {
        success: true,
        msg: goods
      }
    };
  }

  async info() {
    var id = this.ctx.request.query.id;
    if (!id) {
      this.ctx.body = {
        result: {
          success: true,
          msg: "args invalid"
        }
      };
      return;
    }
    try {
      //1、获取商品信息
      let productInfo = await this.ctx.model.Goods.find({
        _id: this.app.mongoose.Types.ObjectId(id)
      });
      var goodsColorIds = this.ctx.service.goods.strToArray(productInfo[0].goods_color);

      //2、关联商品
      var relationGoodsIds = this.ctx.service.goods.strToArray(
        productInfo[0].relation_goods
      );

      var goodsRelation = await this.ctx.model.Goods.find({
          $or: relationGoodsIds
        },
        "title goods_version shop_price"
      );

      //3、获取关联颜色
      var goodsColor = await this.ctx.model.GoodsColor.find({
        $or: goodsColorIds
      });

      //4、关联赠品
      var goodsGiftIds = this.ctx.service.goods.strToArray(
        productInfo[0].goods_gift
      );
      var goodsGift = await this.ctx.model.Goods.find({
        $or: goodsGiftIds
      });
      //5、关联配件
      var goodsFittingIds = this.ctx.service.goods.strToArray(
        productInfo[0].goods_fitting
      );
      var goodsFitting = await this.ctx.model.Goods.find({
        $or: goodsFittingIds
      });
      //6、当前商品关联的图片
      var goodsImageResult = await this.ctx.model.GoodsImage.find({
        "goods_id": id
      }).limit(8);
      //7、获取规格参数信息
      var goodsAttr = await this.ctx.model.GoodsAttr.find({
        "goods_id": id
      });



      this.ctx.body = {
        result: {
          success: true,
          msg: {
            productInfo: productInfo[0],
            goodsRelation: goodsRelation,
            goodsColor: goodsColor,
            goodsGift: goodsGift,
            goodsFitting: goodsFitting,
            goodsImageResult: goodsImageResult,
            goodsAttr:goodsAttr
          }
        }
      };
    } catch (error) {
      this.ctx.body = {
        result: {
          success: true,
          msg: "args invalid"
        }
      };
    }
  }
}

module.exports = GoodsController;