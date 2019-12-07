"use strict";

const Service = require("egg").Service;
var request = require("request");

class MessageService extends Service {
  sendPhoneVerifyCode(phone) {
    var url = "https://open.ucpaas.com/ol/sms/sendsms";
    var phone_code = Math.random()
      .toString()
      .slice(-6);
    var now = Math.floor(new Date().getTime() / 1000);
    var data = {
      sid: "aac207195095e22c1ab0b760586b8e6b",
      token: "e99ac6e5b321df91e5b899f41e34f2f5",
      appid: "f2bd928ea6b3462ead6b5de87ff1d487",
      templateid: "428112",
      param: phone_code,
      mobile: phone,
      uid: now
    };
    var requestData = JSON.stringify(data);
    var opts = {
      url: url,
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: requestData
    };
    return new Promise((resolve, reject) => {
      request.post(opts, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (body) {
            var result = JSON.parse(body);
            if (result.code != "000000") {
              result.phone_code = "";
            } else {
              result.phone_code = phone_code;
            }
            resolve(result);
          }
        } else {
          reject(err);
        }
      });
    });
  }
}
module.exports = MessageService;