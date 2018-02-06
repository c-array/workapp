var sequelize = require('sequelize');
var db = require('../../config/db');
var formatDate = require('../../tools/formatDate');
var workAdmin = db.workAdmin;
var workDaily = db.workDaily;
var workSubtask = db.workSubtask;
var workProductProject = db.workProductProject;
var workDepartment = db.workDepartment

const getColleague = async where => {
    let colleague = await workDaily.all({ //每天投入时间
        where:where,
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
            'createDate'
        ],
        group:'createDate',
        order:[
            ['createDate','ASC']
        ]
    })

    let product = await workDaily.all({ //产品投入时间
        where:where,
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
            'createDate'
        ],
        group:'prName',
        order:[
            ['createDate','ASC']
        ],
        include:[{
            model:workProductProject,
            where:{
                type:1
            },
            attributes: ['prName','type']
        }]
    })

    let project = await workDaily.all({ //项目投入时间
        where:where,
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
            'createDate'
        ],
        group:'prName',
        order:[
            ['createDate','ASC']
        ],
        include:[{
            model:workProductProject,
            where:{
                type:2
            },
            attributes: ['prName','type']
        }]
    })

    let other =  await workDaily.all({ //产品、项目、其他投入时间
        where:where,
        attributes: [
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
            'createDate',
            'type'
        ],
        group:'type',
    })

    return {
        colleague:colleague,
        product:product,
        project:project,
        other:other,
    };
}

const getDept = async param => {
    return "";
}

const getProduct = async param => {
    return "";
}

const getProject = async param => {
    return "";
}

const getPeople = async param => {
    return "";
}

module.exports = {
    getColleague: getColleague, //同事统计
    getDept: getDept, //部门统计
    getProduct:getProduct, //产品统计
    getProject:getProject, //项目统计
    getPeople: getPeople, //人月
};