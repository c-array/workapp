/**
 * Created by Administrator on 2017/11/6.
 */
var express = require('express');
var router = express.Router();
var formatDate = require('../config/formatDate');
var db = require('../config/config');
var workDepartment = db.workDepartment;

//查询部门列表
router.get('/work/departments',function(req,res,next){
    workDepartment.all().then(function(data){
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
    }).catch(function(err){
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    });
});

//根据id查询单个部门
router.get('/work/deptItem',async(req,res,next) => {
    var deptId = req.query.deptId;
    if(!deptId){
        res.send({
            status:1,
            message:'部门id不能为空！',
            result:''
        });
        return false;
    }
    try{
        let data = await workDepartment.findOne({where:{id:deptId}});
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

//添加部门
router.post('/work/addDept',async(req,res,next) => {
    var param = req.body;
    param.createTime = formatDate();
    try{
        let data = await workDepartment.create(param);
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

//修改部门
router.post('/work/updateDept',async(req,res,next) => {
    var param = req.body;
    try{
        let data = await workDepartment.update(param,{where:{id:param.id}});
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

//删除部门
router.get('/work/deleteDept',async (req,res,next) => {
    var id = req.query.id;
    if(!id){
        res.send({
            status:1,
            message:'删除失败,部门id不能为空！',
            result:''
        });
        return false;
    }
    try{
        let data = await workDepartment.destroy({where:{id:id}});
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