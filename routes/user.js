var express = require('express');
var router = express.Router();
var {
  user
} = require('../modules/user');

// 获取落地页列表(可通过name过滤)
router.get('/list', function (req, res, next) {
  user.get(req, res, next);
});

module.exports = router;
