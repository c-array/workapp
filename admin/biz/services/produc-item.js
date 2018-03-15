const productItemDao = require('../dao/produc-item');
const response = require('../../tools/response');
const formatDate = require('../../tools/formatDate');

const getAll = async _ => {
    let data = await productItemDao.getAll();
    if (data) {
        return {
            status: 0,
            message: '查询成功',
            result: data
        }
    } else {
        return {
            status: 1,
            message: '查询失败！',
            result: ''
        }
    }
}

const getProitems = async type => {
    if(!type){
        return {
            status: 1,
            message: '类型不能为空！',
            result: ''
        }
    }
    let data = await productItemDao.getProitems(type);
    return response(data,"查询");
}

const getItem = async id => {
    if(!id){
        return {
            status: 1,
            message: 'id不能为空！',
            result: ''
        }
    }
    let data = await productItemDao.getItem(id);
    return response(data,"查询");
}

const create = async param => {
    if(!param.prName){
        return {
            status:1,
            message:"名称不能为空！",
            result:""
        }
    }else if(!param.prDescribe){
        return {
            status:1,
            message:"描述不能为空！",
            result:""
        }
    }
    param.createTime = formatDate();
    let data = await productItemDao.create(param);
    return response(data,'添加');
}

const update = async (id,param) => {
    if(!id){
        return {
            status: 1,
            message: 'id不能为空！',
            result: ''
        }
    }else if(!param.prName){
        return {
            status:1,
            message:"名称不能为空！",
            result:""
        }
    }else if(!param.prDescribe){
        return {
            status:1,
            message:"描述不能为空！",
            result:""
        }
    }

    let data = await productItemDao.update(id,param);
    return response(data,"修改");
}

const remove = async id => {
    if(!id){
        return {
            status: 1,
            message: 'id不能为空！',
            result: ''
        }
    }
    let data = await productItemDao.remove(id);
    return response(data,"删除");
}

const search = async (param) => {
    var where = {};
    if(param.type){
        where.type = param.type;
    }

    if(param.prName){
        where.prName = {
            $like: '%'+ param.prName +'%'
        };
    }
    let data = await productItemDao.search(where);
    return response(data,"查询");
}


module.exports = {
    getAll, //获取所有数据
    getProitems, //获取产品或项目数据
    getItem, //获取单个产品或项目数据
    create, //添加一条产品或项目信息
    update, //更新单个产品或项目数据
    remove, //删除单个产品或项目数据
    search, //模糊搜索产品和项目
}