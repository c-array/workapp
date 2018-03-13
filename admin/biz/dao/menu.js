const db = require('../../config/db');
const workMenu = db.workMenu;

let getAll = async _ => {
    try{
        let menu1 = await workMenu.all({where:{level:1}});
        var data = [];
        for(var i = 0; i < menu1.length; i++){
            let item = JSON.parse(JSON.stringify(menu1[i]));
            item.second = await workMenu.all({where:{parentId:item.id}});
            data.push(item);
        }
        return data;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getAll, //获取所有角色信息
};