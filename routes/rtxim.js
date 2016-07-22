const express = require('express');
const router = express.Router();

const http = require('http');

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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('rtx im');
});

router.post('/', function(req, res, next) {
   let LogFile = log4js.getLogger('log_file');
   httpRtx(function (data) {
     LogFile.info(data)
   })
   LogFile.info(req.body)

   res.json(req.body)
});

module.exports = router;
