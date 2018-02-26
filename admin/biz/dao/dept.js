var db = require('../../config/db');
var workDepartment = db.workDepartment;

const getAll = async _ => {
    let data = await workDepartment.all();
    return data;
}

const getItem = async id => {
    let data = await workDepartment.find({where:{id:id}});
    return data;
}

module.exports = {
    getAll: getAll, //获取所有部门数据
    getItem: getItem, //根据id获取单个部门数据
};