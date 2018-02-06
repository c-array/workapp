const response = require('../../tools/response');
const dailyDao = require('../dao/daily');

const getAll = async param => {
    let data = await dailyDao.getAll(param);
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
    let data = await dailyDao.getItem(id);
    return response(data,"查询");
}

const create = async param => {
    if(!param.itemId){
        param.itemId = null;
   }
    let data = dailyDao.create(param);
    return response(data,"添加");
}

const update = async (id,param) => {
    if(!id){
        return {
            status: 1,
            message: 'id不能为空！',
            result: ''
        }
    }else if(!param.itemId){
        param.itemId = null;
    }
    let data = await dailyDao.update(id,param);
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
    let data = await dailyDao.remove(id);
    return response(data,"删除");
}

module.exports = {
    getAll: getAll,
    getItem:getItem,
    create: create,
    update:update,
    remove:remove
}