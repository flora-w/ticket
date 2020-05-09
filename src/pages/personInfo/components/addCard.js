import React, { Component } from 'react';
import { Table, Select, Input, Button, DatePicker, Row, Col } from "antd";
import moment from 'moment';
import './index.less'


const Option = Select.Option;

class AddCardInfo extends Component {

  state = {
    showGangAo: false,   
    showInTaiwan: false,
    columns:[{
      title: '證件類型',
      dataIndex: 'CertType',
      align:"center"
    }, {
      title: '證件姓名',
      dataIndex: 'CertName',
      align:"center"
    }, {
      title: '證件編號',
      dataIndex: 'CertNO',
      align:"center"
    }, {
      title: '有效期',
      dataIndex: 'CertValidTime',
      align:"center"
    }, {
      title: '簽注有效期',
      dataIndex: 'SignValidTime',
      align:"center",
      render: text => text ? text : '———'
    }, {
      title: '入臺許可證有效期',
      dataIndex: 'TaiwanValidTime',
      align:"center",
      render: text => text ? text : '———'
    }]
  }

  handleCardCategoryChange = (value) =>{
    value === '港澳通行證'? this.setState({showGangAo: true}) :  this.setState({showGangAo: false});
    value === '大陸居民往來台灣通行證'? this.setState({showInTaiwan: true}) :  this.setState({showInTaiwan: false});
  }

  showDom1(s, isEdit, editData){
    if(s){
      return true;
    }
    if(isEdit){
      if(editData.CertType === '港澳通行證'){
        return 'ga';
      }
      if(editData.CertType === '大陸居民往來台灣通行證'){
        return 'tw';
      }
    }
    return false;
  }


  componentWillMount(){
    if(this.props.isEdit){
      const { editData } = this.props;
      this.handleCardCategoryChange(editData.CertType);
    }
  }

  render(){
    const style = {width: 180}
    const styleb = {width: 150}
    const { addPersonPageData:{cardCategory}, form: {getFieldDecorator }, handleCardNewAdd, haveFamilyName, cardInfo, isCommonPeople, isEdit }= this.props; 
    const { showGangAo,  showInTaiwan} = this.state;
    const cardNames = cardCategory&& cardCategory.map(({Value}) => (<Option value={Value} key={Value}>{Value}</Option>));
    let showEditInfo = {};
    
    // console.log(cardInfo)

    //如果是编辑的话显示编辑数据
    let editData = this.props.editData || {};
    if(isEdit){
      showEditInfo = {
        cardCategory_edit: editData.CertType,
        name_edit: editData.CertName,
        cardNo_edit: editData.CertNO,
        validDate_edit: editData.CertValidTime ? {initialValue: moment(editData.CertValidTime, 'YYYY-MM-DD')} : {},
        taiwanTime_edit: editData.TaiwanVaidTime,
        signValidDate_edit: editData.SignValidTime,
      }
    }else{
      showEditInfo = {
        cardCategory_edit: null,
        name_edit: null,
        cardNo_edit: null,
        validDate_edit: {},
        taiwanTime_edit: null,
        signValidDate_edit: null,
      }
    }
    return(
      <div className="card-info">
        <Row>
          <Col span="10">
          <b>證件類型:</b>
            {getFieldDecorator('cardCategory', {initialValue: showEditInfo.cardCategory_edit})(
              <Select 
                className="select" 
                size="small" 
                onChange={this.handleCardCategoryChange}
                style={style}
                >{cardNames}
              </Select>
            )}
          </Col>
          <Col span="10">
          <b style={styleb}>證件姓名:</b>
          {getFieldDecorator('name', {initialValue: showEditInfo.name_edit})(
            <Input className="select" size="small" style={style} />
          )}
          </Col>
          
        </Row>
        <Row>
        <Col span="10">
        <b>證件編號:</b>
          {getFieldDecorator('cardNo', {initialValue: showEditInfo.cardNo_edit})(
            <Input className="select" size="small" style={style} />
          )}
          </Col>
          
          <Col span="10">
          <b style={styleb}>有效期:</b>
          {getFieldDecorator('validDate', {...showEditInfo.validDate_edit})(
            <DatePicker className="select" size="small" style={style} />
          )}
          </Col>
          
          
        </Row>
        {
          showInTaiwan &&
          <Row>
             <Col span="10">
              <b>簽注有效期:</b>
            {getFieldDecorator('taiwanTime', {initialValue: showEditInfo.SignValidTime})(
              <Input className="select" size="small" style={style} />
            )}
          </Col>
          <Col span="10">
           <b style={styleb}>入臺許可證有效期:</b>
            {getFieldDecorator('inTaiValidDate', {initialValue: showEditInfo.taiwanTime_edit})(
              <Input className="select" size="small" style={style} />
            )}
          </Col>
          </Row>
        }

        {
          showGangAo &&
          <Row>
            <Col span="10">
            <b>簽注有效期:</b>
            {getFieldDecorator('taiwanTime', {initialValue: showEditInfo.SignValidTime})(
              <Input className="select" size="small" style={style} />
            )}
          </Col>
          </Row>
        }

        {
          !isCommonPeople &&
          <div>
            <Row>
              <Col offset="2">
                <Button
                  className="newAdd"
                  disabled={haveFamilyName}
                  size="small"
                  type="primary"
                  onClick={handleCardNewAdd.bind(this, this.props.form)}>新增</Button>
              </Col>
            </Row>
            {
              cardInfo.length > 0 &&
              <Table
                columns={this.state.columns}
                dataSource={cardInfo}
                pagination={{ hideOnSinglePage: true }}
                bordered={true}
                rowKey={'CertType'}
                size="small"
              />
            }
          </div>
        }
        
        </div>
        )
  }
}
  
export default AddCardInfo;