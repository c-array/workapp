var db = require('../../config/db');
var workProductProject = db.workProductProject;

const getAll = async _ => {
    try{
        let data = await workProductProject.all({order:"type"});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const getProitems = async type => {
    try{
        let data = await workProductProject.all({where:{type:type},order:"type"});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const getItem = async id => {
    try{
        let data = await workProductProject.find({where:{id:id},order:"type"});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const create = async param => {
    try{
        let data = await workProductProject.create(param);
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const update = async (id,param) => {
    try{
        let data = await workProductProject.update(param,{where:{id:id}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const remove = async id => {
    try{
        let data = await workProductProject.destroy({where:{id:id}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const search = async where => {
    try{
        let data = await workProductProject.all({where:where,order:"type"});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

module.exports = {
    getAll, //获取所有数据
    getProitems, //获取产品或项目数据
    getItem, //获取单个产品或项目数据
    create, //添加一条产品或项目信息
    update, //更新单个产品或项目数据
    remove, //删除单个产品或项目数据
    search, //模糊搜索产品和项目
}
