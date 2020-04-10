
//路径去掉参数插件
const url = require('url')

//options是配置文件配置时传入的参数
module.exports = options => {
    return async function adminauth(ctx, next) {
      console.log('adminauth')
        //获取用户访问的地址
      const pathname = url.parse(ctx.request.url).pathname;
        //判断用户是否登陆（登陆成功会写入到userinfo）
      if(ctx.session.userinfo){
          await next();
      }else{

      // 排除不需要做权限判断的页面  /admin/verify?mt=0.7466881301614958
      if (pathname == '/admin/login' || pathname == '/admin/doLogin' || pathname == '/admin/verify') {
        await next();
      } else {
          //返回 未登陆的错误码
      }
      }


      await next()
    };
  };  