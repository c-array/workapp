var express = require('express');
var async = require('async');
var sequelize = require('sequelize');
var exportExcel = require('../config/excel');
var router = express.Router();
var db = require('../config/config');
var formatDate = require('../config/formatDate');
var workAdmin = db.workAdmin;
var workDaily = db.workDaily;
var workSubtask = db.workSubtask;
var workProductProject = db.workProductProject;
var workDepartment = db.workDepartment;

//我和同事
router.post('/work/exportMyColleague',function(req,res,next){
    var param = req.body;
    var where = {
        userId:param.userId,
    }
    var exportName = "";
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
        exportName = "同事统计" + param.startDate + "至" + param.endDate + "-" + param.username;
    }else if(param.startDate && !param.endDate){ //开始时间有，结束时间没有
        where.createDate = { 
            $gte: param.startDate
        };
        exportName = "同事统计" + param.startDate + "至" + formatDate({
            type:'yyyy-mm-dd',
        }) + "-" + param.username;
    }else if(param.endDate && !param.startDate){ //开始时间没有，结束时间有
        where.createDate = { 
            $lte:param.endDate
        };
        exportName = "同事统计2015-01-01至" + param.endDate + "-" + param.username;
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
            var exportData = [
                [exportName,null]
            ]
            exportData.push(['每天工作时间',null],[null,'日期','工作量（小时）']);
            results[0].forEach(function (item,key) {
                exportData.push([null,item.createDate,item.usedTime]);
            });

            exportData.push(['产品投入时间',null],[null,'产品名称','工作量（小时）']);
            results[1].forEach(function (item,key) {
                if(item.work_product_project.type == 1){
                    exportData.push([null,item.work_product_project.prName,item.usedTime]);
                }
            });

            exportData.push(['项目投入时间',null],[null,'项目名称','工作量（小时）']);
            results[1].forEach(function (item,key) {
                if(item.work_product_project.type == 2){
                    exportData.push([null,item.work_product_project.prName,item.usedTime]);
                }
            });

            exportData.push(['产品、项目、其它'],[null,'类型','工作量（小时）','比例']);
            var count = results[2][0].usedTime + results[2][1].usedTime + results[2][2].usedTime;
            results[2].forEach(function (item,key) {
                exportData.push([null,item.name,item.usedTime,(item.usedTime / count * 100).toFixed(2) + '%']);
            });

            //调用导出方法
            exportExcel({
                name:exportName,
                data:exportData
            },res); //调用导出方法

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
router.post('/work/exportDepartment',function(req,res,next){
    var param = req.body;
    var where = {
        id:param.departmentId
    }
    var exportName = "";
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
        exportName = param.startDate + "至" + param.endDate;
    }else if(param.startDate && !param.endDate){ //开始时间有，结束时间没有
        where.createDate = { 
            $gte: param.startDate
        };
        exportName = param.startDate + "至" + formatDate({
            type:'yyyy-mm-dd',
        });
    }else if(param.endDate && !param.startDate){ //开始时间没有，结束时间有
        where.createDate = { 
            $lte:param.endDate
        };
        exportName = "2015-01-01至" + param.endDate;
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
            var departmentName = "";
            var exportData = [];
            exportData.push(['人员总体投入时间',null],[null,'日期','工作量（小时）']);
            results[0].forEach(function (item,key) {
                if(!departmentName){
                    departmentName = item.work_admin.work_department.depName;
                }
                exportData.push([null,item.createDate,item.usedTime]);
            });

            exportData.push(['每人投入时间',null],[null,'人员名称','工作量（小时）']);
            results[1].forEach(function (item,key) {
                exportData.push([null,item.work_admin.realname,item.usedTime]);
            });

            exportData.push(['产品投入时间',null],[null,'产品名称','工作量（小时）']);
            results[2].forEach(function (item,key) {
                if(item.work_product_project.type == 1){
                    exportData.push([null,item.work_product_project.prName,item.usedTime]);
                }
            });

            exportData.push(['项目投入时间',null],[null,'项目名称','工作量（小时）']);
            results[2].forEach(function (item,key) {
                if(item.work_product_project.type == 2){
                    exportData.push([null,item.work_product_project.prName,item.usedTime]);
                }
            });

            exportData.push(['产品、项目、其它'],[null,'类型','工作量（小时）','比例']);
            var count = results[3][0].usedTime + results[3][1].usedTime + results[3][2].usedTime;
            results[3].forEach(function (item,key) {
                exportData.push([null,item.name,item.usedTime,(item.usedTime / count * 100).toFixed(2) + '%']);
            });

            exportData.unshift([departmentName + exportName,null]);

            //调用导出方法
            exportExcel({
                name:departmentName + exportName,
                data:exportData
            },res); //调用导出方法
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
router.post('/work/exportItem',function (req,res,next) {
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
            var exportData = [];
            exportData.push(['产品投入时间',null],[null,'产品名称','工作量（小时）']);
            data.forEach(function (item,key) {
                if(item.work_product_project.type == 1){
                    exportData.push([null,item.work_product_project.prName,item.usedTime]);
                }
            });

            exportData.push(['项目投入时间',null],[null,'项目名称','工作量（小时）']);
            data.forEach(function (item,key) {
                if(item.work_product_project.type == 2){
                    exportData.push([null,item.work_product_project.prName,item.usedTime]);
                }
            });
            //调用导出方法
            exportExcel({
                name:"产品项目统计",
                data:exportData
            },res); //调用导出方法
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

//导出项目人月
router.post('/work/exportPeople',function (req,res,next) {
    var param = req.body;
    var where = {}
    var sql = 'SELECT pro.id,pro.prName,pro.type FROM work_product_project pro';
    if(param.type && param.itemId){
        where.type = param.type;
        sql += ' WHERE pro.type = ' + param.type + ' AND pro.id = ' + param.itemId;
    }else if(param.type){
        sql += ' WHERE pro.type = ' + param.type;
    }else if(param.itemId){
        sql += ' WHERE pro.id = ' + param.itemId;
    }
    sql += ' ORDER BY pro.createTime DESC';
    db.sequelize.query(sql).spread(function(data, metadata){
        if(data){
            async.map(data,function(item,callback){
                db.sequelize.query("SELECT SUM(wd.usedTime) usedTime,wa.realname realname FROM work_daily wd LEFT JOIN work_admin wa ON wa.id = wd.userId WHERE wd.itemId = " + item.id + " GROUP BY wa.realname").spread(function(result,row){
                    item.dailies = result;
                    callback(null,item);
                })
            },function(err,results){
                if(!err){
                    var exportData = []
                    //处理产品用时数据
                    exportData.push([null,null,'产品/项目用时',null,null],[null,'产品/项目名称','参与人员','工作量（小时）','类型']);
                    var typeName = "";
                    results.forEach(function (item,key) {
                        typeName = item.type == 1 ? '产品' : '项目';
                        item.dailies.forEach(function(obj,index){
                            exportData.push([null,item.prName,obj.realname,obj.usedTime,typeName]);
                        })
                    });
                    //调用导出方法
                    exportExcel({
                        name:'统计分析-人月统计',
                        data:exportData
                    },res); //调用导出方法
                }else{
                    console.log(err);
                    res.send({
                        status:1,
                        message:'失败',
                        result:''
                    });
                }
            })
        }else{
            res.send({
                status:1,
                message:'失败',
                result:''
            });
        }
    })
});

module.exports = router;