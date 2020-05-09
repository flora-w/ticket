import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {ALL_ORDERS_LIST,SING_ORDERS_LIST } from "../../../../config/api"



/**
 * 獲取頁面數據
 */
const asyncGetPageData = (data, id) => {
  return {
    type: actionTypes.SIGN_PAGE_DATA,
    data,
    id
  }
}
export const getPageData = id => {
  const url = id === '1'?  ALL_ORDERS_LIST : id === '2'? SING_ORDERS_LIST : ALL_ORDERS_LIST;
  const User_id = sessionStorage.getItem('userId');
  return (dispatch) => {
    axios.get({ url, data: {User_id}})
      .then(data => {
        if (data.code === 1) {
          dispatch(asyncGetPageData(data.Data, id));
        } else {
          message.warning(data.message);
        }
      })
      .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })
  }
}

/**
 * 頁面的IDduo
 */
export const currPage = id => ({
  type: actionTypes.CURR_PAGE,
  id
})

/**
 * 返回form列表
 */
export const goBackClick = data => ({
  type: actionTypes.GO_BACK
})



/**
 * 提交數據
 */
const asyncSubmitData = () => ({
  type: actionTypes.SUBMIT_SUCCESS
})
export const submitData = values => {
  let data = {
    sFormSerialID: values.formId,
    sSignerID: '',
    ResultID: values.result,
    ResultName: values.result === 1? '同意' : '駁回',
    sComment: values.suggestion
  }
  return dispatch => {
    axios.post({url: '/Sign/F001_Approve', data,})
    .then(data => {
      if(data.code === 1){
        dispatch(asyncSubmitData())
      }else{
        message.info("獲取數據失敗")
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤')
      console.log(err)
    })
  }
}