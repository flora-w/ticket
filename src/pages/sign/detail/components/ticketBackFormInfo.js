import React, { Fragment } from 'react';
import HOCformInfo from "./HOCformInfo";

export default HOCformInfo(({ data }) => {
  const style = {color: 'red'}
    return(
      <Fragment>
        <li><b>類別</b> <span className="content">{data.TypeName}</span></li>
        <li><b>理由</b> <span className="content">{data.Remark}</span></li>
        <li><b>費用</b> <span className="content" style={style}>{data.AllMoney}</span></li>
      </Fragment>
    )
})
