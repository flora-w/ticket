import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { HAD_SIGN_DETAIL, WAIT_FOR_SIGN_SUBMIT } from "../../../../config/api";

/**
 * 返回form列表
 */
export const goBackClick = () => ({
  type: actionTypes.GO_BACK
})

/**
 * 点击单号显示对应签核内容
 */
const asyncFormIdClick = (data, title) => {
  return {
    type: actionTypes.FORMID_CLICK,
    data,
    title
  }
}
export const formIdClick = (id, title) => {
  return dispatch => {
    axios.get({url: HAD_SIGN_DETAIL, data: {SerialID: id}})
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
export const submitData = ({values, formId, that}) => {
  let data = {
    sFormSerialID: formId,
    sSignerID: sessionStorage.getItem('userId'),
    sResultID: values.result,
    sResultName: values.result === 1? '同意' : '駁回',
    sComment: values.suggestion
  }
  return dispatch => {
    axios.post({url: WAIT_FOR_SIGN_SUBMIT, data})
    .then(data => {
      if(data.code === 1){
        that.props.history.replace('/sign/list/1');
        dispatch(asyncSubmitData())
      }else{
        message.info(data.message)
      }
    })
    .catch(err => {
      message.warning('請求數據時錯誤')
      console.log(err)
    })
  }
}