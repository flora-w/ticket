import React from 'react';
import PropTypes from 'prop-types';
import { ModifyTable } from "../../../components/table";

const AuthorityMaintain = (props) => {

  /**
   * 编辑保存时
   */
  const saveSuccess = row => {
    let table = props.tableData;
    table = table.map( v => {
      if(v.key === row.key){
        v = {...v, ...row};
      }
      return v;
    })
    props.saveAuth(row, table);
  }
  
  
    return (
        <ModifyTable
          dataSource={props.tableData}
          columns={props.columns}
          saveSuccess={saveSuccess}
          scroll={props.scroll}
          noFixed={props.noFixed}
        />
    )
  
}

//类型限制
AuthorityMaintain.propTypes = {
  tableData: PropTypes.array,
  columns: PropTypes.array,
  saveAuth: PropTypes.func,
}

export default AuthorityMaintain