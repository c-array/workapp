const loginModel = require('../model/login');

module.exports = {
    login: async param => {
        if(!param.username){
            return {
                status: 1,
                message: '用户名不能为空！',
                result: ''
            }
        }else if(!param.password){
            return {
                status: 1,
                message: '密码不能为空！',
                result: ''
            }
        }
        let data = await loginModel.login(param);
        if (data) {
            return {
                status: 0,
                message: '成功',
                result: data
            }
        } else {
            return {
                status: 1,
                message: '用户名或密码错误！',
                result: ''
            }
        }
    }
}