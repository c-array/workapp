const response = require('../../tools/response');
const statsDao = require('../dao/stats');
const formatDate = require('../../tools/formatDate');

const getColleague = async param => {
    if(!param.userId) {
        return {
            status:1,
            message: '用户id不能为空！',
            result: ''
        }
    }
    var where = {
        userId:param.userId,
    }
    if(param.startDate && param.endDate){ //开始时间和结束时间都存在
        var startTime = formatDate({
            type:'time',
            date:param.startDate
        })
        var endTime = formatDate({
            type:'time',
            date:param.endDate
        })

        if(startTime < endTime){ //开始时间小于结束时间
            where.createDate = { 
                $gte: param.startDate,
                $lte:param.endDate
            };
        }else{
            return {
                status:1,
                message:'开始时间不能大于结束时间',
                result:''
            }
        }
    }else if(param.startDate && !param.endDate){ //开始时间有，结束时间没有
        where.createDate = { 
            $gte: param.startDate
        };
    }else if(param.endDate && !param.startDate){ //开始时间没有，结束时间有
        where.createDate = { 
            $lte:param.endDate
        };
    }else{
        return {
            status:1,
            message:'时间不能为空',
            result:''
        }
    }
    let data = await statsDao.getColleague(where);
    return response(data,'同事统计');
}

const getDept = async param => {
    if(!param.departmentId){
        return {
            status:1,
            message: '部门id不能为空！',
            result: ''
        }
    }
    var where = {
        id:param.departmentId
    }
    if(param.startDate && param.endDate){ //开始时间和结束时间都存在
        var startTime = formatDate({
            type:'time',
            date:param.startDate
        })
        var endTime = formatDate({
            type:'time',
            date:param.endDate
        })

        if(startTime < endTime){ //开始时间小于结束时间
            where.createDate = { 
                $gte: param.startDate,
                $lte:param.endDate
            };
        }else{
            return {
                status:1,
                message:'开始时间不能大于结束时间',
                result:''
            };
        }
    }else if(param.startDate && !param.endDate){ //开始时间有，结束时间没有
        where.createDate = { 
            $gte: param.startDate
        };
    }else if(param.endDate && !param.startDate){ //开始时间没有，结束时间有
        where.createDate = { 
            $lte:param.endDate
        };
    }else{
        return {
            status:1,
            message:'时间不能为空',
            result:''
        };
    }
    let data = await statsDao.getDept(where);
    return response(data,'部门统计');
}

const getProductItem = async param => {
    var dailyWhere = {};
    var itemWhere = {};
    if(param.itemId){ //有
        dailyWhere.itemId = param.itemId;
    }
    if(param.type){
        itemWhere.type = param.type;
    }
    let data = await statsDao.getProductItem(dailyWhere,itemWhere);
    return response(data,'产品/项目统计');
}

const getPeople = async param => {
    var where = {};
    if(param.type && param.itemId){
        where.type = param.type;
        where.id = param.itemId;
    }else if(param.type){
        where.type = param.type;
    }else if(param.itemId){
        where.id = param.itemId;
    }
    let data = await statsDao.getPeople(where);
    return response(data,'人月统计');
}

module.exports = {
    getColleague: getColleague, //同事统计
    getDept: getDept, //部门统计
    getProductItem:getProductItem, //产品/项目统计
    getPeople: getPeople, //人月
};