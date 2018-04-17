const muilter = require('../../tools/muilter');
var upload = muilter.single('file');

const uploadFile = (req, res, next) => {
    upload(req, res,function (err) {
        if(!err){
            res.send({
                status:0,
                message:'上传成功！',
                result:{
                    fileName:req.file.originalname,
                    filePath:'/uploads/' + req.file.originalname
                }
            });
        }else{
            res.send({
                status:1,
                message:'上传失败！',
                result:''
            });
            console.log("上传附件失败" + err);
        }
    })
};

module.exports = {
    'POST /uploadFile': uploadFile,
};