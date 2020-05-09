import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";

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
    type: actionTypes.SIGN_PAGE_DATA,
    data,
  }
}
 export const getPageData = () => {
   return (dispatch) => {
     axios.get({ url: '/api/orders/ticketOut.json'})
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
const asyncFormClick = (data, title) => ({
  type: actionTypes.FORMID_CLICK,
  data,
  title
})
export const formClick = (id, title) => {
  return dispatch => {
    axios.get({url: '/api/orders/AllOrders1.json', data: {SerialID: id}})
    .then(data => {
      if (data.code === 1) {
        dispatch(asyncFormClick(data.Data, title));
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