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

  randomlogn(num) {
    var n = num.split('');
    var m = [];
    for (var i = 0; i < 16; i++) {
      m[i] = n[Math.floor(Math.random() * 17)];
    }
    // return u = m.join('');
    return m.join('');
  }
  // 随机数
  _md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  async gen32RandomOrder() { // 时间 13 标识 15 位  随机 4位数
    return UUID.v1().replace(/-/g, '');
    //   var g, o, h;
    //   g = this._md5(data).substr(16, 32);
    //   o = this.randomlogn(g);
    //   h = this.randomlogn(o);
    //   if (!time) {
    //     time = new Date().getTime();
    //   }
    //   var str = '',
    //     arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    //   // 随机产生
    //   for (var i = 0; i < 4; i++) {
    //     var pos = Math.round(Math.random() * (arr.length - 1));
    //     str += arr[pos];
    //   }
    //   return time + h + str;
  }
}

module.exports = ToolsService;