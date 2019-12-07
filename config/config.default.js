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
  config.middleware = ["auth"];

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

  config.expired = 60;

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

  //一般缓存，不包括token
  // config.REDIS_EX = 600 * 60;

  return {
    ...config,
    ...userConfig
  };
};
