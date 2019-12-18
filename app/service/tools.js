var md5 = require("md5");
var UUID = require('uuid');
const Service = require("egg").Service;
var crypto = require('crypto');

class ToolsService extends Service {
  md5(str) {
    return md5(str);
  }

  convertImagePath(s) {
    var m = "";
    if (s && s.length > 13) {
      m = "http://118.190.105.235:8080" + s.slice(13);
    }
    return m;
  }

  async gen32RandomOrder() { // 时间 13 标识 15 位  随机 4位数
    return UUID.v1().replace(/-/g, '');
  }
}

module.exports = ToolsService;