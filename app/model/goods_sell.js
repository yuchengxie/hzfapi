/*
 * @Date: 2020-01-01 02:57:19
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-02 16:19:44
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    var d=new Date();   
    const GoodsSellSchema = new Schema({
      
      out_trade_no:String, //订单号
      title: { type: String,default: ''},      //标题
      goods_id: {type:Schema.Types.ObjectId }, //商品id
      user_id: {type:Schema.Types.ObjectId },  //卖出的人的用户id  
      shop_price:{            //原始价格
        type:Number,
        default:0
      },
      sellPrice:{            //卖出价格
        type:Number,
        default:0
      },
      owner: String,    //所有者
      master: String,    //大师
      goods_img: String,    //商品图片
      delivery_date: String,    //发货时间
      unionId: String,    //发货时间
      saleNum: Number,    //卖出数量
      total_count: Number,    //商品总量
      creat_time: {           //创建时间
        type:Number,        
        default: d.getTime()    
      }
    });
   
    return mongoose.model('GoodsSell', GoodsSellSchema,'goods_sell');

}