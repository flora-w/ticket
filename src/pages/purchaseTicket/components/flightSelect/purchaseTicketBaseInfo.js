import React from 'react';
import {Row, Col, Tag} from 'antd';

const BaseInfo = (props) => {
  const colStyle = 8;
  const { info: {Empno,ChName, Deptcode}} = props;
  return (
    <>
      <Row justify='center' className='purchaseTicket_baseInfo'>
        <Col span={colStyle}>
            <label htmlFor="">填單人工號:</label>
            <Tag color='blue'>{Empno}</Tag>
        </Col>
        <Col span={colStyle}>
            <label htmlFor="">姓名:</label>
            <Tag color='blue'>{ChName}</Tag>
        </Col>
        <Col span={colStyle}>
            <label htmlFor="">部門:</label>
            <Tag color='blue'>{Deptcode}</Tag>
        </Col>
      </Row>
    </>
  )
}

export default BaseInfo;