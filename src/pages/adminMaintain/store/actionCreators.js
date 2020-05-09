import axios from "../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { formatDate } from '../../../utils/';
import { MAINTAIN_AUTH, MAINTAIN_AUTH_EDIT, MAINTAIN_OUT_NAME, MAINTAIN_AUTH_ADD, ORDER_SEARCH_AUTH, ORDER_SEARCH, ORDER_DETAIL, TRAVEL_AUTHORITY, TRAVEL_AUTH_EDIT, TRAVEL_AUTH_ADD, MAINTAIN_KM, MAINTAIN_KM_UPLOAD, AIRLINE_ADD, AIRLINE_EDIT, AIRLINE_AUTH, FLIGHT_TIME_AUTH, FLIGHT_TIME_UPLOAD, HOLIDAY_ADD, HOLIDAY_AUTH, HOLIDAY_EDIT, GETNET_AUTH, GETNET_EDIT, QUOTETIME_AUTH, QUOTETIME_EDIT } from "../../../config/api";

let typeArr = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

/**
 * 封裝請求
 */
const ajax = (url, method, data) => {
  return new Promise((resolve, reject) => {
    axios[method]({ url, data, })
      .then((res, dispatch) => {
        if (res.code === 1) {
          resolve(res.data);

        } else {
          reject(res.message)
          if (res.message === '您沒有權限查看!')
            dispatch(isAuthority(false));
        }
      })
      .catch(err => {
        reject('出現錯誤');
      })
  })
}

/**
 * 錯誤類型
 */
const errorMessage = (err) => {
  if (err.message) {
    message.error(err.message);
    console.log(err)
  } else {
    message.error(err);
  }
}

/**
 * 獲取頁面數據   权限
 */
const asyncGetPageData = (data) => {
  return ({
    type: actionTypes.GET_PAGE_DATA,
    data
  })
}
export const getPageData = () => {
  return async (dispatch) => {
    try {
      const data = await ajax(MAINTAIN_AUTH, 'get', { user_id: sessionStorage.getItem('userId') });
      dispatch(isAuthority(true))
      dispatch(asyncGetPageData(data))
    } catch (error) {
      errorMessage(error);
      dispatch(isAuthority(false))
    }
  }
}

/**
 * 保存權限
 */
const asyncSaveAuth = (data) => {
  return ({
    type: actionTypes.SAVE_AUTH,
    data
  })
}
export const saveAuth = (row, table) => {
  return async (dispatch) => {
    try {
      await ajax(MAINTAIN_AUTH_EDIT, 'post', row);
      dispatch(asyncSaveAuth(row))
    } catch (error) {
      errorMessage(error);
    }
  }
}

/**
 * 显示模态框
 */
export const showModal = () => {
  return {
    type: actionTypes.SHOW_MODAL
  }
}
/**
 * 显示模态框
 */
export const hideModal = () => {
  return {
    type: actionTypes.HIDE_MODAL
  }
}

/**
 * 輸入工號帶出姓名
 */
export const asyncGetName = (name, setName) => ({
  type: actionTypes.GET_NAME,
  name,
  setName
})
export const getName = (value, ) => {
  return async (dispatch) => {
    try {
      const data = await ajax(MAINTAIN_OUT_NAME, 'get', { Auth_id: value });
      dispatch(asyncGetName(data[0].Value))
    } catch (error) {
      errorMessage(error);
    }
  }
}

/**
 * 新增確定
 */
export const addAuthOk = (values) => {
  return async (dispatch) => {
    try {
      await ajax(MAINTAIN_AUTH_ADD, 'post', values);
      message.info('新增成功')
      dispatch(getPageData())
    } catch (error) {
      errorMessage(error);
    }
  }
}

/**
 * 搜索  机票
 * 
 */
