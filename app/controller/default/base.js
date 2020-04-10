//父类

'use strict';



const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(msg={}) {
    this.ctx.body = {
      code: 0,
      msg
    };
  }

  async error( msg="服务器错误") {
    this.ctx.body = {
      code: 1,
      msg
    };
  }
  async awaitWrap(promise) {
    return promise.then(res => {
            return {
              code:0,
              msg:res
            }
        })
        .catch(err => {
            return {
              code:1,
              msg:err
            }
        })
  }

  //封装一个删除方法 
  async delete() {
    /*
    1、获取要删除的数据库表   model
    2、获取要删除数据的id   _id
    3、执行删除
    4、返回到以前的页面           ctx.request.headers['referer']   (上一页的地址)
    */
    var model = this.ctx.request.query.model; //Role      
    var id = this.ctx.request.query.id;
    console.log("model",this.ctx.request.query.id)
    console.log("model",this.ctx.request.query.model)
    if(model==="Goods"){
      //删除商品图片
      await this.ctx.model.GoodsImage.deleteMany({
        goods_id: id
      })
      //删除属性图片
      await this.ctx.model.GoodsAttr.deleteMany({
        goods_id: id
      })
      //删除商品属性
    }
     let res =  await this.ctx.model[model].deleteOne({
      "_id": id
    }); //注意写法
    this.success()
    console.log(res)
  }

  //改变状态的方法  Api接口
  async changeStatus() {
    var model = this.ctx.request.query.model; /*数据库表 Model*/
    var attr = this.ctx.request.query.attr; /*更新的属性 如:status is_best */
    var id = this.ctx.request.query.id; /*更新的 id*/
    var result = await this.ctx.model[model].find({
      "_id": id
    });
    if (result.length > 0) {
      if (result[0][attr] == 1) {
        var json = {
          /*es6 属性名表达式*/
          [attr]: 0
        }
      } else {
        var json = {
          [attr]: 1
        }
      }
      //执行更新操作
      var updateResult = await this.ctx.model[model].updateOne({
        "_id": id
      }, json);

      if (updateResult) {
        this.ctx.body = {
          "message": '更新成功',
          "success": true
        };
      } else {
        this.ctx.body = {
          "message": '更新失败',
          "success": false
        };
      }
    } else {
      //接口
      this.ctx.body = {
        "message": '更新失败,参数错误',
        "success": false
      };
    }
  }
  //改变数量的方法
  async editNum() {
    var model = this.ctx.request.query.model; /*数据库表 Model*/
    var attr = this.ctx.request.query.attr; /*更新的属性 如:sort */
    var id = this.ctx.request.query.id; /*更新的 id*/
    var num = this.ctx.request.query.num; /*数量*/
    var result = await this.ctx.model[model].find({
      "_id": id
    });
    if (result.length > 0) {
      var json = {
        /*es6 属性名表达式*/
        [attr]: num
      }
      //执行更新操作
      var updateResult = await this.ctx.model[model].updateOne({
        "_id": id
      }, json);
      if (updateResult) {
        this.ctx.body = {
          "message": '更新成功',
          "success": true
        };
      } else {
        this.ctx.body = {
          "message": '更新失败',
          "success": false
        };
      }
    } else {
      //接口
      this.ctx.body = {
        "message": '更新失败,参数错误',
        "success": false
      };
    }
  }
}
module.exports = BaseController;