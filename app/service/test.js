

function sendPhoneCode() {
  var url = "https://open.ucpaas.com/ol/sms/sendsms";
  var veri_code = Math.random()
    .toString()
    .slice(-6);
  console.log("veri_code:", veri_code);
  var now = Math.floor(new Date().getTime() / 1000);
  console.log("now:", now);
  var data = {
    sid: "aac207195095e22c1ab0b760586b8e6b",
    token: "e99ac6e5b321df91e5b899f41e34f2f5",
    appid: "f2bd928ea6b3462ead6b5de87ff1d487",
    templateid: "428112",
    param: veri_code,
    mobile: "18825239857",
    uid: now
  };
  var requestData = JSON.stringify(data);
  console.log("requestData:", requestData);
  request(
    {
      url: url,
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: requestData
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body); // 请求成功的处理逻辑
        return body;
      }
    }
  );
}
