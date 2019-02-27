import {testApi, getSerceKey, queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { upload } from '@/utils/imgUpload'
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
    *submit({ payload }, { call, put }) {
      let callback;

      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? 'del' : 'update';
      } else {
        callback = 'create';
      }
      if(callback === 'create' || (callback === 'updata' && payload.img.indexOf('https://') === -1 )) {
        // 需要上传图片
        if(payload.img.file){
          const keyData = yield call(upload, payload.img.file)
          console.log(keyData)
        }
      } 
      // const response = yield call(testApi, callback, payload); // post
      // yield put({
      //   type: 'queryList',
      //   payload: response,
      // });
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