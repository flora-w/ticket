import * as actionTypes from "./actionTypes";
const defaultState = {
   baseInfo: {},
   familyData: [],
   addPersonPageData:{
    relation: [],
    cardCategory: [],
   },
   showModal: false,
   isEdit: false,
   editData: {},
   haveFamilyName: true,
   cardInfo: [],
   isAuth:false,
};
/**
 * 頁面數據
 */
const pageData = (newState, {data: {BaseInfo, CertType, RelationShip, Table}}) => {
    newState.baseInfo = BaseInfo[0];
    newState.addPersonPageData.cardCategory = CertType;
    newState.addPersonPageData.relation = RelationShip;
    const arr = [];
    for (const v of Table) {
        let obj = {
            id: v.UID,
            name: v.FaName,
            sex: v.Sex =='F' ? '女' : '男',
            relationship: v.Ship,
            origin: v.Source,
            detail: v.Detail
        };
        arr.push(obj);
    }
    newState.familyData = arr;
    return newState;
}
/**
 * 显示模态框
 */
const addShow = (newState, action) => {
    newState.showModal = true;
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
        CertValidTime: data.validDate.format('YYYY-MM-DD'),
        SignValidTime: data.taiwanTime || null,
        TaiwanValidTime: data.inTaiValidDate || null,
    }
    // console.log(obj)
    newState.cardInfo.push(obj);
    return newState;
}
/**
 * 编辑
 */
const edit = (newState, {data}) => {
    newState.editData = data;
    // console.log(data)
    newState.cardInfo = data.detail;
    newState.isEdit = true;
    newState.showModal = true;
    newState.haveFamilyName = false;
    return newState;
}

/**
 * 權限
 */
const getAuth = (newState,action) => {
    newState.isAuth = action.bool
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

        //编辑
        case actionTypes.EDIT:
            return edit(newState, action);

        //家屬權限
        case actionTypes.FAMILY_AUTHORITY:
            return getAuth(newState,action);

        default:
            return newState;
    }
}