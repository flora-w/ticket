import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { message } from "antd";
import { FAMILY, ADD_FAMILY, DELETE_FAMILY } from "../../../../config/api";
import { formatDate } from '../../../../utils/index';

/**
 * 获取页面数据
 */
const asyncGetPageData = data =>{
  return {
    type: actionTypes.PAGE_DATA,
    data
  }
}
const isAuthority = bool => {
  return{
    type:actionTypes.FAMILY_AUTHORITY,
    bool,
  }
}
export const getPageData = (history) => {
  return (dispatch) => {
    const user_id = sessionStorage.getItem('userId');
    axios.get({url: FAMILY, data: {user_id}})
    .then(data => {
      if(data.code === 1){
        let temp = resetPageData(data.data)
        dispatch(asyncGetPageData(temp))
        dispatch(isAuthority(true))
      }else{
        message.warning(data.message);
        dispatch(isAuthority(false));
      }
    })
    .catch(err => {
      dispatch(isAuthority(false))
      console.log('獲取頁面數據出錯',err)
    })
  }
}
const resetPageData = data => {
  data.BaseInfo = data.BaseInfo.map(v => ({...v,HireDate:formatDate(v.HireDate)}));
  for(let i = 0 ; i < data.Table.length ; i ++ ){
    data.Table[i].Detail =  data.Table[i].Detail.map(v=>({
      ...v,
      CertValidTime:v.CertValidTime ? formatDate(v.CertValidTime) : '' ,SignValidTime:v.SignValidTime ? formatDate(v.SignValidTime) : '' ,TaiwanValidTime:v.TaiwanValidTime ? formatDate(v.TaiwanValidTime) :'' 
    }))
  }
  return data
}
/**
 * 显示模态框
 */
export const addShow = () => ({type: actionTypes.SHOW_MODAL})
/**
 * 隐藏模态框
 */
export const hiddenModal = () => ({type: actionTypes.HIDDEN_MODAL})

/**
 * 区域新增
 */
export const areaData = data => {
  return {
    type: actionTypes.AREA_DATA,
    data
  }
}
/**
 * 家屬姓名改變時
 */
export const familyChange = data => {
  return {
    type: actionTypes.FAMILY_CHANGE,
    data
  }
}
/**
 * 新增卡信息
 */
export const addCardInfo = data => {
  return {
    type: actionTypes.ADD_CARD_INFO1,
    data
  }
}
/**
 * 新增眷属
 */
export const addFamilyInfo = (baseInfo, personInfo, cardInfo) => {
  const detail = cardInfo.map( v => {
    if(!('SignValidTime' in v)){ v.SignValidTime = null;}
    if(!('TaiwanValidTime' in v)){ v.TaiwanValidTime = null;}
    return v;
  })
  const data = {
    Empno: baseInfo.Empno,
    ChName: baseInfo.ChName,
    Deptcode: baseInfo.Deptcode,
    FaName: personInfo.familyName,
    Sex: personInfo.sex,
    Ship: personInfo.relation,
    Detail: detail
  }
  return dispatch => {
    axios.post({url: ADD_FAMILY, data,})
    .then(data => {
      if(data.code === 1){
        message.success('添加成功');
        dispatch(hiddenModal());
        dispatch(getPageData());
      }else{
        message.warning(data.message);
      }
    })
    .catch(err => {
      console.log('新增眷属失败',err)
    })
  }
}
/**
 * 删除
 */
export const deleteFamilyInfo = (baseInfo, value) => {
  let detail = value.detail.map(v => ({UID: v.UID}));
  let data = {
    Empno: baseInfo.Empno,
    UID: value.id,
    Detail: detail,
  };
  return dispatch => {
    axios.post({url: DELETE_FAMILY, data})
    .then(data => {
      if(data.Code === 1){
        message.success('删除成功');
        dispatch(getPageData());
      }else{
        message.warning(data.message);
      }
    })
    .catch(err => {
      console.log('删除增眷属失败',err)
    })
  }
} 
/**
 * 编辑
 */
export const edit = data => ({
  type: actionTypes.EDIT,
  data
})