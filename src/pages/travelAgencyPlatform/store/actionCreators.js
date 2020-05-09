import * as actionTypes from "./actionTypes";
import axios from "../../../axios";
import { formatDate } from '../../../utils'
import { WAIT_FOR_QUOTE, WAIT_FOR_QUOTE_START, QUOTE_START, FILL_FLIGHT_NO, END_QUOTE, HAD_QUOTE, AGAIN_QUOTE, AGAIN_QUOTE_END, HAD_QUOTE_DETAIL, TICKET_LIST, TICKET_LIST_DETAIL, TICKET_OK, TICKET_OUT_LIST, TICKET_OUT_LIST_DETAIL1, TICKET_OUT_LIST_DETAIL2, BACK_CHANGE_TICKET_LIST, BACK_CHANGE_TICKET_LIST_DETAIL, BACK_CHANGE_TICKET_QUOTE, TRAVEL_GENCY_INFO, BACK_TICKET_LIST, BACK_TICKET_LIST_DETAIL, CHANGE_TICKET_LIST, CHANGE_TICKET_LIST_DETAIL, BACK_TICKET_LIST_DETAIL_END, CHANGE_TICKET_LIST_DETAIL_END, BACK_CHANGE_TICKET_END ,GIVE_UP} from "../../../config/api";
import { message } from "antd";
import { getUrlParam } from "../../../utils";
/**
 * 獲取帶報價列表
 */
const asyncGetPageData = data => ({
  type: actionTypes.PAGE_DATA,
  data
})
export const getPageData = () => {
  return dispatch => {
    const User_id = sessionStorage.getItem('userId');
    axios.get({url: WAIT_FOR_QUOTE, data:{ User_id }})
    .then(data => {
      if(data.code === 1){
        dispatch(asyncGetPageData(data.data));
      }else{
        message.warning("獲取頁面數據出錯");
      }
    })
    .catch(err => {
      message.warning("獲取頁面數據出錯");
    })
  }
}
/**
 * 獲取報價數據
 */
const asyncGetWillQuote = (data, quoteTime, serialId) => ({
  type: actionTypes.WILL_QUOTE_PAGE,
  data,
  quoteTime,
  serialId
})
export const getWillQuote = data => {
  let params ={}
  if(data){
     params = {
      SerialID: data.SerialID,
      QuoteTime: data.QuoteTime,
      User_id: sessionStorage.getItem('userId')
    }
  }
  return dispatch => {
    axios.get({url: WAIT_FOR_QUOTE_START, data: params})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetWillQuote(res.data, data.QuoteTime, data.SerialID));
      }else{
        message.warning(res.message);
      }
    })
    .catch(err => {
      message.warning("獲取頁面數據出錯");
      console.log(err)
    })
  }
}
/**
 * 点击开始报价
 */
const asyncQuotePriceClick = (res, data, sid, edit) => ({
  type: actionTypes.QUOTE_STATR,
  data,
  res,
  sid,
  edit
})
export const quotePriceClick = (data, sid, edit=false) => {
  return (dispatch, getState) => {
    let params = {}, url;
    //區分第一次報價和再次報價
    const againPrice =  getState().travelAgencyPlatformReducer.againPrice;//是否是再次報價
    const serialId =  getState().travelAgencyPlatformReducer.serialId;
    const allFlight =  getState().travelAgencyPlatformReducer.hadQuote; //整個單子的所有行程
    // console.log(121212, allFlight, againPrice)
    if(againPrice){
      const modifyFlight = getFlight(allFlight, data.name, data.category); //要修改的行程
      const uids = modifyFlight.map(v => v.uniqueId); //行程uniqueid，需要提交到後臺
      params = {
        QuoteTime: getState().travelAgencyPlatformReducer.quoteTime, 
        User_id: sessionStorage.getItem('userId'), 
        UID: uids.join(),
        Serialid: serialId
      };
      url = AGAIN_QUOTE;
    }else{
      params = {
        QuoteTime: getState().travelAgencyPlatformReducer.quoteTime, 
        Empno: data.empno, 
        Chname: data.name,
        Serialid: serialId
      };
      url = QUOTE_START;
    }
    console.log(params)
    axios.get({url, data: params})
    .then(res => {
      // console.log(res)
      if(res.code === 1){
        dispatch(asyncQuotePriceClick(res.data, data, sid, edit));
      }else{
        message.warning(res.message);
      }
    })
    .catch(err => {
      message.warning("獲取頁面數據出錯");
      console.log(err)
    })
  }
  
}
/**
 * 獲取在整張單子中所有有關的行程信息
 */
