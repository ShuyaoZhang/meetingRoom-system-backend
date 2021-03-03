/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
var mysql = require('mysql');
var mysqlconfig = require('../config/mysql');
var poolextend = require('./poolextend');
var sql = require('./sql');
var json = require('./json');
var pool = mysql.createPool(poolextend({}, mysqlconfig)); // 使用连接池，提升性能

// 落地页
var page = {
    get: function (req, res, next) {
        let sqlSelect = sql.pageSelect
        if (req.query.name) {
            sqlSelect += " where (name like '%" + req.query.name + "%' or title like '%" + req.query.name + "%')"
        }
        let index = (req.query.page - 1) * req.query.pageSize// 分页查询索引
        let pageSelect = sqlSelect + " limit " + index + ',' + req.query.pageSize
        let count = 0// 总数
        pool.getConnection(function (err, connection) {
            connection.query(sqlSelect, function (err, result) { // 获取总条数
                count = result.length
                connection.release();
                pool.getConnection(function (err, connection) {
                    connection.query(pageSelect, function (err, result) { // 分页查询
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
    find: function (req, res, next) {
        if (!req.query.id) {
            res.json({
                code: '0',
                msg: 'id不能为空！',
            });
            return
        }
        pool.getConnection(function (err, connection) {
            connection.query(sql.pageSelectById, req.query.id, function (err, result) {
                json(res, err, result[0] || null);
                connection.release();
            });
        });
    },
    findByKey: function (req, res, next) {
        if (!req.query.page_key) {
            res.json({
                code: '0',
                msg: 'page_key不能为空！',
            });
            return
        }
        pool.getConnection(function (err, connection) {
            connection.query(sql.pageSelectByKey, req.query.page_key, function (err, result) {
                json(res, err, result[0] || null);
                connection.release();
            });
        });
    },
    post: function (req, res, next) {
        var param = req.body;
        pool.getConnection(function (err, connection) {
            connection.query(sql.pageInsert, [param.page_key, param.name, param.title, param.apk_url,param.main_img, JSON.stringify(param.components), new Date(), new Date()], function (err, result) {
                json(res, err, null);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        var param = req.body;
        pool.getConnection(function (err, connection) {
            connection.query(sql.pageUpdate, [param.page_key, param.name, param.title, param.apk_url,param.main_img, JSON.stringify(param.components), new Date(), param.id], function (err, result) {
                json(res, err, null);
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        var param = req.body;
        pool.getConnection(function (err, connection) {
            connection.query(sql.pageDelete, param.id, function (err, result) {
                json(res, err, null);
                connection.release();
            });
        });
    },
}

// 上传图片
var file = {
    upload:function(req, res, next) {
        let url = `http://${req.headers.host}/images/${req.files[0].filename}`
        let addSqlParams = [req.files[0].filename,new Date()]
        pool.getConnection(function (err, connection) {
            connection.query(sql.upload, addSqlParams,function (err, result) { // 获取总条数
                let obj = {
                    path:url
                }
                json(res, err, obj);
                connection.release();
            });
        });
    }
}

module.exports = {
    page,
    file
};