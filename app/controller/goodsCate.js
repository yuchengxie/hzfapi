"use strict";

const Controller = require("egg").Controller;

class GoodsCateController extends Controller {
  async list() {
    // var goodsCate_list = await this.ctx.service.cache.get("goodsCate_list");
    // if (!goodsCate_list) {
    //   goodsCate_list = await this.ctx.model.GoodsCate.aggregate([
    //     {
    //       $lookup: {
    //         from: "goods_cate",
    //         localField: "_id",
    //         foreignField: "pid",
    //         as: "items"
    //       }
    //     },
    //     {
    //       $match: {
    //         pid: "0"
    //       }
    //     },
    //     {
    //       $project: {
    //         cate_img: 1,
    //         title: 1,
    //         sort: 1,
    //         items: { _id: 1, cate_img: 1, title: 1, sort: 1 }
    //       }
    //     }
    //   ]).sort({ sort: 1 });

    //   await this.ctx.service.cache.set("goodsCate_list", goodsCate_list);
    // }

    var goodsCate_list = await this.ctx.model.GoodsCate.aggregate([
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
          items: { _id: 1, cate_img: 1, title: 1, sort: 1 }
        }
      }
    ]).sort({ sort: 1 });

    this.ctx.body = {
      result: {
        succuss: true,
        msg: goodsCate_list
      }
    };
  }
}

module.exports = GoodsCateController;