const getFlight = (data, name, category) => {
  let result = [];
    for (const v of data) {
        if(name == v.name && category == v.category){
            result.push(v);
        }
    }
    return result;
}

/**
 * 当报价时选择证件类型带出姓名，证件号码，有效期
 */
export const cardAndCompanyChange = (data, id) => ({
  type: actionTypes.CARD_CHANGE,
  data,
  id
})

/**
 * 填写航班号
 */
const asyncFlightNoChange = (data, k, form) => ({
  type: actionTypes.FLIGHT_NO_CHANGE,
  data,
  k,
  form
})
export const flightNoChange = (v, k, form) => {
  return dispatch => {
    let params = {
      Flight: v,
    };
    axios.get({url: FILL_FLIGHT_NO, data: params})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncFlightNoChange(res.data, k, form));
      }else if(res.code === 3){
        let obj = {
          Flight: "",
          FromPlace: "",
          ToPlace: "",
          WeekFly: "",
          StartTime: "",
          EndTime: ""
        }
        dispatch(asyncFlightNoChange(obj, k, form));
      }else{
        message.warning(res.message);
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  
}

/**
 * 隱藏madal
 */
export const hiddenModal = () => ({
  type: actionTypes.HIDDEN_MODAL,
})

/**
 * 键最后一个数字的最大值
 */
const maxIndex = (arr) => {
  let n = 0;
  for (let v of arr) {
    let i = v.substring(v.length - 1);
    if(i > 0) n = i;
  }
  return n;
}
/**
 * 格式化报价数据，存为[{}]
 */
const formValues = (values, maxIndex) => {
  let arr = Object.keys(values);
  let result = [];
  for (const v of arr) {
    let k = arr.indexOf(v);
    if(k <= maxIndex){
      let obj = {
        flightNo: values['flightNo' + k],
        leavel: values['leavel' + k],
        money: values['money' + k],
        placeFrom: values['placeFrom' + k],
        placeTo: values['placeTo' + k],
        timeStart: formatDate(values['timeStart' + k],'/',true),
      }
      result.push(obj)
    }else{
      break;
    }
  }
  return result;
}
/**
 * 确定报价
 */
export const quoteOk = values => {
  let maxKey = maxIndex(Object.keys(values));
  let valuesArr = formValues(values, maxKey);
  return {
    type: actionTypes.QUOTE_OK,
    data: valuesArr
  }
}
/**
 * 重置組件狀態
 */
export const resetState = () => {
  return {
    type: actionTypes.RESET_STATE
  }
}
/**
 * 提交時loading
 */
export const submitLoading = () => {
  return { type: actionTypes.SUBMIT_LOADING }
}
/**
 * 報價完成
 */
