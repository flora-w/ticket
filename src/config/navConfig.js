import Home from '../pages/home/loadable';
import Login from '../pages/login/loadable';
//填單
import FillFormCommon from '../pages/purchaseTicket/fillFormCommon/loadable';
import FillFormAssistant from '../pages/purchaseTicket/fillFormAssistant/loadable';
import SpecialApply from "../pages/fillForm/specialApply/loadable";
import SpringFestivalApply from "../pages/fillForm/springFestivalApply/loadable";
import FillForm from '../pages/fillForm';
//我的訂單
import AllTheApplyForm from "../pages/orders/allTheApplyForm/loadable";
import WaitAffirmForm from "../pages/orders/waitAffirmForm/loadable";
import ChangeWaitAffirmForm from "../pages/orders/changeWaitAffirmForm/loadable";
import TickestOut from "../pages/orders/tickestOut/loadable";
import WaitQuoteAgain from "../pages/orders/waitQuoteAgain/loadable"
//簽核
import ApplyTicketSign from '../pages/sign/applyTicketSign/loadable';
import Detail from '../pages/sign/detail/loadable';
import Sign from '../pages/sign';
//個人信息維護
import PersonInfo from '../pages/personInfo';
import PersonInfoMaintain from "../pages/personInfo/personInfoMaintain/loadable";
import FamilyInfoMaintain from "../pages/personInfo/familyInfoMaintain/loadable";
import CommonPersonMaintain from "../pages/personInfo/commonPersonMaintain/loadable";
//旅行社平臺
import TravelAgencyPlatform from "../pages/travelAgencyPlatform";
import QuotePrice from "../pages/travelAgencyPlatform/quotePrice/loadable";
import QuotingPrice from "../pages/travelAgencyPlatform/quotingPrice/loadable";
import QuotingPriceComplete from "../pages/travelAgencyPlatform/quotedPrice/loadable";
import QuotingPriceCompleteDetail from "../pages/travelAgencyPlatform/quoteCompleteDetail/loadable";
import WaitTicketOut from "../pages/travelAgencyPlatform/waitTicketOut/loadable";
import WaitForTicketDetail from "../pages/travelAgencyPlatform/waitForTicketDetail/loadable";

 


export const navConfigCommon = [
    { 
        title: '首頁', 
        path: '/home',
     }
]

export const navConfig = [
  { 
      title: '首頁', 
      path: '/home',
      component: Home,
   },
  { 
      title: '機票訂購', 
      path: '/ticket-buy', 
      icon: 'edit',
      component: FillForm,
      childrenShow: false,
      children: [
          { title: '一般機票', path: '/ticket-buy/common-apply', component: FillFormCommon, active: true },
          { title: '助理訂票', path: '/ticket-buy/assistant-apply', component: FillFormAssistant, active: false},
          { title: '特殊訂票', path: '/ticket-buy/special-apply', component: SpecialApply, active: false},
          { title: '春節訂票', path: '/ticket-buy/springFestival-apply', component: SpringFestivalApply, active: false}
      ]
  },
  { 
      title: '签核', 
      path: '/sign', 
      icon: 'profile',
      component: Sign,
      childrenShow: false,
      children: [
          { title: '待簽核單據', path: '/sign/list/1', component: ApplyTicketSign,  active: true},
          { title: '已簽核單據', path: '/sign/list/2', component: ApplyTicketSign, active: false},
      ]  
  },
  { 
      title: '我的訂單', 
      path: '/orders', 
      icon: 'shop',
      component: Sign,
      childrenShow: false,
      children: [
          { title: '所有申請單據', path: '/orders/list/1', component: AllTheApplyForm,  active: true},
          { title: '簽核中單據', path: '/orders/list/2', component: AllTheApplyForm,  active: false},
          { title: '待確認出票單據', path: '/orders/3', component: WaitAffirmForm,  active: false},
          { title: '已出票單據', path: '/orders/5', component: TickestOut, active: false},
          { title: '退改簽待確認單據', path: '/orders/4', component: ChangeWaitAffirmForm, active: false},
          { title: '待重新報價單據', path: '/orders/6', component: WaitQuoteAgain, active: false},
      ] 
  },
  { 
    title: '個人中心', 
    path: '/person', 
    icon: 'smile',
    component: PersonInfo,
    childrenShow: false,
    children: [
        { title: '個人資料維護', path: '/person/1', component: PersonInfoMaintain,  active: true},
        { title: '眷屬資料維護', path: '/person/2', component: FamilyInfoMaintain,  active: false},
        { title: '常用聯繫人', path: '/person/3', component: CommonPersonMaintain, active: false},
    ] 
},
{ 
    title: '後臺管理', 
    path: '/admin', 
    icon: 'setting',
    childrenShow: false,
    children: [
        { title: '所有單據查詢', path: '/admin/order-search',  active: true},
        { title: '權限維護', path: '/admin/authority-maintain',  active: false},
        { title: '旅行社維護', path: '/admin/travel-agency-maintain',  active: false},
        { title: '報價回復時效', path: '/admin/quote-time-hour-maintain', active: false},
        { title: '系統參數維護', path: '/admin/system-maintain', active: false},
        { title: '爬網參數維護', path: '/admin/get-net-maintain', active: false},
        { title: '航空公司維護', path: '/admin/company-maintain', active: false},
        { title: '公裡數維護', path: '/admin/kilometre-maintain', active: false},
        { title: '航班時刻表維護', path: '/admin/flight-maintain', active: false},
        { title: '假期維護', path: '/admin/holiday-maintain', active: false},
    ] 
},
];

