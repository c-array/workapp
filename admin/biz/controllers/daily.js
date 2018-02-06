const dailyService = require('../services/daily');

const getAll = async (req, res, next) => {
    let data = await dailyService.getAll(req.query);
    res.send(data);
};

const getItem = async (req, res, next) => {
    let data = await dailyService.getItem(req.params.id);
    res.send(data);
};

const create = async (req, res, next) => {
    let data = await dailyService.create(req.body);
    res.send(data);
}

const update = async (req, res, next) => {
    let data = await dailyService.update(req.params.id,req.body);
    res.send(data);
};

const remove = async (req, res, next) => {
    let data = await dailyService.remove(req.params.id);
    res.send(data);
}


module.exports = {
    'GET /dailys': getAll, //获取所有数据
    'GET /dailys/:id': getItem, //获取单个数据
    'POST /dailys':create, //添加一条数据
    'PUT /dailys/:id': update, //更新数据
    'DELETE /dailys/:id': remove, //更新数据
};