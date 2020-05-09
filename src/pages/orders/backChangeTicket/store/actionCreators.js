import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { ORDERS_RCAPPLY,ORDERS_RCAPPLY_SUBMIT } from "../../../../config/api";

/**
 * 返回form列表
 */
export const goBackClick = (data) => ({
  type: actionTypes.GO_BACK,
})
/**
 * 獲取頁面數據
 */
const asyncGetPageData = (data, SerialID,TravelCode) => {
  // console.log(TravelCode)
  return {
    type: actionTypes.PAGE_DATA,
    data,
    SerialID,
    TravelCode
  }
}

 export const getPageData = (SerialID,TravelCode )=> {
   return (dispatch,getState) => {
    const SerialID = getState().ordersReducer.ticketsOutReducer.serialId;
    const TravelCode =getState().ordersReducer.ticketsOutReducer.toBeSignedID;
    const data = {
      SerialID,
      TravelCode
    }
     axios.get({ url: ORDERS_RCAPPLY, data})
       .then(data => {
         if (data.code === 1) {
           dispatch(asyncGetPageData(data.Data, SerialID));
        } else {
           message.warning(data.message);
         }
       })
       .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err) })//catch傳的是then裡面的錯誤
   }
 }

 /**
  * 隱藏modal
  */
 export const hiddenModal = () => {
  return {
    type: actionTypes.HIDDEN_MODAL,
  }
}
/**
 * 改簽查看
 */
export const changeTicketClick = (data, allTickets) => {
  return {
    type: actionTypes.CHECK_DETAIL,
    data,
    allTickets
  }
}
/**
 * 退票
 */
export const backTickets = (checked, data) => {
  return {
    type: actionTypes.GET_BACK_DATA,
    data,
    checked
  }
}


/*
 * 改簽完成
 */
export const changeTicketOk = (values, changeTicketEdit) => {
  // console.log(values)
  let maxKey = maxIndex(Object.keys(values));
  let arr = formValues(values, maxKey);
  // console.log(arr)
  let changeTicketOk = changeTicketEdit.detail.map((v,k) => {    
      if(arr.length === 0){
        return null;
      }else{
        return {...v, ...arr[k]} 
      }
  })
  return {
    type: actionTypes.CHANGE_TICKET_OK,
    changeTicketOk
  }
}
/**
* 键最后一个数字的最大值
*/
const maxIndex = (arr) => {
  let n = 0;
  for (let v of arr) {
  let i = v.substring(v.length - 1);
  if(i > 0) n = i;
  }
  return n;
  } 

/* 格式化报价数据，存为[{}]
*/
const  formValues  =  (values, maxIndex)  =>  {
  let  arr  =  Object.keys(values);
  let  result  =  [];
  for  (const  v  of  arr) {
    let  k  =  arr.indexOf(v);
    if(k <= maxIndex){
      let  obj = {
        flyDateTo: values['flyDateTo' + k].format('YYYY-MM-DD'),
        flyEndTime: values['flyEndTime' + k].format('HH:mm:ss'),
        flyStartTime: values['flyStartTime' + k].format('HH:mm:ss'),
        carNeed: values['carNeed' + k] ? 'Y' : 'N'
      }
      result.push(obj)
    }else{
      break;
    } 
  }
  return result;
}

/**
 * 保存備註
 */
export const saveRemark = (value) => ({
  type: actionTypes.SAVE_REMARK,
  value
})

/**
 * 提交
 */
export const sendForm = (values, that) => {
  return (dispatch, getState) => {
    const SerialID = sessionStorage.getItem('orderSerialid');
    const ReturnID = getState().ordersReducer.backChangeTicketReducer.backTickets;
    let ChangeDetail = getState().ordersReducer.backChangeTicketReducer.changeTicketOk;
    const Remark = values.Remark || '';
    ChangeDetail = formatChangeDetail(ChangeDetail);
    const data = {
      SerialID,
      User_id: sessionStorage.getItem('userId'),
      ReturnID: ReturnID.join(','),//按照固定的格式展示數據"ReturnID": "1,2,3"
      ChangeDetail, 
      Remark
    }
    // console.log(ChangeDetail)
    console.log(data)
    axios.post({ url: ORDERS_RCAPPLY_SUBMIT, data })
      .then(res => {
        if (res.code === 1) {
          message.success('提交成功');
          that.props.history.replace('/orders/5');
        } else {
          message.error(res.message)
        }
      })
      .catch(err => {
        message.error('提交失敗')
        console.log(err)
      })
  }
}

/**
 * 格式化改簽數據
 */
const formatChangeDetail = (arr) => {
  return arr.map(v => ({
    RepUID: v.repUniqueId,
    StartDate: v.flyDateTo,
    StartTime: v.flyStartTime,
    EndTime: v.flyEndTime,
    Car: v.carNeed
  }))
} 









