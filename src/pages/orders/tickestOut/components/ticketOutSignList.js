import React, { Component } from 'react';

class Name extends Component {

  render() {
    const { data = [] } = this.props;//從ticketOutSignList獲取的數據
    return (
      <ul className="form">
        <li><b>流水號：</b> <span className="content">{data.SequenceID}</span></li>
        <li><b>目前步驟：</b> <span className="content">{data.StepName}</span></li>
        <li><b>填單人：</b> <span className="content">{data.ApplyName}</span></li>
        <li><b>填單時間：</b> <span className="content">{data.ApplyDateTime}</span></li>
        <li><b>類別：</b> <span className="content">{data.TravelTypeName}</span></li>
        <li><b>備註：</b> <span className="content">{data.Remark}</span></li>
        <li><b>附檔：</b> <span className="content">{data.OFileName}</span></li>
        {
          // data.map((v, k) => <li key={v.title}><b>{v.title}：</b> <span className="content">{v.content}</span></li>)  
        }
      </ul>
    )
  }
}

export default Name
