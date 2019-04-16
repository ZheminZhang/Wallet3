var http = require("http");

function httpRequrest(postData, cb) {
  // var postData = {
  //   a: 123,
  //   time: new Date().getTime()
  // }; //这是需要提交的数据

  var content = JSON.stringify(postData);

  var options = {
    hostname: "192.168.0.104",
    //hostname: "120.78.72.237",
    port: 3000,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  };

  var req = http.request(options, function(res) {
    var data = "";
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));
    //res.setEncoding("utf8");
    res.on("data", function(chunk) {
      data += chunk;
    });
    res.on("end", function() {
      try {
        var response = JSON.parse(data);
        cb(response);
      } catch (err) {
        //alert(err);
      }
    });
  });

  req.on("error", function(e) {
    alert("problem with request: " + e.message);
  });

  // write data to request body
  req.write(content);

  req.end();
}

module.exports = httpRequrest;