const asyncQuoteComplete = () =>{
  return {
    type: actionTypes.QUOTE_COMPLETE
  }
}
export const quoteComplete = (that) => {
  return (dispatch, getState) => {
    dispatch(submitLoading())
    let hadQuote = getState().travelAgencyPlatformReducer.hadQuote;
    let serialId = getState().travelAgencyPlatformReducer.serialId;
    let quotePrice = getState().travelAgencyPlatformReducer.quotePrice;  
    let quoteTime = getQuoteTime(serialId, quotePrice); 
    console.log(quoteTime)
    quoteTime = formatDate(quoteTime, '-', true);
    let url;
    const againPrice =  getState().travelAgencyPlatformReducer.againPrice;
    let data = hadQuote.map(v => {
      return {
        RepUID: v.uniqueId,
        SerialID: serialId,
        EmpNo: v.empno,
        ChName: v.name,
        FlyNo: v.flightNo,
        StartAirPort: v.placeFrom,
        ArriveAirPort: v.placeTo,
        ClassType: v.leavel,
        FlyStime: v.timeStart,
        Cost: v.money,
        TravelCode: sessionStorage.getItem('userId'),
        ipcode:v.ipcode,
        remark:v.remark
      }
    })
    if(againPrice){
      quoteTime = getState().travelAgencyPlatformReducer.quoteTime;
      url = AGAIN_QUOTE_END;
      data = hadQuote.map(v => {
        return {
          UniqueID: v.uniqueId,
          SerialID: serialId,
          EmpNo: v.empno,
          ChName: v.name,
          FlyNo: v.flightNo,
          StartAirPort: v.fromAirport,
          ArriveAirPort: v.arriveAirport,
          ClassType: v.leavel,
          FlyStime: v.timeStart,
          Cost: v.money,
          TravelCode: sessionStorage.getItem('userId'),
          ipcode:v.ipcode,
          remark:v.remark
        }
      })
      data = data.filter(v => v.FlyStime != null);
    }else{
      url = END_QUOTE;
    }
    const User_id = sessionStorage.getItem('userId');
    console.log(data);
    axios.post({url, data: {data, QuoteTime: quoteTime, User_id},  format: true })
    .then(res => {
      if(res.code === 1){
        dispatch(resetState())
        message.success("報價成功");
        againPrice? that.props.history.replace('/travel-agency/quote-price-complete') : that.props.history.replace('/travel-agency/quote-price');
        dispatch(asyncQuoteComplete());
      }else{
        message.warning(res.message);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}
/**
 * 獲取報價時間
 */
const getQuoteTime = (serialid, arr) => {
  for (const v of arr) {
    if(v.SerialID === serialid){
      return v.QuoteTime;
    }
  }
  return null;
}


////////////////////////////////////已報價
/**
 * 獲取已報價頁面數據
 */
const asyncGetCompletePageData = data => ({
  type: actionTypes.QUOTE_COMPLETE_LIST,
  data
} 
)
export const getCompletePageData = () => {
  return dispatch => {
    const User_id = sessionStorage.getItem('userId');
    axios.get({url: HAD_QUOTE, data: { User_id }})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetCompletePageData(res.data))
      }else{
        message.warning(res.message)
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
}
/**
 * 獲取已報價數據明细
 */
const asyncGetHadQuote = (data, quoteTime, serialId) => ({
  type: actionTypes.HAD_QUOTE_PAGE_DETAIL,
  data,
  quoteTime,
  serialId
})
export const getHadQuote = data => {
  let params ={}
  const User_id = sessionStorage.getItem('userId');
  if(data){
     params = {
      SerialID: data.SerialID,
      QuoteTime: data.QuoteTime,
      User_id
    }
  }
  return dispatch => {
    axios.get({url: HAD_QUOTE_DETAIL, data: params})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetHadQuote(res.data, data.QuoteTime, data.SerialID));
      }else{
        message.warning(res.message);
      }
    })
    .catch(err => {
      message.warning("獲取頁面數據出錯");
      console.log(err)
    })
  }
}
/////////////////////////////////////////////////待出票
//獲取待出票列表數據
const asyncGetWaitTicketOutList = data => {
  return {
    type: actionTypes.WAIT_TICKET_OUT,
    data,
  }
}
export const getWaitTicketOutList = () => {
  return dispatch => {
    let User_id = sessionStorage.getItem('userId');
    axios.get({url:TICKET_LIST, data: {User_id},})
    .then(res => {
      if(res.code === 1){
        let data = res.data;
        let k = data.length;
        if(data){
          for(let i = 0 ;i < k ;i++){
            data[i].ApplyDatetime = formatDate(data[i].ApplyDatetime,'-',true)
          }
        }
        dispatch(asyncGetWaitTicketOutList(data));
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('獲取頁面數據出錯2');
      console.log(err)
    })
  }
}

/**
 * 獲取待出票明細
 */
const asyncGetWaitForTicketDetail = data => ({
  type: actionTypes.WAIT_FOR_TICKET_DETAIL,
  data
})
export const getWaitForTicketDetail = (form, history) => {
  return dispatch => {
    let User_id = sessionStorage.getItem('userId');
    let data;
    if(form){
      data = {
        SerialID: form.SerialID,
        User_id,
        isSubmit: form.issubmit,
        QuotedNum: form.QuotedNum
      }
    }else{
      history.push('/travel-agency/wait-ticket-out');
      return;
    }
     
    axios.get({url: TICKET_LIST_DETAIL, data,})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetWaitForTicketDetail(res.data));
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('數據獲取錯誤');
      console.log(err)
    })
  }
}
/**
 * 上傳附件
 */
