const response = require('../../tools/response');
const myDao = require('../dao/my');
const formatDate = require('../../tools/formatDate');

const getWork = async param => {
    if(!param.userId){
        return {
            status:1,
            message:'用户id不能为空！',
            result:''
        };
    }else if(param.currentPage === "" || param.currentPage === null){
        return {
            status:1,
            message:'页码不能为空！',
            result:''
        };
    }else if(param.pageSize === "" || param.pageSize === null){
        return {
            status:1,
            message:'页数不能为空！',
            result:''
        };
    }
    let data = await myDao.getWork(param);
    return response(data,'查询');
}

const getItem = async param => {
    if(!param.userId){
        return {
            status:1,
            message:'用户id不能为空！',
            result:''
        };
    }else if(!param.type){
        return {
            status:1,
            message:'产品类型不能为空！',
            result:''
        };
    }else if(param.currentPage === "" || param.currentPage === null){
        return {
            status:1,
            message:'页码不能为空！',
            result:''
        };
    }else if(param.pageSize === "" || param.pageSize === null){
        return {
            status:1,
            message:'页数不能为空！',
            result:''
        };
    }
    let data = await myDao.getItem(param);
    return response(data,'查询');
}

const upload = async param => {
    if(!param.id){
        return {
            status:1,
            message:"用户id不能为空！",
            result:""
        }
    }else if(!param.pic){
        return {
            status:1,
            message:"用户图像不能为空！",
            result:""
        }
    }
    let data = await myDao.upload(param);
    return response(data,"上传");
}

module.exports = {
    getWork, //获取我的工作数据
    getItem, //获取我参与的产品或项目数据
    upload, //上传图像
};