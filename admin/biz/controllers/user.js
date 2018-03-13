let userService = require('../services/user');

let getAll = async (req,res,next) => {
    let data = await userService.getAll();
    res.send(data);
}

let assignRole = async (req,res,next) => {
    let data = await userService.assignRole(req.body);
    res.send(data);
}

let getItem = async (req,res,next) => {
    let data = await userService.getItem(req.params.id);
    res.send(data);
}

const create = async (req, res, next) => {
    let data = await userService.create(req.body);
    res.send(data);
}

const update = async (req, res, next) => {
    let data = await userService.update(req.params.id,req.body);
    res.send(data);
};

const remove = async (req, res, next) => {
    let data = await userService.remove(req.params.id);
    res.send(data);
};

const search = async (req, res, next) => {
    let data = await userService.search(req.body);
    res.send(data);
}


module.exports = {
    'GET /users': getAll, //获取所有用户信息
    'GET /users/:id': getItem, //获取单个用户信息
    'POST /users':create, //添加一条用户信息
    'PUT /users/:id': update, //更新单个用户信息
    'DELETE /users/:id': remove, //删除单个用户信息
    'POST /users/role': assignRole, //分配角色
    'POST /users/search': search //根据搜索条件查询用户信息
};