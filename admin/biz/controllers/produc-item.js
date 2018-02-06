const productItemService = require('../services/produc-item');

const getAll = async (req, res, next) => {
    let data = await productItemService.getAll();
    res.send(data);
};

const getProitems = async (req, res, next) => {
    let data = await productItemService.getProitems(req.params.type);
    res.send(data);
};

module.exports = {
    'GET /proitems': getAll, //获取所有数据
    'GET /proitems/:type': getProitems, //获取产品或项目数据
    
    /* 'GET /dailys/:id': getItem, //获取单个数据
    'PUT /dailys/:id': update, //更新数据 */
};