/**
 * Created by Administrator on 2017/11/6.
 */
function formatDate() {
    function fillIn(value){
        if(value < 10){
            return "0" + value;
        }else{
            return value;
        }
    }
    var time;
    var d = value ? new Date(value) : new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var ndate = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    if(type == 'y-m-d'){
        time = year + '-' + fillIn(month) + '-' + fillIn(ndate);
    }else if(type == 'h:m:s'){
        time = fillIn(hour) + ':' + fillIn(minute) + ':' + fillIn(second);
    }else{
        time = year + '-' + fillIn(month) + '-' + fillIn(ndate) + ' ' + fillIn(hour) + ':' + fillIn(minute) + ':' + fillIn(second);
    }
    return time;
}
module.exports = formatDate;