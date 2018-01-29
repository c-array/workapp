/**
 * Created by caoqimin on 2017/6/23.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var formatDate = require('../config/formatDate');
var workProductProject = db.workProductProject;

//获取产品或项目列表
router.get('/work/proitems',async (req,res,next) => {
    var type = req.query.type;
    var where = {
        status:1
    };
    if(type){
        where.type = type;
    }
    try{
        let data = await workProductProject.all({where:where,order:"type"});
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
    }catch(err){
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    }
});

//根据id查询单个产品 || 项目
router.get('/work/proitem',async(req,res,next) => {
    var proitemId = req.query.proitemId;
    if(!proitemId){
        res.send({
            status:1,
            message:'id不能为空！',
            result:''
        });
        return false;
    }
    try{
        let data = await workProductProject.findOne({where:{id:proitemId}});
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

//根据条件搜索
router.post('/work/proitemSearch',async (req,res,next) => {
    var param = req.body;
    var where = {};
    for (const key in param) {
        if(param[key]){
            if(key == "prName"){
                where[key] = {
                    $like: '%'+ param[key] +'%'
                };
            }else{
                where[key] = param[key];
            }
        }
    }
    try{
        let data = await workProductProject.all({where:where,order:"type"});
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

//添加产品 || 项目
router.post('/work/addProitem',async(req,res,next) => {
    var param = req.body;
    param.createTime = formatDate();
    param.status = 1;
    try{
        let data = await workProductProject.create(param);
        if (data){
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
            message:'失败！',
            result:''
        });
    }
});

//修改产品 || 项目
router.post('/work/updateProitem',async(req,res,next) => {
    var param = req.body;
    try{
        let data = await workProductProject.update(param,{where:{id:param.id}});
        if(data[0] > 0){
            res.send({
                status:0,
                message:'修改成功！',
                result:""
            });
        }else{
            res.send({
                status:0,
                message:'修改失败！',
                result:''
            });
        }
    }catch(err){
        console.log(err);
        res.send({
            status:1,
            message:'失败！',
            result:''
        });
    }
})

//删除产品 || 项目
router.get('/work/deleteProitem',async (req,res,next) => {
    var id = req.query.id;
    if(!id){
        res.send({
            status:1,
            message:'删除失败,产品或项目id不能为空！',
            result:''
        });
        return false;
    }
    try{
        let data = await workProductProject.destroy({where:{id:id}});
        if(data > 0){
            res.send({
                status:0,
                message:'删除成功！',
                result:""
            });
        }else{
            res.send({
                status:1,
                message:'删除失败！',
                result:''
            });
        }
    }catch(err){
        console.log(err);
        res.send({
            status:1,
            message:'删除失败！',
            result:''
        });
    }
});
module.exports = router;