let db = require('../../config/db');
let response = require('../../tools/response');
let workAdmin = db.workAdmin;
let workDepartment = db.workDepartment;
let workRole = db.workRole;
let workAdminRole = db.workAdminRole;

let getAll = async _ => {
    let data = await workAdmin.all({
        where:{
            $not:[
                { id: [1] },
                {username:['admin']}
            ]
        },
        order:[['createTime','DESC']],
        include:[
            {
                model:workDepartment,
                attributes: ['depName']
            },
            {
                model:workRole
            }
        ]
    });
    return data;
}

let assignRole = async (userId,arr) => {
    try{
        let data = await workAdminRole.destroy({where:{userId:userId}});
        let result = await workAdminRole.bulkCreate(arr);
        return result;
    }catch(err){
        console.log(err);
        return "";
    }
}

let getItem = async userId => {
    try{
        let data = workAdmin.findOne({where:{id:userId}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

let create = async param => {
    try{
        let data = await workAdmin.create(param);
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const update = async (userId,param) => {
    try{
        let data = await workAdmin.update(param,{
            where:{
                id:userId
            }
        })
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const remove = async userId => {
    try{
        let data = await workAdmin.destroy({where:{id:userId}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const search = async where => {
    try{
        let data = await workAdmin.all({
            where:where,
            include:[
                {
                    model:workDepartment,
                    attributes: ['depName']
                },
                {
                    model:workRole
                }
            ]
        })
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

module.exports = {
    getAll, //获取所有用户数据
    getItem, //获取单个用户数据
    create, //创建单个用户数据
    update, //更新单个用户数据
    remove, //删除单个用户数据
    assignRole, //分配角色
    search, //根据搜索条件查询用户信息
};