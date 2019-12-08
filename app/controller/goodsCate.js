"use strict";

const Controller = require("egg").Controller;

class GoodsCateController extends Controller {
  async list() {
    var goodsCate_list = await this.ctx.service.cache.get("goodsCate_list");
    if (!goodsCate_list) {
      goodsCate_list = await this.ctx.model.GoodsCate.aggregate([
        {
          $lookup: {
            from: "goods_cate",
            localField: "_id",
            foreignField: "pid",
            as: "items"
          }
        },
        {
          $match: {
            pid: "0"
          }
        },
        {
          $project: {
            cate_img: 1,
            title: 1,
            sort: 1,
            items: { cate_img: 1, title: 1, sort: 1 }
          }
        }
      ]).sort({ sort: 1 });

      for (var i = 0; i < goodsCate_list.length; i++) {
        if (goodsCate_list[i].cate_img) {
          goodsCate_list[i].cate_img = this.service.tools.convertImagePath(
            goodsCate_list[i].cate_img
          );
        }
        for (var j = 0; j < goodsCate_list[i].items.length; j++) {
          if (goodsCate_list[i].items[j].cate_img) {
            goodsCate_list[i].items[
              j
            ].cate_img = this.service.tools.convertImagePath(
              goodsCate_list[i].items[j].cate_img
            );
          }
        }
      }
      await this.ctx.service.cache.set('goodsCate_list',goodsCate_list);
    }

    this.ctx.body = {
      result: {
        succuss: true,
        msg: goodsCate_list
      }
    };
  }
}

module.exports = GoodsCateController;
