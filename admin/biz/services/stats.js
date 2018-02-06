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
    let data = statsDao.getColleague(where);
    return response(data,'同事统计');
}

const getDept = async param => {
    let data = statsDao.getDept(param);
    return response(data,'部门统计');
}

const getProduct = async param => {
    let data = statsDao.getProduct(param);
    return response(data,'产品统计');
}

const getProject = async param => {
    let data = statsDao.getProject(param);
    return response(data,'项目统计');
}

const getPeople = async param => {
    let data = statsDao.getPeople(param);
    return response(data,'人月统计');
}

module.exports = {
    getColleague: getColleague, //同事统计
    getDept: getDept, //部门统计
    getProduct:getProduct, //产品统计
    getProject:getProject, //项目统计
    getPeople: getPeople, //人月
};