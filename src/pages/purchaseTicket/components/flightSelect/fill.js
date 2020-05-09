import React, { Component } from 'react';
import { Form, Select, Radio, Row, Col, Button, message  } from "antd";
import FlightItem from "./flightItem";
import FlightItemForMany from './flightItemForMany';
import FlightDetail from "./flightDetail";
import Edit from './edit';

class Fill extends Component {
  state={
    category: 'twoWay',
    isEdit: false,
    editData: {},
    flightInfo: []
  }

  
  render(){
    const { flightInfo, isEdit, editData } = this.state;
    const { flightPageData, form } = this.props;
    return(
      <div className="fill-flight">
        {
          !isEdit &&
          <div>
            {this.showFillFlight()}
            <Row>
            <Col offset="3">
              <Button
                type="primary"
                size="small"
                onClick={this.submitFlightInfo}>确定</Button>
            </Col>
          </Row>
          </div> 
          
        }

        {
          isEdit && 
          <div>
            <Edit place={flightPageData.place} form={form} editData={editData}/>
            <Row>
              <Col offset="3">
                <Button
                  type="primary"
                  size="small"
                  onClick={this.submitFlightInfo}>更新</Button>
                &nbsp;&nbsp;
                <Button
                  type="default"
                  size="small"
                  onClick={this.handleEditCancel}>取消</Button>
              </Col>
            </Row>
          </div>
        }
        

        <FlightDetail 
        flightInfo={flightInfo} 
        deleteInfo={this.deleteInfo}
        editInfo={this.handleEditInfo}/>
      </div>
    )
  }

showFillFlight = () => {
  const { form:{ getFieldDecorator}, flightPageData:{persons = [], place = []} } = this.props;
  const { category } = this.state;
  return (
    <div>
       <Row>
          <Col className="form-title"  span="3">乘機人:</Col>
          <Col span="7">
            {getFieldDecorator('person')(
                 <Select className="select" size="small">
                    {
                      persons.map( v =>(
                        <Select.Option key={v.ChName}>{v.ChName}</Select.Option>
                      ))
                    }
                 </Select>
              )}
          </Col>
        </Row>

        <Row>
          <Col className="form-title flight-select"  span="3">航程類型:</Col>
          <Col span="7">
              <Radio.Group  onChange={this.handleFlightChange} defaultValue="twoWay">
                <Radio.Button value="oneWay">單程</Radio.Button>
                <Radio.Button value="twoWay">往返</Radio.Button>
                <Radio.Button value="manyWay">多程</Radio.Button>
              </Radio.Group>
          </Col>
        </Row>
        {
          category !== 'manyWay' &&
          <FlightItem place={place} category={category} form={this.props.form} />
        }
        {
          category === 'manyWay' &&
          <FlightItemForMany place={place} form={this.props.form} />
        }
    </div>
  )
}

/**
   * 選擇航程  
   * */
  handleFlightChange = e => {
    this.resetState();
    this.setState({
      category: e.target.value
    })
  }

  /**
   * 切换时重置数据
   */
  resetState = () => {
    const { resetFields } = this.props.form;
    resetFields(['person', 'placeFrom', 'placeTo', 'dateFrom', 'timeFrom1', 'timeTo1',  'carNeed1']);//重置表單輸入項
  }

  /**
   * 刪除  
   * */
  deleteInfo = (i, k) => {
    let { flightInfo } = this.state;
    flightInfo[i].detail.splice(k, 1);
    if(flightInfo[i].detail.length === 0){
      flightInfo.splice(i, 1);
    }
    this.setState({flightInfo}, () =>(
      this.props.addFlightInfo(this.state.flightInfo)
     ) )
  }

  /**
   * 开始编辑  
   * */
  handleEditInfo = (i, k) => {
    const { flightInfo } = this.state;
    let editData = {};
    editData.i = i;
    editData.k = k; 
    editData.person = flightInfo[i].person;
    editData.category = flightInfo[i].category;
    editData.detail = flightInfo[i].detail[k];
    this.setState({isEdit: true, editData,})
  }

  /**
   * 取消编辑  
   * */
  handleEditCancel = () => {
    this.setState({isEdit: false})
  }

    /**
   * 編輯结束后获取信息  
   * */
  editInfoOk = (editData, flightInfo, obj) => {
     let i = editData.i;
     let k = editData.k;
     flightInfo[i] = obj;
     flightInfo[i].detail[k] = obj.detail[0];
     return flightInfo;
  }

