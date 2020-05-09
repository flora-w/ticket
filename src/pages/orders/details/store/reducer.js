import * as actionTypes from "./actionTypes";

const defaultState = {
    page: 1,
    title: '',
    category: 1,
    signFormListData: [],
    formData: [],
    flightData: [],
    newFlightData: [],
    originFlightData: [],
    signHistory: [],
    
};


/**
 * 頁面初始化數據
 */
const pageData = (newState, {data:{TobeSignFormList}}) => {
    newState.signFormListData = TobeSignFormList.map(v => ({
        formId: v.SequenceID, 
        formName: v.FormName, 
        fillDate: v.ApplyDateTime,
        applyName: v.ApplyName, 
        status: v.StepName
      })
    )
    return newState;
}
/**
 * 点击单号显示对应签核内容
 */
const formIdClick = (newState, {data, title}) => {
    newState.page = 2;
    newState.title = title;
    newState.category = data.category;
    console.log(data)
    newState.formData = {...data.FlowDetail, ...data.FormDetail};
    //正常簽核內容
    if(data.category === 1){
        newState.flightData = formatFlightData(data.TravelDetail);
    }
    //退改簽
    if(data.category === 2){
        newState.originFlightData = formatFlightData(data.TravelDetail);
        newState.newFlightData = formatFlightData(data.newRepDetail);
    }
    //時效簽核
    if(data.category === 3){

    }
    newState.signHistory = data.signHistory;
    return newState;
}
/**
 * 格式化航程信息顯示
 */
const formatFlightData = arr => {
    let flightArr = [];
    let k = 0;
    for (const v of arr) {
        let personInfo = {
            empno: v.Empno,
            name: v.Chname,
            category: v.TripType === 'oneWay'? '單程' : v.TripType === 'twoWay'? '往返' : '多程',
        }
        for (const ele of v.Detail) {
            let obj = {
                key: k++,
                ...personInfo,
                dateSection: ele.Astart + ' ~ ' + ele.Aend,
                fromAirport: ele.StartAirportName,
                arriveAirport: ele.EndAirportName
            }
            flightArr.push(obj);
        }
    }
    return flightArr;
}
/**
 * 返回form列表
 */
const goback = (newState, action) => {
    newState.page = 1;
    return newState;
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.SIGN_PAGE_DATA:
            return pageData(newState, action);

        //返回form列表
        case actionTypes.GO_BACK:
            return goback(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.FORMID_CLICK:
            return formIdClick(newState, action);

        default:
            return newState;
    }
}