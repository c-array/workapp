/**
 * Created by Administrator on 2017/11/3 0003.
 */
var express = require('express');
var async = require('async');
var sequelize = require('sequelize');
var router = express.Router();
var db = require('../config/config');
var workDaily = db.workDaily;
var workSubtask = db.workSubtask;
var workProductProject = db.workProductProject;

function fillIn(value){
    if(value < 10){
        return "0" + value;
    }else{
        return value;
    }
}

//我和同事-每天投入时间
router.post('/work/statsDay',function(req,res,next){
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

//产品投入时间
router.post('/work/statspm',function(req,res,next){
    var param = req.body;
    var where = {
        userId:param.userId,
        type:1
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
})

//查询任务列表
/* router.post('/work/statistics',function (req,res,next) {
    var param = req.body;
    var d = new Date(param.createDate);
    var startDate = param.createDate;
    var endDate = d.getFullYear() + '-' + (fillIn(d.getMonth() + 2));
    if(param.type == 1){ //统计个人
        async.series([
            function (callback) {
                workDaily.all({ //每天投入时间
                    where:{
                        userId:param.userId,
                        createDate:{
                            $gte:startDate,
                            $lt:endDate
                        }
                    },
                    attributes: ['usedTime', 'createDate']
                }).then(function (data) {
                    callback(null,data);
                }).catch(function (err) {
                    callback(err,'每天');
                })
            },
            function (callback) {
                workDaily.all({ //产品投入时间
                    where:{
                        userId:param.userId,
                        type:1,
                        createDate:{
                            $gte:startDate,
                            $lt:endDate
                        }
                    },
                    //attributes: ['sum',[sequelize.fn('SUM',sequelize.col('usedTime')),'sum']],
                    include:[{
                        model:workProductProject,
                        attributes: ['prName']
                    }]
                }).then(function (data) {
                    callback(null,data);
                }).catch(function (err) {
                    callback(err,'产品');
                })
            },
            function (callback) {
                workDaily.all({ //产品投入时间
                    where:{
                        userId:param.userId,
                        type:2,
                        createDate:{
                            $gte:startDate,
                            $lt:endDate
                        }
                    },
                    attributes: ['usedTime'],
                    include:[{
                        model:workProductProject,
                        attributes: ['prName']
                    }]
                }).then(function (data) {
                    callback(null,data);
                }).catch(function (err) {
                    callback(err,'项目');
                })
            }
        ],function (err, results) {
            console.log(results[1]);
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
    }else if(param.type == 2){ //统计部门

    }else if(param.type == 3){ //统计产品或项目

    }
});  */


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