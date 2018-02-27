const exportService = require('../services/export');

const getColleague = async (req, res, next) => {
    let data = await exportService.getColleague(req.body);
    res.send(data);
}

module.exports = {
    'POST /export/colleague': getColleague //同事统计
};
