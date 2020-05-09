import * as actionTypes from "./actionTypes";
import { getTravelerName } from "./actionCreators";
const defaultState = {
    familyData: [
        // {
        //     dept_a: "121",
        //     empno_a: "12",
        //     key: 0,
        //     nationality_a: "中國",
        //     person_a: "121",
        //     phone_a: "12121",
        //     sex_a: "M",
        //     zjCategory_a: "身份證",
        //     zjDate_a: "2019-03-06",
        //     zjEnname_a: "212",
        //     zjNo_a: "121"
        // }
    ],
    pageData: {
        ftszItem: [],
        jnfg_sjItem: [],
        lz_gr_zdItem: [],
        danhao: [],
        area: [],
        chargeDept: [],
        userInfo: {},
        peoples: [],
        flightPlace: [],
        category: [],
        country: [],
        timeLimit: '',
        certType: [],
        draft:[]
    },
    selectCategorys: [], //存储选中的类别
    submitType: '', //提交类型(逐笔还是批量)
    isAssistant:false,
    flightInfo:[],
    allFlightInfo:[],
    flightCategory:[],
    personInfo:{ChName:null,Deptcode:null},
    showVisaDate:false,
    tripDetail:false,//是否有未完成的訂單
};
//頁面初始化數據
const pageData = (newState, action) => {
    const {Airport, Place, Type, UserInfo, submitTime, Country, CertType,Draft} = action.data;
    let { pageData } = newState;
    for (const item of Type) {
        if(item.Code === 'Q2'){ pageData.ftszItem = item.Vice; break}
    }
    pageData.area = Place;
    pageData.certType = CertType;
    pageData.country = Country;
    pageData.userInfo = UserInfo[0];
    pageData.flightPlace = Airport;
    pageData.category = Type.map(v => {
        v.CategoryCode = v.Code;
        v.CategoryName = v.Name;
        return v;
    });
    pageData.draft = Draft;
    pageData.timeLimit = submitTime;
    pageData.category = pageData.category.filter((item)=>item.Code !='Q5');
    return newState;
}

//类别选择
const categorySelect = (newState, action) => {
    // action.value.indexOf('Q1') > -1 ? newState.showCc_formid = true : newState.showCc_formid = false;
    // if (action.value.indexOf('Q2') > -1) {
    //     newState.showOther = true;
    //     newState.showFtsz_formid = true;
    // } else {
    //     newState.showOther = false;
    //     newState.canUpload = false;
    //     newState.showFiveUpload = false;
    //     newState.showFtsz_formid = false;
    //     newState.showPlsc_formid = false;
    // };
    // if (action.value.includes('Q4')) {
    //     newState.showFtszNameAndRelationship = true;
    // } else {
    //     newState.showFtszNameAndRelationship = false;
    // }
    newState.selectCategorys = action.value
    return newState;
}
//選擇逐筆代填時
const selectWay = (newState, action) => {
    action.value === 'zbtx' ? newState.showZbtx_formid = true : newState.showZbtx_formid = false;
    action.value === 'plsc' ? newState.showPlsc_formid = true : newState.showPlsc_formid = false;
    newState.submitType = action.value;
    return newState;
}
//添加航程信息
const allFlightInfo = (newState, { data }) => {
    newState.allFlightInfo = data;
    return newState;
}
//点击保存航空信息
const clickFlightInfo = (newState , {values} ) =>{
    newState.flightCategory = {...newState.flightCategory , values} ;
    return newState
}
//选择国外时
const selectForeign = (newState, action) => {

    if (action.value.indexOf('Abroad') > -1) {
        newState.showVisaDate = true;
        newState.showRemark = true;
         } else {
            newState.showRemark = false;
            newState.showVisaDate = false;
         };
    // action.value === 'Abroad' ? newState.showVisaDate = true : newState.showVisaDate = false;
    // action.value === 'Abroad' ? newState.showRemark = true : newState.showRemark = false;
    return newState;
}
/**
 * 添加行程人員信息
 */
const addFlightPeopleInfo = (newState, action) => {
    // newState.familyData = [...newState.familyData, action.values];
    // newState.familyData = newState.familyData.map((v, k) => {
    //     v.key = k;
    //     return v;
    // })
    newState.familyData = action.values;
    return newState;
}
/**
 * 刪除草稿
 */
const removePerson = (newState,action) =>{
    let temp = newState.familyData;
    let k = null;
    for(let i = 0,len = newState.familyData.length; i<len;i++){
        if(temp[i].empno_a === action.data); k = i; 
    }
    newState.familyData.splice(k,1); 
    return newState
}
/**
 * 助理权限
 */
const getAuthority = (newState,action) => {
    newState.isAssistant = action.bool;
    return newState;
}

/**
 * 带出乘机人姓名
 */
const travelName = (newState,action) =>{
    newState.personInfo = {...action.value};
    return newState;
}

/**
 * 是否未完成
 */
const completeState = (newState,{data}) =>{
    // newState.tripDetail = data;
    return newState;
}
const resetData = (newState, action ) => {
    newState.personInfo = {};
    newState.familyData = [];
    newState.allFlightInfo = [];
    newState.clickFlightInfo = {};
    return newState;
}
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.PAGE_DATA:
            return pageData(newState, action);
        //类别选择
        case actionTypes.CATEGORY_SELECT:
            return categorySelect(newState, action);
        //選擇填單方式時
        case actionTypes.SELECT_WAY:
            return selectWay(newState, action);
        //添加航程信息
        case actionTypes.All_FLIGHT_INFO:
            return allFlightInfo(newState, action);
            //选择国外时
        case actionTypes.SELECT_FOREIGN:
            return selectForeign(newState, action);
        //添加行程人員信息
        case actionTypes.ADD_FLIGHT_PEOPLE_INFO:
            return addFlightPeopleInfo(newState, action);
        //是否为助理
        case actionTypes.ASSISTANT_AUTHORITY:
            return getAuthority(newState,action);
        //点击保存航空信息??
        case actionTypes.SAVE_FLIGHT_INFO:
            return clickFlightInfo(newState,action);
        //带出姓名
        case actionTypes.EMPNO_OUTNAME:
            return travelName(newState,action);
        //刪除草稿
        case actionTypes.REMOVE_PERSON:
            return removePerson(newState,action);
        //是否有未完成的訂單
        case actionTypes.IS_COMPLETED:
            return completeState(newState,action);
        case actionTypes.SUBMIT_SUCCESS:
            return resetData(newState, action);
        default:
            return newState;
    }
}