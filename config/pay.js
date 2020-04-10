/*
 * @Date: 2020-02-04 22:43:00
 * @LastEditors  : wangbingqi
 * @LastEditTime : 2020-02-05 10:53:02
 */


const wxpayConf = {
//红转纺
    appid: 'wx3ca875a07dae8a2e',
    mchid: '1527353211',
    partnerKey: 'simplesimplesimplesimplesimple22',
    // pfx: require('fs').readFileSync('证书文件路径'),
    notify_url: 'https://www.mengtaiqi.wang/v1/pay/callback',//支付的回掉
    refund_url: 'https://www.mengtaiqi.wang/v1/pay/callback',

};

module.exports = {
    wxpayConf: wxpayConf
}