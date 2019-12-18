'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
  strToArray(str) {
    try {
      var tempIds = [];
      if (str) {
        var idsArr = str.replace(/，/g, ',').split(',');
        for (var i = 0; i < idsArr.length; i++) {
          tempIds.push({
            "_id": this.app.mongoose.Types.ObjectId(idsArr[i])
          });
        }

      } else {
        tempIds = [{
          "1": -1
        }]

      }
      return tempIds;


    } catch (error) {
      return [{
        "1": -1
      }]; //返回一个不成立的条件
    }
  }
}

module.exports = GoodsController;