import * as actionTypes from "./actionTypes";

const defaultState = {
  tableData: [],
  showModal: false,
  name: null,
  searchData: [],
  orderData:[],
  isAuthority:false,
  searchCondition:{formstatus:null,travel:null},
  travelData:[],
  kmPageData:{
    fly:[],
    flyrecord:[],
  },
  kmFile:[],
  showBtn:false,
  airlineCompanyData:[],  
  flightTimeData:{
    fly:[],
    flyrecord:[],
  },
  flightTimeFile:[],
  holidayData:[],
  rpaData:[],
  quoteTimeData:[],
  quoteTempData:{},
}
/**
 * 獲取權限維護頁面數據
 */
const getPageData = (newState, action) => {
  newState.tableData = action.data.map((v, k) => ({...v, key: k}));
  newState.showModal = false;
  return newState;
}
/**
 * 權限維護保存
 */
const saveAuth = (newState, action) => {
  let temp = newState.tableData;
  temp.forEach((v,k)=>{
    if(v.key === action.data.key){
      temp[k] = action.data;
    }
  })
  newState.name = null;
  newState.tableData = temp;
  return newState;
}

/**
 * 显示模态框
 */
const showModal = (newState, action) => {
  newState.showModal = true;
  return newState;
}
/**
 * 隐藏模态框
 */
const hideModal = (newState, action) => {
  newState.showModal = false;
  return newState;
}
/**
 * 獲取名字
 */
const getName = (newState, action) => {
  newState.name = action.name;
  return newState;
}
/**
 * 获取搜索内容
 */
const getSearchData = (newState,action) => {
  newState.searchData = action.data
  return newState;
}

/**
 * 具體單據數據
 */
const getOrderData = (newState,action) =>{
  newState.orderData = action.data;
  return newState;
}
/**
 * 单据搜索权限判断
 */
const getIsAuth = (newState,action) => {
  newState.isAuthority = action.bool;
  return newState;
}
const getSearchSelect = (newState,action) =>{
  newState.searchCondition = {...action.data};
  return newState;
}

//旅行社
const getTravelData = (newState,action) => {
  newState.travelData = action.data.map((v, k) => {
    let Contact = v.Contact ? v.Contact : '';
    let Mailbox = v.Mailbox ? v.Mailbox : '';
    let ModifyBy = v.ModifyBy ? v.ModifyBy : '';
    let Telephone = v.Telephone ? v.Telephone : '' ;
    return {Contact , Mailbox , ModifyBy , Telephone , IsValid:v.IsValid , TravelName:v.TravelName , Uniqueid:v.Uniqueid , key: k}
  });
  return newState;
}
const saveTravelEdit = (newState,action) => {
  newState.travelData.forEach((v,k) => {
    if(v.Uniqueid === action.data.Uniqueid){
      newState.travelData[k] = {...v,...action.data}
    }
  })
  return newState;
}

const saveTravelAdd = (newState,action) => {
  action.data.key = newState.travelData.length;
  newState.travelData = [...newState.travelData,action.data];
  newState.showModal = false;
  return newState;
}

//公里
const getKmData = (newState,action) => {
  newState.kmPageData.fly = action.data.fly.map((v, k) => ({...v, FromTo:`${v.FromPlace} - ${v.ToPlace}`,key: k}));
  newState.kmPageData.flyrecord = action.data.flyrecord
  return newState;
}
const saveKmFile = (newState,action) => {
  newState.kmFile = action.file;
  newState.showBtn = true;
  return newState;
}
const changeState = (newState,action) => {
  newState.showBtn = action.bool;
  return newState;
}

//航空公司
const getAirlineCompanyData = (newState,action) => {
  if(action.bool){
    newState.airlineCompanyData = action.data.map((v,k)=>({...v,key:k}));
  }
  else{
    for(let i = 0,len = newState.airlineCompanyData.length ; i < len ; i ++){
      if(newState.airlineCompanyData[i].Value == action.data.Value){
        newState.airlineCompanyData[i] = action.data;
      }
    }
  }
  return newState;
}
const addAirlineCompany = (newState,action) => {
  action.data.key = newState.airlineCompanyData.length;
  newState.airlineCompanyData = [...newState.airlineCompanyData,action.data];
  newState.showModal = false;
  return newState;
}

