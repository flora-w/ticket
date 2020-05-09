import React, { Fragment } from 'react';
import HOCAssistantFillInList from "./HOCAssistantFillInList"

export default HOCAssistantFillInList(({ data }) => {
    return(
      <Fragment>
        <li><b>返台休假類型</b> <span className="content">{data.TravelTypeName}</span></li>
        <li><b>返台休假單號</b> <span className="content">{data.Remark}</span></li>
        {/* <li><b>附檔</b> <span className="content"><a href={`"${data.OFilePath}"`}>{data.OFileName}</a></span></li> */}
      </Fragment>
    )
})