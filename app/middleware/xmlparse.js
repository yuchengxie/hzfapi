/*
 * @Date: 2020-02-24 16:08:50
 * @LastEditors: wangbingqi
 * @LastEditTime: 2020-02-24 16:08:50
 */
module.exports = () => {
    return async function (ctx, next) {
        var bodyParser = require('body-parser');
        ctx.app.use(bodyParser.urlencoded({
          extended:true
        }));
        await next();
    }
};