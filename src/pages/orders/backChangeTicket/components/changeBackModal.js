import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Radio, Input, Button, message } from 'antd';
// import FillForAssistant from "../../../purchaseTicket/components/flightSelect/fillForAssistant";
import OrdersForBackChange from "../../../../components/flightSelect/ordersForBackChange";
import { actionCreators } from "../store";
import '../index.less'


class ChangeBackModal extends Component {
    render() {
        const { form, flightPlace, people, changeTicketEdit, handleChangeTicketOk,handleCancel ,hiddenModal} = this.props;
        return (
            <div className="fill-form-assistant">               
                <OrdersForBackChange
                    editData={changeTicketEdit}
                    form={form}
                />
                <Row>
                    <Col className="form-title" span="8"></Col>
                    <Col span="10">
                        <Button 
                        className="submit-btn"
                        onClick={handleChangeTicketOk.bind(this, changeTicketEdit)}
                        >確定</Button>
                        <Button 
                         className="submit-cancel"
                         onClick={hiddenModal}
                         >取消</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {  changeTicketEdit } = state.ordersReducer.backChangeTicketReducer;
    return { changeTicketEdit }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeTicketOk(changeTicketEdit){
            this.props.form.validateFields((err, values) => {
                if (!err) {
                  console.log('Received values of form: ', values);
                  dispatch(actionCreators.changeTicketOk(values, changeTicketEdit));
                  this.props.form.resetFields()
                }else{
                    message.warning('請選擇日期')
                }
              });
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ChangeBackModal))