import * as actionTypes from "./actionTypes";
const defaultState = {
    page: 1,
    category: 1,
    serialId: '',
    toBeSignedID:'',
    ticketOutFormListData: [],//首頁面的正常出票組件的數據
    changeTicketOutFormListData: [],//首頁面的退改簽已出票的數據
    ticketOutSignList: [
],//點擊單號之後顯示的簽核列表
    ticketOutForm: [],
    status: ''
};


/**
 * 頁面初始化數據，初始頁面的數據
 */
const getPageData = (newState, { data: { TicketFormList, RCFormList } }) => {
    // if (value.indexOf('Q1') > -1) {
    //     this.setState({ showCl_formid: true })
    //   } else {
    //     this.setState({ showCl_formid: false })
    //   };
    newState.ticketOutFormListData = formatFormList(TicketFormList);
    newState.changeTicketOutFormListData = formatFormList(RCFormList);
    return newState;
}

/**
 * 初始頁面兩個不同數據的方法
 */
const formatFormList = arr => {//寫入的方法，為了數據傳輸更加簡潔
    if(arr.length > 0){
        return arr.map(v => ({
            sequenceId: v.SequenceID,
            serialId: v.SerialID,
            toBeSignedID: v.ToBeSignedID,
            fillFormName: v.FormName,
            applyPerson: v.ApplyName,
            fillInDate: v.ApplyDateTime,
            status: v.StepName,
            travelAgency: v.ToBeSignedName
        }))
    }else{
        return [];
    }
   
}



/**
 * 点击单号显示对应签核内容
 */
const formClick = (newState, { data, title, status, serialId ,toBeSignedID}) => {
    console.log(toBeSignedID)
    newState.page = 2;
    newState.title = title;
    newState.status = status;
    newState.serialId = serialId;
    newState.toBeSignedID=toBeSignedID;
    // newState.category = data.category;//如果要用if語句，那麼
    newState.ticketOutForm = formatCompleteFlightData(data.TravelDetail);
    // newState.travelQuoteResultForm = formatCompleteFlightData(data.newtotalList);
    newState.ticketOutSignList = {...data.FormDetail, ...data.FlowDetail};
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
            category: v.TripType === 'oneWay' ? '單程' : v.TripType === 'twoWay' ? '往返' : '多程',
        }
        for (const ele of v.Detail) {
            let obj = {
                key: k++,
                ...personInfo,
                dateSection: ele.Aend + ' ~ ' + ele.Astart,
                fromAirport: ele.StartAirportName,
                arriveAirport: ele.EndAirportName,
                flightNo: ele.FlyNo,
                money: ele.Cost,
                uniqueId: ele.UniqueID
            }
            flightArr.push(obj);
        }
    }
    return flightArr;
}
/**
 * 格式化已报价航程信息顯示（因栏位名称不一样）欄位名稱不一樣，要根據實際情況進行調整
 */
const formatCompleteFlightData = arr => {
    if(arr.length === 0){
        return arr;
    }
    let flightArr = [];
    let k = 0;
    for (const v of arr) {
        let personInfo = {
            // empno: v.Empno,
            name: v.Chname,
            sex: v.Sex,
            category: v.TripType === 'oneWay'? '單程' : v.TripType === 'twoWay'? '往返' : '多程',
        }
        for (const ele of v.Price) {
            let obj = {
                key: k++,
                ...personInfo,
                flyDate: ele.FlyTime,
                fromAirport: ele.StartAirport,
                arriveAirport: ele.ArriveAirport,
                flight: ele.FlyNo,
                money: ele.Cost,
                uniqueId: ele.UniqueID
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
        case actionTypes.GET_PAGE_DATA:
            return getPageData(newState, action);

        //返回form列表
        case actionTypes.GO_BACK:
            return goback(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.FORMID_CLICK:
            return formClick(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.SHOW_LIST_PAGE:
            return goback(newState, action);

        default:
            return newState;
    }
}