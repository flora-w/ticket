import * as actionTypes from "./actionTypes";
const defaultState = {
    page: 1,
    category: 1,
    ticketOutFormListData: [],
    ticketOutSignList: [
        {title: '流水號：', content: 'P81F001001554'},
        {title: '目前步驟：', content: '已出票'},
        {title: '填單人：', content: '小李'},
        {title: '填單時間：', content: '20191/1 19:00'},
        {title: '類別：', content: '返台述職'},
        {title: '備註：', content: '一家人坐一起'},
        {title: '附檔', content: '小李.xlsx'},
       
      ],
      ticketOutForm: [{
        key:'1',
        name: '孫胖胖',
        sex: '男',
        category: '單程',
        fromAirport: '北京', 
        arriveAirport: '上海',
        flight: 'FU121', 
        flyDate: '2018/12/15 10:30', 
        money:'800'

        
      },
      {
        key:'2',
        name: '董胖胖',
        sex: '女',
        category: '多程',
        fromAirport: '北京', 
        arriveAirport: '上海',
        flight: 'FU121', 
        flyDate: '2018/12/15 10:30', 
        money:'800'
      },
      {
        key:'3',
        name: '董胖胖',
        sex: '女',
        category: '多程',
        fromAirport: '北京', 
        arriveAirport: '上海',
        flight: 'FU121', 
        flyDate: '2018/12/15 10:30', 
        money:'800'
      },
      {
        key:'4',
        name: '董胖胖',
        sex: '女',
        category: '多程',
        fromAirport: '北京', 
        arriveAirport: '上海',
        flight: 'FU121', 
        flyDate: '2018/12/15 10:30', 
        money:'800'
      },
      {
        key:'5',
        name: '劉胖胖',
        sex: '女',
        category: '往返',
        fromAirport: '北京', 
        arriveAirport: '上海',
        flight: 'FU121', 
        flyDate: '2018/12/15 10:30', 
        money:'800'
      },
      {
        key:'6',
        name: '劉胖胖',
        sex: '女',
        category: '往返',
        fromAirport: '北京', 
        arriveAirport: '上海',
        flight: 'FU121', 
        flyDate: '2018/12/15 10:30', 
        money:'800'
      },]
};


/**
 * 頁面初始化數據
 */
const pageData = (newState, {data:{TobeSignFormList}}) => {
    newState.ticketOutFormListData = TobeSignFormList.map(v => ({
        sequenceId: v.SequenceID, 
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
const formClick = (newState, {data, title}) => {
        newState.page = 2;
        newState.title = title;
        newState.category = data.category;
        
    
    return newState;
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
            return formClick(newState, action);

        //点击单号显示对应签核内容
        case actionTypes.SHOW_LIST_PAGE:
            return goback(newState, action);

        default:
            return newState;
    }
}