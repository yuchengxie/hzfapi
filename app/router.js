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
  router.post('/v1/user', controller.user.index);
  router.post('/v1/user/bind', controller.user.bind);
  router.post('/v1/user/unbind', controller.user.unbind);
  router.post('/v1/user/sendPhoneCode',controller.user.sendPhoneCode);
  router.post('/v1/user/register',controller.user.register);
  router.post('/v1/user/login',controller.user.login);

  //行情
  router.get('/v1/market/index', controller.app.market.index);
  router.post('/v1/market/bk', controller.app.market.bk);

  // router.get('/v1',controller.user.index);
  // router.post('/v1/login', controller.app.login.login);
  // router.post('/v1/user/register', controller.app.login.register);
  // router.post('/v1/user/register', controller.app.user.register);
  // router.post('/v1/user/login', controller.app.login.login);
  // router.post('/v1/user/sendPhoneCode',controller.app.user.sendPhoneCode);

  router.get('/v1/home', controller.home.index);
  router.get('/v1/goods', controller.goods.index);
  router.get('/v1/goods/info', controller.goods.info);
  router.get('/v1/goods/goodsCate', controller.goods.goodsCate);
  router.get('/v1/goods/cate', controller.goods.cate);
  //购物车订单
  router.post('/v1/goods/addCart', controller.goods.addCart);
  router.post('/v1/goods/cart', controller.goods.cart);
  router.get('/v1/goods/cart/del', controller.default.base.delete);
  router.post('/v1/goods/cart/delMany', controller.goods.cartDelMany);
  router.post('/v1/address', controller.address.address);
  router.post('/v1/address/add', controller.address.add);
  router.post('/v1/address/edit', controller.address.edit);
  router.post('/v1/orders/add', controller.orders.add);
  router.post('/v1/orders', controller.orders.index);
  router.post('/v1/orders/confirm', controller.orders.confirm);
  router.post('/v1/orders/change', controller.orders.change);
  //微信支付
  router.post('/v1/order/wxpay', controller.pay.wxpay);
  //支付回掉
  router.post('/v1/pay/callback',controller.pay.callback);
  router.post('/v1/collect',controller.collect.index);
  router.post('/v1/collect/delId', controller.collect.delId);
  router.post('/v1/collect/delGood', controller.collect.delGood);
  router.post('/v1/collect/add', controller.collect.add);
  router.post('/v1/collect/search', controller.collect.search);
  router.post('/v1/account/add', controller.account.add);       
  router.post('/v1/account/index', controller.account.index);
  router.post('/v1/account/reduce', controller.account.reduce);
  router.post('/v1/transaction/add', controller.transaction.add);
  router.post('/v1/transaction/index', controller.transaction.index);
  router.post('/v1/trace/add', controller.trace.add);
  router.post('/v1/trace/index', controller.trace.index);
  //卖出
  router.post('/v1/sell/add', controller.sell.add);
  router.post('/v1/sell/reduce', controller.sell.reduce);
  router.post('/v1/sell/index', controller.sell.index);
  router.post('/v1/sell/cancel', controller.sell.cancel);
  router.post('/v1/sell/good', controller.sell.good);
  router.post('/v1/query/trace', controller.query.trace);
};

