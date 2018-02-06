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

module.exports = {
    getAll:getAll,
    getProitems:getProitems
}
