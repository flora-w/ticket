/**
 * 登陆
 */
export const LOGIN = '/Login/UserLogin'; //员工登陆
export const LOGIN_ADMIN = '/Login/DontLogin'; //员工登陆
// export const LOGIN = '/api/login/UserLogin.json'; //员工登陆
export const LOGIN_TRAVEL = '/Login/TravelLogin'; //旅行社登陆
// export const LOGIN_TRAVEL = '/api/login/TravelLogin.json'; //旅行社登陆

/**
 * 首页
 */

 /**
  * 机票订购
  */
 /////普通机票申请
 export const GENERAL_APPLY_PAGE_DATA = '/apply/Info_F001'; //获取页面数据
 export const GENERAL_APPLY_SUBMIT = '/apply/F001_Approve'; //提交表单数据
 /////助理机票申请
 export const ASSIT_APPLY_PAGE_DATA = '/apply/Info_F002'; //获取页面数据
 export const ASSIT_ONE_BY_ONE_ADD = '/Apply/Info_F002_Once'; //逐笔新增
 export const ASSIT_BATH = '/Apply/Info_F002_Batch'; //批量上传
 export const ASSIT_DRAFT_DELETE = '/Apply/Info_F002_DraftDelete'; //草稿刪除
 export const ASSIT_SUBMIT = '/apply/F002_Approve'; //助理机票提交
 export const EMPNO_OUTNAME = '/apply/info_Person';//带出姓名
 export const DELETE_DRAFT = '/Apply/Info_F002_DraftDelete';
 //春节
 export const SPRING_PAGE_DATA = '/apply/Info_F004';
 export const SPRING_PERSON_DATA = '/apply/Info_Person';
 export const SPRING_SUBMIT_DATA = '/apply/F004_Approve';
 export const SPRING_UPLOAD_FILE = '/Apply/Info_F004_Batch'
 //特殊
 export const SPECIAL_PAGE_DATA = '/apply/Info_F003';
 export const SPECIAL_GET_FREQUENT_CONTACT = '/apply/Info_F003_GetLinkMan';
 export const SPECIAL_SUBMIT_DATA = '/apply/F003_Approve';
 //補單
 export const REPLACEMENT_PAGE_DATA = '/apply/Info_F005';
 export const REPLACEMENT_SUBMIT = '/apply/F005_Approve';
/**
 * 我的訂單
 */
export const ALL_ORDERS_LIST = '/MyForm/Index'; //获取所有訂單列表
// export const ALL_ORDERS_LIST = '/api/MyForm/Index.json'; //获取所有訂單列表
export const SING_ORDERS_LIST = '/MyForm/OngoingFormList'; //获取簽核中訂單列表
// export const SING_ORDERS_LIST = '/api/MyForm/OngoingForm.json'; //获取簽核中訂單列表
export const SIGN_FORMDETAIL = '/Sign/FormDetail'; //获取所有訂單列表
// export const SIGN_FORMDETAIL = '/api/Sign/FormDetail.json'; //获取所有訂單列表
export const WAIT_CHOOSE_LIST = '/MyForm/WaitChooseList'; //获取待確認出票單據
// export const WAIT_CHOOSE_LIST = '/api/MyForm/WaitChooseList.json'; //获取待確認出票單據
export const WAIT_CHOOSE_PAGE = '/MyForm/WaitChoosePage'; //获取待確認出票單據
// export const WAIT_CHOOSE_PAGE = '/api/MyForm/WaitChoosePage.json'; //获取待確認出票單據
export const CONFIRM_RCLIST = 'MyForm/Confirm_RCList'; //获取待確認出票單據
// export const CONFIRM_RCLIST = '/api/MyForm/Confirm_RCList.json'; //获取待確認出票單據
export const ORDERS_TICKET_LIST = '/MyForm/TicketList'; //获取已票單據
// export const ORDERS_TICKET_LIST = '/api/MyForm/TicketList.json'; //获取已出票單據
// export const ORDERS_TICKET_DETAIL = '/api/MyForm/TicketDetail.json'; //获取已出票單據
export const ORDERS_TICKET_DETAIL = '/MyForm/TicketDetail'; //获取已票單據明细
export const ORDERS_RC_TICKET_DETAIL = '/MyForm/RCTicketDetail'; //退改簽已出票明細
export const ORDERS_CONFIRM_RCDETAIL = '/MyForm/Confirm_RCDetail'; //退改簽待確認單據內容
export const ORDERS_CONFIRM_RCDETAIL_REVIEW = '/MyForm/Confirm_RCDetail_Review'; //退改簽待確認查看
export const ORDERS_CONFIRM_SUBMIT = '/MyForm/Confirm_RCApply_Submit'; //退改簽待確認提交
// export const ORDERS_RCAPPLY = '/api/MyForm/RCApply.json'; //退改簽頁面數據的顯示
export const ORDERS_RCAPPLY = '/MyForm/RCApply'; //退改簽頁面數據的顯示
// export const ORDERS_RCAPPLY_SUBMIT = '/api/MyForm/RCApply_Submit.json'; //退改簽送出數據
export const ORDERS_RCAPPLY_SUBMIT = '/MyForm/RCApply_Submit'; //退改簽送出數據
export const WAITCHOOSE_SUBMIT = '/MyForm/WaitChoose_Submint'; //退改簽送出數據



