/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workMenu = db.workMenu;

router.get('/work/menus',async (req,res,next) => {
    try{
        let data = await workMenu.all();
        if(data){
            res.send({
                status:0,
                message:'成功！',
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

module.exports = router;