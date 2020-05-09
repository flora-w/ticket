
import * as actionTypes from './actionTypes';
import { message, Modal } from 'antd';
import axios from '../../../../axios/';
import { SPRING_PAGE_DATA, SPRING_PERSON_DATA, SPRING_SUBMIT_DATA, SPRING_UPLOAD_FILE} from '../../../../config/api'


const initData = data => {
  return {
    type: actionTypes.GET_PAGE_DATA,
    data
  }
}

/**
 * 初始化
 */
export const getPageData = () => {
  return dispatch => {
    axios.get({url: SPRING_PAGE_DATA, data: {user_id: sessionStorage.getItem('userId')}})
      .then(res => {
        if(res.code === 1) {
          dispatch(initData(res.data));
        }
        else {
          message.error(res.message);
        }
    }).catch(err => {
      console.error(err);
      message.error('請聯係管理員');
    })
  }
}

export const changeType = data => {
  return {
    type: actionTypes.FILL_FORM_TYPE,
    data
  }
}

const savePersonData = data => {
  return {
    type: actionTypes.GET_FAMILY_INFO,
    data
  }
}
/**
 * 
 * @param {string} Personid 人員信息
 */
export const getPersonData = Personid => {
  return dispatch => {
    axios.get({url: SPRING_PERSON_DATA, data: {Personid}})
      .then(res => {
        if(res.code === 1) {
          dispatch(savePersonData(res.Data.PersonInfo))
        }
        else {
          message.warning(res.message);
        }
      }).catch(err => {
        console.error(err);
        message.error('請聯係管理員');
      })
  }
}

export const getCurrentPerson = empno => {
  return {
    type: actionTypes.CURRENT_PERSON_EMPNO,
    empno
  }
}

export const saveJourneyData = data => {
  message.info('添加成功');
  return {
    type: actionTypes.SAVE_JOURNEY_DATA,
    data
  }
}

export const saveTextArea = data => {
  return {
    type: actionTypes.SAVE_TEXTAREA_VALUE,
    data
  }
}

export const deleteJourneyData = id => {
  return {
    type: actionTypes.DELETE_JOURNEY_DATA,
    id
  }
}

const changeSubmitState = bool => {
  return {
    type: actionTypes.IS_SUBMIT_LOADING,
    bool
  }
}

const saveExcelData = data => {
  return {
    type: actionTypes.SAVE_EXCEL_DATA,
    data
  }
}

const saveUploadSerialid = id => {
  return {
    type: actionTypes.SAVE_UPLOAD_SERIALID,
    id
  }
}

/**
 * 
 * @param {file}} file 上傳文件，轉存數據
 */
export const uploadExcel = file => {
  return dispatch => {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('Data', JSON.stringify({UserID: sessionStorage.getItem('userId')}))
    axios.post({url: SPRING_UPLOAD_FILE, data: formData})
      .then(res => {
        if(res.code === 1) {
          const data = resetData(res.draft);
          dispatch(saveExcelData(data));
          dispatch(saveUploadSerialid(res.serialID));
        }
        else {
          message.error(res.message)
        }
      }).catch(err => {
        console.error(err);
        message.error('請聯係管理員');
      })
  }
}

export const submitData = (history) => {
  return (dispatch, getState) => {
    dispatch(changeSubmitState(true));
    const { baseInfo, fillType, journeyInfo, textAreaData, journeyData, uploadSerialid } = getState().fillFormReducer.springFestivalApplyReducer;
    if(!journeyInfo.length && fillType === 'onebyone') {
      message.warning('請填寫完整信息');
      return 
    }
    if(!journeyData.length &&  fillType === 'batchUpload') {
      message.warning('請上傳文檔');
      return
    }
    const data = {
      ApplyId: baseInfo.Empno,
      ApplyName: baseInfo.ChName,
      Deptcode: baseInfo.Deptcode,
      IsBatch:  fillType === 'onebyone' ? 'N' : 'Y',
      Remark: textAreaData,
      SerialID: fillType === 'onebyone' ? '' : uploadSerialid,
      detail: fillType === 'onebyone' ? [...journeyInfo] : []
    }
    // console.log(data)
    axios.post({url: SPRING_SUBMIT_DATA, data}).then(res => {
      console.log(res)
      dispatch(changeSubmitState(false));
      if(res.code === 1) {
        Modal.info({
          title: '提交成功',
          onOk() {
            history.push('/orders/list/1')
          }
        })
      }
      else {
        message.error(res.message)
      }
    }).catch(err => {
      console.error(err);
      message.error('請聯係管理員')
    })
  }
}

const resetData = data => {
  let temp = [];
  for(let i = 0,len = data.length;  i< len; i++) {
    let Chname = data[i].Chname,
        Empno = data[i].UserID;
    for(let j = 0; j< data[i].Detail.length; j++) {
      if(data[i].Detail[j].UniqueID === 0) {
        temp.push({
          Chname, Empno, TripType: '春節往返', Section: `${data[i].Detail[j].Astart} ~ ${data[i].Detail[j].Aend}`,
          StartAirportName: data[i].Detail[j].StartAirportName,
          EndAirportName: data[i].Detail[j].EndAirportName,
          Car: data[i].Detail[j].Car
        })
      } 
      else {
        temp.push({
          Chname, Empno, TripType: '春節往返', Section: `${data[i].Detail[j].Astart} ~ ${data[i].Detail[j].Aend}`,
          StartAirportName: data[i].Detail[j].StartAirportName,
          EndAirportName: data[i].Detail[j].EndAirportName,
          Car: data[i].Detail[j].Car
        })
      }
    }
  }
  return temp
}

//组件卸载时重置所有状态
export const resetState = () => {
  return {
    type: actionTypes.RESET_ALL_STATE
  }
}

