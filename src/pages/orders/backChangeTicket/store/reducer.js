import * as actionTypes from "./actionTypes";
const defaultState = {
    page: 1,
    category: 1,
    serialId: '',
    ticketOutFormListData: [],
    changeFormList: [],
    backChangeApplyForm: [],
    ticketOutSignList: [ ],
    ticketOutForm: [],//退改簽頁面數據接口
    changeTicketEdit: {},
    changeTicketOk: [],
    backTickets: [],
    remark: ''

};


/**
 * 頁面初始化數據
 */
const getPageData = (newState, { data: { TravelDetail } }) => {
    newState.ticketOutForm = formatCompleteFlightData(TravelDetail);
  
    return newState;
}

/**
 * 格式化已报价航程信息顯示（因栏位名称不一样）欄位名稱不一樣，要根據實際情況進行調整
 */
const formatCompleteFlightData = arr => {
    if (arr.length === 0) {
        return arr;
    }
    let flightArr = [];
    let k = 0;
    for (const v of arr) {
        let personInfo = {
            empno: v.Empno,
            name: v.Chname,
            sex: v.Sex,
            category: v.TripType === 'oneWay' ? '單程' : v.TripType === 'twoWay' ? '往返' : '多程',
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
                uniqueId: ele.UniqueID,
                repUniqueId: ele.RepUID
            }
            flightArr.push(obj);
        }
    }
    return flightArr;
}
/**
 * 点击单号显示对应签核内容
 */
const formClick = (newState, { data, title, SerialID }) => {
    newState.page = 2;
    newState.title = title;
    newState.category = data.category;
    newState.serialId = SerialID;
    return newState;
}


/**
 * 返回form列表
 */
const goback = (newState, action) => {
    newState.page = 1;
    return newState;
}

/**
  * 隱藏模態框
  */
const hiddenModal = (newState, action) => {
    newState.showModal = false;
    return newState;
}
/**
  * 退票
  */
 const backTickets = (newState, {data, checked}) => {
    newState.backTickets = checked ? [...newState.backTickets, data.repUniqueId] 
                                   : newState.backTickets.filter((uid) => (uid !== data.repUniqueId));//進行數據的刪除，如果checked為true，那麼增加到數據裡面
    return newState;
}   

  /**
   * 退票改簽模態框
   */

const changeTicketClick = (newState, action) => {
    newState.showModal = true;
    // console.log(newState.showModal)
    let editFlightData = { detail: [] };
    editFlightData.category = action.data.category;
    // if(action.data.category === '單程'){
    //     editFlightData.detail.push(action.data)
    // }else{
    let allTickets = action.allTickets;
    for (const item of allTickets) {
        if (action.data.category === item.category && action.data.name === item.name) {
            editFlightData.detail.push(item);
        }
    }
    // }
    //格式化
    editFlightData.detail = editFlightData.detail.map(v => {
        //對日期字符串去掉兩遍空格
        let dateStr = v.flyDate.trim();
        // 日期與時間分離 2019/2/28 下午 06:32:00  
        //獲取第一個空格以獲取日期
        let i = dateStr.indexOf(' ');
        v.flyDateTo = dateStr.substring(0, i);
        v.flyTimeTo = dateStr.substring(i);
        return v;
    })
    newState.changeTicketEdit = editFlightData;
    return newState;
}
 //保存改簽數據
 const changeTicketOk = (newState, action) => {
    //獲取所有的已改簽keys
    const keys = newState.changeTicketOk.map(v => (v.key));
    //第一次改簽數據
    const arrFirst = action.changeTicketOk.filter((v) => (!keys.includes(v.key)));
    //重複改簽數據
    const arrAgain = action.changeTicketOk.filter((v) => (keys.includes(v.key)));
    //把第一次退簽的添加到數組
    newState.changeTicketOk = [...newState.changeTicketOk, ...arrFirst];
    //重複改簽的合併
    newState.changeTicketOk = mergeChangeTicket(newState.changeTicketOk, arrAgain);
    newState.showModal = false;
    return newState;
 }

 //合併重複項
const mergeChangeTicket = (arr1, arr2) => {
    return arr1.map(v => {
        for (const item of arr2) {
            if(v.key === item.key){
                return {...v, ...item}
            }
        }   
        return v;
    })
 }
 //保存備註
 const saveRemark = (newState, action) => {
    newState.remark = action.value.Remark;
    return newState;
 }

 
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //頁面初始化數據
        case actionTypes.PAGE_DATA:
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
        //隱藏模態框
        case actionTypes.HIDDEN_MODAL:
            return hiddenModal(newState, action);
        //保存改簽數據
        case actionTypes.CHANGE_TICKET_OK:
            return changeTicketOk(newState, action);
        //退票改簽模態框
        case actionTypes.CHECK_DETAIL:
            return changeTicketClick(newState, action);//待退改簽查看

        //退票
        case actionTypes.GET_BACK_DATA:
            return backTickets(newState, action);//待退改簽查看

        //退票
        case actionTypes.SAVE_REMARK:
            return saveRemark(newState, action);//待退改簽查看

        

        default:
            return newState;
    }
}