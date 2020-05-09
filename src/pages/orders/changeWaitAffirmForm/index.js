import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from "antd";
import {Button } from 'antd';
import { actionCreators } from './store';
import ChangeWaitAffirmFormList from './components/changeWaitAffirmFormList';
import ChangeTicketList from './components/changeTicketList';

import "./index.less";

class ChangeWaitAffirmForm extends Component {

  render() {

    const { page, handleGoBackClick, title } = this.props;
    if (page === 1) {
      return (
        <Card
          title="退改簽待確認單據"
        >
         <ChangeTicketList  />
        </Card>
      )
    } else if (page === 2) {
      return (
        <Card
          title="退改簽待確認單據詳細"
          extra={
            <Button onClick={handleGoBackClick} size="small">返回</Button>
          }>
         <ChangeWaitAffirmFormList />
        </Card>
      )
    }else{
      return null
    }
  }
}

const mapStateToProps = (state) => {
  const { page, title } = state.ordersReducer.changeWaitAffirmFormReducer;
  return { page, title }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleGoBackClick() {
      dispatch(actionCreators.goBackClick())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeWaitAffirmForm)



