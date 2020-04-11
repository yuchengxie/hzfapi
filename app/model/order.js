/*
 * @Date: 2020-01-08 11:32:45
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-03-01 11:43:36
 */
module.exports = app => {

    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    var OrderSchema = Schema({
        out_trade_no:String,//订单号
        transaction_id:String,//交易ID
        trade_type:String,//交易类型
        openid:String,
        appid:String,
        state: Number, //状态  0全部 1代付款 2待收货 3待评价 4 售后
        fee_type:String,//交易金额
        desc: String,
        delivery_date: String,
        payType: Number,
        goodsData: {
            type: Array,
            require: true
        },
        user_id: {
            type: Schema.Types.ObjectId
        },
        carriage: Number,//运费
        province: String,
        city: String,
        area: String,
        street: String,
        userName: String,
        address_id: {
            type: Schema.Types.ObjectId
        },
        add_time: {
            type: Number,
            default: d.getTime()
        },
    })

    return mongoose.model('Order', OrderSchema, 'order');
}