import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import LeftContent from "./components/leftContent";

class DetailPage extends Component {
  render(){
    return(
      <div className="detail-content">
        <LeftContent/>
      </div>
    )
  }
}
  

export default withRouter(DetailPage);