/**
 * Created by Administrator on 2017/11/3 0003.
 */
var express = require('express');
var async = require('async');
var sequelize = require('sequelize');
var router = express.Router();
var db = require('../config/config');
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
    if(param.startDate || param.endDate){
        where.createDate = {};
        if(param.startDate){
            where.createDate.$gte = param.startDate;
        }
        if(param.endDate){
            where.createDate.$lte = param.endDate;
        }
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
            where.type = 1;
            workDaily.all({ //产品投入时间
                where:where,
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
                    'createDate'
                ],
                group:'prName',
                order:[
                    ['usedTime','ASC']
                ],
                include:[{
                    model:workProductProject,
                    attributes: ['prName']
                }]
            }).then(function (data) {
                callback(null,data);
            }).catch(function (err) {
                console.log(err);
                callback(err,'产品');
            })
        },
        function (callback) {
            where.type = 2;
            workDaily.all({ //项目投入时间
                where:where,
                attributes: [
                    'usedTime',
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
                    'createDate'
                ],
                group:'prName',
                order:[
                    ['usedTime','ASC']
                ],
                include:[{
                    model:workProductProject,
                    attributes: ['prName']
                }]
            }).then(function (data) {
                callback(null,data);
            }).catch(function (err) {
                callback(err,'项目');
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
    if(param.startDate || param.endDate){
        where.createDate = {};
        if(param.startDate){
            where.createDate.$gte = param.startDate;
        }
        if(param.endDate){
            where.createDate.$lte = param.endDate;
        }
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
                        attributes:[
                            'prName',
                            'type'
                        ], 
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
    var where = {}
    if(param.startDate || param.endDate){
        where.createDate = {};
        if(param.startDate){
            where.createDate.$gte = param.startDate;
        }
        if(param.endDate){
            where.createDate.$lte = param.endDate;
        }
    }
    workDaily.all({
        where:where,
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
            where:{
                $or: [
                    { type: [1,2] }
                ]
            },
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