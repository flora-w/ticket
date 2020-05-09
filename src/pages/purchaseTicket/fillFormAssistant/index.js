import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Radio, Checkbox, Row, Col, Input, Upload, Button, Icon, message, DatePicker, Tag } from "antd";
import { compose } from "../../../utils";
import { actionCreators } from "./store";
import CategorySelect from "./components/cateGorySelect";
import OneByOne from "./components/oneByOne"//逐筆填寫頁面
import BatchUpload from "./components/batchUpload"//批量上傳頁面
import { FillForAssistant } from "../components/flightSelect";
import PersonInfo from "./components/personInfo";
import NoAuthority from "../../../commonPages/noAuthority/index";
import './index.less';

const RadioGroup = Radio.Group;
const Textarea = Input.TextArea;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
class FillFormAssistant extends Component {
  

  state = {
    showCl_formid: false,
    showFtsz_formid: false,
    showJnfg_formid: false,
    showUpload: false,//首先設定上傳附件的false
    showChargeDept: false

  }

  //判斷點擊返台休假類型為C03五年條款時，顯示上傳附件按鈕,在OneByOne裡面需要在點擊五年條款時，增加onchange事件才能判斷
  handeleFiveSelect = value => {
    value.includes('C03') ? this.setState({ showUpload: true }) : this.setState({ showUpload: false })
  }


  //點擊屬性判斷
  onChecked = value => {
    //出差顯示
    if (value.indexOf('Q1') > -1) {
      this.setState({ showCl_formid: true })
    } else {
      this.setState({ showCl_formid: false })
    };  
    //返台休假
    if (value.indexOf('Q2') > -1) {
      this.setState({ showFtsz_formid: true })
    } else {
      this.setState({ showFtsz_formid: false })
    };
    //急難返國
    if (value.indexOf('Q4') > -1) {
      this.setState({ showJnfg_formid: true })
    } else {
      this.setState({ showJnfg_formid: false })
    };
    // //離職轉調歸任
    if (value.indexOf('Q6') > -1) {
      this.setState({ showUpload: true, showChargeDept: true })
    } else {
      this.setState({ showUpload: false, showChargeDept: false })
    };
    //存儲類別選項
    this.props.selectCategoryItems(value)
  }

