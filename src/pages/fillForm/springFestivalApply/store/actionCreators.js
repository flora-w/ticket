import axios from "../../../../axios";
import * as actionTypes from './actionTypes';


//类别选择
export const categoryChange = (value) => {
  return {
    type: actionTypes.CATEGORY_SELECT,
    value
  }
}

//选择五年条款时显示下载
export const otherChange = (value) => {
  return {
    type: actionTypes.FIVE_UPLOAD_SHOW,
    value,
  }
}

//选择国外时
export const areaSelect = (value) => {
  return {
    type: actionTypes.SELECT_FOREIGN,
    value
  }
}

//获取航程信息
export const flightInfo = ( value ) => {
  return {
    type: actionTypes.FLIGHT_INFO,
    value
  }
}


//组件卸载时重置所有状态
export const resetState = () => {
  return {
    type: actionTypes.RESET_ALL_STATE
  }
}