export const searchData = (data) => {
  return {
    type: actionTypes.SEARCH_RESULT,
    data,
  }
}
export const searchResult = (data) => {
  data.User_id = sessionStorage.getItem('userId');
  return dispatch => {
    axios.get({ url: ORDER_SEARCH, data: data }).then(res => {
      if (!res.data.list[0]) {
        message.info('沒有查到相關單據信息')
      }
      let data = res.data.list;
      let k = data.length;
      for (let i = 0; i < k; i++) {
        data[i].ApplyDatetime = formatDate(data[i].ApplyDatetime, '-', true);
      }
      dispatch(searchData(data))
    })
  }
}
export const resetData = () => {
  return dispatch => {
    dispatch(searchData([]))
  }
}

/**
 * 獲取具體單據的内容 机票
 * 
 */
export const orderData = (data) => {
  return {
    type: actionTypes.ORDER_DATA,
    data,
  }
}
export const getOrderData = (SerialID, formstatus) => {
  return dispatch => {
    axios.get({ url: ORDER_DETAIL, data: { SerialID, formstatus } }).then((res) => {
      if (res.code == 1) {
        let data = {
          head: res.data.head,
          record: resetOrderData(res.data.record)
        }
        dispatch(orderData(data))
      }
    })
  }
}
/**
 * 單據搜素權限  机票
 */
export const isAuthority = (bool) => {
  return {
    type: actionTypes.IS_AUTH,
    bool
  }
}
const searchSelect = data => {
  return {
    type: actionTypes.SEARCH_SELECT,
    data
  }

}
export const getIsAuth = () => {
  return dispatch => {
    axios.get({ url: ORDER_SEARCH_AUTH, data: { User_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        let data = resetSearchCondition(res.data);
        dispatch(searchSelect(data))
        dispatch(isAuthority(true));
      }
      else {
        dispatch(isAuthority(false));
        message.error(res.message)
      }
    })
  }
}
//搜索下拉数据修改   机票
const resetSearchCondition = (data) => {
  for (let k in data) {
    data[k].map(v => {
      for (let i in v) {
        if (v[i] == 'All') v[i] = '全部';
      }
    })
  }
  return data;
}
/**
 * 具體單據數據重組  机票
 */
const resetOrderData = (data) => {
  let a = [];
  let index = 0;
  data.map((v) => {
    v.Detail.map((value) => {
      index++;
      a.push({
        Chname: v.Chname,
        Sex: v.Sex,
        TripType: resetTripType(v.TripType),
        AllPrice: resetPrice(value.AllPrice),
        ChangePrice: resetPrice(value.ChangePrice),
        ChangeTime: value.ChangeTime,
        Cost: resetPrice(value.Cost),
        EndAirportName: value.EndAirportName,
        FlyNo: value.FlyNo,
        IsPublic: value.IsPublic,
        ReturnPrice: resetPrice(value.ReturnPrice),
        ReturnTime: value.ReturnTime,
        Section: value.Section,
        StartAirportName: value.StartAirportName,
        TicketTime: value.TicketTime,
        TravelName: value.TravelName,
        key: index,
      })
    })
  })
  return a;
}
const resetTripType = (data) => {
  let type = data === 'oneWay' ? '單程' : (data === 'twoWay' ? '往返' : '多程');
  return type;
}
const resetPrice = (price) => {
  price = price ? `￥${price}` : '';
  return price;
}



/***
 * 旅行社 
 */
const travelAuthData = (data) => {
  return {
    type: actionTypes.TRAVEL_AUTH,
    data
  }
}
export const getTravelData = () => {
  return dispatch => {
    axios.get({ url: TRAVEL_AUTHORITY, data: { user_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        dispatch(travelAuthData(res.data));
        dispatch(isAuthority(true));
      }
      else {
        dispatch(isAuthority(false));
        message.error(res.message)
      }
    })
  }
}
const saveTravelAuth = (data) => {
  return {
    type: actionTypes.TRAVEL_SAVE_AUTH,
    data
  }
}
export const travelSaveAuth = (row, table) => {
  row.ModifyBy = sessionStorage.getItem('userId');
  return dispatch => {
    axios.post({ url: TRAVEL_AUTH_EDIT, data: row }).then(res => {
      if (res.code === 1) {
        dispatch(saveTravelAuth(row))
        message.info('更新成功')
      }
      else {
        message.error(res.message);
      }
    })
  }
}
const addTravelData = (data) => {
  return {
    type: actionTypes.TRAVEL_ADD,
    data
  }
}
export const addTravel = (data) => {
  data.ModifyBy = sessionStorage.getItem('userId');
  let phone = data.Telephone;
  let mail = data.Mailbox;
  let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (!phoneReg.test(phone)) {
    message.info('请输入正确的手机号');
    return dispatch => { };
  }
  if (!mailReg.test(mail)) {
    message.info('请输入正确的邮箱');
    return dispatch => { };
  }
  return dispatch => {
    axios.post({ url: TRAVEL_AUTH_ADD, data: data }).then(res => {
      if (res.code === 1) {
        message.info('新增成功')
        dispatch(addTravelData(data))
      }
      else {
        message.error(res.message)
      }
    })
  }
}


