'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

// const jwt=require('egg-jwt');
// const authMiddleware=require('./middleware/auth');

module.exports = app => {
  const { router, controller } = app;
  
  router.get('/v1', controller.user.index);
  router.post('/v1/user/sendPhoneCode',controller.user.sendPhoneCode);
  router.post('/v1/user/register',controller.user.register);
  router.post('/v1/user/login',controller.user.login);
  router.post('/v1/user/logout',controller.user.logout);
  router.get('/v1/user/hello',controller.user.hello);
};
