import { state, getters, mutations, actions } from './../../js/store'
import Vuex from 'vuex'
// (@vue/test-utils)Vue-test-utils在Vue和Jest之前提供了一个桥梁，暴露出一些接口，让我们更加方便的通过Jest为Vue应用编写单元测试。
import { createLocalVue } from '@vue/test-utils'
import axios from 'axios';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('actions', () => {
    let store, mutations = {};
    // 在该文件运行的每个测试之前运行一个函数。如果函数返回一个promise，Jest将等待该承诺在运行测试之前解决
    beforeEach(() => {
        mutations.pushMsg = jest.fn((state, payload) => {
            state.msgList.push(payload.msg);
        });
        store = new Vuex.Store({
            state,
            getters,
            mutations,
            actions
        });
    })

    test('test action isolated', () => {
        store.dispatch('getMsgFromRemote'); //触发action里面的方法去异步请求
        setTimeout(() => {
            expect(mutations.pushMsg).toBeCalled();     //toHaveBeenCalled()别名，来确保一个模拟函数已经被调用
            expect(store.state.msgList.length).toBe(1);
            expect(store.state.msgList[0]).toEqual({
                "name": "mock-name",
                "message": "mock-msg"
            });
        }, 100)
    })
})

describe('mutations', () => {
    let store;
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                msgList: [],
                maxListSize: 10
            },
            mutations
        });
    })

    test('test pushMsg', () => {
        for (let i = 0; i < 12; i++) {
            store.commit('pushMsg', {
                msg: {
                    "name": "mock-name",
                    "message": "mock-msg"
                }
            });
        }
        expect(store.state.msgList.length).toBe(10);
    })
})

/* async test */
describe('asyn test', () => {
    let asynMethod = jest.fn(() => {
        return axios.get('/mock');
    })

    test.only('option one', async () => {
        const resp = await asynMethod();
        expect(resp.data).toEqual({
            "name": "mock-name",
            "message": "mock-msg"
        });
    })

    test.only('option two', () => {
        asynMethod().then(resp => {
            expect(resp.data).toEqual({
                "name": "mock-name",
                "message": "mock-msg"
            });
        })
    })

    test.only('option three', async () => {
        await expect(asynMethod()).resolves.toHaveProperty('data', {
            "name": "mock-name",
            "message": "mock-msg"
        });
    })
})