/**
 * 签核
 */
 /////待签核
export const WAIT_FOR_SIGN_LIST = '/Sign/Index'; //获取未签核列表
export const WAIT_FOR_SIGN_DETAIL = '/Sign/FormDetail'; //获取未签核明细
export const WAIT_FOR_SIGN_SUBMIT = '/Sign/Sign_Submit '; //提交签核
/////已签核
export const HAD_SIGN_LIST = '/Sign/SignedList'; //获取已签核列表
export const HAD_SIGN_DETAIL = '/Sign/FormDetail'; //获取已签核明细

/**
 * 个人信息维护
 */
      /////个人资料
export const PERSON = '/maintain/UserInfo'; //个人信息获取
export const SAVE_HOBBY = '/maintain/UserInfo_Hobby'; //保存个人喜好
export const ADD_VIP_CARD = '/maintain/UserInfo_VIPCard_Add'; //新增会员卡
export const DELETE_VIP_CARD = '/maintain/UserInfo_VIPCard_Delete'; //删除会员卡
export const ADD_CARD = '/maintain/UserInfo_CertInfo_Add'; //新增证件信息
export const DELETE_CARD = '/maintain/UserInfo_CertInfo_Delete'; //删除证件信息
       /////眷属资料
export const FAMILY = '/maintain/RelativeInfo'; //眷属信息获取
export const ADD_FAMILY = '/maintain/RelativeInfo_Add'; //保存眷属信息
export const DELETE_FAMILY = '/maintain/RelativeInfo_Delete'; //删除眷属信息
      /////常用联系人资料
 export const CONTACTS = '/maintain/Linkman'; //常用联系人信息获取
 export const ADD_CONTACTS = '/maintain/Linkman_Add'; //新增常用联系人信息
 export const UPDATE_CONTACTS = '/maintain/Linkman_Update'; //更新眷属信息
 export const DELETE_CONTACTS = '/maintain/Linkman_Delete'; //删除眷属信息

 
/**
 * 旅行社平台
 */
export const WAIT_FOR_QUOTE = '/Travel/Travel_Price_P'; //待报价列表；
export const WAIT_FOR_QUOTE_START = '/Travel/Travel_Price_P_Start'; //待报价列表开始；
export const QUOTE_START = '/Travel/Travel_Price_P_Second'; //开始报价
export const FILL_FLIGHT_NO = '/maintain/FlightTime'; //填写航班号带出信息；
export const END_QUOTE = '/Travel/Travel_Price_P_End'; //结束报价
export const HAD_QUOTE = '/Travel/Travel_Price_A'; //已报价列表
export const HAD_QUOTE_DETAIL = '/Travel/Travel_Price_A_Start'; //已报价列表明細
export const AGAIN_QUOTE = '/Travel/Travel_Price_A_Second'; //重新报价 
export const AGAIN_QUOTE_END = '/Travel/Travel_Price_A_End'; //重新报价结束

export const TICKET_LIST = '/Travel/Travel_Ticket_P'; //待出票列表
// export const TICKET_LIST = '/api/travel/Travel_Ticket_P.json'; //待出票列表
export const TICKET_LIST_DETAIL = '/Travel/Travel_Ticket_P_Start'; //点击订票
// export const TICKET_LIST_DETAIL = '/api/travel/Travel_Ticket_P_Start.json'; //点击订票
export const TICKET_OK = '/Travel/Travel_Ticket_P_End'; //点击确定
export const GIVE_UP = '/Travel/Travel_Ticket_P_Abandon'; //点击放弃出票

export const TICKET_OUT_LIST = '/Travel/Travel_Ticket_A'; //已出票列表
// export const TICKET_OUT_LIST = '/api/travel/Travel_Ticket_A.json'; //已出票列表
export const TICKET_OUT_LIST_DETAIL1 = '/Travel/Travel_Ticket_A_Check'; //已出票明細
export const TICKET_OUT_LIST_DETAIL2 = '/Travel/Travel_Ticket_N_Check'; //已出票明細
// export const TICKET_OUT_LIST_DETAIL = '/api/travel/Travel_Ticket_A_Check.json'; //已出票明細

