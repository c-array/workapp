const productItemDao = require('../dao/produc-item');

const getAll = async _ => {
    let data = productItemDao.getAll();
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

module.exports = {
    getAll:getAll,
    getProitems:getProitems
}