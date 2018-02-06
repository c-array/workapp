var db = require('../../config/db');
var workDaily = db.workDaily;
var workSubtask = db.workSubtask;
var workProductProject = db.workProductProject;

const getAll = async param => {
    try{
        let data = await workDaily.all({
            where:{
                userId:param.userId,
                createDate:param.createDate
            }
        })
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const getItem = async id => {
    try{
        let data = await workDaily.find({
            where:{
                id:id
            }
        })
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const create = async param => {
    try{
        let data = await workDaily.create(param);
        return data;
    }catch(err){
        console.log(err);
        return "";
    }

}

const update = async (id,param) => {
    try{
        let data = await workDaily.update(param,{
            where:{
                id:id
            }
        })
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const remove = async id => {
    try{
        let data = await workDaily.destroy({where:{id:id}});
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

module.exports = {
    getAll:getAll,
    getItem:getItem,
    create:create,
    update:update,
    remove:remove
}