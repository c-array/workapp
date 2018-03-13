const statsDao = require('../dao/stats');
var formatDate = require('../../tools/formatDate');
var response = require('../../tools/response');
var exportExcel = require('../../tools/excel');

const getColleague = async param => {
    if (!param.userId) {
        return {
            status: 1,
            message: '用户id不能为空！',
            result: ''
        }
    }
    var where = {
        userId: param.userId,
    }
    var exportName = "";
    if (param.startDate && param.endDate) { //开始时间和结束时间都存在
        var startTime = formatDate({
            type: 'time',
            date: param.startDate
        })
        var endTime = formatDate({
            type: 'time',
            date: param.endDate
        })

        if (startTime < endTime) { //开始时间小于结束时间
            where.createDate = {
                $gte: param.startDate,
                $lte: param.endDate
            };
        } else {
            return {
                status: 1,
                message: '开始时间不能大于结束时间',
                result: ''
            }
        }
        exportName = "同事统计" + param.startDate + "至" + param.endDate + "-" + param.username;
    } else if (param.startDate && !param.endDate) { //开始时间有，结束时间没有
        where.createDate = {
            $gte: param.startDate
        };
        exportName = "同事统计" + param.startDate + "至" + formatDate({
            type: 'yyyy-mm-dd',
        }) + "-" + param.username;
    } else if (param.endDate && !param.startDate) { //开始时间没有，结束时间有
        where.createDate = {
            $lte: param.endDate
        };
        exportName = "同事统计2015-01-01至" + param.endDate + "-" + param.username;
    } else {
        return {
            status: 1,
            message: '时间不能为空',
            result: ''
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
        status: 0,
        message: "导出成功！",
        result: exportExcel({
            name: exportName,
            data: exportData
        }) //调用导出方法
    }
}

const getDept = async param => {
    if (!param.departmentId) {
        return {
            status: 1,
            message: '部门id不能为空！',
            result: ''
        }
    }
    var where = {
        id: param.departmentId
    }
    var exportName = "";
    if (param.startDate && param.endDate) { //开始时间和结束时间都存在
        var startTime = formatDate({
            type: 'time',
            date: param.startDate
        })
        var endTime = formatDate({
            type: 'time',
            date: param.endDate
        })

        if (startTime < endTime) { //开始时间小于结束时间
            where.createDate = {
                $gte: param.startDate,
                $lte: param.endDate
            };
        } else {
            return {
                status: 1,
                message: '开始时间不能大于结束时间',
                result: ''
            };
        }
        exportName = param.startDate + "至" + param.endDate;
    } else if (param.startDate && !param.endDate) { //开始时间有，结束时间没有
        where.createDate = {
            $gte: param.startDate
        };
        exportName = param.startDate + "至" + formatDate({
            type: 'yyyy-mm-dd',
        });
    } else if (param.endDate && !param.startDate) { //开始时间没有，结束时间有
        where.createDate = {
            $lte: param.endDate
        };
        exportName = "2015-01-01至" + param.endDate;
    } else {
        return {
            status: 1,
            message: '时间不能为空',
            result: ''
        };
    }
    let data = await statsDao.getDept(where);
    var departmentName = "";
    var exportData = [];
    exportData.push(['人员总体投入时间', null], [null, '日期', '工作量（小时）']);
    data.personTotal.forEach(function (item, key) {
        if (!departmentName) {
            departmentName = item.work_admin.work_department.depName;
        }
        exportData.push([null, item.createDate, item.usedTime]);
    });

    exportData.push(['每人投入时间', null], [null, '人员名称', '工作量（小时）']);
    data.personItem.forEach(function (item, key) {
        exportData.push([null, item.work_admin.realname, item.usedTime]);
    });

    exportData.push(['产品投入时间', null], [null, '产品名称', '工作量（小时）']);
    data.product.forEach(function (item, key) {
        if (item.work_product_project.type == 1) {
            exportData.push([null, item.work_product_project.prName, item.usedTime]);
        }
    });

    exportData.push(['项目投入时间', null], [null, '项目名称', '工作量（小时）']);
    data.project.forEach(function (item, key) {
        if (item.work_product_project.type == 2) {
            exportData.push([null, item.work_product_project.prName, item.usedTime]);
        }
    });

    exportData.push(['产品、项目、其它'], [null, '类型', '工作量（小时）', '比例']);
    var count = data.other[0].usedTime + data.other[1].usedTime + data.other[2].usedTime;
    data.other.forEach(function (item, key) {
        exportData.push([null, item.name, item.usedTime, (item.usedTime / count * 100).toFixed(2) + '%']);
    });

    exportData.unshift([departmentName + exportName, null]);

    return {
        status: 0,
        message: "导出成功！",
        result: exportExcel({
            name: departmentName + exportName,
            data: exportData
        }) //调用导出方法
    }
}

const getProductItem = async param => {
    var dailyWhere = {};
    var itemWhere = {};
    if (param.itemId) { //有
        dailyWhere.itemId = param.itemId;
    }
    if (param.type) {
        itemWhere.type = param.type;
    }
    try{
        let data = await statsDao.getProductItem(dailyWhere, itemWhere);
        var exportData = [];

        exportData.push(['产品投入时间', null], [null, '产品名称', '工作量（小时）']);
        data.product.forEach(function (item, key) {
            exportData.push([null, item.prName, item.usedTime]);
        });

        exportData.push(['项目投入时间', null], [null, '项目名称', '工作量（小时）']);
        data.project.forEach(function (item, key) {
            exportData.push([null, item.prName, item.usedTime]);
        });

        return {
            status: 0,
            message: "导出成功！",
            result: exportExcel({ //调用导出方法
                name: "产品项目统计",
                data: exportData
            }) //调用导出方法
        }
    }catch(err){
        console.log(err);
        return response("","导出失败！");
    }
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
    try{
        let data = await statsDao.getPeople(where);
        var exportData = []
        //处理产品用时数据
        exportData.push([null,null,'产品/项目用时',null,null],[null,'产品/项目名称','参与人员','工作量（小时）','类型']);
        var typeName = "";
        data.forEach(function (item,key) {
            typeName = item.type == 1 ? '产品' : '项目';
            item.second.forEach(function(obj,index){
                exportData.push([null,item.prName,obj.work_admin.realname,obj.usedTime,typeName]);
            })
        });
        return {
            status:0,
            message:"导出成功！",
            result:exportExcel({ //调用导出方法
                name:'统计分析-人月统计',
                data:exportData
            })
        }
    }catch(err){
        console.log(err);
        return {
            status:1,
            message:"导出失败！",
            result:""
        }
    }
}

module.exports = {
    getColleague: getColleague, //同事统计
    getDept: getDept, //部门统计
    getProductItem: getProductItem, //产品/项目统计
    getPeople: getPeople //人月统计
};
