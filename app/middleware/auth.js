module.exports = (options, app) => {
  return async function auth(ctx, next) {
    let url = ctx.request.url;
    console.log("url:", url);
    if (
      url == "/v1/user/login" ||
      url == "/v1/user/logout" ||
      url == "/v1" ||
      url == "/v1/user/register"||
      url == "/v1/user/test"
    ) {
      await next();
    } else {
      var token_ = ctx.header.authorization;
      try {
        //去掉 'Bearer ' 头部
        var decoded = app.jwt.verify(token_.slice(7), app.config.jwt.secret);
        let userId = decoded.data.phone,
          key = "userId_" + userId;
        console.log("key:", key);
        var value = await ctx.service.cache.get(key);
        //如果存在,则视为正常执行，不存在，则视为加入了黑名单
        if (!value) {
          ctx.body = {
            result: {
              success: false,
              msg: userId + " not exist"
            }
          };
          return;
        }
        await next();
      } catch (error) {
        ctx.body = {
          result: {
            success: false,
            msg: "token expired"
          }
        };
        return;
      }
    }
  };
};
