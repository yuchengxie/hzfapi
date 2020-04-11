/*
 * @Date: 2020-01-08 11:32:51
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-25 16:46:37
 */

module.exports = app => {
  const mongoose = app.mongoose; 
  const Schema = mongoose.Schema;
  var d = new Date();
  const UserSchema = new Schema({
    nickName: {
      type: String,
    }, 
    password: {
      type: String
    }, 
    avatarUrl: {
      type: String
    }, 
    unionId: {
      type: String
    }, 
    openId: {
      type: String
    }, 
    gender: {
      type: String
    }, 
    city: {
      type: String
    }, 
    province: {
      type: String
    }, 
    country: {
      type: String
    }, 
    type_from: {
      type: Number,
      default: 1 //1 app  2 小程序 
    },
    phone: {
      type: Number,
    }, //联系电话
    credit_value: {
      type: Number
    }, //积分
    add_time: { //注册时间
      type: Number,
      default: d.getTime()
    },
    remark: {
      type: String
    }, //备注
    // consume: { type: Number  }, //总消费
    // ordertimes: { type: Number  }, //下单次数
    // currentBalance: { type: Number },//当前余额
  });

  return mongoose.model('User', UserSchema, 'user');
}