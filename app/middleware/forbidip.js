/*
 * @Date: 2019-12-29 22:28:52
 * @LastEditors  : wangbingqi
 * @LastEditTime : 2020-01-17 17:46:56
 */
module.exports = (options, app) => {
    return async function forbidipMiddleware(ctx, next) {
      var sourceIp=ctx.request.ip;
      const match = options.ip.some(val =>{
        if(val==sourceIp){
        
          return true;
        }
      });
      if (match) {
        console.log('=====================黑名单========================')
        ctx.status = 403;
        ctx.message = 'Go away, robot.';
      } else {
        await next();
      }
    }
};