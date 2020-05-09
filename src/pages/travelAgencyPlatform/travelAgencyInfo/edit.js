import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Input } from "antd";
import { actionCreators } from "../store";

class Edit extends Component {

  state = {
    originPwd: ''
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPwd')) {
      callback('兩次輸入密碼不一致');
    } else {
      callback();
    }
  }

  render(){
    const { form: {getFieldDecorator}, submit  } = this.props;
    return(
      <Card title="密碼更改">
      <Form onSubmit={submit.bind(this)}>
        <Form.Item label="原始密碼">
          {getFieldDecorator('originPwd', {
              rules: [{
                required: true, message: '請輸入原始密碼',
              }, {
                validator: null,
              }],
            })(
              <Input type="text" />
            )}
        </Form.Item>
        <Form.Item label="新密碼">
          {getFieldDecorator('newPwd', {
              rules: [{
                required: true, message: '請輸入新密碼',
              }, {
                validator: null,
              }],
            })(
              <Input type="text" />
            )}
        </Form.Item>
        <Form.Item label="再次輸入新密碼">
          {getFieldDecorator('newPwdAgain', {
              rules: [{
                required: true, message: '請再次輸入新密碼',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="text" />
            )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">提交</Button>
        </Form.Item>
        </Form>
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  return{}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    submit(e){
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch(actionCreators.modifyPwd(values))
        }
      });
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( Form.create()(Edit) )