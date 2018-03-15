var sequelize = require('sequelize');
var db = require('../../config/db');
var formatDate = require('../../tools/formatDate');
var workAdmin = db.workAdmin;
var workDaily = db.workDaily;
var workSubtask = db.workSubtask;
var workProductProject = db.workProductProject;
var workDepartment = db.workDepartment;

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

    var data = [];
    other.forEach(function (item) {
        if(item.type == 1){ //产品
            data.push({
                name:'产品',
                usedTime:item.usedTime
            })
        }else if(item.type == 2){ //项目
            data.push({
                name:'项目',
                usedTime:item.usedTime
            })
        }else if(item.type == 3){ //其它
            data.push({
                name:'其它',
                usedTime:item.usedTime
            })
        }
    });

    return {
        colleague:colleague,
        product:product,
        project:project,
        other:data,
    };
}

const getDept = async where => {
    //人员总体投入时间
    let personTotal = await workDaily.all({
        where:{
            createDate:where.createDate
        },
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
            'createDate'
        ],
        group:'createDate',
        order:[
            ['createDate','ASC']
        ],
        include:[
            {
                model:workAdmin,
                include:{
                    model:workDepartment,
                    where:{
                        id:where.id
                    }
                }
            }
        ]
    });

    //每人投入时间
    let personItem = await workDaily.all({
        where:{
            createDate:where.createDate
        },
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
        ],
        group:'realname',
        order:[
            ['usedTime','ASC']
        ],
        include:[
            {
                model:workAdmin,
                attributes:[
                    'realname'
                ],
                include:{
                    model:workDepartment,
                    attributes:[],
                    where:{
                        id:where.id
                    }
                }
            }
        ]
    })

    //产品投入时间
    let product = await workDaily.all({
        where:{
            createDate:where.createDate
        },
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
        ],
        group:'prName',
        order:[
            ['usedTime','ASC']
        ],
        include:[
            {
                model:workProductProject,
                where:{
                    type:1
                },
                attributes: ['prName','type']
            },
            {
                model:workAdmin,
                attributes:[],
                include:{
                    model:workDepartment,
                    attributes:[],
                    where:{
                        id:where.id
                    }
                }
            }
        ]
    })

    //项目投入时间
    let project = await workDaily.all({
        where:{
            createDate:where.createDate
        },
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
        ],
        group:'prName',
        order:[
            ['usedTime','ASC']
        ],
        include:[
            {
                model:workProductProject,
                where:{
                    type:2
                },
                attributes: ['prName','type']
            },
            {
                model:workAdmin,
                attributes:[],
                include:{
                    model:workDepartment,
                    attributes:[],
                    where:{
                        id:where.id
                    }
                }
            }
        ]
    })

    //产品、项目、其他投入时间
    let other = await workDaily.all({
        where:{
            createDate:where.createDate
        },
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime'],
            'type'
        ],
        group:'type',
        order:[
            ['type','ASC']
        ],
        include:[
            {
                model:workAdmin,
                attributes:[],
                include:{
                    model:workDepartment,
                    attributes:[],
                    where:{
                        id:where.id
                    }
                }
            }
        ]
    })

    var data = [];
    other.forEach(function (item) {
        if(item.type == 1){ //产品
            data.push({
                name:'产品',
                usedTime:item.usedTime
            })
        }else if(item.type == 2){ //项目
            data.push({
                name:'项目',
                usedTime:item.usedTime
            })
        }else if(item.type == 3){ //其它
            data.push({
                name:'其它',
                usedTime:item.usedTime
            })
        }
    });

    return {
        personTotal:personTotal,
        personItem:personItem,
        product:product,
        project:project,
        other:data
    };
}

const getProductItem = async (dailyWhere,itemWhere) => {
    let data = await workDaily.all({
        where:dailyWhere,
        attributes: [
            'usedTime',
            [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
        ],
        group:'prName',
        order:[
            ['usedTime','ASC']
        ],
        include:{
            model:workProductProject,
            where:itemWhere,
            attributes: ['prName','type']
        }
    });
    let product = [];
    let project = [];
    data.forEach(function (item, key) {
        if (item.work_product_project.type == 1) {
            product.push({
                prName: item.work_product_project.prName,
                usedTime: item.usedTime
            })
        }
        if (item.work_product_project.type == 2) {
            project.push({
                prName: item.work_product_project.prName,
                usedTime: item.usedTime
            })
        }
    })
    return {
        product,
        project
    };
}

const getPeople = async (where,currentPage,pageSize) => {
    try{
        let data = await workProductProject.all({
            where:where,
            offset:currentPage * pageSize,
            limit: pageSize,
            attributes: [
                'id',
                'prName',
                'type'
            ],
            order:[
                ['createTime','DESC']
            ]
        });
        let list = JSON.parse(JSON.stringify(data));
        for(var i = 0; i < list.length; i++){
            let item = list[i];
            let result = await workDaily.all({
                where:{
                    itemId:item.id
                },
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('usedTime')),'usedTime']
                ],
                group:'realname',
                include:{
                    model:workAdmin,
                    attributes: ['realname']
                }
            })
            item.second = JSON.parse(JSON.stringify(result));
        }
        return JSON.parse(JSON.stringify(list));
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getColleague: getColleague, //同事统计
    getDept: getDept, //部门统计
    getProductItem:getProductItem, //产品/项目统计
    getPeople: getPeople, //人月统计
};