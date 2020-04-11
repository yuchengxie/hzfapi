/*
 * @Date: 2020-01-30 23:56:53
 * @LastEditors: wangbingqi
 * @LastEditTime : 2020-02-03 18:45:40
 */

module.exports = app => {
    const mongoose = app.mongoose;   
    const Schema = mongoose.Schema;
    var d=new Date();
    var AddressSchema=Schema({
        user_id:{
            type:Schema.Types.ObjectId
          },
        userName:String,
        phone:{
            type:Number,
            require:true
        },
        valueDefault:{
            type:Array,
            require:true
        },
        province:{
            type:String,
            require:true
        },
        city:{
            type:String,
            require:true
        },
        
        area:{
            type:String,
            require:true
        },
        street:{
            type:String,
            require:true
        },
        default:{
            type:Boolean,
            default:true
        },
        add_time: {           
            type:Number,        
            default: d.getTime()
           },

    })     
    
   return mongoose.model('Address',AddressSchema,'address');  
    
   
}