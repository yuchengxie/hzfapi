var md5 = require("md5");
("use strict");

const Service = require("egg").Service;

class ToolsService extends Service {
  md5(str) {
    return md5(str);
  }
}

module.exports = ToolsService;
