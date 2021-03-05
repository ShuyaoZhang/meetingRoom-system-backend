var express = require('express');
var router = express.Router();
var {
  meeting
} = require('../modules/meeting');


// 获取预订列表(可通过会议日期或者建筑楼过滤)
router.get('/list', function (req, res, next) {
  meeting.list(req, res, next);
});
// 通过id获取预订详情
router.get('/query', function (req, res, next) {
  meeting.query(req, res, next);
});
// 审批预订
router.post('/approve', function (req, res, next) {
  meeting.approve(req, res, next);
});


module.exports = router;
