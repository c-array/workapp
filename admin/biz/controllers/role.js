let roleService = require('../services/role');

let getAll = async (req,res,next) => {
    let data = await roleService.getAll();
    res.send(data);
}

let getItem = async (req,res,next) => {
    let data = await roleService.getItem(req.params.id);
    res.send(data);
}

let create = async (req,res,next) => {
    let data = await roleService.create(req.body);
    res.send(data);
}

const update = async (req, res, next) => {
    let data = await roleService.update(req.params.id,req.body);
    res.send(data);
};

const remove = async (req, res, next) => {
    let data = await roleService.remove(req.params.id);
    res.send(data);
};

const saveAuthority = async (req, res, next) => {
    let data = await roleService.saveAuthority(req.body);
    res.send(data);
};

module.exports = {
    'GET /roles': getAll, //获取所有角色信息
    'GET /roles/:id': getItem, //获取单个角色信息
    'POST /roles':create, //添加一条角色信息
    'PUT /roles/:id': update, //更新单个角色信息
    'DELETE /roles/:id': remove, //删除单个角色信息
    'POST /roles/authority': saveAuthority, //角色分配权限
};