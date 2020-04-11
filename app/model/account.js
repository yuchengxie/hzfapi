/*
 * @Date: 2020-01-08 11:32:45
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-04-01 14:37:07
 */
module.exports = app => {

  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  var d = new Date();
  var AccountSchema = Schema({
      balance:Number,
      unionId: String,
      create_time: {
          type: Number,
          default: d.getTime()
      },
  })

  return mongoose.model('Account', AccountSchema, 'account');
}