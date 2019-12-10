"use strict";

const Controller = require("egg").Controller;

class GoodsController extends Controller {
  async list() {
    var cate_id = this.ctx.request.query.cate_id;
    var page=this.ctx.request.query.page || 1;
    page=Math.ceil(page);
    var pageSize=this.ctx.request.query.pageSize || 2;
    pageSize=Math.ceil(pageSize);
    // if(!pageSize || !page){

    // }
    console.log('pageSize:',pageSize);
    
    console.log(this.ctx.request.query);
    
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
    var json={"cate_id":cate_id};
    // var totalNum=await this.ctx.model.Goods.find(json).count();
    let goods=await this.ctx.model.Goods.find(json).skip((page-1)*pageSize).limit(pageSize);
    this.ctx.body = {
      result: {
        success: true,
        msg: {
            goods:goods,
        }
      }
    };
  }
}

module.exports = GoodsController;
