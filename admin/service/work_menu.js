/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workMenu = db.workMenu;

router.get('/work/menus', async (req, res, next) => {
    try {
        let menu1 = await workMenu.all({where:{level:1}});
        var data = [];
        for(var i = 0; i < menu1.length; i++){
            let item = JSON.parse(JSON.stringify(menu1[i]));
            item.second = await workMenu.all({where:{parentId:item.id}});
            data.push(item);
        }
        if (data && data.length > 0) {
            res.send({
                status: 0,
                message: '成功！',
                result: data
            });
        } else {
            res.send({
                status: 1,
                message: '失败！',
                result: ''
            });
        }
    } catch (err) {
        console.log(err);
        res.send({
            status: 1,
            message: '失败！',
            result: ''
        });
    }
});

module.exports = router;