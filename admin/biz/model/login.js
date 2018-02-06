var db = require('../../config/config');
var md5Encrypt = require('../../config/md5Encrypt');
var formatDate = require('../../config/formatDate');
var workAdmin = db.workAdmin;

module.exports = {
    login:async (param) => { //登录查询
        param.password = md5Encrypt(param.password); //密码加密
        try{
            let data = await workAdmin.find({where:{username:param.username,password:param.password}});
            return data;
        }catch(err){
            console.log(err);
            return "";
        }
    }
}