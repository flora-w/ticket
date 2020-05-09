import * as actionTypes from "./actionTypes";
const defaultState = {
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
        category1: [],
        category2: [],
        category3: [],
        category4: []
    },
    isAssistant: true,
    showCc_formid: false,
    showFtsz_formid: false,
    showOther: false,
    showVisaDate: false,
    showFiveUpload: false,
    showZbtx_formid: false,
    showPlsc_formid: false,//批量上傳
    flightInfo: [],
    canUpload: false,
    showFtszNameAndRelationship: false,
    personInfo: {},
    assistanApplyPeopleInfo: {
        empno: 'K1707G185',
        peopleNames: ['曉明', '小紅'],
        dept: 'mel110',
        nationality: ['大陸', '國外'],
        certificateCategory: ['身份證']
    }

};
// const asyncGetUserInfo =() =>{
//     const newState = JSON.parse(JSON.stringify(state)); 
//     if(action.type === actionTypes.GET_USER_INFO){
//         newState.personInfo = action.data.userInfo[0];
//     }
//     return newState;
// }
const asyncGetUserInfo = (newState, action) => {
    newState.asyncGetUserInfo = action.value;
    return newState;
}


//頁面初始化數據
const pageData = (newState, action) => {
    console.log(action.data)
    const { Type, Place, Danhao, UserInfo, Family, Airport } = action.data;
    let a1, a2, a3, a4, a5, a6, ftszItem = [], jnfg_sjItem = [], lz_gr_zdItem = [];
    for (const { CategoryCode, CategoryName, ParmCode, ParmValue } of Type) {
        CategoryCode === 'Q1' ? a1 = { categoryCode: CategoryCode, categoryName: CategoryName } : a1 = a1;
        CategoryCode === 'Q2' ? a2 = { categoryCode: CategoryCode, categoryName: CategoryName } : a2 = a2;
        CategoryCode === 'Q3' ? a3 = { categoryCode: CategoryCode, categoryName: CategoryName } : a3 = a3;
        CategoryCode === 'Q4' ? a4 = { categoryCode: CategoryCode, categoryName: CategoryName } : a4 = a4;
        CategoryCode === 'Q5' ? a5 = { categoryCode: CategoryCode, categoryName: CategoryName } : a5 = a5;
        CategoryCode === 'Q6' ? a6 = { categoryCode: CategoryCode, categoryName: CategoryName } : a6 = a6;
        CategoryCode === 'Q2' ? ftszItem.push({ parmCode: ParmCode, parmValue: ParmValue }) : ftszItem = ftszItem;
        CategoryCode == 'Q4' ? jnfg_sjItem.push({ parmCode: ParmCode, parmValue: ParmValue }) : jnfg_sjItem = jnfg_sjItem;
        CategoryCode === 'Q6' ? lz_gr_zdItem.push({ parmCode: ParmCode, parmValue: ParmValue }) : lz_gr_zdItem = lz_gr_zdItem;
    }
    const { pageData } = newState
    pageData.category1 = [a1, a2];
    pageData.category2 = [a4, a2];
    pageData.category3 = [a5];
    pageData.category4 = [a6];
    pageData.ftszItem = ftszItem;
    pageData.jnfg_sjItem = jnfg_sjItem;
    pageData.lz_gr_zdItem = lz_gr_zdItem;
    pageData.area = Place;
    pageData.danhao = Danhao;
    pageData.userInfo = UserInfo;
    pageData.peoples = Family;
    pageData.flightPlace = Airport;
    pageData.chargeDept = [UserInfo[0].Deptcode];
    newState.pageData = pageData;
    return newState;
}
//类别选择
const categorySelect = (newState, action) => {
    action.value.indexOf('Q1') > -1 ? newState.showCc_formid = true : newState.showCc_formid = false;
    if (action.value.indexOf('Q2') > -1) {
        newState.showOther = true;
        newState.showFtsz_formid = true;
    } else {
        newState.showOther = false;
        newState.canUpload = false;
        newState.showFiveUpload = false;
        newState.showFtsz_formid = false;
        newState.showPlsc_formid = false;
    };
    if (action.value.includes('Q4')) {
        newState.showFtszNameAndRelationship = true;
    } else {
        newState.showFtszNameAndRelationship = false;
    }
    return newState;
}
//選擇急難返國/傷假時顯示兩個分開的選項
//const jnfgChange =(newState, action) => {
//action.value.includes('jnfg')?newState.showBackWay = true:newState.showBackWay = false;

//}
//选择五年条款时显示下载和禁用批量上傳
const fiveUploadShow = (newState, action) => {
    action.value.includes('wntk') ? newState.showFiveUpload = true : newState.showFiveUpload = false;
    if (action.value.indexOf('wntk') > -1) {
        newState.canUpload = true;//此項為true時，是不顯示的，因為disable屬性本來就是設置不顯示的
        newState.showPlsc_formid = false;//此項為false設置的是不顯示
    } else {
        newState.canUpload = false;
        // newState.showPlsc_formid = true;

    }
    return newState;
}
//選擇逐筆代填時
const selectWay = (newState, action) => {
    action.value === 'zbtx' ? newState.showZbtx_formid = true : newState.showZbtx_formid = false;
    action.value === 'plsc' ? newState.showPlsc_formid = true : newState.showPlsc_formid = false;
    return newState;
}
//选择国外时
const selectForeign = (newState, action) => {
    action.value === 'Abroad' ? newState.showVisaDate = true : newState.showVisaDate = false;
    return newState;
}

const empnoChange = (newState, action) => {
    console.log(action.value)
    return newState;
}

const flightInfo = (newState, action) => {
    newState.flightInfo = action.value;
    return newState;
}

//重置状态
const resetState = (newState, action) => {
    newState = {
        ...newState, isAssistant: true,
        showCc_formid: false,
        showFtsz_formid: false,
        showOther: false,
        showVisaDate: false,
        showFiveUpload: false,
        showZbtx_formid: false,
        showPlsc_formid: false,//批量上傳
        flightInfo: [],
        canUpload: false,
        showFtszNameAndRelationship: false,
        personInfo: {},
        assistanApplyPeopleInfo: {
            empno: 'K1707G185',
            peopleNames: ['曉明', '小紅'],
            dept: 'mel110',
            nationality: ['大陸', '國外'],
            certificateCategory: ['身份證']
        }
    }
    return newState
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
        //選擇急難返國/傷假時顯示兩個分別選擇
        // case actionTypes.SELECT_JNFG:
        //     return jnfgChange(newState, action);
        //选择五年条款时显示下载
        case actionTypes.FIVE_UPLOAD_SHOW:
            return fiveUploadShow(newState, action);

        //选择国外时
        case actionTypes.SELECT_FOREIGN:
            return selectForeign(newState, action);
        //選擇填單方式時
        case actionTypes.SELECT_WAY:
            return selectWay(newState, action);
        //航程信息获取
        case actionTypes.FLIGHT_INFO:
            return flightInfo(newState, action);

        //助理代填填寫乘機人工號時
        case actionTypes.EMPNO_CHANGE:
            return empnoChange(newState, action);

        //组件卸载时重置所有状态
        case actionTypes.RESET_ALL_STATE:
            return resetState(newState, action);

        default:
            return newState;
    }
}