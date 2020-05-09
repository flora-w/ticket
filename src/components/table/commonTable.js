import React from "react";
import { Table } from "antd";
import './index.less';


export default ( {columns, dataSource, size, rowKey} ) => {
  
  return (
    <Table
     className="ef-common-table"
     columns={columns}
     dataSource={dataSource}
     rowKey={rowKey}
     bordered
     size={size}
    />
  )
}