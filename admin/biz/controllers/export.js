const exportService = require('../services/export');

const getColleague = async (req, res, next) => {
    let data = await exportService.getColleague(req.body);
    res.send(data);
}

const getDept = async (req, res, next) => {
    let data = await exportService.getDept(req.body);
    res.send(data);
}

const getProductItem = async (req, res, next) => {
    let data = await exportService.getProductItem(req.body);
    res.send(data);
}

const getPeople = async (req, res, next) => {
    let data = await exportService.getPeople(req.body);
    res.send(data);
}

module.exports = {
    'POST /export/colleague': getColleague, //同事统计
    'POST /export/getDept': getDept, //部门统计
    'POST /export/product-item':getProductItem, //产品/项目统计
    'POST /export/people': getPeople //人月
};
