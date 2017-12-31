/**
 * Created by Administrator on 2017/11/3 0003.
 */
var express = require('express');
var async = require('async');
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

//查询任务列表
router.post('/work/statistics',function (req,res,next) {
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
                    result:results/*{
                        startDate:startDate,
                        endDate:endDate,
                        day:getValue(results[0],'createDate','usedTime',1),
                        product:getValue(results[1],'prName','usedTime',2),
                        project:getValue(results[2],'prName','usedTime',2)
                    }*/
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