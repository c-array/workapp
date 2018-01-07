import http from '../../public/js/http';
import {formatDate} from '../../public/js/common';
import {Toast} from 'mint-ui'
export default {
    namespaced: true,
    state: {
        formModel:{
            username:'',
            startDate:'',
            endDate:'',
            userId:''
        },
        chartsData:{
            dayData:{ //每天投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            pmData:{ //产品投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            pjData:{ //项目投入时间
                columns: ['createDate', 'usedTime'],
                rows: []
            },
            otherData:{ //其他投入时间
                columns: ['name', 'usedTime'],
                rows: []
            }
        },
        histogramConfig: {
            callback(options) {
                options.title.textStyle = {
                    color: "#666",
                    fontWeight: 'normal'
                }
                return options;
            },
            dataZoom: [
                {
                    show: true,
                    start: 0,
                    end: 50,
                    handleIcon: 'M512 512m-494.933333 0a494.933333 494.933333 0 1 0 989.866666 0 494.933333 494.933333 0 1 0-989.866666 0Z',
                    handleSize: '200%',
                    backgroundColor: '#e4e7ed',
                    borderColor: '#e4e7ed',
                    fillerColor: "#409eff",
                    height: 6,//组件高度
                    dataBackground: {
                        lineStyle: {
                            opacity: 0
                        },
                        areaStyle: {
                            opacity: 0
                        }
                    },
                    handleStyle: {
                        color: "#fff",
                        borderWidth: 2,
                        borderColor: "#409eff"
                    }
                },
                {
                    type: 'inside',
                    start: 94,
                    end: 100
                }
            ],
            chartSettings: {
                labelMap: {
                    usedTime: '用时'
                }
            }
        },
        pieConfig: {
            callback(options){
                console.log(options);
                options.legend.top = "20%";
                options.title.textStyle = {
                    color: "#666",
                    fontWeight: 'normal'
                }
                return options;
            },
            chartSettings: {
                dimension: 'name',
                metrics: 'usedTime',
                dataType: 'KMB',
                selectedMode: 'single',
                hoverAnimation: false,
                radius: 50,
                offsetY: 170
            }
        }
    }
}