import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {ORDERS_TICKET_LIST, ORDERS_TICKET_DETAIL} from "../../../../config/api"
/**
 * 返回form列表
 */
export const goBackClick = data => ({
  type: actionTypes.GO_BACK
})
/**
 * 獲取頁面數據
 */
const asyncGetPageData = data => {
  return {
    type: actionTypes.GET_PAGE_DATA,
    data,
  }
}

 export const getPageData = () => {
   return (dispatch) => {
    const User_id = sessionStorage.getItem('userId');
    axios.get({ url:  ORDERS_TICKET_LIST, data:{ User_id }})

       .then(data => {
         if (data.code === 1) {
           dispatch(asyncGetPageData(data.Data));
        } else {
           message.warning(data.message);
         }
       })
       .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })//catch傳的是then裡面的錯誤
   }
 }

 /**
 * 点击单号显示对应签核内容
 */
const asyncFormClick = (data, title, status, serialId,toBeSignedID) => ({
  type: actionTypes.FORMID_CLICK,
  data,
  title,
  status,
  serialId,
  toBeSignedID
})
export const formClick = ({serialId, formName, toBeSignedID, status}) => {
  const data = {
    SerialID: serialId || null,
    TravelCode: toBeSignedID
  }
  return dispatch => {
    axios.get({url: ORDERS_TICKET_DETAIL, data})
    .then(data => {
      if (data.code === 1) {
        sessionStorage.setItem('orderSerialid', serialId)
        dispatch(asyncFormClick(data.Data, formName, status, serialId,toBeSignedID));
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

// /**
//  * 離開頁面時重置為表單列表頁面
//  */
// export const showListPage = () => ({
//   type: actionTypes.SHOW_LIST_PAGE
// })