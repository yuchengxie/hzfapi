'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

// const jwt=require('egg-jwt');
// const authMiddleware=require('./middleware/auth');

module.exports = app => {
  const { router, controller } = app;

  var authMiddleware = app.middleware.auth({},app);
  
  //user
  router.get('/v1', controller.user.index);
  router.post('/v1/user/sendPhoneCode',controller.user.sendPhoneCode);
  router.post('/v1/user/register',controller.user.register);
  router.post('/v1/user/login',controller.user.login);
  router.post('/v1/user/logout',controller.user.logout);
  //focus
  router.get('/v1/focus',controller.focus.list);
  router.get('/v1/goodsCate',controller.goodsCate.list);
  router.get('/v1/goods',controller.goods.list);
  router.get('/v1/goods/detail',controller.goods.detail);
};

