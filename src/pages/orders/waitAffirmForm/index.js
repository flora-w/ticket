import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card ,Button} from "antd";
import {actionCreators} from "./store"
import WaitAffirmTicketOutList from "./components/waitAffirmTicketOutList";
import WaitTicketOutForm from "./components/waitTicketOutForm";


class WaitAffirmForm extends Component {
  
  render() {
    const { page, handleGoBackClick, title } = this.props;
    if (page == 1) {
      return (
        <Card
          title="待確認出票單據"
        >
         <WaitAffirmTicketOutList  />
        </Card>
      )
    } else if (page == 2) {
      return (
        <Card
          title="待確認出票單據詳細"
          extra={
            <Button onClick={handleGoBackClick} size="small">返回</Button>
          }>
        <WaitTicketOutForm  />
        </Card>
      )
    }else{
      return null
    }
  }
}

const mapStateToProps = (state) => {
  const { page, title } = state.ordersReducer.waitAffirmTicketOutReducer;
  return { page, title }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleGoBackClick() {
      dispatch(actionCreators.goBackClick())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitAffirmForm)