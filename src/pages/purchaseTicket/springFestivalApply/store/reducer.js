import * as actionTypes from "./actionTypes";

const defaultState = {
    isAssistant: false,
    airport: [],
    baseInfo: {},
    loading: true,
    fillType: 'onebyone',
    submitTime: 150,
    personData: [],
    currentPerson: '',
    journeyInfo: [],
    journeyData: [],
    submitLoading: false,
    textAreaData: '',
    uploadSerialid: ''
};

const getPageData = (newState, action) => {
    newState.isAssistant = true;
    newState.loading = false;
    newState.baseInfo = action.data.UserInfo[0];
    newState.submittime = action.data.submitTime;
    newState.airport = action.data.Airport.map((v,k) => ({...v, key: k}));
    return newState;
}

const changeFillType = (newState, action) => {
    newState.fillType = action.data;
    newState.journeyData = [];
    newState.journeyInfo = [];
    newState.personData = [];
    return newState
}

const savePersonData = (newState, action) => {
    newState.personData = action.data.map((v,k) => ({...v, key: k}));
    return newState;
}

const saveCurrentPerson = (newState, action) => {
    newState.currentPerson = action.empno;
    return newState;
}

const getPersonName = (newState, id) => {
    const temp = newState.personData;
    let name = null;
    for(let i = 0, len = temp.length; i < len; i++) {
        if(temp[i].Empno === id) {
            name = temp[i].ChName;
            break;
        }
    }
    return name
}

const saveJourneyData = (newState, action) => {
    const {currentPerson, journeyData} = newState;
    const c = journeyData.length;
    let ChName = getPersonName(newState, currentPerson);
    const b = action.data;
    let temp = {
        EmpNo: currentPerson,
        ChName,
        detail: [...action.data]
    }
    for(let i = 0,len = b.length; i < len ; i++) {
        newState.journeyData.push({...b[i], Empno: newState.currentPerson, Chname: ChName, TripType: '春節往返', Section: `${b[i].Astart} ~ ${b[i].EndTime}`, key: c + i})
    }
    newState.journeyInfo.push(temp);
    return newState;
}

const saveTextArea = (newState, action) => {
    newState.textAreaData = action.data
    return newState;
}

const saveExcelData = (newState, action) => {
    newState.journeyData = action.data.map((v,k) => ({...v, key: k}));
    return newState
}

const saveUploadSerialid = (newState, action) => {
    newState.uploadSerialid = action.id;
    return newState
}

const deleteJourneyData = (newState, action) => {
    let temp = newState.journeyData;
    for(let i = temp.length - 1; i >= 0 ; i --) {
        if(temp[i].Empno === action.id) {
            temp.splice(i,1)
        }
    }
    newState.journeyData = [...temp]
    return newState
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.GET_PAGE_DATA: 
            return getPageData(newState, action);
        case actionTypes.GET_FAMILY_INFO:
            return savePersonData(newState, action);
        case actionTypes.CURRENT_PERSON_EMPNO:
            return saveCurrentPerson(newState, action);
        case actionTypes.SAVE_JOURNEY_DATA:
            return saveJourneyData(newState, action);
        case actionTypes.FILL_FORM_TYPE:
            return changeFillType(newState, action);
        case actionTypes.SAVE_TEXTAREA_VALUE:
            return saveTextArea(newState, action);
        case actionTypes.SAVE_EXCEL_DATA:
            return saveExcelData(newState, action);
        case actionTypes.SAVE_UPLOAD_SERIALID:
            return saveUploadSerialid(newState, action);
        case actionTypes.DELETE_JOURNEY_DATA:
            return deleteJourneyData(newState, action);
        //组件卸载时重置所有状态
        case actionTypes.RESET_ALL_STATE:
            return defaultState;
        default:
            return newState;
    }
}