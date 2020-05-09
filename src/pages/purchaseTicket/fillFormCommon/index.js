import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Select, Radio, Checkbox, Row, Col, Input, Button, message, DatePicker, Tag  } from "antd";
import { compose } from "../../../utils";
import { actionCreators } from "./store";
import CategorySelect from "./components/categorySelect";
import { FillFlight } from '../../../components/flightSelect';
import Upload from "../../../components/upload";
 


import './index.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Textarea = Input.TextArea;


class FillFormCommon extends Component {

  state = {
    file: null,
    haveFile: 'N'
  }

  /**
   * 显示单号状态
   */
  showDanhaoStatus = (status) => {
    if(status == 1) {return <Tag color="green">签核完成</Tag>}
    if(status == 0) {return <Tag color="green">正在签核中</Tag>}
    return null;
  }

  uploadSuccess = (file) => {
    this.setState({file, haveFile: 'Y'})
  }

  componentDidMount(){
    this.props.getPageData();
  }
  componentWillUnmount(){
    this.props.resetAllState();
  }
  render(){
    const { form:{ getFieldDecorator, validateFields}, 
    pageData: {category, ftszItem,area,danhao,chailvChargeDept, people, flightPlace, timeLimit}, 
    flightInfo,
    allFlightInfo,
    handleChailvChange,  
    handleCategoryChange,
    showChailvItem,
    showFantaiItem,
    showJiNanFanGuoItem,
    showLiziItem,
    showUpload,
    handleFantaiItemChange,
    handleAreaChange,
    showVildDate,
    categoryData,
    loading,
    submitForm} = this.props;
    const {haveFile} = this.state;
    
    //航程选择页面数据
    const flightPageData = {persons: people, place: flightPlace}
    //返台休假選項
    const ftszItem_ = ftszItem.map( (v,i) => (<Checkbox key={i} value={v.ViceCode}>{v.ViceName}</Checkbox>));
    //區域
    const area_ = area.map( (v,i) => (<Radio key={i} value={v.Code}>{v.Value}</Radio>));
    
    // console.log(area_)
    //单号1
    const danhao1 = danhao.ChaiLv && danhao.ChaiLv.map( v => (<Option key={v.Code} value={v.Code}>{v.Code} -- {this.showDanhaoStatus(v.Name)}</Option>));
    //单号2
    const danhao2 = danhao.FanTai && danhao.FanTai.map( v => (<Option key={v.Code} value={v.Code}>{v.Code} -- {this.showDanhaoStatus(v.Name)}</Option>));
    //规则
    const rules = {
      rules: [{required: true,}],
    }
    const areaRules = {
      initialValue: showFantaiItem ? 'TW' : '',
      rules: [{required: true,}],
    }
    return(
      <div className="fill-form-common">
        <Row>
          <Col className="form-title"  span="3">類別:</Col>
          <Col span="21">
                <CategorySelect 
                getFieldDecorator={getFieldDecorator}
                data={category}
                onChecked={handleCategoryChange} />
          </Col>
        </Row>

        {
          showChailvItem && 
          <Row className="title">
            <Col className="form-title" span="3">差旅單號:</Col>
            <Col span="7">
              {getFieldDecorator('ChailvSID',rules)(
                <Select className="select" size="small" onChange={handleChailvChange}>
                  {danhao1}
                </Select>
              )}
            </Col>
            <Col className="form-title" span="2">掛賬部門:</Col>
            <Col span="9">
              {getFieldDecorator('chargeDept_cl', { initialValue: chailvChargeDept })(
                <Input className="select" size="small" disabled />
              )}
            </Col>
          </Row>
        }

        {
          showFantaiItem &&
          <div>
            <Row>
              <Col className="form-title" span="3">返台休假類型:</Col>
              <Col span="7">
                {getFieldDecorator('goToTaiwanCategory',rules)(
                  <CheckboxGroup onChange={handleFantaiItemChange}>
                    {ftszItem_}
                  </CheckboxGroup>
                )}
              </Col>
            </Row>

            <Row>
              <Col className="form-title" span="3">返台假單:</Col>
              <Col span="7">
                {getFieldDecorator('FantaiSID', rules)(
                  <Select className="select" size="small">
                    {danhao2}
                  </Select>
                )}
              </Col>
            </Row>
          </div>
        }

        {
          showJiNanFanGuoItem &&
          <Row>
            <Col className="form-title" span="3">眷屬姓名:</Col>
            <Col span="7">
              {getFieldDecorator('FamilyName', rules)(
                <Input size="small" />
              )}
            </Col>
            <Col className="form-title" span="3">與本人關係:</Col>
            <Col span="7">
              {getFieldDecorator('FamilyShip', rules)(
                <Input size="small" />
              )}
            </Col>
          </Row>
        }

        {
          showUpload &&
          <Row>
            <Col className="form-title" span="3">上傳證明文件:</Col>
            <Col span="7">
              <Upload
              success={this.uploadSuccess} />
            </Col>
          </Row>
        }

        {
          showLiziItem &&
          <Row>
            <Col className="form-title" span="3">掛賬部門:</Col>
            <Col span="7">
              {getFieldDecorator('chargeDept_lizi', rules)(
                <Input size="small" />
              )}
            </Col>
          </Row>
        }

        <Row>
          <Col className="form-title"  span="3">區域:</Col>
          <Col span="7">
            {getFieldDecorator('PlaceID', areaRules)(
                 <RadioGroup 
                 onChange={handleAreaChange}
                 disabled={showFantaiItem} 
                 >{area_}</RadioGroup>
              )}
          </Col>
        </Row>
        
        {
          showVildDate &&
          <Row>
            <Col className="form-title" span="3">簽證有效期:</Col>
            <Col span="7">
              {getFieldDecorator('VisaDate', rules)(
                <DatePicker size="small" />
              )}
            </Col>
          </Row>
        }
        
         <FillFlight 
         addFlightInfo={allFlightInfo}
         flightPageData={flightPageData}
         timeLimit={timeLimit} />

         {/* <Row>
          <Col className="form-title"  span="3">備註:</Col>
          <Col span="17">
            {getFieldDecorator('Remark', rules)(
               <Textarea className="remark"></Textarea>
              )}
          </Col>
        </Row> */}

        <Row>
          <Col className="form-title"  span="3"></Col>
          <Col span="17">
              <Button 
              className="submit-btn"
              loading={loading}
              onClick={submitForm.bind(this, validateFields, flightInfo, categoryData, this.props.pageData, haveFile)}
              >提交</Button>
          </Col>
        </Row>
       
        
        
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { pageData, flightInfo, showChailvItem, showFantaiItem, showJiNanFanGuoItem,showLiziItem, showUpload, handleAreaChange, showVildDate, categoryData, loading } = state.fillFormReducer.fillFormCommonReducer;
  return{
    pageData,
    flightInfo,
    showChailvItem,
    showFantaiItem,
    showJiNanFanGuoItem,
    showLiziItem,
    showUpload,
    handleAreaChange, 
    showVildDate,
    categoryData,
    loading
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData(){
      dispatch(actionCreators.getPageInitData());
    },
    allFlightInfo(data){
      dispatch(actionCreators.allFlightInfo(data));
    },
    handleChailvChange(v){
      dispatch(actionCreators.chailvChange(v));
    },
    handleCategoryChange(data){
      dispatch(actionCreators.categoryChange(data));
    },
    handleFantaiItemChange(data){
      dispatch(actionCreators.fantaiItemChange(data));
    },
    handleAreaChange(e){
      dispatch(actionCreators.areaChange(e.target.value));
    },
    uploadSuccess(file){
      dispatch(actionCreators.uploadFile(file))
    },
    submitForm(validateFields, flightInfo, category, pageData, HaveFile, file){
      const that = this;
      validateFields((err, values) => {
        if(err){
          message.warning('请填写完整信息再提交');
          return;
        }
        if(flightInfo.length === 0){
          message.warning('请填写航程信息');
          return;
        }
        if(category.length === 0){
          message.warning('请选择类别');
          return;
        }
        dispatch(actionCreators.loading());
        dispatch(actionCreators.submitForm(values, flightInfo, category, pageData, HaveFile, this.state.file, that));
      })
    },
    resetAllState(){
      dispatch(actionCreators.resetAllState());
    }
  }
}
 

 export default compose(
  withRouter,
  connect( mapStateToProps, mapDispatchToProps ),
  Form.create()
)(FillFormCommon)