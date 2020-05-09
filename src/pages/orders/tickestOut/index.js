import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card ,Button} from "antd";

import { actionCreators } from './store';
import TicketOutYet from './components/ticketOutYet'
import TicketOutFormList from './components/ticketOutFormList'

import "./index.less";

class TicketOut extends Component {

  render() {

    const { page, handleGoBackClick, title } = this.props;
    if (page === 1) {
      return (
        <Card
          title="已出票單據"
        >
         <TicketOutYet />
        </Card>
      )
    } else if (page === 2) {
      return (
        <Card
          title="已出票單據詳細"
          extra={
            <Button onClick={handleGoBackClick} size="small" style={{width:70,height:30}}>返回</Button>
          }>
         <TicketOutFormList />
        </Card>
      )
    } else{
      return null
    }
  }
}

const mapStateToProps = (state) => {
  const { page, title } = state.ordersReducer.ticketsOutReducer;
  return { page, title }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleGoBackClick() {
      dispatch(actionCreators.goBackClick())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketOut)