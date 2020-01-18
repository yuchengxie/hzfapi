module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();
  const UserAccount = new Schema({

    /*
      ip:ip,
            password:password,
            phone:phone,
            add_time:add_time,
            last_ip:last_ip,
            status:status      
    */

    phone: {
      type: Number
    },
    password: {
      type: String
    },
    blockchain_account: {
      type: String
    },
    add_time: {
      type: Number,
      default: d.getTime()
    },
  });
  return mongoose.model('UserAccount', UserAccount, 'user_account');
}