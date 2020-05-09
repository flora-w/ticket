import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const mergeCellTable = ({ data, columns, rowkey,scroll, mergeItems = [], className = '' }) => {
  //存储一行要合并的单元格结束时，那一行要判断是否要合并单元格值
  let temp = {};
  /**
   * 合併單元格
   */
const mergeCell = (text, record ,column) => {
  //i为要渲染的单元格数
    let i = 0;
    // console.log(1,text, temp, new Date().getTime())
    //如果此行要合并的数据与temp中的数据不同，则需要合并
    if ( !checkColumn(temp, record, mergeItems)) {
      //循环整个数据表，看是否有相同要合并的
      data.forEach((item) => {
        if (checkColumn(item, record, mergeItems)) {
          i += 1;
        }
      });
    }
    //一行中最后要合并的单元格判断结束时，存储在temp中
    temp = saveDataToObj(temp, record, mergeItems, column);
    return i;
  }

  /**
   * 判斷多個數據是否相同，如果相同則可以合併
   */
  const checkColumn = (temp, record, mergeItems) => {
    for (const v of mergeItems) {
      if(temp[v] !== record[v]){
        return false;
      }
    }
    return true;
  }
 /**
  * 保存到temp中
  */
 const saveDataToObj = (temp, record, mergeItems, column) => {
   let length = mergeItems.length;
  if(mergeItems[length-1] === column){
    for (const v of mergeItems) {
      temp[v] = record[v];
    }
  }
  return temp;
 }

  /**
   * 添加可合併的單元格
   */
  columns = columns.map(v => {
    if(mergeItems.includes(v.dataIndex)){
      //单元格内容垂直居中
      v.className = 'abc';
      v.render = (text, record, index) => {
        let i = mergeCell(text, record, v.dataIndex);
        //如果合并的单元格有额外的渲染时
        if(v.extraRender){
          let element = {};
          element = v.extraRender(text, record, index);
          element = {children: element};
          return {...element, props: {rowSpan: i}}
        }
        return {children: text, props: {rowSpan: i}}       
      };
    }
    return v;
  })

  className = 'ef-mergeCells-table ' + className;

    return(
        <Table 
        rowKey={rowkey}
        columns={columns} 
        dataSource={data}
        bordered
        pagination={false}
        size="middle"
        scroll={scroll}
        className={className} />
    )
}
  
export default mergeCellTable;

mergeCellTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  rowkey: PropTypes.string,
  mergeItems: PropTypes.array,
  className: PropTypes.string,
  scroll:PropTypes.object
};