import React from 'react';
import { Table } from "antd";

export default ({data, columns1, columns2, rowKey1, rowKey2}) => {

  const expandedRowRender = record => {
    return <Table
            className="inner-table"
            rowKey={rowKey2}
            columns={columns2}
            dataSource={record.detail}
            size="small"
            pagination={false}
          />
  }

    return(
        <Table
        rowKey={rowKey1}
        columns={columns1}
        dataSource={data}
        pagination={false}
        bordered
        expandedRowRender={expandedRowRender}
        />
    )
  
}
  
