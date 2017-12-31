/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
router.post('/work/menu',function (req,res,next) {
    var userId = req.body.userId;
    db.sequelize.query("SELECT DISTINCT a.username, a.id adminId, m.*, m.id menuId , r.type roleType " +
        "FROM work_admin a " +
        "LEFT JOIN work_admin_role ur ON a.id = ur.userId " +
        "LEFT JOIN work_role r ON ur.roleId = r.id " +
        "LEFT JOIN work_role_menu rm ON ur.roleId = rm.roleId " +
        "LEFT JOIN work_menu m ON rm.menuId = m.id " +
        "where m.`level`=1 AND a.id = " + userId + " ORDER BY m.`order`",{ type: db.sequelize.QueryTypes.SELECT }
    ).then(function (data) {
        if(data){
            data.forEach(function (item,key) {
               db.sequelize.query("SELECT DISTINCT m.*,rm.menuId" +
                   " FROM work_admin a " +
                   "LEFT JOIN work_admin_role ar ON ar.userId = a.id " +
                   "LEFT JOIN work_role r ON r.id = ar.roleId " +
                   "LEFT JOIN work_role_menu rm ON rm.roleId = r.id " +
                   "LEFT JOIN work_menu m ON rm.menuId = m.id " +
                   "WHERE m.parentId = " + item.id + " " +
                   "AND a.id = " + userId + " ORDER BY m.`order`",{ type: db.sequelize.QueryTypes.SELECT }
               ).then(function (result) {
                   if (result) {
                       item.second = result;
                   }
                   if(key == (data.length - 1)){
                       res.send({
                           status:0,
                           message:'成功',
                           result:data
                       });
                   }
               });
            });
        }else{
            res.send({
                status:1,
                message:'获取菜单数据失败！',
                result:''
            });
        }
    }).catch(function (err) {
        res.send({
            status:1,
            message:'失败',
            result:err
        });
        console.log(err);
    });
});

module.exports = router;