export const uploadFile = file => ({
  type: actionTypes.UPLOAD_FILE,
  file,
})
/**
 * 上傳附件
 */
export const asyncWaitForTicketOk = file => ({
  type: actionTypes.UPLOAD_FILE,
  file,
})
export const waitForTicketOk = (form, history) => {
  return (dispatch, getState) => {
    let User_id = sessionStorage.getItem('userId');
    let formData = new FormData();
    formData.append('User_id', User_id);
    formData.append('SerialID', form.SerialID);
    formData.append('QuotedNum', form.QuotedNum);
    formData.append('isSubmit', form.issubmit);
    let file = getState().travelAgencyPlatformReducer.file;
    formData.append('file', file);
    axios.post({url:TICKET_OK, data: formData,})
    .then(res => {
      if(res.code === 1){
        history.push('/travel-agency/wait-ticket-out');
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('保存出錯');
      console.log(err)
    })
  }
}
/**
 * 放弃出票
 */
export const asyncWaitForTicketGiveUp = () => ({
  type: actionTypes.GIVE_UP,
  
})
export const waitForTicketGiveUp = (form, history) => {
  return (dispatch, getState) => {
    let User_id = sessionStorage.getItem('userId');
    let formData = new FormData();
    formData.append('User_id', User_id);
    formData.append('SerialID', form.SerialID);
    formData.append('QuotedNum', form.QuotedNum);
    formData.append('isSubmit', form.issubmit);
    axios.post({url:GIVE_UP, data: formData,})
    .then(res => {
      if(res.code === 1){
        history.push('/travel-agency/wait-ticket-out');
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('保存出錯');
      console.log(err)
    })
  }
}

/**
 * 已出票列表
 */
const asyncGetTicketOutList = data => {
  return {
    type: actionTypes.TICKET_LIST,
    data
  }
}
export const getTicketOutList = () => {
  return (dispatch) => {
    let User_id = sessionStorage.getItem('userId');
    
    axios.get({url:TICKET_OUT_LIST, data:{User_id}})
    .then(res => {
      if(res.code === 1){
        let data = res.data;
        if(data.normal){
          for(let i = 0; i < data.normal.length ; i ++ ){
            data.normal[i].ApplyDatetime = formatDate(data.normal[i].ApplyDatetime,'-',true);
            data.normal[i].TicketTime = formatDate(data.normal[i].TicketTime,'-',true);
          }
        }
        if(data.abnormal){
          for(let i = 0; i < data.abnormal.length ; i ++ ){
            data.abnormal[i].ApplyDatetime = formatDate(data.abnormal[i].ApplyDatetime,'-',true);
            data.abnormal[i].TicketTime = formatDate(data.abnormal[i].TicketTime,'-',true);
          }
        }
        dispatch(asyncGetTicketOutList(res.data));
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('頁面數據獲取出錯');
      console.log(err)
    })
  }
}
/**
 * 已出票明細
 */
const asyncGetTicketOutDetail = data => {
  return {
    type: actionTypes.TICKET_OUT_DETAIL,
    data
  }
}
/**
 * 已出票退改簽明細
 */
const asyncGetBackChangeTicketOutDetail = data => {
  return {
    type: actionTypes.BACK_CHANGE_TICKET_OUT_DETAIL,
    data
  }
}
export const getTicketDetail = (form, history) => {
  return (dispatch) => {
    let User_id = sessionStorage.getItem('userId');  
    let url = '';
    let data = {};
    if(form){
      data = {
        SerialID: form.SerialID,
        User_id,
        isSubmit: form.issubmit || '',
        QuotedNum: form.QuotedNum || ''
      }
      //如果是p81f007則是退改簽
      if(/^P81F007/i.test(form.SerialID)){
        url = TICKET_OUT_LIST_DETAIL2;
        ticketOutDetail(url, data, asyncGetBackChangeTicketOutDetail, dispatch);
      } else{
        url = TICKET_OUT_LIST_DETAIL1;
        ticketOutDetail(url, data, asyncGetTicketOutDetail, dispatch);
      }
    }else{
      history.push('/travel-agency/ticket-out');
    } 
  }
}

/**
 * 已出票退改簽明細
 */
const ticketOutDetail = (url, data, cb, dispatch) => {
  axios.get({url, data})
  .then(res => {
    if(res.code === 1){
      dispatch(cb(res.data));
    }else{
      message.error(res.message);
    }
  })
  .catch(err => {
    message.error('頁面數據獲取出錯');
    console.log(err)
  })
}

/**
 * 獲取退改簽列表
 */
const asyncGetBackAndChange = data => {
  return {
    type: actionTypes.BACK_CHANGE_TICKET_LIST,
    data
  }
}
export const getBackAndChange = () => {
  return (dispatch) => {
    let User_id = sessionStorage.getItem('userId');
    axios.get({url:BACK_CHANGE_TICKET_LIST, data: {User_id}})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetBackAndChange(res.data));
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('頁面數據獲取出錯');
      console.log(err)
    })
  }
}
/**
 * 獲取退改簽列表明細
 */
