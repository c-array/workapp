const statsDao = require('../dao/stats');
var formatDate = require('../../tools/formatDate');
var exportExcel = require('../../tools/excel');
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
    var exportName = "";
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
        exportName = "同事统计" + param.startDate + "至" + param.endDate + "-" + param.username;
    }else if(param.startDate && !param.endDate){ //开始时间有，结束时间没有
        where.createDate = { 
            $gte: param.startDate
        };
        exportName = "同事统计" + param.startDate + "至" + formatDate({
            type:'yyyy-mm-dd',
        }) + "-" + param.username;
    }else if(param.endDate && !param.startDate){ //开始时间没有，结束时间有
        where.createDate = { 
            $lte:param.endDate
        };
        exportName = "同事统计2015-01-01至" + param.endDate + "-" + param.username;
    }else{
        return {
            status:1,
            message:'时间不能为空',
            result:''
        }
    }

    let data = await statsDao.getColleague(where);
    var exportData = [
        [exportName, null]
    ]
    exportData.push(['每天工作时间', null], [null, '日期', '工作量（小时）']);
    data.colleague.forEach(function (item, key) {
        exportData.push([null, item.createDate, item.usedTime]);
    });

    exportData.push(['产品投入时间', null], [null, '产品名称', '工作量（小时）']);
    data.product.forEach(function (item, key) {
        exportData.push([null, item.work_product_project.prName, item.usedTime]);
    });

    exportData.push(['项目投入时间', null], [null, '项目名称', '工作量（小时）']);
    data.project.forEach(function (item, key) {
        exportData.push([null, item.work_product_project.prName, item.usedTime]);
    });

    exportData.push(['产品、项目、其它'], [null, '类型', '工作量（小时）', '比例']);
    var count = data.other[0].usedTime + data.other[1].usedTime + data.other[2].usedTime;
    data.other.forEach(function (item, key) {
        exportData.push([null, item.name, item.usedTime, (item.usedTime / count * 100).toFixed(2) + '%']);
    });

    return {
        status:0,
        message:"导出成功！",
        result:exportExcel({
            name:exportName,
            data:exportData
        }) //调用导出方法
    }
}

module.exports = {
    getColleague: getColleague //同事统计
};
