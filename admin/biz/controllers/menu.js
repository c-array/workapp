let menuService = require('../services/menu');

let getAll = async (req,res,next) => {
    let data = await menuService.getAll();
    res.send(data);
}

module.exports = {
    'GET /menus': getAll, //获取所有角色信息
}