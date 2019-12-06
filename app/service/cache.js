"use strict";

const Service = require("egg").Service;

class CacheService extends Service {
  async set(key, value) {
    if (this.app.redis) {
      value = JSON.stringify(value);
      this.app.redis.set(key, value);
    }
  }

  async setToken(key,value){
    if(this.app.redis){
      value=JSON.stringify(value);
      this.app.redis.set(key,value);
    }
  }

  async get(key) {
    if (this.app.redis) {
      let data = await this.app.redis.get(key);
      if (!data) return;
      return JSON.parse(data);
    }
  }
}

module.exports = CacheService;
