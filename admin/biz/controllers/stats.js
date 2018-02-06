const statsService = require('../services/stats');

const getColleague = async (req, res, next) => {
    let data = statsService.getColleague(req.body);
    res.send(data);
}

const getDept = async (req, res, next) => {
    let data = statsService.getDept(req.body);
    res.send(data);
}

const getProduct = async (req, res, next) => {
    let data = statsService.getProduct(req.body);
    res.send(data);
}

const getProject = async (req, res, next) => {
    let data = statsService.getProject(req.body);
    res.send(data);
}

const getPeople = async (req, res, next) => {
    let data = statsService.getPeople(req.body);
    res.send(data);
}

module.exports = {
    'POST /stats/colleague': getColleague, //同事统计
    'POST /stats/dept': getDept, //部门统计
    'POST /stats/product':getProduct, //产品统计
    'POST /stats/project':getProject, //项目统计
    'POST /stats/people': getPeople, //人月
};
