import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Radio, Form, Input, Switch, Button, message } from "antd";
import PreviousFlight from './previousFlight';
import TravelQuoteResult from './travelQuoteResult';
import { actionCreators } from '../store'

const RadioGroup = Radio.Group;
class ChangeWaitAffirmFormList extends Component {

  componentWillUnmount() {//組件卸載
    this.props.showPage()
  }

  state = {
    value: 1,
  }


  render() {
    const { previousFlightForm,
      travelQuoteResultForm,
      form: { getFieldDecorator },
      showPublicExpense,
      handleCheckSwitch,
      sendOut } = this.props;

    return (
      <div className="orders-detail">
        <Row>
          <Col>
            < PreviousFlight data={previousFlightForm} />
          </Col>
        </Row>
        <Row>
          <Col className='form-title'>
          < TravelQuoteResult data1={travelQuoteResultForm} />
          </Col>
        </Row>
       
        <Row>
          <Col className="form-title">
            {getFieldDecorator('category')(
                <RadioGroup onChange={handleCheckSwitch}>
                  <Radio value={1}>退票</Radio>
                  <Radio value={2}>改簽</Radio>
                  <Radio value={3}>不退改</Radio>
              </RadioGroup>
              )}
            
          </Col>
        </Row>
        {
          showPublicExpense &&
          <Row>
            <Col span="10">
              <br />
              <span style={{ verticalAlign: 'middle' }}>是否公費:&nbsp;&nbsp;</span>
              {getFieldDecorator('PublicExpense', {initialValue: true})(
                <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
              )}
            </Col>
          </Row>
        }
        <Row>
          <Col className="form-title">
            <Button 
            className="submit-btn"
            onClick={sendOut.bind(this)}
            >送出</Button>
          </Col>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { previousFlightForm, travelQuoteResultForm, showPublicExpense } = state.ordersReducer.changeWaitAffirmFormReducer;
  return { previousFlightForm, travelQuoteResultForm, showPublicExpense }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showPage() {
      dispatch(actionCreators.goBackClick())
    },
    handleCheckSwitch(e) {
      dispatch(actionCreators.checkSwitch(e.target.value))
    },
    sendOut(){
      const that = this; //保存this方便提交成功之後跳轉頁面
      this.props.form.validateFields((err, values) => {
        if(!Object.values(values)[0]){
          message.warning('請選擇下方類別');
        }else{
          dispatch(actionCreators.sendOut(values, that))
        }
        
      });
  
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ChangeWaitAffirmFormList))