import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Input, Button ,message,Modal} from "antd";
import { actionCreators } from "../store";

const { Option } = Select;
const confirm = Modal.confirm;
class VIPAndHobby extends Component {

  state = {
    companyInfo: {},
    card: ''
  }

  //顯示的公司和卡號信息
  componyAndCardItems = () => {
    const { companyAndCard } = this.props.vipAndHobby;
    return companyAndCard.map( ({Airlinename, CardNo, UniqueID}, i) => (
      <li key={CardNo}><span>{Airlinename}</span> <span>{CardNo}</span> <i onClick={() => this.showPropsConfirm(Airlinename, CardNo,i, UniqueID)}>刪除</i></li>
    ))
  }

  showPropsConfirm = (Airlinename, CardNo,i, UniqueID)=>{
    confirm({
      title: '提示信息?',
      content: `您確定要刪除 ${Airlinename} 的卡號為 ${CardNo} 信息嗎?`,
      okText: '確定',
      okType: 'danger',
      okButtonProps: {
        disabled: false,
      },
      cancelText: '取消',
      onOk: ()=> {
        this.props.handleDeleteCompanyAndCard(i, UniqueID)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  //選擇航空公司
  handleCompanySelect = (v, e) => {
    this.setState({companyInfo: {value: v, text: e.props.children}})
  }

  //填寫卡號
  handleCardChange = ( e ) => {
    this.setState({card: e.target.value})
  }

  //
  render(){
    const { company, companyAndCard } = this.props.vipAndHobby;
    const { handleAddCompanyAndCard, empno, name} = this.props;
    const { companyInfo, card } = this.state;
    const companyOption = company.map(v => (<Option value={v.Code} key={v.Code}>{v.Value}</Option>));

    return(
      <div className="VIP-and-hobby">
          <div>
             <b>航空公司:</b> 
             <Select 
              className="select" 
              size="small" 
              onChange={this.handleCompanySelect}>
              {companyOption}
             </Select>
             <b>會員卡號:</b>
             <Input 
              className="input" 
              size="small"
              value={card}
              onChange={this.handleCardChange} />
             <Button 
              className="button" 
              type="primary" 
              size="small"
              onClick={handleAddCompanyAndCard.bind(this, companyInfo, card, empno, name)}>
              新增
             </Button>
          </div>
          <ul>
            {
              companyAndCard.length>0 && 
              <li key={1}><span>航空公司</span> <span>會員卡號</span></li>
            }
            {this.componyAndCardItems()}
          </ul>
          
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { vipAndHobby, baseInfo:{ empno, name } } = state.personInfoReducer.personInfoMaintain;
  return{vipAndHobby, empno, name}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleAddCompanyAndCard(companyInfo, card, empno, name){
      this.setState({card: ''})
      if(!companyInfo['value']){
        message.warn('航空公司不能爲空');
        return;
      }
      if(!card){
        message.warn('卡號不能爲空');
        return;
      }
      let temp = this.props.vipAndHobby.companyAndCard  ;
      for(let i of temp){
        if(i.CardNo == card){
          message.warn('卡號不能重複')
          return;
        }
      }
      dispatch(actionCreators.addCompanyAndCard(companyInfo, card, empno, name))
    },
    handleDeleteCompanyAndCard(i, UniqueID){
      dispatch(actionCreators.deleteCompanyAndCard(i, UniqueID))
    },

    
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( VIPAndHobby )