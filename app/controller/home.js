/*
 * @Date: 2020-01-01 06:23:49
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-04 21:56:31
 */
'use strict';
let BaseController = require('./default/base.js');
class FocusController extends BaseController {
  async index() {
    console.time('time')
    var focus = await this.ctx.service.cache.get('home_focus')
    if (!focus) {
      focus = await this.ctx.model.Focus.find({});
      await this.ctx.service.cache.set('home_focus', focus, 60 * 60)
    }

    var goodsCate = await this.ctx.service.cache.get('home_goodsCate')
    if (!goodsCate) {
      goodsCate = await this.ctx.model.GoodsCate.aggregate([{
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
      await this.ctx.service.cache.set('home_goodsCate', goodsCate, 60 * 60)
    }

    let res = {
      focus,
      goodsCate
    }

    console.timeEnd('time')
    this.success(res)
  }
}

module.exports = FocusController;