  /**
   * 添加航程信息  
   * */
  submitFlightInfo = () => {
    const { getFieldValue, setFieldsValue, resetFields } = this.props.form;
    const timeLimit = this.props.timeLimit;
    let timeFrom2 = null, timeTo2 = null, carNeed2 = null, obj = {}, arr, dateTo = null, error;
    //取值
    let {category, isEdit, flightInfo, editData} = this.state;
    let edit = isEdit? '_edit':'';
    let person =  getFieldValue('person'+edit);
    let gender = this.getGenderByName(person);
    if(category !== 'manyWay' || isEdit){
      let placeFrom = getFieldValue('placeFrom'+edit);
      let placeTo = getFieldValue('placeTo'+edit);
      let placeFromText = this.getPlaceText(placeFrom); //中文地点获取
      let placeToText = this.getPlaceText(placeTo); //中文地点获取
      let dateFrom = getFieldValue('dateFrom'+edit)?getFieldValue('dateFrom'+edit).format('YYYY-MM-DD'):'';
      let timeFrom1 = getFieldValue('timeFrom1'+edit)?getFieldValue('timeFrom1'+edit).format('HH:mm'):'';
      let timeTo1 = getFieldValue('timeTo1'+edit)?getFieldValue('timeTo1'+edit).format('HH:mm'):'';
      let carNeed1 = getFieldValue('carNeed1'+edit)? 'Y' : 'N';
      //檢查地點不能相同
      if(placeFrom === placeTo){
        message.warning('起飛和到達地點不能相同');
        return;
      }
      //检查时间段间隔
      if(!this.checkTime(timeFrom1, timeTo1, timeLimit)){
        message.warning(`時間區間前後相差 >= ${(timeLimit/60).toFixed(2)}H`);
        return;
      }
      arr = [person, placeFrom, placeTo, dateFrom, timeFrom1, timeTo1];
      if (category === 'twoWay') {
        dateTo = getFieldValue('dateTo'+edit)?getFieldValue('dateTo'+edit).format('YYYY-MM-DD'):'';
        timeFrom2 = getFieldValue('timeFrom2'+edit)?getFieldValue('timeFrom2'+edit).format('HH:mm'):'';
        timeTo2 = getFieldValue('timeTo2'+edit)?getFieldValue('timeTo2'+edit).format('HH:mm'):'';
        carNeed2 = getFieldValue('carNeed2'+edit)? 'Y' : 'N';
        arr = [...arr, timeFrom2, timeTo2, dateTo];
        error = this.checkData(arr); //判断是否有空
        if(error){
          message.warning('请填写完整信息再提交');
          return;
        }
        //检查时间段间隔
      if(!this.checkTime(timeFrom2, timeTo2, timeLimit)){
        message.warning(`時間區間前後相差 >= ${(timeLimit/60).toFixed(2)}H`);
        return;
      }
         //往返数据
         obj.person = person;
         obj.gender = gender;
         obj.category = category;
         obj.detail = [{placeFrom, placeFromText, placeTo, placeToText, dateFrom, dateTo, timeFrom1, timeTo1, timeFrom2, timeTo2, dateTo, carNeed2, carNeed1 }];
         //编辑和添加
         if(!isEdit){
          this.setState({flightInfo:[...flightInfo, obj]}, () =>(
            this.props.addFlightInfo(this.state.flightInfo)
           ))  
         }else{
           flightInfo = this.editInfoOk(editData, flightInfo, obj)
          this.setState({flightInfo,isEdit: false}, () =>(
            this.props.addFlightInfo(this.state.flightInfo)
           ))  
         }
           
         resetFields(['person', 'placeFrom', 'placeTo', 'dateTo', 'dateFrom', 'timeFrom1', 'timeTo1', 'timeFrom2', 'timeTo2', 'carNeed1', 'carNeed2']);//重置表單輸入項
         return; 
      }
      if(this.checkData(arr)){
        message.warning('请填写完整信息再提交');
        return;
      }
      //单程数据
      obj.person = person;
      obj.category = category;
      obj.gender = gender;
      obj.detail = [{placeFrom, placeFromText, placeTo, placeToText, dateFrom, timeFrom1, timeTo1, carNeed1, timeFrom2, timeTo2, dateTo, carNeed2}];
      this.setState({flightInfo:[...flightInfo, obj]}, () =>(
        this.props.addFlightInfo(this.state.flightInfo)
       ) )

       //编辑和添加
       if(!isEdit){
        this.setState({flightInfo:[...flightInfo, obj]}, () =>(
          this.props.addFlightInfo(this.state.flightInfo)
         ))  
       }else{
         flightInfo = this.editInfoOk(editData, flightInfo, obj)
        this.setState({flightInfo,  isEdit: false}, () =>(
          this.props.addFlightInfo(this.state.flightInfo)
         ))  
       }
       resetFields(['person', 'placeFrom', 'placeTo', 'dateFrom', 'timeFrom1', 'timeTo1',  'carNeed1']);//重置表單輸入項
       return; 
    }else if(category === 'manyWay' && !isEdit){
      //获取多程信息
      obj = this.getManyWay(getFieldValue, person, gender, category);
      if(obj){
        this.setState({flightInfo:[...this.state.flightInfo, obj]}, () =>(
          this.props.addFlightInfo(this.state.flightInfo)
         ) )
         setFieldsValue({'keys': [1]}); //重置為第一個
         resetFields(['person', 'placeFrom_1', 'placeTo_1', 'dateFrom_1', 'timeFrom1_1', 'timeTo1_1', 'carNeed_1']);//重置表單輸入項
         return; 
      }else{
        message.warning('请填写完整信息再提交且起飛地點和到達地點不能相同');
      }
    }
  }

