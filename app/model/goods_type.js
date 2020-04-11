module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d=new Date();
 
  const GoodsTypeSchema = new Schema({
    title: { type: String  },
    description: { type: String  },   
    status: { type: Number,default:1  },    
    add_time: {           
      type:Number,        
      default: d.getTime()    
    }
   
  });
  
  let   goods_type =    mongoose.model('GoodsType', GoodsTypeSchema,'goods_type');
  initUserData(goods_type)

  return goods_type
}

function initUserData(goods_type) {
  // 查询数据库
  goods_type.find({}, (err, doc) => {
      if (err) {
          console.log(err)
          console.log('init goods_type failed')
      } else if (!doc.length) {
          new goods_type({
            title: 'wang',
            description: "bingqi",
            status: 1,
            add_time: Date.now()
          }).save()
      } else {
          // console.log('-------------init goods_type successfully--------------')
      }
  })
}