var xlsx = require('node-xlsx');
var fs = require('fs');
function Excel(param,res) {
    var buffer = xlsx.build([{name: param.name, data: param.data}]);
    fs.writeFileSync('./report/' + param.name + '.xlsx', buffer, 'binary');
    res.send({
        status:0,
        message:'导出成功！',
        result:'/' + param.name + '.xlsx'
    });
}

module.exports = Excel;

