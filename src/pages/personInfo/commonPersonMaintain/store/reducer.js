import * as actionTypes from "./actionTypes";
const defaultState = {
   baseInfo: {},
   personData: [],
   addPersonPageData:{
    country: [],
    cardCategory: [],
    country: []
   },
   showModal: false,
   isEdit: false,
   editData: {},
   haveFamilyName: true,
   cardInfo: [],
};
/**
 * 頁面數據
 */
const pageData = (newState, {data: {BaseInfo, CertType, RelationShip, Table, Country, Link}}) => {
    newState.baseInfo = BaseInfo[0];
    newState.addPersonPageData.cardCategory = CertType;
    newState.addPersonPageData.country = Country;
    newState.addPersonPageData.relation = RelationShip;
    newState.personData = Link;
    if(newState.personData.length > 0){
        newState.personData = newState.personData.map( (v, k) => ({k, ...v}))
    }
    return newState;
}
/**
 * 显示模态框
 */
const addShow = (newState, action) => {
    newState.showModal = true;
    newState.isEdit = false;
    newState.editData = {};
    newState.cardInfo = [];
    return newState;
}
/**
 * 隐藏模态框
 */
const hiddenModal = (newState, action) => {
    newState.showModal = false;
    return newState;
}
/**
 * 眷屬改變時
 */
const familyChange = (newState, {data}) => {
    newState.cardInfo = [];
    if(data === ''){
        newState.haveFamilyName = true;
    }else{
        newState.haveFamilyName = false;
    }
    return newState;
}
/**
 * 新增卡信息
 */
const cardNewAdd = (newState, {data}) => {
    let obj = {
        CertType: data.cardCategory,
        CertNO: data.cardNo,
        CertName: data.name,
        CertTime: data.validDate.format('YYYY-MM-dd'),
        SignTime: data.signValidDate || null,
        TaiwanTime: data.inTaiValidDate || null,
    }
    newState.cardInfo.push(obj);
    return newState;
}
/**
 * 新增普通聯繫人
 */
const addCommonPeople = (newState, {data}) => {
    newState.showModal = false;
    newState.personData.push(data);
    if(newState.personData.length > 0){
        newState.personData = newState.personData.map( (v, k) => ({k, ...v}))
    }
    return newState;
}

/**
 * 编辑
 */
const edit = (newState, {data}) => {
    newState.editData = data;
    sessionStorage.setItem('UniqueID',data.UniqueID);
    newState.cardInfo = {

    };
    newState.isEdit = true;
    newState.showModal = true;
    return newState;
}
/**
 * 编辑成功
 */
const editSuccess = (newState, {data}) => {
    newState.personData.map(v => {
        if(v.UniqueID === data.UniqueID){
            v = Object.assign(v,data);
        }
    });
    newState.isEdit = true;
    newState.showModal = false;
    return newState;
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面數據
        case actionTypes.PAGE_DATA:
            return pageData(newState, action);

        //显示模态框
        case actionTypes.SHOW_MODAL:
            return addShow(newState, action);

        //隐藏模态框
        case actionTypes.HIDDEN_MODAL:
            return hiddenModal(newState, action);

        //眷屬改變時
        case actionTypes.FAMILY_CHANGE:
            return familyChange(newState, action);

        //新增卡信息
        case actionTypes.ADD_CARD_INFO1:
            return cardNewAdd(newState, action);

        //新增卡常用聯繫人
        case actionTypes.ADD_COMMON_PEOPLE:
            return addCommonPeople(newState, action); 

        //编辑
        case actionTypes.EDIT:
            return edit(newState, action);

        //编辑成功
        case actionTypes.EDIT_SUCCESS:
            return editSuccess(newState, action);

        default:
            return newState;
    }
}