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
    let json = { cate_id: cate_id };
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

  async detail() {
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
      let goods_detail = await this.ctx.model.Goods.find({
        _id: this.app.mongoose.Types.ObjectId(id)
      });
      // if (goods_detail[0].goods_img) {
      //   goods_detail[0].goods_img = this.service.tools.convertImagePath(
      //     goods_detail[0].goods_img
      //   );
      // }
      this.ctx.body = {
        result: {
          success: true,
          msg: goods_detail
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
