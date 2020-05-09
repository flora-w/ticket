import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import {WAIT_CHOOSE_LIST,WAIT_CHOOSE_PAGE,WAITCHOOSE_SUBMIT} from "../../../../config/api"


/**
 * 獲取頁面數據
 */
const asyncGetChangePageData = data => {
  return {
    type: actionTypes.GET_PAGE_DATA,
    data,
  }
}
 export const getChangePageData = () => {
   return (dispatch) => {
    // const User_id = sessionStorage.getItem('userId');
    // axios.get({url: WAIT_FOR_QUOTE, data:{ User_id }})
    const User_id = sessionStorage.getItem('userId');
     axios.get({ url:  WAIT_CHOOSE_LIST, data:{ User_id }})
       .then(data => {
         if (data.code === 1) {
           dispatch(asyncGetChangePageData(data.Data));
        } else {
           message.warning(data.message);
         }
       })
       .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })//catch傳的是then裡面的錯誤
   }
 }
/**
 * 返回form列表
 */
export const goBackClick = data => ({
  type: actionTypes.GO_BACK
})


 /**
 * 点击单号显示对应签核内容
 */
const asyncWaitFormClick = (data, title,serialId) => ({
  type: actionTypes.FORMID_CLICK,
  data,
  title,
  serialId
})
export const waitFormClick =({serialId}) => {
  sessionStorage.setItem('waitId',serialId)
  return dispatch => {
    const User_id = sessionStorage.getItem('userId');
    axios.get({url:WAIT_CHOOSE_PAGE, data:{serialId,User_id}})
    .then(data => {
      if (data.code === 1) {
        dispatch(asyncWaitFormClick(data.Data));
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

// /*
//  * 送出报价
//  */
// export const outPrice = (values, changeOrders) => {
//   // console.log(values)
//   let maxKey = maxIndex(Object.keys(values));
//   let arr = formValues(values, maxKey);
//   // console.log(arr)
//   let changeTicketOk = changeTicketEdit.detail.map((v,k) => {    
//       if(arr.length === 0){
//         return null;
//       }else{
//         return {...v, ...arr[k]} 
//       }
//   })
//   return {
//     type: actionTypes.CHANGE_TICKET_OK,
//     changeTicketOk
//   }
// }

// /**
//  * 離開頁面時重置為表單列表頁面
//  */
// export const showListPage = () => ({
//   type: actionTypes.SHOW_LIST_PAGE
// })


export const changeRaidoState = value =>{
  return{
    type:actionTypes.CHOOSE_RADIO,
    value
  }
}

export const changeRadio = (value) =>{
  return dispatch =>{
    dispatch()
  }
}

export const submitOrder = (props,value)=>{
  const User_id = sessionStorage.getItem('userId');
  const SerialID = sessionStorage.getItem('waitId');
  return dispatch =>{
    axios.post({url:WAITCHOOSE_SUBMIT,data:{User_id,ResultCode:value,SerialID}}).then(res=>{
      if(res.code === 1 ){
        message.info('送出成功')
        props.history.replace('./orders/3');
      }
      else{
        message.error(res.message)
      }
    })
  }
}