/*
 * @Date: 2020-01-30 23:56:53
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-02-27 17:57:57
 */

module.exports = app => {
    const mongoose = app.mongoose;   
    const Schema = mongoose.Schema;
    var d=new Date();
    var CollectSchema=Schema({
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
    
   return mongoose.model('Collect',CollectSchema,'collect');  
    
   
}