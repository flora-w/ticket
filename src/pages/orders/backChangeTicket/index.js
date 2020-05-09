import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from 'react-redux';
import { Card,Input,Row,Col,Button ,message,Form  } from "antd";
import { actionCreators } from './store';
import { getUrlParam } from "../../../utils";
import BackChangeApplyForm from './components/backChangeApplyForm';
import ChangeTicketFormList from './components/changeTicketFormList';
import './index.less'

import "./index.less";

const { TextArea } = Input;
class BackChangeTicket extends Component {
  componentDidMount(){
  //  const serialid = getUrlParam(this.props.location.search, 'serialId');//加入form之後報 search undefined，此時需要引入import { compose } from "redux";然後在底部導出處，按照順序添加內容
  //  console.log(serialid)0
    this.props.getPageData();   
  }
  render() {
    const { backChangeApplyForm, changeTicketOk, ticketOutForm ,sendOut, form: {getFieldDecorator}} = this.props;
    
      return (
      <Card title="機票退改簽申請" className="orders-detail">
        <BackChangeApplyForm data={ticketOutForm} />
        
        <ChangeTicketFormList data1={changeTicketOk}/>
        <Row>
          <Col className="form-title"  >理由:</Col>
          <Col span="30">
            {getFieldDecorator('Remark', {
              rules: [{ required: true, message: '請填寫理由' }],
            })(
              <TextArea rows={4} />
            )}
          </Col>
        </Row>

          <Row>
            <Col className="form-title">
              <Button
                className="submit-btn"
                onClick={sendOut.bind(this)}
              >送出</Button>
            </Col>
          </Row>
      </Card>
      )   
      
  }
}

const mapStateToProps = (state) => {
  const { backChangeApplyForm,changeTicketOk ,ticketOutForm} = state.ordersReducer.backChangeTicketReducer;
  return {  backChangeApplyForm,changeTicketOk, ticketOutForm}
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleGoBackClick() {
      dispatch(actionCreators.goBackClick())
    },
    getPageData(id){
      dispatch(actionCreators.getPageData(id))
    },
    sendOut(){
      const that = this; //保存this方便提交成功之後跳轉頁面
      this.props.form.validateFields((err, values) => {//此處報錯，validateFields undefined 只需要在導出語句處加入Form就可以
        // console.log(values)
        dispatch(actionCreators.sendForm(values,that))
      });
  
    }
  
  }
}


// export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(BackChangeTicket))

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  Form.create()
)(BackChangeTicket)