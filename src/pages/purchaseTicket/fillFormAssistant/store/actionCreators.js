import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { ASSIT_APPLY_PAGE_DATA, ASSIT_ONE_BY_ONE_ADD, ASSIT_BATH, ASSIT_DRAFT_DELETE, ASSIT_SUBMIT ,EMPNO_OUTNAME,DELETE_DRAFT } from "../../../../config/api";
import { formatDate } from '../../../../utils/';

let a = null;
//类别选择
export const selectCategoryItems = (value) => {
  return {
    type: actionTypes.CATEGORY_SELECT,
    value
  }
}
//選擇填單方式時
export const tdfsSelect = (value) => {
  return {
    type: actionTypes.SELECT_WAY,
    value
  }
}
const pageInitData = (data) => {
  return {
    type: actionTypes.PAGE_DATA,
    data,
  }
}
//权限设置
const isAssistant = (bool) => {
  return {
    type:actionTypes.ASSISTANT_AUTHORITY,
    bool,
  }
}
export const isCompletedState = (data) =>{
  return {
    type:actionTypes.IS_COMPLETED,
    data,
  }
}

//獲取頁面數據
export const getPageInitData = () => {
  return (dispatch) => {
    axios.get({ url: ASSIT_APPLY_PAGE_DATA, data: { user_id: sessionStorage.getItem('userId') } })
      .then(data => {
        if (data.code === 1) {
          a=data.data;
          dispatch(isAssistant(true));
          dispatch(pageInitData(data.data));
          if(data.data.Draft.length){
            let temp = resetDraft(data.data.Draft);
            dispatch(addFlight(temp));                   
            dispatch(isCompletedState(data.data.TripDetail));           
            message.info('請先完成未完成的訂票')
          }
        } else {
          dispatch(isAssistant(false));
          message.warning(data.message);
        }
      })
      .catch(err => { message.warning('獲取頁面數據出錯'); console.log(err); dispatch(isAssistant(false))})
  }
}
/**
 * 數據重組
 */
const resetDraft = (data) =>{
  let a = [];
  data.map((v,k)=>{
    let temp = {
        dept_a: v.Deptcode,
        empno_a: v.Empno,
        key: v.UniqueID,
        nationality_a: v.Country,
        person_a: v.Chname,
        phone_a: v.Telephone,
        sex_a: v.Sex,
        zjCategory_a: v.CertType,
        zjDate_a: formatDate(v.CertValidTime ? v.CertValidTime : (v.SignValidTime? v.SignValidTime:v.TaiwanValidTime),'-'),
        zjEnname_a: 123,
        zjNo_a: v.CertNo,
        index:k,
    }
    a.push(temp)
  })
  return a
}

//添加航程信息
export const allFlightInfo = (data) => ({
  type: actionTypes.All_FLIGHT_INFO,
  data
})
//选择国外时
export const areaSelect = (value) => {
  return {
    type: actionTypes.SELECT_FOREIGN,
    value
  }
}

/**
 * 添加航程人員信息
 */
export const addFlight = values => {
  return ({
    type: actionTypes.ADD_FLIGHT_PEOPLE_INFO,
    values
  })
}
/**
 * 点击确定保存航程信息
 */
export const flightInfo = values => {

  return {
    type: actionTypes.SAVE_FLIGHT_INFO,
    values
  }
}
/**
 * 刪除草稿
 */
export const removePerson = data =>{
  return{
    type:actionTypes.REMOVE_PERSON,
    data
  }
}
export const deleteDraft = (data) =>{
  let UserID = sessionStorage.getItem('userId');
  data.UserID = UserID;
  data.Empno = data.empno_a;
  return dispatch =>{
    axios.post({url:DELETE_DRAFT,data}).then(res =>{
      if(res.code ===1){
        dispatch(removePerson(data.empno_a));
        message.info('刪除成功');
      }
      else{
        message.error('res.message')
      }
    })
  }
}
const submitSuccess = () => {
  return {
    type: actionTypes.SUBMIT_SUCCESS,
  }
}

/**
 * 提交
 */
export const submit = (values,userInfo,selectCategorys) => {
  let data = resetOrderSubmitData(selectCategorys,userInfo,values);
  return (dispatch) => {
    axios.post({ url:ASSIT_SUBMIT , data:data})
      .then(res => {
        if(res.code ===1){
          dispatch(submitSuccess())
          dispatch(isCompletedState(false))
        }
      })
      .catch(err => {
        message.error('出现了错误')
        console.log(err)
      })
  }
}

