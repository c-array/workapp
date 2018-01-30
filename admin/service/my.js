var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');
var db = require('../config/config');
var workAdmin = db.workAdmin;
var workDaily = db.workDaily;
var workProductProject = db.workProductProject;

//查询我的工作
router.post('/work/my-work',async (req,res,next) => {
    var param = req.body;
    if(!param.userId){
        res.send({
            status:1,
            message:'用户id不能为空！',
            result:''
        });
        return;
    }else if(param.currentPage === "" || param.currentPage === null){
        res.send({
            status:1,
            message:'页码不能为空！',
            result:''
        });
        return;
    }else if(param.pageSize === "" || param.pageSize === null){
        res.send({
            status:1,
            message:'页数不能为空！',
            result:''
        });
        return;
    }
    try{
        let data = await workDaily.all({
            where:{
                userId:param.userId
            },
            offset:param.currentPage * param.pageSize,
            limit: param.pageSize,
            attributes: ['taskName','usedTime','createDate','type'],
            order:[['createDate','DESC']],
            include:[
                {
                    model:workProductProject,
                    attributes: ['prName'],
                },
                {
                    model:workAdmin,
                    attributes: ['id','realname'],
                }
            ]
        })
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'失败！',
                result:''
            });
        }
    }catch(err){
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    }
});

//查询我参与的产品
router.post('/work/my-proitem',async (req,res,next) => {
    var param = req.body;
    if(!param.userId){
        res.send({
            status:1,
            message:'用户id不能为空！',
            result:''
        });
        return;
    }else if(param.currentPage === "" || param.currentPage === null){
        res.send({
            status:1,
            message:'页码不能为空！',
            result:''
        });
        return;
    }else if(param.pageSize === "" || param.pageSize === null){
        res.send({
            status:1,
            message:'页数不能为空！',
            result:''
        });
        return;
    }
    try{
        let data = await workDaily.all({ //产品投入时间
            where:{
                userId:param.userId
            },
            offset:param.currentPage * param.pageSize,
            limit: param.pageSize,
            attributes: [
                [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
            ],
            group:'prName',
            order:[
                ['createDate','DESC']
            ],
            include:[{
                model:workProductProject,
                where:{
                    type:param.type
                },
                attributes: ['id','prName']
            }]
        })
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'失败！',
                result:''
            });
        }
    }catch(err){
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    }
});

module.exports = router;