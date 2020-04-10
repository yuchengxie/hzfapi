

// let BaseController = require('../default/base.js');

// class TestController extends BaseController {
//   //查询的时候求和
//   async index() {
//     // console.log("请求资金账户", this.ctx.request.body)

//     let unionId = this.ctx.request.body.unionId
//     var res = await this.ctx.model.Account.aggregate([{
//       $lookup: {
//         from: 'asset',
//         localField: 'unionId',
//         foreignField: 'unionId',
//         as: 'asset'
//       },

//     }, {
//       $match: {
//         "unionId": unionId
//       }
//     }])
//     // console.log("1111111", res)
//     this.success(res)
//   }
// }
// module.exports = TestController;