/*
 * @Date: 2020-01-08 11:32:45
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-03 16:23:42
 */
module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  var d = new Date();
  var AssetSchema = Schema({
    shop_price: Number,
    title: String,
    out_trade_no: String,
    unionId: String,
    create_time: {
      type: Number,
      default: d.getTime()
    },
  })

  return mongoose.model('Asset', AssetSchema, 'asset');
}