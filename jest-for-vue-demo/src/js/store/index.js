import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex);

export const state = {
    msgList: [],
    maxListSize: 1000,
    echartConfig: {
        tooltip: {
            trigger: 'item',
            backgroundColor:'#528DFF',
            color:'#fff',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    readOnly: true,
                    iconStyle: {
                       	normal: {
                            borderColor: '#528DFF'
                       	}
                    },
                },
                restore: {
                	iconStyle: {
                       	normal: {
                            borderColor: '#528DFF'
                       	}
                    },
                },
                saveAsImage: {
                    name: '行业配置',
                    iconStyle: {
                       	normal: {
                            borderColor: '#528DFF'
                       	}
                    },
                }
            },
            right: "16px"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['农业', '计算机', '其他']
        },
        series: [{
            type: 'pie',
            radius: '55%',
            center: ['50%', '68%'],
            data: [
                {value: 35, name: '农业'},
                {value: 10, name: '计算机'},
                {value: 55, name: '其他'}
            ]
        }],
        grid: {
            left: 'center'
        }
    }
}


export const getters = {
    msgAmount: state => state.msgList.length
}

export const actions = {
    getMsgFromRemote: ({commit}) => {
        axios
            .get('https://www.easy-mock.com/mock/5b765aef4d2b8f332fda9656/msgpool/mock-msg')
            .then(resp => {
                commit('pushMsg', {
                    msg: resp.data
                })
            })
    }
}

export const mutations = {
    pushMsg: (state, payload) => {
        let msgList = state.msgList, currLen = msgList.length;
        if (currLen === state.maxListSize) {
            msgList.splice(0, 1);
        }
        msgList.push(payload.msg);
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});