import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrdersFormLists from './components/ordersFormLists'
import { Card } from "antd";
import {actionCreators} from "./store";

const Orders = ({ match, currPage, getPageData}) => {
  const id = match.params.id;
  currPage(id);//獲取頁面的12
  getPageData(id);//獲取頁面數據的12
  const title = id ==1? "所有申請單" :"簽核中單據"//把右側三元運算符賦值給title
  return (
    <Card
      title={title}
    >
      <OrdersFormLists id={id} />
    </Card>
  )
}


const mapDispatchToProps = ( dispatch ) => {
  return{
    currPage(id){
      dispatch(actionCreators.currPage(id))
    },
    getPageData(id){
      dispatch(actionCreators.getPageData(id))
    }
  }
}
export default  withRouter(connect( null, mapDispatchToProps )( Orders ))