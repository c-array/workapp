const productItemService = require('../services/produc-item');

const getAll = async (req, res, next) => {
    let data = await productItemService.getAll();
    res.send(data);
};

const getProitems = async (req, res, next) => {
    let data = await productItemService.getProitems(req.params.type);
    res.send(data);
};

const getItem = async (req, res, next) => {
    let data = await productItemService.getItem(req.params.id);
    res.send(data);
};

const create = async (req, res, next) => {
    let data = await productItemService.create(req.body);
    res.send(data);
}

const update = async (req, res, next) => {
    let data = await productItemService.update(req.params.id,req.body);
    res.send(data);
};

const search = async (req, res, nex) => {
    let data = await productItemService.search(req.params.type,req.params.prName);
    res.send(data);
}

const remove = async (req, res, nex) => {
    let data = await productItemService.remove(req.params.id);
    res.send(data);
}

module.exports = {
    'GET /proitems': getAll, //获取所有数据
    'GET /proitems/type/:type': getProitems, //获取产品或项目数据
    'GET /proitems/:id': getItem, //获取单个产品或项目数据
    'POST /proitems':create, //添加一条产品或项目信息
    'PUT /proitems/:id': update, //更新单个产品或项目数据
    'DELETE /remove/:id': remove, //删除单个产品或项目数据
    'GET /proitems/search/:type/:prName': search, //模糊搜索产品和项目
};