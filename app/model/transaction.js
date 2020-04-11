/*
 * @Date: 2020-01-08 11:32:45
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-01 11:43:36
 */
module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  var d = new Date();
  var TransactionSchema = Schema({
      total_fee:Number,
      state:Number,  //1 充值  2 购买  3 卖出
      out_trade_no: String,
      user_id: {
        type: Schema.Types.ObjectId
    },
      create_time: {
          type: Number,
          default: d.getTime()
      },
  })

  return mongoose.model('Transaction', TransactionSchema, 'transaction');
}