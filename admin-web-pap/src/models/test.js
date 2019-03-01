import {testApi, getSerceKey, queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { upload, delFile } from '@/utils/img1'
export default {
  namespace: 'test',

  state: {
    list: [],
    totalPage: null,
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
      let actName = payload.action;
      payload = payload.item

      if(actName === 'create' || (actName === 'update' && payload.img.file)) {
        // 需要上传图片
        if(payload.img.file){
          const keyData = yield call(upload, payload.img.file.originFileObj)
          payload.img = keyData
          console.log(payload)
        }
      } 
      const data = yield call(testApi, actName, payload); 
      if(data.result) {
        payload.id = data.result
        yield put({
          type: 'appendList',
          payload: [payload],
        });
      } else {
        if(actName === 'update') {
          yield put({
            type: 'updateList',
            payload: payload,
          });
        }else if(actName === 'del') {
          // yield call(delFile, payload.img )
          yield put({
            type: 'delList',
            payload: payload,
          });
        }
      }
      
      callback()
    },
  },

  reducers: {
    queryList(state, action) {
      console.log(state)
      console.log(action)
      return {
        ...state,
        list: action.payload.result,
        totalPage: action.payload.totalPage
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: [].concat(action.payload,state.list),
      };
    },
    updateList(state,action){ 
      const index = state.list.findIndex(item =>{
        if(item.id === action.payload.id ) {
          if(item.img != action.payload.img) delFile(item.img)
          
          return action.payload
        } 
      })
      const arr = state.list
      arr[index] = action.payload
      return {
        ...state,
        list: arr
      };
    },
    delList(state,action){
      const index = state.list.findIndex(item =>{
        if(item.id === action.payload.id ) {
          delFile(item.img)
          return action.payload
        } 
      })
      console.log(index)
      state.list.splice(index,1)
      // console.log(arr)
      // arr[index] = action.payload
      return {
        ...state,
        list: state.list
      };
    }
  },
};