const asyncGetBackChangeTicketDetail = (data, serialId) => {
  return {
    type: actionTypes.BACK_CHANGE_TICKET_LIST_DETAIL,
    data,
    serialId
  }
}
export const getBackChangeTicketDetail = ( params ) => {
  return (dispatch, getState) => {
    let formId = getUrlParam(params, 'formId');
    let formLists = getState().travelAgencyPlatformReducer.backChangeList;
    let formData = getFormDataByFormId(formId, formLists);
    let User_id = sessionStorage.getItem('userId');
    let data = {};
    // setState().travelAgencyPlatformReducer.quoteTime - 
    if(formData){
      data = {
        User_id,
        SerialID: formId,
      };
    }
    axios.get({url:BACK_CHANGE_TICKET_LIST_DETAIL, data})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetBackChangeTicketDetail(res.data, formId));
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('頁面數據獲取出錯');
      console.log(err)
    })
  }
}
/**
 * 退改簽報價
 */
const asyncBackChangeTicketQuote = (res, data, edit, backChange=true) => ({
  type: actionTypes.BACK_CHANGE_TICKET_QUOTE,
  res,
  data,
  edit,
  backChange
})
export const backChangeTicketQuote = (flight, serialId, edit = false) => {
  let userId = sessionStorage.getItem('userId');
  let data = {
    SerialID: serialId,
    User_id: userId,
    Empno: flight.empno,
    TripType: flight.category === '單程'? 'oneWay' : flight.category === '多程'? 'manyWay' : 'twoWay'
  }
  return dispatch => {
    axios.get({url: BACK_CHANGE_TICKET_QUOTE, data,})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncBackChangeTicketQuote(res.data, flight, edit))
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      console.log(err);
      message.error('頁面出錯');
    })
  }
}

/**
 * 退改簽確定報價
 */
export const backChangeOk = (changeTicket, cost) => {
  if(changeTicket){
    let maxKey = maxIndex(Object.keys(changeTicket));
    let valuesArr = formValues(changeTicket, maxKey);
    return{
      type: actionTypes.BACK_CHANGE_OK,
      data: valuesArr,
      cost
    }
  }else{
    return{
      type: actionTypes.BACK_CHANGE_OK,
      data: '',
      cost
    }
  }
}
/**
 * 退改簽結束報價
 */
export const backChangeEnd = (that) => {
  return (dispatch, getState) => {
    const url = BACK_CHANGE_TICKET_END; //接口地址
    let hadQuote = getState().travelAgencyPlatformReducer.hadQuote; // 獲取已退改簽數據
    let serialId = getState().travelAgencyPlatformReducer.serialId; //獲取此單流水號
    let userId = sessionStorage.getItem('userId'); //當前旅行社帳號
    //個人信息、流水號和退改簽金額行程組合在一起
    let data = hadQuote.map( v => {
      return {
        SerialID: serialId,
        ReturnPrice: v.backCost,
        ChangePrice: v.changeCost,
        Empno: v.empno,
        TripType: v.category === '單程' ? 'oneWay' : v.category === '往返' ? 'twoWay' : 'manyWay',
        ChangeDetail: [
          {
            RepUID: v.uniqueId,
            SerialID: serialId,
            EmpNo: v.empno,
            ChName: v.name,
            FlyNo: v.flightNo,
            StartAirPort: v.placeFrom,
            ArriveAirPort: v.placeTo,
            ClassType: v.leavel,
            FlyStime: v.timeStart,
            Cost: null,
            TravelCode: userId
          }
        ]
      }

    })
    //提交數據
    axios.post({url, data: {data, User_id: userId}, format: true})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetWaitBackTicketList(res.data));
        that.props.history.replace('/travel-agency/back-change-ticket'); //跳轉到退改簽報價列表
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('頁面數據獲取出錯');
      console.log(err)
    })
  }
}

