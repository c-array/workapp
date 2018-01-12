/**
 * Created by Administrator on 2017/11/3 0003.
 */
var express = require('express');
var async = require('async');
var sequelize = require('sequelize');
var router = express.Router();
var db = require('../config/config');
var formatDate = require('../config/formatDate');
var workAdmin = db.workAdmin;
var workDaily = db.workDaily;
var workSubtask = db.workSubtask;
var workProductProject = db.workProductProject;
var workDepartment = db.workDepartment

function fillIn(value){
    if(value < 10){
        return "0" + value;
    }else{
        return value;
    }
}

//我和同事
router.post('/work/statsMyColleague',function(req,res,next){
    var param = req.body;
    var where = {
        userId:param.userId,
    }
    if(param.startDate && param.endDate){ //开始时间和结束时间都存在
        var startTime = formatDate({
            type:'time',
            date:param.startDate
        })
        var endTime = formatDate({
            type:'time',
            date:param.endDate
        })

        if(startTime < endTime){ //开始时间小于结束时间
            where.createDate = { 
                $gte: param.startDate,
                $lte:param.endDate
            };
        }else{
            res.send({
                status:1,
                message:'开始时间不能大于结束时间',
                result:''
            });
            return false;
        }
    }else if(param.startDate && !param.endDate){ //开始时间有，结束时间没有
        where.createDate = { 
            $gte: param.startDate
        };
    }else if(param.endDate && !param.startDate){ //开始时间没有，结束时间有
        where.createDate = { 
            $lte:param.endDate
        };
    }else{
        res.send({
            status:1,
            message:'时间不能为空',
            result:''
        });
        return false;
    }
    async.series([
        function (callback) {
            workDaily.all({
                where:where,
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
                    'createDate'
                ],
                group:'createDate',
                order:[
                    ['createDate','ASC']
                ]
            }).then(function (data) {
                callback(null,data);
            }).catch(function (err) {
                console.log(err);
                callback(err,'每天');
            })
        },
        function (callback) {
            workDaily.all({ //产品投入时间
                where:where,
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
                    'createDate'
                ],
                group:'prName',
                order:[
                    ['createDate','ASC']
                ],
                include:[{
                    model:workProductProject,
                    where:{
                        $or: [
                            { type: [1,2] }
                        ]
                    },
                    attributes: ['prName','type']
                }]
            }).then(function (data) {
                callback(null,data);
            }).catch(function (err) {
                console.log(err);
                callback(err,'产品');
            })
        },
        function (callback) {
            if(where.type){
                delete where.type;
            }
            workDaily.all({ //产品、项目、其他投入时间
                where:where,
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
                    'createDate',
                    'type'
                ],
                group:'type',
            }).then(function (result) {
                var data = [];
                result.forEach(function (item) {
                    if(item.type == 1){ //产品
                        data.push({
                            name:'产品',
                            usedTime:item.usedTime
                        })
                    }else if(item.type == 2){ //项目
                        data.push({
                            name:'项目',
                            usedTime:item.usedTime
                        })
                    }else if(item.type == 3){ //其它
                        data.push({
                            name:'其它',
                            usedTime:item.usedTime
                        })
                    }
                });
                callback(null,data);
            }).catch(function (err) {
                callback(err,'其他');
            })
        }
    ],function (err, results) {
        if (!err){
            res.send({
                status:0,
                message:'成功',
                result:results
            });
        }else{
            console.log(err);
            res.send({
                status:1,
                message:'失败！',
                result:''
            });
        }
    })
})

