var md5 = require("md5");
("use strict");

const Service = require("egg").Service;

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
}

module.exports = ToolsService;
