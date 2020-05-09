import React, { Fragment } from 'react';
import HOCAssistantFillInList from "./HOCAssistantFillInList"


export default HOCAssistantFillInList(({ data }) => {
  const style = {color: 'red'}
    return(
      <Fragment>
        <li><b>差旅單號</b> <span className="content"></span></li>
        <li><b>掛賬部門</b> <span className="content" style={style}></span></li>
      </Fragment>
    )
})
