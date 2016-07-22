const express = require('express');
const router = express.Router();

const http = require('http');

const querystring = require('querystring');

const log4js = require("log4js");
const log4js_config = require("../logConf.json");


log4js.configure(log4js_config);


function httpRtx(call){
   http.get("http://172.20.7.29:8012/SendIM.cgi?sender=robot&pwd=robot&receivers=Julian&msg=TestMess&sessionid=XXXX", function(ress) {
    call(ress.text);
  }).on('error', function(e) {
    call(e.message);   
  });
}

function httpRtxPost(user,message){
      var postData = querystring.stringify({
       'sender' : 'robot',
       'pwd' : 'robot',
       'receivers' : user,
       'msg' : message,
       'sessionid' : 'XXXX'
      });

      var options = {
        hostname: '172.20.7.29',
        port: 8012,
        path: '/SendIM.cgi',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };


      var req = http.request(options, (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
          });
          res.on('end', () => {
            console.log('No more data in response.');
          });
        });

      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
      });

      // write data to request body
      req.write(postData);
      req.end();
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('rtx im');
});

router.post('/', function(req, res, next) {
   let LogFile = log4js.getLogger('log_file');

   let body =  req.body;
   let commits = body.commits;
  //  let author = commits.author;
  //  let name = author.name;
   let message = commits[0].message;
   let repository = body.repository;
   let url = repository.url;
   let users = 'julian';

 console.log(body)
 console.log(commits)
 console.log(message)
   httpRtxPost(users,'、【详情】、后台【运送方式管理】')
  //  httpRtx(function (data) {
  //    LogFile.info(data)
  //  })



   res.json({"ss":"ss"});
});

module.exports = router;
