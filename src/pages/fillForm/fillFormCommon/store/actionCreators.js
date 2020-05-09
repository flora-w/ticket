import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";


const pageInitData = (data) => {
  return {
   type: actionTypes.PAGE_DATA,
   data,
  }
}

export const getPageInitData = () => {
  return (dispatch) => {
    axios.get({url: '/apply/Info_F001', data: {User_id: '10604121'}})
    .then(data => {
      if(data.code === 1){
        dispatch(pageInitData(data.Data))
      }else{
        message.warning(data.message);
      } 
    })
    .catch(err => {message.warning('獲取頁面數據出錯');console.log(err)})
  }
}

//类别选择
export const categoryChange = (value) => {
  return {
    type: actionTypes.CATEGORY_SELECT,
    value
  }
}

//选择五年条款时显示下载
export const otherChange = (value) => {
  return {
    type: actionTypes.FIVE_UPLOAD_SHOW,
    value,
  }
}

//选择国外时
export const areaSelect = (value) => {
  return {
    type: actionTypes.SELECT_FOREIGN,
    value
  }
}

//获取航程信息
export const flightInfo = ( value ) => {
  return {
    type: actionTypes.FLIGHT_INFO,
    value
  }
}

//助理代填填寫乘機人工號時
export const empnoChange = ( value ) => {
  return {
    type: actionTypes.EMPNO_CHANGE,
    value
  }
}




//组件卸载时重置所有状态
export const resetState = () => {
  return {
    type: actionTypes.RESET_ALL_STATE
  }
}

