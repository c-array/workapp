let db = require('../../config/db');
let workRole = db.workRole;
let workMenu = db.workMenu;
let workRoleMenu = db.workRoleMenu;

let getAll = async _ => {
    try{
        let data = await workRole.all({include:{model:workMenu,group:'name'}});
        return data;
    }catch(err){
        console.log(err);
    }
}

let getItem = async roleId => {
    try{
        let data = workRole.find({where:{id:roleId}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

module.exports = {
    getAll, //获取所有角色信息
    getItem, //获取单个角色数据
};