const loginService = require('../services/login');

const login = async (req, res, next) => {
    let data = await loginService.login(req.body);
    res.send(data);
};

module.exports = {
    'POST /login': login,
};