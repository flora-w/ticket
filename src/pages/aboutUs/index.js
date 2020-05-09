import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";
import LeftNav from '../../commonPages/leftNav';
import Breadcrumb from '../../components/breadcrumb';

class AboutUs extends Component {
  render(){
    return(
      <Row>
        <Col span="5"><LeftNav/></Col>
        <Col span="19">
        <Breadcrumb />
        {this.props.children}
        </Col>
      </Row>
    )
  }
}
  
export default withRouter(AboutUs);