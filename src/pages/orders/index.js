import React from 'react';
import { Row, Col } from "antd";
import LeftNav from '../../commonPages/leftNav';
import Breadcrumb from '../../components/breadcrumb'

const Orders = props => {
  return (
    <Row>
      <Col span="5"><LeftNav /></Col>
      <Col span="19">
        <div>
          <Breadcrumb />
          <div className="right-content">
            {props.children}
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Orders;