import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { message } from "antd";

class AuthRoute extends Component {
  render(){
    const { component: Component, ...rest } = this.props;
    const user = sessionStorage.getItem('user');
    if(user){
      return <Route {...rest} component={Component} />
    }else{
      message.info("請先登陸")
      return <Redirect to='/home' />
    }
  }
}
  
export default AuthRoute