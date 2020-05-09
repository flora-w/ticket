/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Tag, Card, Popconfirm } from 'antd';
import  './index.less';
import PropTypes from 'prop-types';

const ShowPersonInfo = (props) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    setColumns([
      { title: '姓名:', dataIndex: 'LinkChName', key: 'LinkChName'},
      { title: '乘機人工號:', dataIndex: 'LinkEmpNo', key: 'LinkEmpNo'},
      { title: '性別:',  dataIndex: 'LinkSex', key: 'LinkSex'},
      { title: '國籍', dataIndex: 'Country', key: 'Country'},
      { title: '手機', dataIndex: 'Phone', key: 'Phone'},
      {
        dataIndex: '',
        key: 'x',
        render: (record) => (<Popconfirm
                              title="你確定要刪除嗎?"
                              onConfirm={props.handleDelete.bind(this,record.key)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <span style={{color: '#09f', cursor: 'pointer'}}>Delete</span>
                            </Popconfirm>),    
      },
    ]);
  },[])
  useEffect(() => {
    setData([...props.data]);
  },[props.data])
  const renderExpandedRow = useCallback((record) => (
    <div className='expandedRow'>
        <div><Tag color='blue'>證件類型</Tag><span>{record.CertType}</span></div>
        <div><Tag color='blue'>證件號</Tag><span>{record.CertNO}</span></div>
        <div><Tag color='blue'>證件名</Tag><span>{record.CertName}</span></div>
        <div><Tag color='blue'>證件有效期</Tag><span>{record.CertValidTime}</span></div>
        {
          record.SignValidTime &&
          <div><Tag color='blue'>簽證有效期</Tag><span>{record.SignValidTime.format('YYYY-MM-DD')}</span></div>
        }
    </div>
  ),[])
  return (
    <Card
        title='人員信息'
        size='small'
        style={{marginBottom: 10}}
      >
      <Table
        style={{marginBottom: 20}}
        columns={columns}
        expandedRowRender={renderExpandedRow}
        dataSource={data}
        rowKey='CertNO'
        pagination={{hideOnSinglePage: true}}
      />
    </Card>
  )
}
ShowPersonInfo.prototypes = {
  data: PropTypes.array.isRequired
}

export default ShowPersonInfo