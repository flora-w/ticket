/* eslint-disable array-callback-return */
import axios from "../../../../axios";
import * as actionTypes from './actionTypes';
import { SPECIAL_PAGE_DATA, SPECIAL_GET_FREQUENT_CONTACT,SPECIAL_SUBMIT_DATA } from '../../../../config//api';
import { showNotification } from '../../../../utils/';
import { message, Modal } from 'antd';

const getInitPage = data => {
  return {
    type: actionTypes.GET_PAGE_DATA,
    data
  }
}

export const chooseForegin = id => {
  return {
    type: actionTypes.SELECT_FOREIGN,
    id
  }
}

export const saveTripType = data => {
  return {
    type: actionTypes.SAVE_TRIP_TYPE,
    data
  }
}

export const getPageData = () => {
  return dispatch => {
    axios.get({url: SPECIAL_PAGE_DATA, data: {user_id: sessionStorage.getItem('userId')}})
      .then( res => {
        if(res.code === 1) {
          dispatch(getInitPage(res.data));
        }
        else {
          message.error(res.message)
        }
      })
      .catch( err => {
        console.error(err);
        message.error('請聯係管理員')
      })
  }
}

const saveFrequentContact = data => {
  return {
    type: actionTypes.GET_PREQUENT_CONTACT,
    data
  }
}

const changeBtnState = bool => {
  return {
    type: actionTypes.SUBMIT_BUTTON_LOADING,
    bool
  }
}

export const getFrequentContacts = (name) => {
  return dispatch => {
    if(!name) {
      showNotification({type: 'warning', message: '警告', description: '乘機人姓名不能爲空'});
      return
    }
    axios.get({url: SPECIAL_GET_FREQUENT_CONTACT, data: {user_id: sessionStorage.getItem('userId'), name}})
      .then( res => {
        if(res.code === 1) {
          dispatch(saveFrequentContact(res.data.LinkMan));
        }
        else {
          message.error(res.message);
        }
      })
      .catch(err => {
        showNotification({type: 'error', message: '錯誤提示', description: '請聯係管理員', duration: 3});
        console.error(err);
      })
  }
}

export const getDeleteId = id => {
  return {
    type: actionTypes.DELETE_PERSON_INFO,
    id
  }
}

export const changeFrequentContact = UniqueId => {
  return {
    type: actionTypes.CHANGE_PERQUENT_CONTACT,
    UniqueId
  }
}

export const addFrequentContact = data => {
  return {
    type: actionTypes.ADD_PREQUENT_CONTACT_INFO,
    data
  }
}

export const saveJourneyData = data => {
  return {
    type: actionTypes.SAVE_JOURNEY_DATA,
    data
  }
}

export const submit = (data, history) => {
  return (dispatch, getState) => {
    dispatch(changeBtnState(true))
    const reducer = getState().fillFormReducer.specialApplyReducer;
    let _data = resetData(data, reducer);
    if(_data.PersonInfo.length === 0 ) {
      showNotification({type: 'error', message: '提交失敗', description: '乘機人信息不能為空'});
      return 
    }
    if(_data.detail.length === 0) {
      showNotification({type: 'error', message: '提交失敗', description: '行程信息不能爲空'});
      return 
    }
    axios.post({url: SPECIAL_SUBMIT_DATA, data: _data})
      .then(res => {
        dispatch(changeBtnState(false))
        if(res.code === 1) {
          Modal.info({
            title: '提交成功',
            onOk() {
              history.push('/orders/list/1')
            }
          })
        }
        else {
          message.error('提交失敗')
        }
      })
      .catch(err => {
        dispatch(changeBtnState(false))
        console.error(err);
        message.error(err);
      })
  }
}

const resetData = (data, reducer) => {
  const {TripType, baseInfo, journeyData, personInfo, personType, place} = reducer;
  let TypeID, TypeName, Code, Value;
  personType.forEach(v => {
    if(v.Code === data.category) {
      TypeID = v.Code;
      TypeName = v.Name;
    }
  })
  place.forEach(v => {
    if(v.Code === data.area) {
      Code = v.Code;
      Value = v.Value
    }
  })
  let temp = {
    ApplyID: baseInfo.Empno,
    ApplyName: baseInfo.ChName,
    Deptcode: baseInfo.Deptcode,
    ChargeDept: baseInfo.Deptcode,
    TypeID,
    TypeName,
    Code,
    Value,
    TripType,
    Remark: data.Remark,
    PersonInfo: [...personInfo],
    detail: [...journeyData]
  }
  return temp
}

//组件卸载时重置所有状态
export const resetState = () => {
  return {
    type: actionTypes.RESET_ALL_STATE
  }
}

