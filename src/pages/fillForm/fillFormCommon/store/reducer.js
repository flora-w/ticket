import * as actionTypes from "./actionTypes";
const defaultState = {
    loading: true,
    pageData: {
        ftszItem: [],
        jnfg_sjItem: [],
        lz_gr_zdItem: [],
        danhao: [],
        area: [],
        userInfo:{},
        peoples: [],
        flightPlace: [],
        chargeDept: [],
        category1: [],
        category2: [],
        category3: [],
        category4: []
    },
    isAssistant: false,
    showCc_formid: false,
    showFtsz_formid: false,
    showOther: false,
    showVisaDate: false,
    showFiveUpload: false,
    showFtszNameAndRelationship: false,
    flightInfo: [],

    assistanApplyPeopleInfo: {
        empno: 'K1707G185',
        peopleNames: ['曉明', '小紅'],
        dept: 'mel110',
        nationality: ['大陸', '國外'],
        certificateCategory: ['身份證']
    }
};

//頁面初始化數據
const pageData = (newState, action) => {
    const { Type, Place, Danhao, UserInfo, Family, Airport } = action.data;
    let a1, a2, a3, a4, a5, a6, ftszItem = [], jnfg_sjItem = [], lz_gr_zdItem=[];
    for (const {CategoryCode,CategoryName, ParmCode, ParmValue} of Type) {
        CategoryCode === 'Q1'? a1 = {categoryCode: CategoryCode, categoryName: CategoryName} : a1 = a1;
        CategoryCode === 'Q2'? a2 = {categoryCode: CategoryCode, categoryName: CategoryName} : a2 = a2;
        CategoryCode === 'Q3'? a3 = {categoryCode: CategoryCode, categoryName: CategoryName} : a3 = a3;
        CategoryCode === 'Q4'? a4 = {categoryCode: CategoryCode, categoryName: CategoryName} : a4 = a4;
        CategoryCode === 'Q5'? a5 = {categoryCode: CategoryCode, categoryName: CategoryName} : a5 = a5;
        CategoryCode === 'Q6'? a6 = {categoryCode: CategoryCode, categoryName: CategoryName} : a6 = a6;
        CategoryCode === 'Q2'? ftszItem.push({parmCode: ParmCode, parmValue: ParmValue}) : ftszItem = ftszItem;
        CategoryCode == 'Q4'? jnfg_sjItem.push({parmCode: ParmCode, parmValue: ParmValue}) : jnfg_sjItem = jnfg_sjItem;
        CategoryCode === 'Q6'? lz_gr_zdItem.push({parmCode: ParmCode, parmValue: ParmValue}) : lz_gr_zdItem = lz_gr_zdItem;
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
    newState.loading = false;
    return newState;
}

//类别选择
const categorySelect = (newState, action) => {
    action.value.indexOf('Q1') > -1? newState.showCc_formid = true : newState.showCc_formid = false;
    if(action.value.indexOf('Q2') > -1){
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
    action.value.includes('C03')?newState.showFiveUpload = true : newState.showFiveUpload = false;
    return newState;
}

//选择国外时
const selectForeign = (newState, action) => {
    action.value === 'Abroad' ? newState.showVisaDate = true : newState.showVisaDate = false;
    return newState;
}

//乘机人工号变化时
const empnoChange = (newState, action) => {
    console.log(action.value)
    return newState;
}


 const flightInfo = (newState, action) => {
   newState.flightInfo =  action.value;
   return newState;
 }

 //重置状态
 const resetState = (newState, action) => {
     newState = {...newState,  isAssistant: false,
        showCc_formid: false,
        showFtsz_formid: false,
        showOther: false,
        showVisaDate: false,
        showFiveUpload: false,
        showFtszNameAndRelationship: false,
        flightInfo: [],
    
        assistanApplyPeopleInfo: {
            empno: 'K1707G185',
            peopleNames: ['曉明', '小紅'],
            dept: 'mel110',
            nationality: ['大陸', '國外'],
            certificateCategory: ['身份證']
        }}
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

        //选择五年条款时显示下载
        case actionTypes.FIVE_UPLOAD_SHOW:
            return fiveUploadShow(newState, action);

        //选择国外时
        case actionTypes.SELECT_FOREIGN:
            return selectForeign(newState, action);

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