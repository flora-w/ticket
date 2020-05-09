import React from 'react';

const BackChangeForm = ({ data }) => {
    if(data){
      return(
        <ul className="travel-agency-form-info">
          <li><b>流水號</b> <span className="content">{data.SequenceID}</span></li>
          <li><b>類別</b> <span className="content">{data.Name}</span></li>
          <li><b>理由</b> <span className="content">{data.Remark}</span></li>
        </ul>
      )
    }else{
      return null;
    }
}
  
export default  BackChangeForm