const myService = require('../services/my');

//查询所有的工作
const getWork = async (req,res,next) => { 
    let data = await myService.getWork(req.body);
    res.send(data);
}

//查询每天的工作
const getWorkDay = async (req,res,next) => { 
    let data = await myService.getWorkDay(req.body);
    res.send(data);
}

const getItem = async (req,res,next) => {
    let data = await myService.getItem(req.body);
    res.send(data);
}

const upload = async (req,res,next) => {
    let data = await myService.upload(req.body);
    res.send(data);
}


module.exports = {
    'POST /my/work': getWork, //获取我的工作数据
    'POST /my/workDay': getWorkDay, //获取每天的工作数据
    'POST /my/item': getItem, //获取我参与的产品或项目数据
    'POST /my/upload': upload, //上传图像
};