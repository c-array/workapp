/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var md5Encrypt = require('../config/md5Encrypt');
var formatDate = require('../config/formatDate');
var workAdmin = db.workAdmin;
var workDepartment = db.workDepartment;
var workAdminRole = db.workAdminRole;
var workRole = db.workRole;

//登录
router.post('/work/login',async(req,res,next) => {
    var param = req.body;
        param.password = md5Encrypt(param.password); //密码加密
        let data = await workAdmin.find({where:{username:param.username,password:param.password}})
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'用户名或密码错误！',
                result:''
            });
        }
});

//查询用户列表
router.get('/work/users',function(req,res,next){
    workAdmin.all({
        where:{
            $not:[
                { id: [1] },
                {username:['admin']}
            ]
        },
        order:[['createTime','DESC']],
        include:[
            {
                model:workDepartment,
                attributes: ['depName']
            },
            {
                model:workRole
            }
        ]
    }).then(function(data){
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
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    });
});

//根据id查询单个用户
router.get('/work/userItem',function(req,res,next){
    var userId = req.query.userId;
    if(!userId){
        res.send({
            status:1,
            message:'用户id不能为空！',
            result:''
        });
        return false;
    }

    workAdmin.findOne({
        where:{
            id:userId
        }
    }).then(function(data){
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
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    });
});

//根据id查询单个用户
router.post('/work/userSearch',function(req,res,next){
    var param = req.body;
    var where = {};
    for (const key in param) {
        if(param[key] && param[key] != 0){
            if(key == "realname" || key == "post"){
                where[key] = {
                    $like: '%'+ param[key] +'%'
                };
            }else{
                where[key] = param[key];
            }
        }
    }
    workAdmin.all({
        where:where,
        include:[
            {
                model:workDepartment,
                attributes: ['depName']
            },
            {
                model:workRole
            }
        ]
    }).then(function(data){
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
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    });
});

//添加用户
router.post('/work/addUser',function (req,res,next) {
    var param = req.body;
    param.password = md5Encrypt(param.username); //密码加密
    param.createTime = formatDate();
    workAdmin.create(param).then(function (data) {
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
    }).catch(function (err) {
        console.log(err);
        res.send({
            status:1,
            message:'失败！',
            result:''
        });
    })
 });

 //修改用户
router.post('/work/updateUser',function(req,res,next){
    var param = req.body;
    workAdmin.update(param,{
        where:{
            id:param.id
        }
    }).then(function (affectedCount,affectedRows) {
        if(affectedCount[0] > 0){
            res.send({
                status:0,
                message:'修改成功！',
                result:affectedCount
            });
        }else{
            res.send({
                status:0,
                message:'修改失败！',
                result:''
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.send({
            status:1,
            message:'失败！',
            result:''
        });
    })
})

//删除用户
router.get('/work/deleteUser',function (req,res,next) {
    var id = req.query.id;
    workAdmin.destroy({
        where:{
            id:id
        }
    }).then(function (row) {
         if(row > 0){
             res.send({
                 status:0,
                 message:'删除成功！',
                 result:row
             });
         }else{
             res.send({
                 status:1,
                 message:'删除失败！',
                 result:''
             });
         }
    }).catch(function (err) {
        console.log(err);
        res.send({
            status:1,
            message:'删除失败！',
            result:''
        });
    })
 });


//给用户分配角色
router.post('/work/assignRole',function(req,res,next){
    var param = req.body;
    workAdminRole.destroy({
        where:{
            userId:param.userId
        }
    }).then(function(data){ //删除成功
        var arr = [];
        param.roles.forEach(function(roleId,key){
            arr.push({
                userId:param.userId,
                roleId:roleId
            })
        })
        workAdminRole.bulkCreate(arr).then(function(data){
            res.send({
                status:0,
                message:'分配角色成功',
                result:data
            });
        }).catch(function(err){
            console.log(err);
            res.send({
                status:1,
                message:'失败',
                result:err
            });
        })
    }).catch(function(err){
        console.log(err);
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    })
})


module.exports = router;