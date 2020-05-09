import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {SIGN_FORMDETAIL} from  "../../../../config/api"


/**
 * 返回form列表
 */
export const goBackClick = data => ({
  type: actionTypes.GO_BACK
})

/**
 * 点击单号显示对应签核内容
 */
const asyncFormIdClick = (data, title) => ({
  type: actionTypes.FORMID_CLICK,
  data,
  title
})
export const formIdClick = (id, title, serialId) => {
  return (dispatch, getState) => {
    const User_id = sessionStorage.getItem('userId');
    axios.get({ url:  SIGN_FORMDETAIL, data:{ SerialID: serialId }})
    // axios.get({url: '/api/Sign/FormDetail.json', data: {SerialID: id}})
    .then(data => {
      if (data.code === 1) {
        dispatch(asyncFormIdClick(data.Data, title));
      } else {
        message.warning(data.message);
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤')
      console.log(err)
    })
  }
}

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