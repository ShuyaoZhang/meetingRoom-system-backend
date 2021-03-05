// 引入SQL模块
var sql = require('../tool/sql');
// 引入json模块
var json = require('../tool/json');
// 引入连接池
var pool = require('../tool/pool');

// 会议
var meeting = {
    // 获取预订列表(可通过会议日期或者建筑楼过滤)
    list: function (req, res, next) {
        let sqlSelect = sql.meetingSelect
        if (req.query.date) {
            sqlSelect += " and meetingDate = '" + req.query.date + "'"
        }
        if (req.query.building) {
            sqlSelect += " and building = " + req.query.building
        }  
        if (req.query.status) {
            sqlSelect += " and approveResult = " + req.query.status
        }       
        let index = (req.query.page - 1) * req.query.pageSize // 分页查询索引
        let userSelect = sqlSelect + " limit " + index + ',' + req.query.pageSize
        let count = 0 // 总数
        pool.getConnection(function (err, connection) {
            connection.query(sqlSelect, function (err, result) { // 获取总条数
                count = result.length
                connection.release();
                pool.getConnection(function (err, connection) {
                    connection.query(userSelect, function (err, result) { // 分页查询
                        let obj = {
                            list: result,
                            count: count
                        }
                        json(res, err, obj);
                        connection.release();
                    });
                });
            });
        });
    },
    // 通过id获取预订详情
    query: function (req, res, next) {
        let sqlSelect = sql.meetingSelect
        sqlSelect += " and meeting.id = " + req.query.id
        pool.getConnection(function (err, connection) {
            connection.query(sqlSelect, function (err, result) { // 分页查询
                json(res, err, result[0]);
                connection.release();
            });
        });
    },
    // 审批预订
    approve: function (req, res, next) {
        var p = req.body;
        pool.getConnection(function (err, connection) {
            connection.query(sql.meetingApprove,[p.approveResult,p.rejectReason,1,p.id], function (err, result) { // 分页查询
                json(res, err, null);
                connection.release();
            });
        });   
    }
}

module.exports = {
    meeting
}