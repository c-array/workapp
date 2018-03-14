var db = require('../../config/db');
var sequelize = require('sequelize');
var workAdmin = db.workAdmin;
var workDaily = db.workDaily;
var workProductProject = db.workProductProject;

const getWork = async param => {
    try{
        let data = await workDaily.all({
            where:{
                userId:param.userId
            },
            offset:param.currentPage * param.pageSize,
            limit: param.pageSize,
            attributes: ['taskName','usedTime','createDate','type'],
            order:[['createDate','DESC']],
            include:[
                {
                    model:workProductProject,
                    attributes: ['prName'],
                },
                {
                    model:workAdmin,
                    attributes: ['id','realname'],
                }
            ]
        })
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

const getItem = async param => {
    try{
        let data = await workDaily.all({ //产品投入时间
            where:{
                userId:param.userId
            },
            offset:param.currentPage * param.pageSize,
            limit: param.pageSize,
            attributes: [
                [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
            ],
            group:'prName',
            order:[
                ['createDate','DESC']
            ],
            include:[{
                model:workProductProject,
                where:{
                    type:param.type
                },
                attributes: ['id','prName']
            }]
        })
        return data;
    }catch(err){
        console.log(err);
        return "";
    }
}

module.exports = {
    getWork, //获取我的工作数据
    getItem, //获取我参与的产品或项目数据
};