/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.cluster = {
    listen: {
      path: "",
      port: 8000,
      hostname: "0.0.0.0"
    }
  };

  // config.session = {
  //   key: "SESSION_ID",
  //   maxAge: 864000 * 1000, //一天
  //   httpOnly: true,
  //   encrypt: true,
  //   renew: true //  延长会话有效期
  // };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1575595639228_3866";

  // add your middleware config here
  // config.middleware = ["auth"];
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ["http://localhost:8000"] //允许访问接口的白名单
  };
  config.cors = {
    origin: "*",
    allowMethods: "GET,PUT,POST,DELETE"
  };

  exports.jwt = {
    secret: "123456"
  };

  exports.redis = {
    client: {
      port: 6380,
      host: "118.190.105.235",
      password: "qwerty123",
      db: 0
    }
  };

  exports.mongoose = {
    client: {
      url: "mongodb://admin:qwerty123@118.190.105.235:27017/hzfds",
      options: {}
    }
  };

  //用户登陆token过期设置
  config.expired = 60 * 60 * 24;
  //redis缓存过期设置
  config.REDIS_EX_NORMAL =60 * 60 * 24 ;//1 day
  config.REDIS_EX_TOKEN = 60 * 60 * 24 * 7;//7 day
  
  return {
    ...config,
    ...userConfig
  };
};
