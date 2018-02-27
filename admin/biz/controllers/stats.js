const statsService = require('../services/stats');

const getColleague = async (req, res, next) => {
    let data = await statsService.getColleague(req.body);
    res.send(data);
}

const getDept = async (req, res, next) => {
    let data = await statsService.getDept(req.body);
    res.send(data);
}

const getProductItem = async (req, res, next) => {
    let data = await statsService.getProductItem(req.body);
    res.send(data);
}

const getPeople = async (req, res, next) => {
    let data = await statsService.getPeople(req.body);
    res.send(data);
}

module.exports = {
    'POST /stats/colleague': getColleague, //同事统计
    'POST /stats/dept': getDept, //部门统计
    'POST /stats/product-item':getProductItem, //产品/项目统计
    'POST /stats/people': getPeople, //人月
};
