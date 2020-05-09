import * as actionTypes from "./actionTypes";
const defaultState = {
    page: 1,
    category: 1,
    waitTicketOutSignList: [],
    waitTicketOut: [],
    changeOrders:[],
    offRepList:[],
    radioValue:'1',
};


/**
 * 頁面初始化數據
 */
const getChangePageData = (newState, { data: { WaitChooseTicketList,offRepList } }) => {
    newState.waitAffirmTicketOutList = WaitChooseTicketList.map(v => ({
        sequenceId: v.SequenceID,
        serialId: v.SerialID,
        fillFormName: v.FormName,
        fillInDate: v.ApplyDateTime,
        applyPerson: v.ApplyName,
        status: v.StepName
    })
    )
    return newState;
}
/**
 * 点击单号显示对应签核内容
 */
const waitFormClick = (newState, { data, title}) => {
    newState.page = 2;
    newState.title = title;
    newState.waitTicketOutSignList ={...data.FlowDetail,...data.FormDetail};
    newState.waitTicketOut = formatFlightData(data.OldRepList);
    newState.changeOrders=priceFlightData(data.offRepList);
    newState.offRepList = formatOffRepList(data.offRepList);
    console.log(data.offRepList)
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
const priceFlightData = arr => {
    let flightArr = [];
    let k = 0;
    for (const v of arr) {
        let personInfo = {
            empno: v.Empno,
            name: v.Chname,
            category: v.TripType === 'oneWay' ? '單程' : v.TripType === 'twoWay' ? '往返' : '多程',
        }
        for (const ele of v.offers) {
            let obj = {
                key: k++,
                ...personInfo,
                dateSection: ele.FlyTime,
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
const formatOffRepList = offRepList => {
    let data = [];
    for(let i = 0 , len = offRepList.length ; i < len ; i ++){
        let temp = [];
        let offers = offRepList[i].offers;
        let index = 0;
        offers.forEach(v=>{
            v.Price.forEach(value=>{
                temp.push({
                    ID:offRepList[i].ID,
                    Empno:v.Empno,
                    Chname:v.Chname,
                    TripType:v.TripType,
                    FlyTime:value.FlyTime,
                    StartAirport:value.StartAirport,
                    ArriveAirport:value.ArriveAirport,
                    FlyNo:value.FlyNo,
                    Cost:value.Cost,
                    key:index,
                })
                index ++;
            })
        })
        data.push(temp)
    }
    return data;
}
/**
 * 返回form列表
 */
const goBackClick = (newState, action) => {
    newState.page = 1;
    return newState;
}

const submitOrder = (newState,action) =>{
    return newState;
}

const changeRaidoValue = (newState , value) =>{
    newState.radioValue = value;
    return newState;
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.GET_PAGE_DATA:
            return getChangePageData(newState, action);

        //返回form列表
        case actionTypes.GO_BACK:
            return goBackClick(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.FORMID_CLICK:
            return waitFormClick(newState, action);

        // //点击单号显示对应签核内容
        // case actionTypes.SHOW_LIST_PAGE:
        //     return goback(newState, action);
        case actionTypes.CHOOSE_RADIO:
            return changeRaidoValue(newState,action)

        case actionTypes.SUBMIT_ORDER:
            return submitOrder(newState,action);
        default:
            return newState;
    }
}