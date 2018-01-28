/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var formatDate = require('../config/formatDate');
var workRole = db.workRole;
var workMenu = db.workMenu;
var workRoleMenu = db.workRoleMenu;

//查询角色列表
router.get('/work/roles',async(req,res,next) => {
    try{
        let data = await workRole.all({include:{model:workMenu,group:'name'}});
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

//根据id查询单个角色
router.get('/work/roleItem',async(req,res,next) => {
    var roleId = req.query.roleId;
    if(!roleId){
        res.send({
            status:1,
            message:'角色id不能为空！',
            result:''
        });
        return false;
    }
    try{
        let data = await workRole.findOne({where:{id:roleId}});
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

//添加角色
router.post('/work/addRole',async(req,res,next) => {
    var param = req.body;
    param.createTime = formatDate();
    try{
        let data = await workRole.create(param);
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

//修改角色
router.post('/work/updateRole',async(req,res,next) => {
    var param = req.body;
    try{
        let data = await workRole.update(param,{where:{id:param.id}});
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

//删除角色
router.get('/work/deleteRole',async (req,res,next) => {
    var id = req.query.id;
    if(!id){
        res.send({
            status:1,
            message:'删除失败,角色id不能为空！',
            result:''
        });
        return false;
    }
    try{
        let data = await workRole.destroy({where:{id:id}});
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

//保存权限
router.post('/work/saveAuthority',async(req,res,next) => {
    var param = req.body;
    if(!param.roleId){
        res.send({
            status:1,
            message:'保存权限失败,角色id不能为空！',
            result:''
        });
        return false;
    }
    try{
        var arr = [];
        param.menus.forEach(function(menuId,key){
            arr.push({
                roleId:param.roleId,
                menuId:menuId
            })
        });
        workRoleMenu.destroy({where:{roleId:param.roleId}}).then(async data => {
            let result = await workRoleMenu.bulkCreate(arr);
            if(result){
                res.send({
                    status:0,
                    message:'分配权限成功',
                    result:result
                });
            }else{
                res.send({
                    status:1,
                    message:'保存权限',
                    result:""
                });
            }
        });
    }catch(err){
        console.log(err);
        res.send({
            status:1,
            message:'保存权限失败！',
            result:''
        });
    }
})

module.exports = router;