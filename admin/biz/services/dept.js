const response = require('../../tools/response');
const deptDao = require('../dao/dept');
const formatDate = require('../../tools/formatDate');

const getAll = async _ => {
    let data = await deptDao.getAll();
    return response(data,'查询');
}

const getItem = async id => {
    if(!id){
        return {
            status:1,
            message:"部门id不能为空！",
            result:""
        }
    }
    let data = await deptDao.getItem(id);
    return response(data,'查询');
}

const create = async param => {
    if(!param.depName){
        return {
            status:1,
            message:"部门名称不能为空！",
            result:""
        }
    }else if(!param.depDescribe){
        return {
            status:1,
            message:"部门描述不能为空！",
            result:""
        }
    }
    param.createTime = formatDate();
    let data = await deptDao.create(param);
    return response(data,'添加');
}



module.exports = {
    getAll, //获取所有部门数据
    getItem, //根据id获取单个部门数据
    create, //添加一条部门信息
};