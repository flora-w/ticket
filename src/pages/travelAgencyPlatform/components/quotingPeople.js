import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "../../../components/card";
import { Select } from "antd";
import { actionCreators } from '../store';
import { formatDate } from "../../../utils";

const Option = Select.Option;
class QuotingPeople extends Component {
  render(){
    const { card, company, hobby, handleSelectChange, selectCard, selectCompany,baseInfo } = this.props;
    const cardOptions = card.map(v => (<Option key={v.CertType} value={v.CertType}>{v.CertType}</Option>));
    const companyOptions = company.map(v => (<Option key={v.Airlineid} value={v.Airlineid}>{v.Airlinename}</Option>))
    if(card.length>0){
      return(
        <Card title="個人資料" className="person">
           {
             hobby.length && 
             <div>
                <div className="item">
                  <b>姓名:</b><span>{hobby[0].Chname}</span>
                  <b>國籍:</b><span>{hobby[0].Country}</span>
                  <b>座位喜好:</b><span>{hobby[0].SeatType ? hobby[0].SeatType : 'N/A'}</span>
                  <b>飲食喜好:</b><span>{hobby[0].FoodType ? hobby[0].FoodType : 'N/A'}</span>
                </div>
                <div className='item'>
                  <b>性別:</b><span>{baseInfo[0].Sex ? baseInfo[0].Sex : 'N/A'}</span>
                  <b>出生年月:</b><span>{baseInfo[0].BirthDate ? baseInfo[0].BirthDate : 'N/A'}</span>
                  <b>聯係方式:</b><span>{baseInfo[0].Phone ? baseInfo[0].Phone : 'N/A'}</span>
                </div>
                <div className="item" style={{marginTop: 10}}><b>備註:</b><span>{hobby[0].Remark}</span></div>
                <div className="title">證件信息</div>
             </div>
           }
            <div className="item">
              <b>證件類型:</b>
              <Select 
              size="small" 
              className="select"
              onChange={(v) => handleSelectChange(v, 1)}>
                {cardOptions}
              </Select>
              <b>證件姓名:</b><span>{selectCard.CertName}</span>
              <b>證件號碼:</b><span>{selectCard.CertNO}</span>
              <b>有效期:</b><span>{formatDate(selectCard.CertValidTime)}</span></div>
            <div className="title">會員卡</div>
            <div className="item">
              <b>航空公司:</b>
              <Select 
              size="small" 
              className="select"
              onChange={(v) => handleSelectChange(v, 2)} >
                {companyOptions}
              </Select>
              <b>會員卡號:</b>
              <span>{selectCompany.CardNo}</span>
            </div>
          </Card>
      )
    }else{
      return null
    }
    
  }
}
  
const mapStateToProps = ( state ) => {
  const {  card, company, hobby, selectCard, selectCompany, baseInfo } = state.travelAgencyPlatformReducer;
  return{ card, company, hobby, selectCard, selectCompany, baseInfo }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleSelectChange(v, id) {
      dispatch(actionCreators.cardAndCompanyChange(v, id));
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( QuotingPeople )