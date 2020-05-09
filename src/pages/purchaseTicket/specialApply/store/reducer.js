import * as actionTypes from "./actionTypes";
import { showNotification } from "../../../../utils";
const defaultState = {
    isAssistant: false,
    baseInfo: {},
    showVisaDate: false,
    submitTime: 150,
    TripType: 'twoWay',
    personType: [],
    airport: [],
    place: [],
    frequentContacts: [],
    currentContacts: {},
    personInfo: [],
    journeyData: [],
    loading: false,

};

//初始值
const savePageInitData = (newState, action) => {
    newState.isAssistant = true;
    newState.submitTime = action.data.submitTime;
    newState.personType = action.data.Type;
    newState.place = action.data.Place;
    newState.airport = action.data.Airport.map(v=> ({...v,key: v.Code}));
    newState.baseInfo = action.data.UserInfo[0];
    return newState
}

//是否出國
const saveIsForegin = (newState, action) => {
    newState.showVisaDate = action.id === 'Abroad' ? true : false;
    return newState;
}

//
const  getFrequentContact = (newState, action) => {
    newState.frequentContacts = action.data;
    return newState;
}
const saveTripType = (newState, action) => {
    newState.TripType = action.data;
    newState.journeyData = [];
    return newState
}

const changeBtnState = (newState, action) => {
    newState.loading = action.bool;
    return newState;
}

//行程
const saveJourneyData = (newState, action) => {
    newState.journeyData = action.data;
    return newState;
}

//逐筆選擇數據
const changeOptionValue = (newState, action) => {
    const {frequentContacts} = newState;
    for(let i = 0, len = frequentContacts.length; i< len; i++) {
        if(action.UniqueId === frequentContacts[i].LinkEmpNo) {
            newState.currentContacts = {...frequentContacts[i]};
            break;
        }
    }
    return newState
}

//逐筆新增數據
const addPrequentContact = (newState, action) => {
    const data = action.data;
    const personInfo = newState.personInfo;
    let bool = true;
    for(let i = 0, len = personInfo.length; i < len ; i ++) {
        if(personInfo[i].LinkEmpNo === data.LinkEmpNo) {
            bool = false;
            showNotification({type: 'warning', message: '重複添加', description: '請勿重複添加該人員信息'});
            break;
        }
    }
    if(bool) {
        newState.personInfo = [...newState.personInfo, {...action.data, key: newState.personInfo.length}];
    }
    newState.currentContacts = [];
    return newState
}

const deletePersonInfo = (newState, action) => {
    let temp = newState.personInfo;
    temp.forEach( (v) => {
        if(v.key === action.id) {
            temp.splice(action.id, 1);
        }
    })
    newState.personInfo = [...temp];
    return newState
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actionTypes.GET_PAGE_DATA:
            return savePageInitData(newState, action);
        case actionTypes.SELECT_FOREIGN:
            return saveIsForegin(newState, action);
        case actionTypes.SAVE_TRIP_TYPE:
            return saveTripType(newState, action);
        case actionTypes.GET_PREQUENT_CONTACT:
            return getFrequentContact(newState, action);
        case actionTypes.SUBMIT_BUTTON_LOADING:
            return changeBtnState(newState, action);
        case actionTypes.SAVE_JOURNEY_DATA:
            return saveJourneyData(newState, action);
        case actionTypes.CHANGE_PERQUENT_CONTACT:
            return changeOptionValue(newState, action);
        case actionTypes.DELETE_PERSON_INFO:
            return deletePersonInfo(newState, action);
        case actionTypes.ADD_PREQUENT_CONTACT_INFO:
            return addPrequentContact(newState, action);
        //组件卸载时重置所有状态
        case actionTypes.RESET_ALL_STATE:
            return defaultState;

        default:
            return newState;
    }
}