//公里数维护
const KmPageData = (data) => {
  return {
    type: actionTypes.KM_MAINTAIN,
    data
  }
}
export const getKmPageData = () => {
  return dispatch => {
    axios.get({ url: MAINTAIN_KM, data: { user_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        dispatch(isAuthority(true));
        dispatch(KmPageData(res.data));
      }
      else {
        dispatch(isAuthority(false));
        message.error(res.data);
      }
    })
  }
}
export const saveUpLoadFile = (data) => {
  let file = fileType(data);
  return {
    type: actionTypes.KM_FILE,
    file
  }
}

const fileType = (file) => {
  let type = file.type;
  let temp = null;
  let index = 0;
  for (let i of typeArr) {
    if (i !== type) {
      index++;
    }
  }
  if (index !== typeArr.length) {
    temp = file;
  }
  else {
    message.warn(`请使用 .xls 或者 .xlsx 格式的文档`)
  }
  return temp;
}

export const changeBtnState = (bool) => {
  return {
    type: actionTypes.SHOW_KM_BTN,
    bool
  }
}

export const upLoadFile = (file) => {
  return (dispatch, getState) => {
    ;
    let formData = new FormData();
    formData.append('User_ID', sessionStorage.getItem('userId'));
    formData.append('file', file);
    axios.post({ url: MAINTAIN_KM_UPLOAD, data: formData }).then(res => {
      if (res.code === 1) {
        dispatch(changeBtnState(false))
        message.info('上傳成功');
      }
      else {
        message.error('上傳失敗,請檢查數據格式或文檔類型');
      }
    })
  }
}

//航空公司
const airCompany = (data, bool) => {
  return {
    type: actionTypes.AIRLine_COMPANY_DATA,
    data,
    bool
  }
}
export const getAirlineCompanyData = () => {
  return dispatch => {
    axios.get({ url: AIRLINE_AUTH, data: { user_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        dispatch(airCompany(res.data, true))
        dispatch(isAuthority(true));
      }
      else {
        dispatch(isAuthority(false))
        message.error(res.message)
      }
    })
  }
}
const airlineAdd = (data) => {
  return {
    type: actionTypes.AIRLINE_COMPANY_ADD,
    data
  }
}
export const airlineCompanyAdd = (data) => {
  data.User_ID = sessionStorage.getItem('userId');
  return dispatch => {
    axios.post({ url: AIRLINE_ADD, data }).then(res => {
      if (res.code === 1) {
        dispatch(airlineAdd(data))
        message.info('新增成功')
      }
      else {
        message.error(res.message)
      }
    })
  }
}
export const airlineCompanyEdit = (data) => {
  data.User_ID = sessionStorage.getItem('userId');
  return dispatch => {
    axios.post({ url: AIRLINE_EDIT, data }).then(res => {
      if (res.code === 1) {
        dispatch(airCompany(data, false))
        message.info('編輯成功')
      }
      else {
        message.error(res.message)
      }
    })
  }
}

