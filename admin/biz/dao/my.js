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

const getWorkDay = async param => {
    try{
        let data = await workDaily.all({
            where:{
                userId:param.userId
            },
            offset:param.currentPage * param.pageSize,
            limit: param.pageSize,
            attributes: ['createDate'],
            order:[['createDate','DESC']],
            group:"createDate"
        })
        data = JSON.parse(JSON.stringify(data));
        for(let i = 0;  i < data.length; i++){
            let item = data[i];
            let content = await workDaily.all({
                where:{
                    userId:param.userId,
                    createDate:item.createDate
                },
                attributes: ['taskName','usedTime','itemId','type','status']
            })
            content = JSON.parse(JSON.stringify(content));
            for(let k = 0; k < content.length; k++){
                let o = content[k];
                if(o.type == 1 || o.type == 2){
                    let productPorject = await workProductProject.find({
                        where:{
                            id:o.itemId
                        }
                    })
                    o.item = productPorject;
                }else{
                    o.item = "";
                }
            }
            item.second = content;
        }
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

const upload = async param => {
    let data = await workAdmin.update({
        pic:param.pic
    },{
        where:{
            id:param.id
        }
    })
    return data;
}

module.exports = {
    getWork, //获取我的工作数据
    getWorkDay, //获取每天的工作数据
    getItem, //获取我参与的产品或项目数据
    upload, //上传图像
};