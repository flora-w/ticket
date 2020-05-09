import * as actionTypes from "./actionTypes";
import { getText } from "../../../../utils";

const defaultState = {
    pageData: {
        ftszItem: [],
        danhao: [],
        area: [],
        chailvChargeDept: '',
        chargeDept: [],
        userInfo: {},
        people: [],
        flightPlace: [],
        category: [],
        timeLimit: 150,
    },
    showChailvItem: false,
    showFantaiItem: false,
    showJiNanFanGuoItem: false,
    showLiziItem: false,
    showUpload: false,
    showVildDate: false,
    haveFile: 'N',
    loading: false,
    categoryData: [],
    flightInfo: [],
      file: null
};


/**
 * 頁面初始化數據
 */
const pageData = (newState, action) => {
    const {Airport, Danhao, Family, Place, Type, UserInfo, submitTime} = action.data;
    let { pageData } = newState;
    for (const item of Type) {
        if(item.Code === 'Q2'){ pageData.ftszItem = item.Vice; break}
    }
    pageData.category = Type;
    pageData.danhao = Danhao;
    pageData.flightPlace = Airport;
    pageData.area = Place;
    pageData.people = [...UserInfo ,...Family];
    pageData.userInfo = UserInfo;
    pageData.timeLimit = submitTime;
    pageData.category = pageData.category.filter((item)=>item.Code !='Q5');
    return newState;
}

/**
 * 添加航程信息
 */
const allFlightInfo = (newState, {data}) => {
    for (const v of data) {
       let empno = getText(v.person, newState.pageData.people, 'Empno');
       v.empno = empno;
    }
    newState.flightInfo = data;
    return newState;
}

/**
 * 差旅单号显示
 */
const chailvChange = (newState, {data}) => {  
    for (const item of newState.pageData.danhao.ChaiLv) {
        if(data === item.Code){
            newState.pageData.chailvChargeDept = item.Value;
        }
    }
    return newState;
}


/**
 * 选择类别
 */
const categoryChange = (newState, {data}) => {  
    if(data.includes('Q1')){
        newState.showChailvItem = true;
    }else{
        newState.showChailvItem = false;
        newState.pageData.chailvChargeDept = '';
    }
    data.includes('Q2')? newState.showFantaiItem = true : newState.showFantaiItem = false;
    data.includes('Q4')? newState.showJiNanFanGuoItem = true : newState.showJiNanFanGuoItem = false;
    if(data.includes('Q6')){
        newState.showLiziItem = true; 
        newState.showUpload = true;
    }else{
        newState.showUpload = false;
        newState.showLiziItem = false;
    }
    newState.categoryData = data;
    return newState;
}

/**
 * 选择五年条款
 */
const selectFive = (newState, {data}) => {
    if(data.includes('C03')) {
        newState.showUpload = true;
    }else{
        newState.showUpload = false;
    }
    return newState;
}

/**
 * 选择区域
 */
const areaChange = (newState, {data}) => {
    data === 'Abroad'? newState.showVildDate = true : newState.showVildDate = false;
    return newState;
}

/**
 * 选择区域
 */
const loadingSubmit = (newState, action) => {
    newState.loading = true;
    return newState;
}

/**
 * 上傳附件
 */
const uploadFile = (newState, {data}) => {
    newState.file = data;

    console.log(data)
    newState.haveFile = 'Y';
    return newState;
}

/**
 * 提交表单成功然后上传文件
 */
const submitSuccess = (newState, action) => {
    newState.loading = false;
    return newState;
}

/**
 * 重置表单状态
 */
const resetAllState = (newState, {data}) => {
    return newState;
}
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.PAGE_DATA:
            return pageData(newState, action);

        //添加航程信息
        case actionTypes.All_FLIGHT_INFO:
            return allFlightInfo(newState, action);

        //差旅单号显示
        case actionTypes.CHAILV_CHANGE:
            return chailvChange(newState, action);

        //选择类别
        case actionTypes.CATEGORY_CHANGE:
            return categoryChange(newState, action);

        //选择五年条款
        case actionTypes.SELECT_FIVE:
            return selectFive(newState, action);

        //选择区域
        case actionTypes.AREA_CHANGE:
            return areaChange(newState, action);

        //文件上傳
        case actionTypes.UPLOAD_FILE_SUCCESS:
            return uploadFile(newState, action);

        //提交表單loading
        case actionTypes.COMMON_APPLY_SUBMIT_LOADING:
            return loadingSubmit(newState, action);

        //提交表单成功
        case actionTypes.COMMONAPPLY_SUBMIT_DATA:
            return submitSuccess(newState, action);

        //重置表单状态
        case actionTypes.RESET_ALL_SITE:
            return resetAllState(newState, action);

        default:
            return newState;
    }
}