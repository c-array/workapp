let roleDao = require('../dao/role');
let response = require('../../tools/response');

let getAll = async _ => {
    let data = await roleDao.getAll();
    return response(data,"查询");
}

const getItem = async roleId => {
    if(!roleId){
        return {
            status:1,
            message:'角色id不能为空！',
            result:''
        };
    }
    let data = await roleDao.getItem(roleId);
    return response(data,'查询角色信息');
}

module.exports = {
    getAll, //获取所有角色信息
    getItem,
};