let roleDao = require('../dao/role');
let response = require('../../tools/response');
const formatDate = require('../../tools/formatDate');

let getAll = async _ => {
    let data = await roleDao.getAll();
    return response(data,"查询");
}

let getItem = async roleId => {
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

const create = async param => {
    if(!param.roleName){
        return {
            status:1,
            message:"角色名不能为空！",
            result:""
        }
    }else if(!param.roleDescription){
        return {
            status:1,
            message:"角色描述不能为空！",
            result:""
        }
    }
    param.createTime = formatDate();
    let data = await roleDao.create(param);
    return response(data,"添加");
}

const update = async (roleId,param) => {
    if(!roleId){
        return {
            status: 1,
            message: '角色id不能为空！',
            result: ''
        }
    }else if(!param.roleName){
        return {
            status:1,
            message:"角色名不能为空！",
            result:""
        }
    }else if(!param.roleDescription){
        return {
            status:1,
            message:"角色描述不能为空！",
            result:""
        }
    }

    let data = await roleDao.update(roleId,param);
    return response(data,"修改");
}

const remove = async roleId => {
    if(!roleId){
        return {
            status: 1,
            message: 'id不能为空！',
            result: ''
        }
    }
    let data = await roleDao.remove(roleId);
    return response(data,"删除");
}

const saveAuthority = async param => {
    if(!param.roleId){
        return {
            status: 1,
            message: '保存权限失败,角色id不能为空！',
            result: ''
        }
    }
    let data = await roleDao.saveAuthority(param);
    return response(data,"分配权限");
}

module.exports = {
    getAll, //获取所有角色信息
    getItem, //获取单个角色信息
    create, //添加一条角色信息
    update, //更新单个角色信息
    remove, //删除单个角色信息
    saveAuthority, //角色分配权限
};