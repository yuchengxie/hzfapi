"use strict";

const Controller = require("egg").Controller;

class FocusController extends Controller {
  async list() {
    // var focus_list=await this.ctx.service.cache.get('focus_list');
    // console.log('focus_list:',focus_list);
    // if(!focus_list){
    //   focus_list = await this.ctx.model.Focus.find({}, "focus_img title sort").sort({sort:1});
    //   // for (var i = 0; i < focus_list.length; i++) {
    //   //   if(focus_list[i].focus_img){
    //   //     focus_list[i].focus_img = this.service.tools.convertImagePath(focus_list[i].focus_img);
    //   //   }
    //   // }
    //   await this.ctx.service.cache.set('focus_list',focus_list);
    // }
    let focus_list = await this.ctx.model.Focus.find({}, "focus_img title sort").sort({sort:1});
    
    this.ctx.body = {
      result: {
        success: true,
        msg: focus_list
      }
    };
  }
}

module.exports = FocusController;