//航空時刻表
const getFlightTimeData = (newState,action) => {
  newState.flightTimeData.fly = action.data.fly.map((v,k) => ({...v,key:k}));
  newState.flightTimeData.flyrecord = action.data.flyrecord;
  return newState
}
const saveFlightTimeFile = (newState,action) => {
  newState.flightTimeFile = action.file;
  newState.showBtn = true;
  return newState
}

//假期
const getHolidayData = (newState,action) => {
  newState.holidayData = action.data.map((v,k) => ({...v,key:k,State:'Y'}))
  return newState;
}
const addHoliday = (newState,action) => {
  newState.holidayData.push({...action.data,key:newState.holidayData.length,State:'Y'})
  newState.showModal = false;
  return newState;
}
const editHoliday = (newState,action) => {
  newState.holidayData.forEach((v,k)=>{
    if(v.Value === action.value){
        newState.holidayData.splice(k,1)
    }
  })
  return newState
}

//爬網
const getNetData = (newState,action) => {
  newState.rpaData = action.data.map((v,k)=>({...v,key:k}))
  return newState;
}
const editGetNetData = (newState,action) => {
  newState.rpaData.forEach((v,k)=>{
    if(v.Code === action.data.Code){
      newState.rpaData[k] = action.data;
    }
  })
  return newState;
}

//報價
const getQuoteTimeData = (newState,action) => {
  if(action.data){
    newState.quoteTimeData = action.data.map((v,k) => ({...v,key:k}));
  }
  return newState;
}
const editQuoteTime = (newState,action) => {
  if(action.data.edit){
    newState.quoteTempData = action.data;
    newState.name = action.data.TypeName;
  }
  else{
    newState.name = '';
    newState.showModal = false;
  }
  return newState;
}
 
export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case actionTypes.GET_PAGE_DATA:
      return getPageData(newState, action);
    
    case actionTypes.SAVE_AUTH:
      return saveAuth(newState, action);

    case actionTypes.SHOW_MODAL:
      return showModal(newState, action);

    case actionTypes.HIDE_MODAL:
      return hideModal(newState, action);

    case actionTypes.GET_NAME:
      return getName(newState, action);
      
    case actionTypes.SEARCH_RESULT:
      return getSearchData(newState,action);  

    case actionTypes.ORDER_DATA:
      return getOrderData(newState,action);

    case actionTypes.IS_AUTH:
      return getIsAuth(newState,action);
    
    case actionTypes.SEARCH_SELECT: 
      return getSearchSelect(newState,action);

    case actionTypes.TRAVEL_AUTH:
      return getTravelData(newState,action);

    case actionTypes.TRAVEL_SAVE_AUTH:
      return saveTravelEdit(newState,action);
    
    case actionTypes.TRAVEL_ADD:
      return saveTravelAdd(newState,action);

    case actionTypes.KM_MAINTAIN:
      return getKmData(newState,action);

    case actionTypes.KM_FILE:
      return saveKmFile(newState,action);

    case actionTypes.SHOW_KM_BTN:
      return changeState(newState,action);  

    case actionTypes.AIRLine_COMPANY_DATA:
      return getAirlineCompanyData(newState,action);

    case actionTypes.AIRLINE_COMPANY_ADD:
      return addAirlineCompany(newState,action) 

    case actionTypes.FLIGHT_TIME_DATA:
      return getFlightTimeData(newState,action);

    case actionTypes.FLIGHT_TIME_FILE:
      return saveFlightTimeFile(newState,action); 

    case actionTypes.HOLIDAY_DATA:
      return getHolidayData(newState,action);

    case actionTypes.HOLIDAY_ADD_DATA:
      return addHoliday(newState,action);

    case actionTypes.HOLIDAY_EDIT_DATA:
      return editHoliday(newState,action)

    case actionTypes.GET_NET_DATA:
      return getNetData(newState,action);

    case actionTypes.GET_NET_DATA_EDIT:
      return editGetNetData(newState,action);

    case actionTypes.QUOTE_TIME_DATA:
      return getQuoteTimeData(newState,action);

    case actionTypes.QUOTE_TIME_EDIT:
      return editQuoteTime(newState,action);  

    default:
        break;
  }
  return newState;
  
}