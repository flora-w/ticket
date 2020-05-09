import React, { Fragment } from 'react';
import HOCformInfo from "./HOCformInfo";

export default HOCformInfo(({ data }) => {
    return(
      <Fragment>
        <li><b>類別</b> <span className="content">{data.TravelTypeName}</span></li>
        <li><b>備註</b> <span className="content">{data.Remark}</span></li>
        <li><b>附檔</b> <span className="content"><a href={`"${data.OFilePath}"`}>{data.OFileName}</a></span></li>
      </Fragment>
    )
})
