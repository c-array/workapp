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

let create = async param => {
    try{
        let data = await workRole.create(param);
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const update = async (roleId,param) => {
    try{
        let data = await workRole.update(param,{where:{id:roleId}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const remove = async roleId => {
    try{
        let data = await workRole.destroy({where:{id:roleId}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const saveAuthority = async param => {
    try{
        var arr = [];
        param.menus.forEach(function(menuId,key){
            arr.push({
                roleId:param.roleId,
                menuId:menuId
            })
        });
        let data = await workRoleMenu.destroy({where:{roleId:param.roleId}});
        let result = await workRoleMenu.bulkCreate(arr);
        return result;
    }catch(err){
        console.log(err);
        return "";
    }
}

module.exports = {
    getAll, //获取所有角色信息
    getItem, //获取单个角色数据
    create, //添加一条角色信息
    update, //更新单个角色信息
    remove, //删除单个角色信息
    saveAuthority, //角色分配权限
};