  uploadProps = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }



  componentDidMount() {
    this.props.getPageData();  
  }

  render() {

    const { form: { getFieldDecorator },
      pageData: { category, ftszItem, area, people, flightPlace, userInfo },
      canUpload,
      hanldTdfsSelect,
      showZbtx_formid,
      showPlsc_formid,
      showVisaDate,
      showRemark,
      hanldAreaSelect,
      assistantFillIn,
      getflightInfo,
      submit,
      flightCategory,
      selectCategorys,
      familyData,
      tripDetail
    } = this.props;
    const { showUpload, showChargeDept } = this.state;//上傳附件傳值進來

    const flightPageData = { persons: people, place: flightPlace }
    //區域
    const area_ = area.map(v => (<Radio key={v.Code} value={v.Code}>{v.Value}</Radio>));
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 8
      },
    };
    return (
      <div>
        {
          !this.props.isAssistant &&
          <NoAuthority></NoAuthority>
        }
        {
         this.props.isAssistant &&
          <div>
          <div className="fill-form-assistant">
            <Row className="row-person-info">
              <Col span="1"></Col>
              <Col className="info-title" span="6" >填單人工號 <Tag color="cyan">{userInfo.Empno}</Tag>  </Col>
              <Col className="info-title" span="4" >姓名 <Tag color="cyan">{userInfo.ChName}</Tag>  </Col>
              <Col className="info-title" span="3" >部門 <Tag color="cyan">{userInfo.Deptcode}</Tag>  </Col>
              <Col className="info-title" span="3"></Col>
            </Row>
            <Row>
              <Col className="form-title" span="3">類別:</Col>
              <Col span="21">
                <CategorySelect
                  data={category}
                  onChecked={this.onChecked} />
              </Col>
            </Row>
            <Row>
              <Col className="form-title" span="3">區域:</Col>
              <Col span="7">
                {getFieldDecorator('area')(
                  <RadioGroup onChange={hanldAreaSelect}>{area_}</RadioGroup>
                )}
              </Col>
            </Row>

            {/* {
              showVisaDate &&
              <FormItem
                {...formItemLayout}
                label="簽證有效期"
              >
                {getFieldDecorator('visaDate', {
                  rules: [{
                    required: true, message: '請選擇簽證有效期',
                  }],
                })(
                  <DatePicker size="small" />
                )}
              </FormItem>
            } */}

            <FillForAssistant
              flightPageData={flightPageData}
              tripDetail={tripDetail}
              ref={(flightForm) => this.flightForm = flightForm}
            />



            <Row>
              <Col className="form-title fillform-way" span="3">填單方式:</Col>
              <Col span="7">
                <RadioGroup onChange={hanldTdfsSelect}>
                  <RadioButton value='zbtx'>逐筆填寫</RadioButton>
                  <RadioButton disabled={canUpload} value='plsc'>批量上傳</RadioButton>
                </RadioGroup>
              </Col>
            </Row>
            {//填單方式的逐筆填寫
              showZbtx_formid &&
              <OneByOne
                oneByOne={assistantFillIn}//逐筆填寫的數據
                showCc_formid={this.state.showCl_formid}//點擊出差在oneByOne裡面顯示差旅單號
                showFtsz_formid={this.state.showFtsz_formid}//點擊返台休假在oneByOne裡面顯示返台休假單號和返台類型
                showJnfg_formid={this.state.showJnfg_formid}//點擊急難返國在oneByOne裡面顯示眷屬姓名和與本人關係
                showVisaDate={this.props.showVisaDate}
                handeleFiveSelect={this.handeleFiveSelect}//此項為點擊五年條款的時候
                getflightInfo={getflightInfo.bind(this)}
              />
            }
            {//填單方式時的批量上傳
              showPlsc_formid &&
              <BatchUpload />
            }

            {//點擊五年條款和離職歸任時候顯示的上傳按鈕
              showUpload &&
              <div>
                <Row className="row">
                  <Col span="3" className="assistant-titile"><span className="request-star">*</span>上傳證明文件:&nbsp;</Col>
                  <Col span="7">
                    {getFieldDecorator('upload')(
                      <Upload {...this.uploadProps}>
                        <Button size="small" type="primary">
                          <Icon type="upload" /> 點擊上傳
                        </Button>
                      </Upload>
                    )}
                  </Col>
                </Row>

                {
                  showChargeDept &&
                  <Row className="row">
                    <Col span="3" className="assistant-titile"><span className="request-star">*</span>掛賬部門:&nbsp;</Col>
                    <Col span="7">
                      {getFieldDecorator('chargeDept')(
                        <Input />
                      )}
                    </Col>
                  </Row>
                }
              </div>
            }
            <PersonInfo />

            {
              showRemark &&
              <Row>
                <Col className="form-title" span="3">備註:</Col>
                <Col span="17">
                  <Textarea className="remark"></Textarea>
                </Col>
              </Row>
            }



            <Row>
              <Col className="form-title" span="3"></Col>
              <Col span="17">
                <Button
                  className="submit-btn"
                  onClick={submit.bind(this,userInfo,selectCategorys,flightCategory)}
                >提交</Button>
              </Col>
            </Row>

          </div>

        </div>
        }
        
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  const { pageData,
    canUpload,
    showZbtx_formid,
    showJnfg_formid,
    showPlsc_formid,
    showLz_formid,
    showVisaDate,
    showRemark,
    flightPageData,
    assistantFillIn,
    isAssistant,
    flightInfo,
    selectCategorys,
    familyData,
    flightCategory,
    tripDetail
  } = state.fillFormReducer.fillFormAssistantReducer;
  return {
    pageData,
    canUpload,
    showZbtx_formid,
    showJnfg_formid,
    showPlsc_formid,
    showLz_formid,
    showVisaDate,
    showRemark,
    flightPageData,
    assistantFillIn,
    isAssistant,
    flightInfo,
    selectCategorys,
    familyData,
    flightCategory,
    tripDetail
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPageData() {
      dispatch(actionCreators.getPageInitData());
    },
    //存儲選中的類型值
    selectCategoryItems(value) {
      dispatch(actionCreators.selectCategoryItems(value))
    },
    //填單方式
    hanldTdfsSelect(e) {
      dispatch(actionCreators.tdfsSelect(e.target.value));
    },
    allFlightInfo(data) {
      dispatch(actionCreators.allFlightInfo(data));
    },
    hanldAreaSelect(e) {
      dispatch(actionCreators.areaSelect(e.target.value));
    },
    getflightInfo() {
      let data = {detail:[]};
      this.flightForm.validateFields((err, values) => {
        // console.log(values)
        for (const item of Object.values(values)) {
          if (!item && typeof item !== 'boolean') {
            message.warning('请填写完整航程信息');
            return;
          }
        }
        // "category", "placeFrom", "placeTo", "dateFrom", "timeFrom1", "timeTo1", "carNeed1" 
        // "category", "placeFrom", "placeTo", "dateFrom", "timeFrom1", "timeTo1", "carNeed1", "dateTo", "timeFrom2", "timeTo2", "carNeed2"
        // "category", "keys", "placeFrom_1", "placeTo_1", "dateFrom_1", "timeFrom1_1", "timeTo1_1", "carNeed_1", "placeFrom_2", "placeTo_2", "dateFrom_2", "timeFrom1_2", "timeTo1_2", "carNeed_2", "placeFrom_3", "placeTo_3", "dateFrom_3", "timeFrom1_3", "timeTo1_3", "carNeed_3", "placeFrom_4", "placeTo_4", "dateFrom_4", "timeFrom1_4", "timeTo1_4", "carNeed_4"                 
        let keys = data.keys = values.keys ? values.keys : null;
        let StartAirportID = keys ? null:values.placeFrom;
        let EndAirportID = keys ? null:values.placeTo;
        let StartDate = keys ? null:values.dateFrom.format('YYYY-MM-DD');
        let StartTime = keys ? null:values.timeFrom1.format('HH:mm');
        let Astart = `${StartDate} ${StartTime}`;
        let EndData = null;
        let EndTime = keys ? null:values.timeTo1.format('HH:mm');
        let Aend = null;
        let Car = keys ? null:(values.carNeed1 ?'N':'Y');
        let category = data.category = values.category;
        let StartAirportName = keys ? null:StartAirportID;
        let EndAirportName = keys ? null:EndAirportID;
        if(values.category == 'oneWay'){
          data.detail = [{StartAirportID,EndAirportID,StartDate,StartTime,Astart,EndData,EndTime,Aend,Car,StartAirportName,EndAirportName}];
        }
        if(values.category == 'twoWay'){
            let temp = {StartAirportID,EndAirportID,StartDate,StartTime,Astart,EndData,EndTime,Aend,Car,StartAirportName,EndAirportName};
            Car = values.carNeed2 ?'N':'Y';
            StartDate = values.dateTo.format('YYYY-MM-DD');
            StartTime = values.timeFrom2.format('HH:mm');
            Astart = `${StartDate} ${StartTime}`;
            EndTime = values.timeTo2.format('HH:mm');
            let b = StartAirportID;
            StartAirportID = EndAirportName;
            EndAirportID = b;
            StartAirportName = StartAirportID;
            EndAirportName = EndAirportName;
            data.detail = [temp,
            {StartAirportID,EndAirportID,StartDate,StartTime,Astart,EndData,EndTime,Aend,Car,StartAirportName,EndAirportName}
            ];
        }
        if(values.category == 'manyWay'){
          let temp = null;
          for(let i = 1 ; i<= keys.length;i++){
            StartAirportID = values['placeFrom_'+i];
            EndAirportID = values['placeTo_'+i];
            StartDate = values['dateFrom_'+i].format('YYYY-MM-DD');
            StartTime = values['timeFrom1_'+i].format('HH:mm');
            Astart = `${StartDate} ${StartTime}`;
            EndTime = values['timeTo1_'+i].format('HH:mm');
            Car = values['carNeed1_'+i] ?'N':'Y';
            StartAirportName = StartAirportID;
            EndAirportName = EndAirportName;
            temp = {StartAirportID,EndAirportID,StartDate,StartTime,Astart,EndData,EndTime,Aend,Car,StartAirportName,EndAirportName};
            data.detail.push(temp)
          }
        }
        dispatch(actionCreators.flightInfo(data))
        })
    },
    submit(userInfo,selectCategorys,flightCategory) {
      this.props.form.validateFields((err, values) => {
        for (const item of Object.values(values)) {
          if (!item) {
            message.warning('請填寫必填欄位');
            return;
          }
        }
        dispatch(actionCreators.submit(values,userInfo,selectCategorys))
      })
    },
  }
}
//export default connect( mapStateToProps, mapDispatchToProps ),Form.create()( FillFormAssistant )
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create()
)(FillFormAssistant);
// export default connect( mapStateToProps, mapDispatchToProps )(Form.create()( FillFormAssistant))
