const deptService = require('../services/dept');

const getAll = async (req,res,next) => {
    let data = await deptService.getAll();
    res.send(data);
}

const getItem = async (req,res,next) => {
    let data = await deptService.getItem(req.params.id);
    res.send(data);
}

module.exports = {
    'GET /depts': getAll, //获取所有部门数据
    'GET /depts/:id': getItem, //根据id获取单个部门数据
};

