import React from 'react';

const FormInfo2 = ({ data, category }) => {

    const style = {color: 'red'};
    if(data){
      if(category === 1){
        return(
          <ul className="travel-agency-form-info">
            <li><b>單號</b> <span className="content">{data.SequenceID}</span></li>
            <li><b>表單名稱</b> <span className="content">{data.Name}</span></li>
            <li><b>區域</b> <span className="content">{data.Place}</span></li>
            <li><b>備註</b> <span className="content" style={style}>{data.Remark}</span></li>
          </ul>
        )
      }else{
        return(
          <ul className="travel-agency-form-info">
            <li><b>單號</b> <span className="content">{data.SequenceID}</span></li>
            <li><b>表單名稱</b> <span className="content">{data.Name}</span></li>
            <li><b>類別</b> <span className="content">{data.Place}</span></li>
            <li><b>備註</b> <span className="content" style={style}>{data.Remark}</span></li>
          </ul>
        )
      }
    }else{
      return null;
    }
    
}
  
export default FormInfo2 