const response = require('../../tools/response');
const deptDao = require('../dao/dept');

const getAll = async _ => {
    let data = await deptDao.getAll();
    return response(data,'查询');
}

const getItem = async id => {
    if(!id){
        return {
            status:1,
            message:"部门id不能为空！",
            result:""
        }
    }
    let data = await deptDao.getItem(id);
    return response(data,'查询');
}

module.exports = {
    getAll: getAll, //获取所有部门数据
    getItem: getItem, //根据id获取单个部门数据
};