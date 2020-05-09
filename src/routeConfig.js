import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from './components/authRouter';

import CommonPage from './commonPages';
import Home from './pages/home/loadable';
import Login from './pages/login/loadable';
import LoginAdmin from './pages/loginAdmin';
import NoAuthority from './commonPages/noAuthority/loadable';

//填單
import FillFormCommon from './pages/purchaseTicket/fillFormCommon/loadable';
import FillFormAssistant from './pages/purchaseTicket/fillFormAssistant/loadable';
import SpecialApply from "./pages/purchaseTicket/specialApply/loadable";
import SpringFestivalApply from "./pages/purchaseTicket/springFestivalApply/loadable";
import FillForm from './pages/fillForm';
//我的訂單
import Orders from "./pages/orders";
import AllTheApplyForm from "./pages/orders/allTheApplyForm/loadable";
import Details from "./pages/orders/details/loadable";
import WaitAffirmForm from "./pages/orders/waitAffirmForm/loadable";
import ChangeWaitAffirmForm from "./pages/orders/changeWaitAffirmForm/loadable";
import TickestOut from "./pages/orders/tickestOut/loadable";
import BackChangeTicket from "./pages/orders/backChangeTicket/loadable"
//簽核
import ApplyTicketSign from './pages/sign/applyTicketSign/loadable';
import Detail from './pages/sign/detail/loadable';
import Sign from './pages/sign';
//個人信息維護
import PersonInfo from './pages/personInfo';
import PersonInfoMaintain from "./pages/personInfo/personInfoMaintain/loadable";
import FamilyInfoMaintain from "./pages/personInfo/familyInfoMaintain/loadable";
import CommonPersonMaintain from "./pages/personInfo/commonPersonMaintain/loadable";
//旅行社平臺
import TravelAgencyPlatform from "./pages/travelAgencyPlatform";
import QuotePrice from "./pages/travelAgencyPlatform/quotePrice/loadable";
import QuotingPrice from "./pages/travelAgencyPlatform/quotingPrice/loadable";
import QuotingPriceComplete from "./pages/travelAgencyPlatform/quotedPrice/loadable";
import QuotingPriceCompleteDetail from "./pages/travelAgencyPlatform/quoteCompleteDetail/loadable";
import WaitTicketOut from "./pages/travelAgencyPlatform/waitTicketOut/loadable";
import WaitForTicketDetail from "./pages/travelAgencyPlatform/waitForTicketDetail/loadable";
import TicketOut from './pages/travelAgencyPlatform/ticketOut/loadable';
import TicketOutDetail from './pages/travelAgencyPlatform/ticketOutDetail/loadable';
import BackAndChangeTicket from './pages/travelAgencyPlatform/backAndChangeTicket/loadable';
import BackAndChangeTicketDetail from './pages/travelAgencyPlatform/backAndChangeTicketDetail/loadable';
import WaitBackTicket from "./pages/travelAgencyPlatform/waitBackTicket/loadable";
import WaitBackTicketDetail from "./pages/travelAgencyPlatform/waitBackTicketDetail/loadable";
import WitChangeTicket from "./pages/travelAgencyPlatform/waitChangeTicket/loadable";
import TravelAgencyInfo from './pages/travelAgencyPlatform/travelAgencyInfo/info';
import TravelAgencyEdit from './pages/travelAgencyPlatform/travelAgencyInfo/edit';
import TravelAgency from './pages/travelAgencyPlatform/travelAgencyInfo';
//管理員維護
import Admin from './pages/adminMaintain';
import AuthorityMaintain from './pages/adminMaintain/authorityMaintain/loadable';
import TravelMaintain from './pages/adminMaintain/travelMaintain/loadable';
import QuoteTimeMaintain from './pages/adminMaintain/quoteTimeMaintain/loadable';
import OrderSearch from './pages/adminMaintain/ordersSearch/loadable';
import KilometreMaintain from './pages/adminMaintain/kilometreMaintain/loadable';
import CompanyMaintain from './pages/adminMaintain/companyMaintain/loadable'
import FlightTimeMaintain from './pages/adminMaintain/flightTimeMaintain/loadable';
import HolidayMaintain from './pages/adminMaintain/holidayMaintain/loadable'
import RpaParamsMaintain from './pages/adminMaintain/rpaParamsMaintain/loadable';




