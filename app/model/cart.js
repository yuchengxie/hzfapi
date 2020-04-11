/*
 * @Date: 2020-01-26 23:32:51
 * @LastEditors  : wangbingqi
 * @LastEditTime : 2020-01-27 01:47:06
 */
module.exports = app => {

    const mongoose = app.mongoose;   /*引入建立连接的mongoose */
    const Schema = mongoose.Schema;
    var d=new Date();
    var CartSchema=Schema({
        goods_img:String,
        sub_title:String,
        shop_price:Number,
        market_price:Number,
        title:String,
        saleNum:Number,
        goods_id:{ type:Schema.Types.ObjectId},
        user_id:{ type:Schema.Types.ObjectId,require:true},
        expressAmount:Number,  //运费 
        goodsAddress:String,  //商品地址 
        add_time: {           
            type:Number,        
            default: d.getTime()
           },
    })    
   return mongoose.model('Cart',CartSchema,'cart');  
}