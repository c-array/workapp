let menuDao = require('../dao/menu');
let response = require('../../tools/response');

let getAll = async _ => {
    let data = await menuDao.getAll();
    return response(data,"查询");
}

module.exports = {
    getAll, //获取所有菜单信息
};