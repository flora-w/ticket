import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Input, Button, DatePicker, Form, notification } from "antd";
import Table from './newCardTable'
import { actionCreators } from "../store";
import { compose } from "../../../../utils";

const { Option } = Select;

class CardInfo extends Component {
  state={
    showGangAo: false,
    showInTaiwan: false,
    
  }

  handleCardCategoryChange = (value) =>{
    value === '港澳通行證'? this.setState({showGangAo: true}) :  this.setState({showGangAo: false});
    value === '大陸居民往來台灣通行證'? this.setState({showInTaiwan: true}) :  this.setState({showInTaiwan: false});
  }
  render(){
    const { cardInfo:{cardCategory, data }, form: {getFieldDecorator }, handleCardNewAdd, empno, name, handleDelete }= this.props; 
    const { showGangAo,  showInTaiwan} = this.state;
    const cardNames = cardCategory.map(v => (<Option value={v.Value} key={v.Value}>{v.Value}</Option>))
    return(
      <div className="card-info">
        <div>
          <b>證件類型:</b>
          {getFieldDecorator('cardCategory')(
            <Select 
              className="select" 
              size="small" 
              onChange={this.handleCardCategoryChange}>{cardNames}
            </Select>
          )}
          
          <b>證件姓名:</b>
          {getFieldDecorator('name')(
            <Input className="select" size="small" />
          )}
          
        </div>
        <div>
          <b>證件號碼:</b>
          {getFieldDecorator('cardNo')(
            <Input className="select" size="small" />
          )}
          
          <b>有效期:</b>
          {getFieldDecorator('validDate')(
            <DatePicker className="select" size="small" />
          )}
          
        </div>
        {
          showInTaiwan&&
          <div>
            <b>簽注有效期:</b>
            {getFieldDecorator('signValidDate')(
              <Input className="select" size="small" />
            )}

            <b>入臺許可證有效期:</b>
            {getFieldDecorator('inTaiValidDate')(
              <Input className="select" size="small" />
            )}

          </div>
        }

        {
          showGangAo&&
          <div>
            <b>簽注有效期:</b>
            {getFieldDecorator('signValidDate')(
              <Input className="select" size="small" />
            )}
          </div>
        }
        
        <Button 
        className="newAdd" 
        size="small" 
        type="primary"
        onClick={handleCardNewAdd.bind(this, empno, name)}>新增</Button>
        <Table data={data} deleteInfo={handleDelete} />
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { cardInfo, baseInfo:{empno, name} } = state.personInfoReducer.personInfoMaintain;
  return{cardInfo, empno, name}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleCardNewAdd(empno, name){
      this.props.form.validateFields((err, values) => {
        for (const item of Object.values(values)) {
          if(!item){
            notification.warn({
              placement: 'bottomRight',
              message: '請填寫完整信息',
            });
            return;
          }
        }
        dispatch(actionCreators.cardNewAdd(values, empno, name));
        
      });
    },
    handleDelete(id, empno){
      dispatch(actionCreators.deleteInfo(id, empno))
    }
  }
}

 export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  Form.create()
)( CardInfo )