const resetOrderSubmitData = (selectCategorys,userInfo,values) =>{
  let ApplyID = userInfo.Empno;
  let ApplyName = userInfo.ChName;
  let Deptcode = userInfo.Deptcode;
  let TravelTypeID = selectCategorys[0];
  let TravelTypeName = getTravelTypeName(selectCategorys[0]);
  let PlaceID = values.area;
  let PlaceName = values.area == 'PRC' ? '大陸':(values.area =='TW'? '台灣':'國外');
  let Remark = null;
  let VisaDate = null;
  let FamilyName = null;
  let FamilyShip = null;
  let HaveFile = 'N';
  let data = {ApplyID,ApplyName,Deptcode,TravelTypeID,TravelTypeName,PlaceID,PlaceName,Remark,VisaDate,FamilyName,FamilyShip,HaveFile};
  let formData = new FormData();
  for(let v in data){
    formData.append(v,data[v])
  }
  return data;
}
const getTravelTypeName = (id) =>{
  if(id === 'Q1') return '出差';
  if(id === 'Q2') return '返台述職';
  if(id === 'Q4') return '殤假/急難返國';
  if(id === 'Q5') return '補單';
  if(id === 'Q6') return '離職/歸仁/轉調';
}

/**
 * 工号带出姓名
 */
export const getTravelerName = (value) =>{
  return{
    type:actionTypes.EMPNO_OUTNAME,
    value
  }
}
export const getName = (id)=>{
  return dispatch =>{
      axios.get({url:EMPNO_OUTNAME,data:{Personid:id}}).then(res=>{
        if(res.code === 1){
          dispatch(getTravelerName(res.Data.PersonInfo[0]))
        }
        else{
          dispatch(getTravelerName(''))
          message.warn(res.message)
        }
      })
  }
}

function getMins(time){
  if(typeof time === 'number'){
    return (time * 60);
  }else{
    let arr = time.split(':');
    let m = arr[0] * 60 + parseInt(arr[1]);
    return m;
  }
}
const checkTime = (f, t, flag=150) => {
  let mf = getMins(f);
  let mt = getMins(t);
  let m24 = getMins(24);
  let m24q = m24 - mf;
  if( mf < mt && (mt - mf < flag) ){
    return false;
  }
  if( mf > mt && (m24q + mt < flag) ){
    return false;
  }
  if(mt === mf) {
    message.warning('出發時間與到達時間不能相等');
    return false
  }
  return true;
}   

/**
 *逐筆提交發送請求
 */
export const onebyone = (values,pageData,flightCategory) =>{
  let data = resetOneByOneData(values,pageData,flightCategory);
  let bool = true;
  return dispatch =>{ 
    // console.log(data)
    let temp = data.Detail;
    for(let i = 0 ,len = temp.length; i < len; i ++ ){
      if(!checkTime(temp[i].StartTime, temp[i].EndTime, 150)){
        message.warning(`時間區間前後相差 大於等於 ${(150/60).toFixed(2)}H`);
        bool = false;
        break;
      }
    }
    if(bool) {
      axios.post({url:ASSIT_ONE_BY_ONE_ADD,data}).then(res=>{
        if(res.code ===1){
          console.log(res)
          message.info('填寫成功')
        }
        else{
          message.error(res.message);
        }
      })
    }
  }
}
const resetOneByOneData = (values,pageData,flightCategory) => {
  for(let i in flightCategory.values.detail){
    let a = flightCategory.values.detail[i].StartAirportName;
    let b = flightCategory.values.detail[i].EndAirportName;
    flightCategory.values.detail[i].StartAirportName = getFlightPlace(a);
    flightCategory.values.detail[i].EndAirportName = getFlightPlace(b);
  }
    let temp = {
      "UserID": pageData.userInfo.Empno, 
      "UserDept": pageData.userInfo.Deptcode, 
      "Empno": values.empno_a, 
      "Chname": values.person_a, 
      "Sex": values.sex_a =='M'?'男':'女', 
      "Deptcode": values.dept_a, 
      "ChargeDept": values.gz_dept, 
      "TripType": flightCategory.values.category, 
      "Country": values.nationality_a, 
      "Telephone": values.phone_a, 
      "CertType": values.zjCategory_a, 
      "CertNo": values.zjNo_a, 
      "CertName": values.zjEnname_a, 
      "CertValidTime": formatDate(values.zjDate_a), 
      "SignValidTime": formatDate(values.visaDate) ?values.visaDate:null, 
      "TaiwanVaidTime": formatDate(values.ftSequenId1) ?values.zjDate_a :null, 
      "FanTai": values.ftSequenId1 ? values.ftSequenId1:null, 
      "ChaiLv": values.cc_formid ? values.cc_formid:null, 
      "Detail":flightCategory.values.detail,
    }
    return temp
}
const getFlightPlace = (id) =>{
    let name = null;  
    for(let i in a.Airport){
      if(a.Airport[i].Code === id){
        name = a.Airport[i].Value;
        break;
      }
    }
    return name;
}

