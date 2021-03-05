// 引入SQL模块
var sql = require('../tool/sql');
// 引入json模块
var json = require('../tool/json');
// 引入连接池
var pool = require('../tool/pool');

// 会议室
var room = {
    // 获取会议室列表(可通过roomName或者建筑楼过滤)
    list: function (req, res, next) {
        let sqlSelect = sql.roomSelect
        if (req.query.roomName) {
            sqlSelect += " where (roomName like '%" + req.query.roomName + "%')"
        }
        if (req.query.building){
            if(req.query.roomName){
                sqlSelect += " and building = " + req.query.building
            }else{
                sqlSelect += " where building = " + req.query.building
            }
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
    // 添加
    add: function (req, res, next) {
        var p = req.body;
        pool.getConnection(function (err, connection) {
            connection.query(sql.roomAdd, [p.roomName,p.roomNum,p.roomLocation,p.projector,p.display,p.whiteboard,p.blackboard,p.building], function (err, result) {
                json(res, err, null);
                connection.release();
            });
        }); 
    },   
    // 更新
    update: function (req, res, next) {
        var p = req.body;
        pool.getConnection(function (err, connection) {
            connection.query(sql.roomUpdate, [p.roomName,p.roomNum,p.roomLocation,p.projector,p.display,p.whiteboard,p.blackboard,p.building,p.id], function (err, result) {
                json(res, err, null);
                connection.release();
            });
        }); 
    }, 
    // 删除
    delete: function (req, res, next) {
        var param = req.body;
        pool.getConnection(function (err, connection) {
            connection.query(sql.roomDelete, param.id, function (err, result) {
                json(res, err, null);
                connection.release();
            });
        }); 
    },
};

module.exports = {
    room
}