import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { withRouter, Redirect } from "react-router-dom";
import { actionCreators } from './store'
import { Form, Input, Icon, Button, Card } from "antd";
import { getUrlParam } from "../../utils";
import './index.less';

const FormItem = Form.Item;
const Login = props => {
    const { form: {getFieldDecorator, validateFields}, handleLogin, history, loading } = props;
    const formRule = {
      userName: {
        rules: [{ required: true, message: '请输入账号' }],
      },
      passWord: {
        rules: [{ required: true, message: '请输入密码' }],
      }
    }
    
    const iconStyle = { color: 'rgba(0,0,0,.25)' };
    const category = 'admin'
      return(
        <div className="login-container">
          <div className="mask"></div>
          <Card title="机票管理系统登陆" className="login-content" bordered={false}>
            <Form onSubmit={e => handleLogin(validateFields, history, category, e)}>
              <FormItem className="a">
                {getFieldDecorator('userName', formRule.userName)(
                  <Input  prefix={<Icon type="user" style={iconStyle} />} placeholder="账号" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('passWord', {initialValue: 666666,})(
                  <Input prefix={<Icon type="lock" style={iconStyle} />} type="passWord" placeholder="密码" />
                )}
              </FormItem>
              <FormItem>
                <Button 
                type="primary" 
                htmlType="submit" 
                className="login-btn"
                loading={loading}>
                  登录
            </Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      )
    
}
  
const mapStateToProps = ( state ) => {
  const {login, loading} = state.loginReducer;
  return{login, loading}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleLogin(validateFields, history, category, e){
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch(actionCreators.login(history, values, category))
        }
      })
    }
  }
}

export default compose(
  withRouter,
  connect( mapStateToProps, mapDispatchToProps ),
  Form.create()
)(Login)
