/*
 * @Date: 2020-01-08 11:32:45
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-06 11:32:44
 */

module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  var d = new Date();
  var TraceSchema = Schema({
      fee:Number,
      state:Number,  //1 充值  2 购买  3 卖出
      total_count:Number,  //1 充值  2 购买  3 卖出
      saleNum:Number,  //1 充值  2 购买  3 卖出
      count:Number,  
      owner: String,
      delivery_date: String,
      order_date: String,
      master: String,
      goods_img: String,
      title: String,
      out_trade_no: String,
      user_id: {  //当前所属人ID
        type: Schema.Types.ObjectId
    },
      create_time: {
          type: Number,
          default: (d.getTime()/1000)
      },
  })

  return mongoose.model('Trace', TraceSchema, 'trace');
}