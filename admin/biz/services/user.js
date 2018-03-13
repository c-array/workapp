const userDao = require('../dao/user');
const md5Encrypt = require('../../tools/md5Encrypt');
const formatDate = require('../../tools/formatDate');
const response = require('../../tools/response');

const getAll = async _ => {
    let data = await userDao.getAll();
    return response(data,'查询');
}

const assignRole = async param => {
    var arr = [];
    param.roles.forEach(function(roleId,key){
        arr.push({
            userId:param.userId,
            roleId:roleId
        })
    })
    let data = await userDao.assignRole(param.userId,arr);
    return response(data,'角色分配');
}

const getItem = async userId => {
    if(!userId){
        return {
            status:1,
            message:'用户id不能为空！',
            result:''
        };
    }
    let data = await userDao.getItem(userId);
    return response(data,'查询用户信息');
}

const create = async param => {
    if(!param.username){
        return {
            status:1,
            message:"用户名不能为空！",
            result:""
        }
    }else if(!param.realname){
        return {
            status:1,
            message:"真实姓名不能为空！",
            result:""
        }
    }else if(!param.departmentId){
        return {
            status:1,
            message:"部门id不能为空！",
            result:""
        }
    }else if(!param.post){
        return {
            status:1,
            message:"职位名称不能为空！",
            result:""
        }
    }else if(!param.email){
        return {
            status:1,
            message:"邮箱不能为空！",
            result:""
        }
    }
    param.password = md5Encrypt(param.username); //密码加密
    param.createTime = formatDate();
    let data = await userDao.create(param);
    return response(data,"添加");
}

const update = async (userId,param) => {
    if(!userId){
        return {
            status: 1,
            message: '用户id不能为空！',
            result: ''
        }
    }else if(!param.departmentId){
        return {
            status: 1,
            message: '部门id不能为空！',
            result: ''
        }
    }

    let data = await userDao.update(userId,param);
    return response(data,"修改");
}

const remove = async userId => {
    if(!userId){
        return {
            status: 1,
            message: 'id不能为空！',
            result: ''
        }
    }
    let data = await userDao.remove(userId);
    return response(data,"删除");
}

const search = async param => {
    var where = {};
    for (const key in param) {
        if(param[key]){
            if(key == "realname" || key == "post"){
                where[key] = {
                    $like: '%'+ param[key] +'%'
                };
            }else{
                where[key] = param[key];
            }
        }
    }
    let data = await userDao.search(where);
    return response(data,"查询");
}

module.exports = {
    getAll,  //获取所有用户数据
    getItem,  //获取单个用户信息
    create,  //获取单个用户信息
    update,  //更新单个用户信息
    remove,  //删除单个用户信息
    assignRole,  //分配角色
    search,  //根据搜索条件查询用户信息
};