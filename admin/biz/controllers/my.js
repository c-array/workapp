const myService = require('../services/my');

const getWork = async (req,res,next) => {
    let data = await myService.getWork(req.body);
    res.send(data);
}

const getItem = async (req,res,next) => {
    let data = await myService.getItem(req.body);
    res.send(data);
}

module.exports = {
    'POST /my/work': getWork, //获取我的工作数据
    'POST /my/item': getItem, //获取我参与的产品或项目数据
};