//點擊單號獲取對應單號信息
const getFormDataByFormId = (id, data) => {
  for (const v of data) {
    if(v.SerialID === id){
      return v;
    }
  }
  return null;
}

/**
 * 獲取待退票列表
 */
const asyncGetWaitBackTicketList = (data, id) => {
  return {
    type: actionTypes.BACK_CHANGE_TICKET_LIST,
    data,
    id
  }
}
export const getWaitBackTicketList = id => {
  const url = id === '1'? BACK_TICKET_LIST : CHANGE_TICKET_LIST;
  return (dispatch) => {
    let User_id = sessionStorage.getItem('userId');
    axios.get({url, data: {User_id}})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetWaitBackTicketList(res.data, id));
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('頁面數據獲取出錯');
      console.log(err)
    })
  }
}

/**
 * 獲取待退票列表明細
 */
const asyncGetWaitBackTicketDetail = (data, serialId) => {
  return {
    type: actionTypes.WAIT_BACK_CHANGE_TICKET_LIST_DETAIL,
    data,
    serialId
  }
}
export const getWaitBackTicketDetail = (serialId, id) => {
  const url = id === '1'? BACK_TICKET_LIST_DETAIL : CHANGE_TICKET_LIST_DETAIL
  return (dispatch) => {
    const userId = sessionStorage.getItem('userId');
    axios.get({url, data: {SerialID: serialId, User_id: userId}})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncGetWaitBackTicketDetail(res.data, serialId));
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('頁面數據獲取出錯');
      console.log(err)
    })
  }
}

/**
 * 待退改签上傳凭证
 */
export const waitBackChangeUpload = file => ({
  type: actionTypes.WAIT_BACK_CHANGE_UPLOAD,
  file
})

/**
 * 待退票改簽提交
 */
export const waitBackChangeSubmit = (history, id) => {
  const url = id === '1'? BACK_TICKET_LIST_DETAIL_END : CHANGE_TICKET_LIST_DETAIL_END
  return (dispatch, getState) => {
    let formData = new FormData();
    const serialId = getState().travelAgencyPlatformReducer.serialId;
    const file = getState().travelAgencyPlatformReducer.waitBackChangeUpload;
    const userId = sessionStorage.getItem('userId');
    console.log(serialId, file, userId )
    formData.append('file', file);
    formData.append('User_id', userId);
    formData.append('SerialID', serialId);
    axios.post({url, data: formData})
    .then(res => {
      if(res.code === 1){
        history.replace('/travel-agency/ticket-out');
      }else{
        message.error(res.message);
      }
    })
    .catch(err => {
      message.error('頁面數據獲取出錯');
      console.log(err)
    })
  }
}

/**
 * 個人中心資料
 */
const asyncTravelAgencyInfo = data => ({
  type: actionTypes.TRAVEL_GENCY_INFO,
  data,
})
export const travelAgencyInfo = () => {
  const User_id = sessionStorage.getItem('userId');
  return dispatch => {
    axios.get({url: TRAVEL_GENCY_INFO, data: {User_id}})
    .then(res => {
      if(res.code === 1){
        dispatch(asyncTravelAgencyInfo(res.data))
      }else{
        message.warning(res.message);
      }
    })
    .catch(error => {
      console.log(error);
      message.error('獲取信息錯誤')
    })
  }
}

/**
 * 修改個人資料
 */
export const modifyPwd = values => {
  return dispatch => {
    axios.get({url: TRAVEL_GENCY_INFO, data: {values}})
    .then(res => {
      if(res.code === 1){
        message.success('修改成功');
        dispatch(null)
      }else{
        message.warning(res.message);
      }
    })
    .catch(error => {
      console.log(error);
      message.error('獲取信息錯誤')
    })
  }
}
