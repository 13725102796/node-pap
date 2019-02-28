import {testApi, getSerceKey, queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { upload } from '@/utils/img1'
export default {
  namespace: 'test',

  state: {
    list: [],
    totalPage: null,
    // page: {
    //   limit: null,
    //   offect: null, 
    //   totalPage: null,
    // }
    // test: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const result = yield call(testApi, 'index' ,payload);
      yield put({
        type: 'queryList',
        payload: result,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload,callback }, { call, put }) {
      let actName;

      if (payload.id) {
        actName = Object.keys(payload).length === 1 ? 'del' : 'update';
      } else {
        actName = 'create';
      }
      if(actName === 'create' || (actName === 'updata' && payload.img.indexOf('https://') === -1 )) {
        // 需要上传图片
        if(payload.img.file){
          const keyData = yield call(upload, payload.img.file.originFileObj)
          payload.img = keyData
          console.log(payload)
        }
      } 
      const {result} = yield call(testApi, actName, payload); 
      payload.id = result
      yield put({
        type: 'appendList',
        payload: [payload],
      });
      abort: callback()
    },
  },

  reducers: {
    queryList(state, action) {
      console.log(state)
      console.log(action)
      return {
        // ...state,
        list: action.payload.result,
        totalPage: action.payload.totalPage
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};