import React, { Fragment } from 'react';
import HOCformInfo from "./HOCformInfo";

export default HOCformInfo(({ data }) => {
  const style = {color: 'red'}
    return(
      <Fragment>
        <li><b>類型</b> <span className="content">{data.TypeName}</span></li>
        <li><b>原時效</b> <span className="content">{data.OTime}</span></li>
        <li><b>修改后時效</b> <span className="content" style={style}>{data.NTime}</span></li>
        <li><b>備註</b> <span className="content" style={style}>{data.Reason}</span></li>
      </Fragment>
    )
})