const RouteConfig = () => {
  return <HashRouter>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/login-admin' component={LoginAdmin} />
      <Redirect exact from='/' to='/home' />
      <Route path='/' render={() => (
        <CommonPage>
          <Switch>
            {/* 首頁 */}
            <Route exact path='/home' component={Home} />
            {/* 機票購買 */}
            <Redirect exact from='/ticket-buy' to='/ticket-buy/common-apply' />
            <AuthRoute path='/ticket-buy' render={() => (
              <FillForm>
                <AuthRoute path='/ticket-buy/common-apply' component={FillFormCommon} />
                <AuthRoute path='/ticket-buy/assistant-apply' component={FillFormAssistant} />
                <AuthRoute path='/ticket-buy/springFestival-apply' component={SpringFestivalApply} />
                <AuthRoute path='/ticket-buy/special-apply' component={SpecialApply}/>
                <AuthRoute path='/ticket-buy/no-authority' component={NoAuthority} />
                {/* <AuthRoute path='/ticket-buy/special-apply' component={SpecialApply}/>
                        <AuthRoute path='/ticket-buy/springFestival-apply' component={SpringFestivalApply}/> */}
              </FillForm>
            )} />

            {/* 我的訂單 */}
            <Redirect exact from='/orders' to='/orders/list/1' />
            <AuthRoute path='/orders' render={() => (
              <Orders>
                <AuthRoute exact path='/orders/list/:id' component={AllTheApplyForm} />
                <AuthRoute exact path='/orders/details' component={Details} />
                <AuthRoute exact path='/orders/3' component={WaitAffirmForm} />
                <AuthRoute exact path='/orders/4' component={ChangeWaitAffirmForm} />
                <AuthRoute exact path='/orders/5' component={TickestOut} />
                <AuthRoute exact path='/orders/5/backChangeTicket' component={BackChangeTicket} />

              </Orders>
            )} />

            {/* 簽核 */}
            <Redirect exact from='/sign' to='/sign/list/1' />
            <AuthRoute path='/sign' render={() => (
              <Sign>
                <AuthRoute exact path='/sign/list/:id' component={ApplyTicketSign} />
                <AuthRoute exact path='/sign/detail' component={Detail} />
              </Sign>
            )} />
            {/* 個人中心 */}
            <Redirect exact from='/person' to='/person/1' />
            <AuthRoute path='/person' render={() => (
              <PersonInfo>
                <AuthRoute path='/person/1' component={PersonInfoMaintain} />
                <AuthRoute path='/person/2' component={FamilyInfoMaintain} />
                <AuthRoute path='/person/3' component={CommonPersonMaintain} />
              </PersonInfo>
            )} />

            {/* 旅行社平臺 */}
            {/* <Redirect exact from='/travel-agency' to='/travel-agency/quote-price' />
                    <AuthRoute path='/travel-agency' render={() => (
                      <TravelAgencyPlatform> */}
            <AuthRoute exact path='/travel-agency/quote-price' component={QuotePrice} />
            <AuthRoute exact path='/travel-agency/quote-price/detail' component={QuotingPrice} />
            <AuthRoute exact path='/travel-agency/quote-price-complete' component={QuotingPriceComplete} />
            <AuthRoute exact path='/travel-agency/quote-price-complete/detail' component={QuotingPriceCompleteDetail} />
            <AuthRoute exact path='/travel-agency/wait-ticket-out' component={WaitTicketOut} />
            <AuthRoute exact path='/travel-agency/wait-ticket-out/detail' component={WaitForTicketDetail} />
            <AuthRoute exact path='/travel-agency/ticket-out' component={TicketOut} />
            <AuthRoute exact path='/travel-agency/ticket-out/detail' component={TicketOutDetail} />
            <AuthRoute exact path='/travel-agency/back-change-ticket' component={BackAndChangeTicket} />
            <AuthRoute exact path='/travel-agency/back-change-ticket/detail' component={BackAndChangeTicketDetail} />
            <AuthRoute exact path='/travel-agency/wait-back-ticket' component={WaitBackTicket} />
            <AuthRoute exact path='/travel-agency/wait-back-ticket-detail' component={WaitBackTicketDetail} />
            <AuthRoute exact path='/travel-agency/wait-change-ticket' component={WitChangeTicket} />
            {/* 旅行社的個人中心 */}
            <Redirect exact from='/travel-agency/center' to='/travel-agency/center/info' />
            <AuthRoute path='/travel-agency/center' render={() => (
              <TravelAgency>
                <AuthRoute path='/travel-agency/center/info' component={TravelAgencyInfo} />
                <AuthRoute path='/travel-agency/center/edit' component={TravelAgencyEdit} />
              </TravelAgency>
            )} />
            {/* </TravelAgencyPlatform>
                    )} /> */}

            {/* 後臺維護 */}
            <Redirect exact from='/admin' to='/admin/order-search' />
            <AuthRoute path='/admin' render={() => (
              <Admin>
                <AuthRoute path='/admin/order-search' component={OrderSearch} />
                <AuthRoute path='/admin/authority-maintain' component={AuthorityMaintain} />
                <AuthRoute path='/admin/travel-agency-maintain' component={TravelMaintain} />
                <AuthRoute path='/admin/kilometre-maintain' component={KilometreMaintain}/>
                <AuthRoute path='/admin/company-maintain' component={CompanyMaintain}/>
                <AuthRoute path='/admin/flight-maintain' component={FlightTimeMaintain}/>
                <AuthRoute path='/admin/holiday-maintain' component={HolidayMaintain}/>
                <AuthRoute path='/admin/get-net-maintain' component={RpaParamsMaintain}/>
                <AuthRoute path='/admin/quote-time-hour-maintain' component={QuoteTimeMaintain}/>
              </Admin>
            )} />
            {/* 無權限 */}
            <Route exact path='/no-authority' component={NoAuthority} />
            {/* 無頁面 */}
            {/* <Route component={NoMatch}/> */}
          </Switch>
        </CommonPage>
      )} />
    </Switch>
  </HashRouter>
}


export default RouteConfig;