export const navConfigTravel = [
    { title: '首頁', path: '/home',},
    { title: '報價', path: '/travel-agency/quote-price', },
    { title: '已報價', path: '/travel-agency/quote-price-complete',},
    { title: '待出票', path: '/travel-agency/wait-ticket-out', },
    { title: '已出票', path: '/travel-agency/ticket-out', },
    { title: '退改簽', path: '/travel-agency/back-change-ticket',},
    { title: '待退票', path: '/travel-agency/wait-back-ticket', },
    { title: '待改簽', path: '/travel-agency/wait-change-ticket',},
    { 
        title: '個人中心', 
        path: '/travel-agency/center', 
        childrenShow: false,
        icon: 'contacts',
        children: [
            { title: '個人資料', path: '/travel-agency/center/info',  active: true},
            { title: '密碼更改', path: '/travel-agency/center/edit',  active: false},
        ]
    },
]

export const breadcrumbNameMap = {
    '/home': 'Home',
    '/ticket-buy': '機票訂購',
    '/ticket-buy/common-apply': '一般機票',
    '/ticket-buy/assistant-apply': '助理訂票',
    '/ticket-buy/no-authority': '无助理权限',
    '/ticket-buy/special-apply': '特殊訂票',
    '/ticket-buy/springFestival-apply': '春節訂票',
    '/sign': '簽核',
    '/sign/list': '簽核列表',
    '/sign/list/1': '待簽核單據',
    '/sign/list/2': '已簽核單據',
    '/sign/detail': '明細',
    //我的訂單
    '/orders': '我的訂單',
    '/orders/list': '申請單列表',
    '/orders/list/1': '所有申請單據',
    '/orders/list/2': '簽核中單據',
    '/orders/details': '明細',
    '/orders/3':'待確認出票單據',
    '/orders/4':'退改簽待確認單據',
    '/orders/5':'已出票單據',
    '/orders/5/backChangeTicket':'退改簽申請',
    '/orders/6':'待重新報價單據',
    '/person': '個人中心',
    '/person/1': '個人資料維護',
    '/person/2': '眷屬資料維護',
    '/person/3': '常用聯繫人',
    '/travel-agency': '旅行社平臺',
    '/travel-agency/quote-price': '報價',
    '/travel-agency/quote-price/detail': '報價明細',
    '/travel-agency/quote-price-complete': '已報價',
    '/travel-agency/quote-price-complete/detail': '已報價明細',
    '/travel-agency/wait-ticket-out': '待出票',
    '/travel-agency/wait-ticket-out/detail': '待出票明細',
    '/travel-agency/ticket-out': '已出票',
    '/travel-agency/ticket-out/detail': '已出票明細',
    '/travel-agency/back-change-ticket': '退改簽',
    '/travel-agency/back-change-ticket-detail': '退改簽明細',
    '/travel-agency/wait-back-ticket': '待退票',
    '/travel-agency/wait-back-ticket-detail': '待退票明細',
    '/travel-agency/wait-change-out': '待改簽',
    '/travel-agency/wait-change-out-detail': '待改簽明細',
    '/travel-agency/center': '個人中心',
    '/travel-agency/center/info': '個人資料',
    '/travel-agency/center/edit': '密碼更改',
    '/admin': '管理員維護',
    '/admin/order-search':'所有单据查询',
    '/admin/authority-maintain': '權限維護',
    '/admin/travel-agency-maintain': '旅行社維護',
    '/admin/quote-time-hour-maintain': '報價回覆時效',
    '/admin/system-maintain': '系統參數維護',
    '/admin/get-net-maintain': '爬網參數維護',
    '/admin/kilometre-maintain': '公裡數維護',
    '/admin/company-maintain': '航空公司維護',
    '/admin/flight-maintain': '航班時刻表維護',
    '/admin/holiday-maintain': '假期維護',
  };