export const BACK_CHANGE_TICKET_LIST = '/Travel/Travel_Price_ReAndCh'; //退改簽列表
// export const BACK_CHANGE_TICKET_LIST = '/api/travel/Travel_Price_ReAndCh.json'; //退改簽列表
export const BACK_CHANGE_TICKET_LIST_DETAIL = '/Travel/Travel_Price_ReAndCh_Start'; //退改簽列表明細
// export const BACK_CHANGE_TICKET_LIST_DETAIL = '/api/travel/Travel_Price_ReAndCh_Start.json'; //退改簽列表明細
export const BACK_CHANGE_TICKET_QUOTE = '/Travel/Travel_Price_ReAndCh_Second'; //點擊報價
export const BACK_CHANGE_TICKET_END = '/Travel/Travel_Price_ReAndCh_End'; //退改簽結束
// export const BACK_CHANGE_TICKET_QUOTE = '/api/maintain/UserInfo_Hobby.json'; //點擊報價
export const BACK_TICKET_LIST = '/Travel/Travel_Ticket_Return'; //退票列表
// export const BACK_TICKET_LIST = '/api/travel/Travel_Ticket_Return.json'; //退票列表
export const BACK_TICKET_LIST_DETAIL = '/Travel/Travel_Ticket_Return_P'; //退票列表明细
// export const BACK_TICKET_LIST_DETAIL = '/api/travel/Travel_Ticket_Change_P.json'; //退票列表明细
export const BACK_TICKET_LIST_DETAIL_END = '/Travel/Travel_Ticket_Return_A'; //退票列表明细结束
// export const BACK_TICKET_LIST_DETAIL_END = '/api/travel/Travel_Ticket_Return_A.json'; //退票列表明细结束
export const CHANGE_TICKET_LIST = '/Travel/Travel_Ticket_Return'; //改签列表
// export const CHANGE_TICKET_LIST = '/api/travel/Travel_Ticket_Return.json'; //改签列表
export const CHANGE_TICKET_LIST_DETAIL = '/Travel/Travel_Ticket_Return'; //改签列表明细
// export const CHANGE_TICKET_LIST_DETAIL = '/api/travel/Travel_Ticket_Return1.json'; //改签列表明细
export const CHANGE_TICKET_LIST_DETAIL_END = '/Travel/Travel_Ticket_Change_A'; //改签列表明细结束
// export const CHANGE_TICKET_LIST_DETAIL_END = '/api/travel/Travel_Ticket_Change_A.json'; //改签列表明细结束


export const TRAVEL_GENCY_INFO = '/Travel/Travel_Info' //旅行社信息

/**
 * 后台维护
 */
export const MAINTAIN_AUTH = '/maintain/auth'; //點擊權限維護
export const MAINTAIN_AUTH_EDIT = '/maintain/authedit'; //.編輯確定
export const MAINTAIN_OUT_NAME = '/maintain/outname'; //.新增帶出姓名
export const MAINTAIN_AUTH_ADD = '/maintain/authadd'; //.新增確定
export const ORDER_SEARCH_AUTH = '/Maintain/TravelDeatil_Query'; //單據查詢權限獲取;
export const ORDER_SEARCH = '/Maintain/TravelDeatil_List'; //单据搜索
export const ORDER_DETAIL = '/Maintain/TravelDeatil'; //具體單據的内容
export const TRAVEL_AUTHORITY = '/maintain/travelauth';
export const TRAVEL_AUTH_EDIT = '/maintain/traveledit'
export const TRAVEL_AUTH_ADD = '/maintain/traveladd';
export const MAINTAIN_KM = '/maintain/kmauth';
export const MAINTAIN_KM_UPLOAD = '/maintain/kmadd';
export const AIRLINE_AUTH = '/maintain/companyauth';
export const AIRLINE_ADD = '/maintain/companyadd';
export const AIRLINE_EDIT = '/maintain/companyedit';
export const FLIGHT_TIME_AUTH = '/maintain/flytimeauth';
export const FLIGHT_TIME_UPLOAD = '/maintain/flytimeadd';
export const HOLIDAY_AUTH = '/maintain/holidayauth';
export const HOLIDAY_ADD = '/maintain/holidayadd';
export const HOLIDAY_EDIT = '/maintain/holidayedit';
export const GETNET_AUTH = '/maintain/paramauth';
export const GETNET_EDIT = '/maintain/paramedit';
export const QUOTETIME_AUTH = '/maintain/offerauth';
export const QUOTETIME_EDIT = '/maintain/offeredit';