//部门
router.post('/work/statsDepartment',function(req,res,next){
    var param = req.body;
    var where = {
        id:param.departmentId
    }
    if(param.startDate && param.endDate){ //开始时间和结束时间都存在
        var startTime = formatDate({
            type:'time',
            date:param.startDate
        })
        var endTime = formatDate({
            type:'time',
            date:param.endDate
        })

        if(startTime < endTime){ //开始时间小于结束时间
            where.createDate = { 
                $gte: param.startDate,
                $lte:param.endDate
            };
        }else{
            res.send({
                status:1,
                message:'开始时间不能大于结束时间',
                result:''
            });
            return false;
        }
    }else if(param.startDate && !param.endDate){ //开始时间有，结束时间没有
        where.createDate = { 
            $gte: param.startDate
        };
    }else if(param.endDate && !param.startDate){ //开始时间没有，结束时间有
        where.createDate = { 
            $lte:param.endDate
        };
    }else{
        res.send({
            status:1,
            message:'时间不能为空',
            result:''
        });
        return false;
    }

    async.series([
        function (callback) {
            workDaily.all({
                where:{
                    createDate:where.createDate
                },
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
                    'createDate'
                ],
                group:'createDate',
                order:[
                    ['createDate','ASC']
                ],
                include:[
                    {
                        model:workAdmin,
                        include:{
                            model:workDepartment,
                            where:{
                                id:where.id
                            }
                        }
                    }
                ]
            }).then(function (data) {
                callback(null,data);
            }).catch(function (err) {
                console.log(err);
                callback(err,'人员总体投入时间');
            })
        },
        function(callback){
            workDaily.all({
                where:{
                    createDate:where.createDate
                },
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
                ],
                group:'realname',
                order:[
                    ['usedTime','ASC']
                ],
                include:[
                    {
                        model:workAdmin,
                        attributes:[
                            'realname'
                        ],
                        include:{
                            model:workDepartment,
                            attributes:[],
                            where:{
                                id:where.id
                            }
                        }
                    }
                ]
            }).then(function (data) {
                callback(null,data);
            }).catch(function (err) {
                console.log(err);
                callback(err,'每人投入时间');
            })
        },
        function(callback){
            workDaily.all({
                where:{
                    createDate:where.createDate
                },
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
                ],
                group:'prName',
                order:[
                    ['usedTime','ASC']
                ],
                include:[
                    {
                        model:workProductProject,
                        where:{
                            $or: [
                                { type: [1,2] }
                            ]
                        },
                        attributes: ['prName','type']
                    },
                    {
                        model:workAdmin,
                        attributes:[],
                        include:{
                            model:workDepartment,
                            attributes:[],
                            where:{
                                id:where.id
                            }
                        }
                    }
                ]
            }).then(function (data) {
                callback(null,data);
            }).catch(function (err) {
                console.log(err);
                callback(err,'每人投入时间');
            })
        },
        function(callback){
            workDaily.all({
                where:{
                    createDate:where.createDate
                },
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
                    'type'
                ],
                group:'type',
                order:[
                    ['type','ASC']
                ],
                include:[
                    {
                        model:workAdmin,
                        attributes:[],
                        include:{
                            model:workDepartment,
                            attributes:[],
                            where:{
                                id:where.id
                            }
                        }
                    }
                ]
            }).then(function (result) {
                var data = [];
                result.forEach(function (item) {
                    if(item.type == 1){ //产品
                        data.push({
                            name:'产品',
                            usedTime:item.usedTime
                        })
                    }else if(item.type == 2){ //项目
                        data.push({
                            name:'项目',
                            usedTime:item.usedTime
                        })
                    }else if(item.type == 3){ //其它
                        data.push({
                            name:'其它',
                            usedTime:item.usedTime
                        })
                    }
                });
                callback(null,data);
            }).catch(function (err) {
                console.log(err);
                callback(err,'每人投入时间');
            })
        }
    ],function (err, results) {
        if (!err){
            res.send({
                status:0,
                message:'成功',
                result:results
            });
        }else{
            console.log(err);
            res.send({
                status:1,
                message:'失败！',
                result:''
            });
        }
    })
})

//项目和产品
router.post('/work/statsItem',function (req,res,next) {
    var param = req.body;
    var dailyWhere = {};
    var itemWhere = {};
    if(param.itemId){ //有
        dailyWhere.itemId = param.itemId;
    }
    if(param.type){
        itemWhere.type = param.type;
    }
    workDaily.all({
        where:dailyWhere,
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
        ],
        group:'prName',
        order:[
            ['usedTime','ASC']
        ],
        include:{
            model:workProductProject,
            where:itemWhere,
            attributes: ['prName','type']
        }
    }).then(function (data) {
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'失败',
                result:''
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:''
        });
    })
});

//项目人月
router.post('/work/statsPeople',function (req,res,next) {
    var param = req.body;
    var where = {}
    var sql = 'SELECT pro.prName, wa.realname AS realname, SUM(usedTime) AS usedTime FROM work_product_project AS pro LEFT OUTER JOIN work_daily AS wd ON pro.id = wd.itemId LEFT OUTER JOIN work_admin AS wa ON wd.userId = wa.id ';
    if(param.type && param.itemId){
        where.type = param.type;
        sql += 'WHERE pro.type = ' + param.type + ' AND pro.id = ' + param.itemId;
    }else if(param.type){
        sql += 'WHERE pro.type = ' + param.type;
    }else if(param.itemId){
        sql += 'WHERE pro.id = ' + param.itemId;
    }
    sql += " GROUP BY pro.prName";

    db.sequelize.query(sql,{ type: sequelize.QueryTypes.SELECT}).then(function(data){
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'失败',
                result:''
            });
        }
    }).catch(function(err){
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:''
        });
    })

    /* workProductProject.all({
        where:where,
        attributes: ['id','prName','type'],
        group:'realname',
        include:{
            model:workDaily,
            attributes: [
                [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
            ],
            include:{
                model:workAdmin,
                attributes: ['realname']
            },
        }
    }).then(function (data) {
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'失败',
                result:''
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:''
        });
    }) */
});


function getValue(arr,key1,key2,type) {
    var tempArr = {
        xAxis:[],
        data:[]
    };
    for(var i = 0; i < arr.length; i++){
        if(type == 2){
            tempArr.xAxis.push(arr[i].work_product_project[key1]);
        }else{
            tempArr.xAxis.push(arr[i][key1]);
        }
        tempArr.data.push(arr[i][key2]);
    }
    return tempArr;
}

module.exports = router;