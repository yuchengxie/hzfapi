/*
 * @Date: 2020-01-01 02:57:19
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-01-14 11:18:34
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    var d=new Date();
   
    const RoleAccessSchema = new Schema({
      access_id:{ type:Schema.Types.Mixed},
      role_id: { type:Schema.Types.ObjectId }
     
    });

   
    return mongoose.model('RoleAccess', RoleAccessSchema,'role_access');
}