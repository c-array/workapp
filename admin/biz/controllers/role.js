let roleService = require('../services/role');

let getAll = async (req,res,next) => {
    let data = await roleService.getAll();
    res.send(data);
}

let getItem = async (req,res,next) => {
    let data = await roleService.getItem(req.params.id);
    res.send(data);
}

module.exports = {
    'GET /roles': getAll, //获取所有角色信息
    'GET /roles/:id': getItem, //获取单个角色信息
    /* 'POST /roles':create, //添加一条角色信息
    'PUT /roles/:id': update, //更新单个角色信息
    'DELETE /roles/:id': remove, //删除单个角色信息 */
};