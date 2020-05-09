import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { Card, Col, Row, Radio, Input, Button, Popconfirm } from 'antd';
import BaseInfo from '../components/flightSelect/purchaseTicketBaseInfo';
import SFOneByOne from './components/sfOnebyone';
import MergeCellsTable from '../../../components/table/mergeCellsTable';
import BatchUpload from '../fillFormAssistant/components/batchUpload';
import NoAuthority from "../../../commonPages/noAuthority/index";
import * as actionCreators from './store/actionCreators';
import './index.less';

const RadioGroup = Radio.Group,
      TextArea = Input.TextArea;
class SpringFestival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title:'工號',align:'center',dataIndex:'Empno',key:'Empno',width:90},
        {title:'姓名',align:'center',dataIndex:'Chname',key:'Chname',width:90},
        {title:'行程類型',align:'center',dataIndex:'TripType',key:'TripType',width:90},
        {title:'行程',align:'center',
        children:[
            {title:'出發時間區間',align:'center',dataIndex:'Section',key:'Section'},
            {title:'出發機場',align:'center',dataIndex:'StartAirportName',key:'StartAirportName'},
            {title:'到達機場',align:'center',dataIndex:'EndAirportName',key:'EndAirportName'},
            {title: '是否需要交通車', align: 'center', dataIndex: 'Car', key: 'Car'}
          ],
        }
      ]
    }
  }

  componentDidMount() {
    this.props.getPageData();
  }

  render(){
    const radioStyle = {fontSize: 16};
    const mergeItem=['Chname','Empno','TripType'];
    const { isAssistant, baseInfo, loading, handleInputBlur, handleSelectChange, personData, submitTime, airport,getJourneyData, journeyData, handleTextArea, fillType, changeType, deleteJourneyData, submitLoading, submitData, handleUploadFile } = this.props;
    const columns = this.state.columns
    if(fillType === 'onebyone' && columns[columns.length -1 ].dataIndex !== 'opertaion') {
      columns.push({title: '操作', align: 'center', dataIndex: 'opertaion', key: 'opertaion', 
      render: (text,record) => ( record.key%2 === 0 ? <Popconfirm
          title="你確定要刪除?"
          onConfirm={() => deleteJourneyData(record.Empno)}
          okText="Yes"
          cancelText="No"
        > 
        <span style={{color: '#40a9ff', cursor: 'pointer'}}>Delete</span>
      </Popconfirm> : null)})
    }
    if(fillType !== 'onebyone' && columns[columns.length -1 ].dataIndex === 'opertaion') {
      delete columns.pop()
    }
    return(
      <>
        {
          !isAssistant && 
          <NoAuthority />
        }
        {
          isAssistant && 
          <Card
              loading={loading}
              size='small'
              className='spring_festival_card'
            >
            <BaseInfo info={baseInfo}/>
            
            <Row gutter={40} style={{marginTop: 20}}>
              <Col span='20'>
                <label htmlFor="">填單方式:</label>
                <RadioGroup onChange={(e) => changeType(e.target.value)} defaultValue={fillType}>
                  <Radio value='onebyone' style={radioStyle}>逐筆填寫</Radio>
                  <Radio value='batchUpload' style={radioStyle}>批量上傳</Radio>
                </RadioGroup>
              </Col>
            </Row>
            {
              fillType === 'onebyone' &&
              <SFOneByOne 
                  location={this.props.location}
                  handleSelectChange={handleSelectChange.bind(this)}
                  handleInputBlur={(e) => handleInputBlur(e)}
                  personData={personData}
                  submitTime={submitTime}
                  airport={airport}
                  getJourneyData={getJourneyData}
                />
            }
            {
              fillType === 'batchUpload' && 
              <BatchUpload 
                  url='T:/Inetpub/WWWRoot/P81/Samples/sample_p81f004.xlsx' 
                  name='sample_p81f004.xlsx'
                  success={(e) => handleUploadFile(e)}
                />
            }
            {
              journeyData.length !== 0 &&
              <MergeCellsTable 
                  columns={this.state.columns}
                  mergeItems={mergeItem}
                  scroll={{x:500}}
                  rowkey={'key'}
                  data={journeyData}
                />
            }
            
            <Row>
              <Col>
                <label htmlFor="">備注:</label>
                <TextArea autosize={{minRows:3, maxRows: 8}} onChange={(e) => handleTextArea(e.target.value)}/>
              </Col>
            </Row>
            <Row gutter={10}>
                <Button 
                  style={{display: 'block', margin: 'auto'}}
                  type='primary'
                  loading={submitLoading}
                  onClick={() => submitData(this.props)}
                >提交</Button>
            </Row> 
          </Card>
        }
      </>
    )
  }

  componentWillUnmount() {
    this.props.resetState();
  }
}
  
const mapStateToProps = ( state ) => {
  const {isAssistant, airport, baseInfo, loading, personData,submitTime, journeyData, fillType, submitLoading } = state.fillFormReducer.springFestivalApplyReducer;
  return { isAssistant, airport, baseInfo, loading, personData,submitTime, journeyData, fillType, submitLoading }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getPageData() {
      dispatch(actionCreators.getPageData());
    },
    handleInputBlur(e) {
      dispatch(actionCreators.getPersonData(e.target.value));
    },
    handleSelectChange(value) {
      dispatch(actionCreators.getCurrentPerson(value))
    },
    changeType(value) {
      dispatch(actionCreators.changeType(value))
    },
    getJourneyData(data) {
      dispatch(actionCreators.saveJourneyData(data))
    },
    handleTextArea(value) {
      dispatch(actionCreators.saveTextArea(value))
    },
    deleteJourneyData(empno) {
      dispatch(actionCreators.deleteJourneyData(empno))
    },
    handleUploadFile(e) {
      dispatch(actionCreators.uploadExcel(e))
    },
    submitData(props) {
      const history = props.history;
      dispatch(actionCreators.submitData(history));
    },
    resetState() {
      dispatch(actionCreators.resetState());
    }
  }
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps )( SpringFestival ))