//航空時刻表
const flightTimeData = (data) => {
  return {
    type: actionTypes.FLIGHT_TIME_DATA,
    data
  }
}
export const getFlightTimeData = () => {
  return dispatch => {
    axios.get({ url: FLIGHT_TIME_AUTH, data: { user_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        dispatch(isAuthority(true));
        dispatch(flightTimeData(res.data))
      }
      else {
        dispatch(isAuthority(false))
        message.error(res.message)
      }
    })
  }
}
export const flightTimeFile = (data) => {
  let file = fileType(data)
  return {
    type: actionTypes.FLIGHT_TIME_FILE,
    file
  }
}
export const uploadFlightTimeFile = (file) => {
  let formData = new FormData();
  formData.append('User_ID', sessionStorage.getItem('userId'));
  formData.append('file', file);
  return dispatch => {
    axios.post({ url: FLIGHT_TIME_UPLOAD, data: formData }).then(res => {
      if (res.code === 1) {
        dispatch(changeBtnState(false))
        message.info('上傳成功')
      }
      else {
        message.error('上傳失敗,請檢查數據格式或文檔類型')
      }
    })
  }
}


//假期
const holidayData = data => {
  return {
    type: actionTypes.HOLIDAY_DATA,
    data
  }
}
export const getHolidayData = () => {
  return dispatch => {
    axios.get({ url: HOLIDAY_AUTH, data: { user_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        dispatch(holidayData(res.data));
        dispatch(isAuthority(true));
      }
      else {
        dispatch(isAuthority(false))
        message.err(res.message)
      }
    })
  }
}
const addHolidayData = data => {
  return {
    type: actionTypes.HOLIDAY_ADD_DATA,
    data
  }
}
export const addHoliday = (data) => {
  for (let i in data) {
    data[i] = formatDate(data[i], '-')
  }
  return dispatch => {
    axios.post({ url: HOLIDAY_ADD, data }).then(res => {
      if (res.code == 1) {
        dispatch(addHolidayData(data));
        message.info('新增成功')
      }
      else {
        message.error(res.message)
      }
    })
  }
}
const editHolidayData = value => {
  return {
    type: actionTypes.HOLIDAY_EDIT_DATA,
    value
  }
}
export const editHoliday = (data) => {
  data.User_ID = sessionStorage.getItem('userId')
  if (data.State === 'Y') delete data.Value
  return dispatch => {
    axios.post({ url: HOLIDAY_EDIT, data }).then(res => {
      if (res.code === 1) {
        dispatch(editHolidayData(data.Value));
        message.info('編輯成功');
      }
      else {
        message.error(res.message)
      }
    })
  }
}



//爬網
const getNetData = data => {
  return {
    type: actionTypes.GET_NET_DATA,
    data
  }
}
export const getNetPageData = () => {
  return dispatch => {
    axios.get({ url: GETNET_AUTH, data: { user_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        dispatch(isAuthority(true));
        dispatch(getNetData(res.data))
      }
      else {
        dispatch(isAuthority(false));
        message.error(res.message);
      }
    })
  }
}
const editGetNet = data => {
  return {
    type: actionTypes.GET_NET_DATA_EDIT,
    data
  }
}
export const editGetNetData = data => {
  return dispatch => {
    axios.post({ url: GETNET_EDIT, data }).then(res => {
      if (res.code === 1) {
        dispatch(editGetNet(data));
        message.info('編輯成功')
      }
      else {
        message.error(res.message)
      }
    })
  }
}


//報價
const quoteTimeData = data => {
  return {
    type: actionTypes.QUOTE_TIME_DATA,
    data
  }
}
export const getQuoteTime = () => {
  return dispatch => {
    axios.get({ url: QUOTETIME_AUTH, data: { user_id: sessionStorage.getItem('userId') } }).then(res => {
      if (res.code === 1) {
        dispatch(isAuthority(true));
        dispatch(quoteTimeData(res.data))
      }
      else {
        dispatch(isAuthority(false));
        message.error(res.message)
      }
    })
  }
}
export const quoteTimeEdit = data => {
  return {
    type: actionTypes.QUOTE_TIME_EDIT,
    data
  }
}
export const editQuoteTime = (temp, data) => {
  data = { ...data, ...temp, User_id: sessionStorage.getItem('userId') }
  delete data.edit
  return (dispatch) => {
    axios.post({ url: QUOTETIME_EDIT, data }).then(res => {
      if (res.code === 1) {
        dispatch(quoteTimeEdit(data));
        message.info('編輯成功')
      }
      else {
        message.error(res.message)
      }
    })
  }
}