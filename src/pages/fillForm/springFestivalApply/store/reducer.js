import * as actionTypes from "./actionTypes";
const defaultState = {
    isAssistant: false,
    showCc_formid: false,
    showFtsz_formid: false,
    showOther: false,
    showVisaDate: false,
    showFiveUpload: false,
    showFtszNameAndRelationship: false,
    flightInfo: []
};

//类别选择
const categorySelect = (newState, action) => {
    action.value.indexOf('cc') > -1? newState.showCc_formid = true : newState.showCc_formid = false;
    if(action.value.indexOf('ftsz') > -1){
        newState.showOther = true; 
        newState.showFtsz_formid = true;
    }else{
        newState.showOther = false; 
        newState.showFtsz_formid = false; 
        newState.showFiveUpload = false;
    }
    if(action.value.includes('jnfg')){
        newState.showFtszNameAndRelationship = true;
    }else{
        newState.showFtszNameAndRelationship = false;
    }
    return newState;
}

//选择五年条款时显示下载
const fiveUploadShow = (newState, action) => {
    action.value.includes('wntk')?newState.showFiveUpload = true : newState.showFiveUpload = false;
    return newState;
}

//选择国外时
const selectForeign = (newState, action) => {
    action.value === 'no_cn' ? newState.showVisaDate = true : newState.showVisaDate = false;
    return newState;
}

 const flightInfo = (newState, action) => {
   newState.flightInfo =  action.value;
   return newState;
 }


export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //类别选择
        case actionTypes.CATEGORY_SELECT:
            return categorySelect(newState, action);

        //选择五年条款时显示下载
        case actionTypes.FIVE_UPLOAD_SHOW:
            return fiveUploadShow(newState, action);

        //选择国外时
        case actionTypes.SELECT_FOREIGN:
            return selectForeign(newState, action);

      //航程信息获取
       case actionTypes.FLIGHT_INFO:
            return flightInfo(newState, action);

        //组件卸载时重置所有状态
        case actionTypes.RESET_ALL_STATE:
            return defaultState;

        default:
            return newState;
    }
}