    /**
   * 获取多程信息  
   * */
  getManyWay = (getFieldValue, person, gender, category) => {
    let timeFrom2 = null, timeTo2 = null, carNeed2 = null, dateTo = null;
    let arr, obj = {detail: []};
    let keys = getFieldValue('keys');
    for (let i = 0; i < keys.length; i++) {
      let placeFrom = getFieldValue('placeFrom_'+keys[i]);
      let placeTo = getFieldValue('placeTo_'+keys[i]);
      let placeFromText = this.getPlaceText(placeFrom); //中文地点获取
      let placeToText = this.getPlaceText(placeTo); //中文地点获取
      let dateFrom = getFieldValue('dateFrom_'+keys[i])?getFieldValue('dateFrom_'+keys[i]).format('YYYY-MM-DD'):'';
      let timeFrom1 = getFieldValue('timeFrom1_'+keys[i])?getFieldValue('timeFrom1_'+keys[i]).format('HH:mm'):'';
      let timeTo1 = getFieldValue('timeTo1_'+keys[i])?getFieldValue('timeTo1_'+keys[i]).format('HH:mm'):'';
      let carNeed1 = getFieldValue('carNeed_'+keys[i])? 'Y' : 'N';
      //檢查地點不能相同
      if(placeFrom === placeTo){
        message.warning('起飛和到達地點不能相同');
        return false;
      }
      arr = [person, placeFrom, placeTo, dateFrom, timeFrom1, timeTo1];
      if(this.checkData(arr)) return false;
      obj.detail.push({placeFrom, placeFromText, placeTo, placeToText, dateFrom, timeFrom1, timeTo1, carNeed1, timeFrom2, timeTo2, dateTo, carNeed2});
    }
    obj.person = person;
    obj.gender = gender;
    obj.category = category;
    return obj;
  }

   /**
   * 判断是否有空  
   * */
  checkData = (arr) => {
    for (let item of arr) {
      if (!item)
        return true;
    }
    return false;
  }

   /**
    * 获取分钟
    */
   getMins(time){
    if(typeof time === 'number'){
      return (time * 60);
    }else{
      let arr = time.split(':');
      let m = arr[0] * 60 + parseInt(arr[1]);
      return m;
    }
  }

  /**
   * 判断时间相差
   */
  checkTime = (f, t, flag) => {
    let mf = this.getMins(f);
    let mt = this.getMins(t);
    let m24 = this.getMins(24);
    let m24q = m24 - mf;
    if( mf < mt && (mt - mf < flag) ){
      return false;
    }
    if( mf > mt && (m24q + mt < flag) ){
      return false;
    }
    return true;
  }

   /**
   * 添加航程信息  
   * */
  getPlaceText = ( placeCode ) => {
    const {flightPageData:{place}} = this.props;
    for (const item of place) {
      if(placeCode === item.Code){
        return item.Value;
      }
    }
    return '';
  }
 /**
   * 獲取性別  
   * */
  getGenderByName = ( person ) => {
    const {flightPageData:{persons}} = this.props;
    for (const item of persons) {
      if(person === item.ChName){
        return item.Sex;
      }
    }
    return '';
  }

}
  
export default Form.create()(Fill);