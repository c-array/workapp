const deptService = require('../services/dept');

const getAll = async (req,res,next) => {
    let data = await deptService.getAll();
    res.send(data);
}

const getItem = async (req,res,next) => {
    let data = await deptService.getItem(req.params.id);
    res.send(data);
}

const create = async (req, res, next) => {
    let data = await deptService.create(req.body);
    res.send(data);
}

const update = async (req, res, next) => {
    let data = await deptService.update(req.params.id,req.body);
    res.send(data);
}

const remove = async (req, res, next) => {
    let data = await deptService.remove(req.params.id);
    res.send(data);
}



module.exports = {
    'GET /depts': getAll, //获取所有部门数据
    'GET /depts/:id': getItem, //根据id获取单个部门数据
    'POST /depts':create, //添加一条部门信息
    'PUT /depts/:id': update, //更新单个部门信息
    'DELETE /depts/:id': remove, //删除单个部门信息
};

