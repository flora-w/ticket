import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "../../../components/card";
import { Select, Table, Input, InputNumber, DatePicker,Form } from "antd";
import { actionCreators } from '../store';
import moment from 'moment';

class QuotingFlight extends Component {
  
  render(){
  const { quoteStartData, level, handleFlightNoChange, quoteFlightInfo, change, form: {getFieldDecorator } } = this.props;
 
  let columns = [{
    title: '出发時間區間',
    dataIndex: 'dateSection',
    align:"center",
  }, {
    title: '出發機場',
    dataIndex: 'fromAirport',
    align:"center",
  }, {
    title: '到達機場',
    dataIndex: 'arriveAirport',
    align:"center",
  },{
    title: '航班號',
    dataIndex: 'flightNo',
    align:"center",
    render: (text, record) => (
      getFieldDecorator('flightNo'+record.key,
      {
        initialValue: text || '',
        rules: [{ required: true, message: '请輸入航班號' }],
      })(
        <Input onBlur={handleFlightNoChange.bind(this, record.key)} />
      ))
  },{
    title: '起飛機場',
    dataIndex: 'placeFrom',
    align:"center",
    render:(text, record) => (
      getFieldDecorator('placeFrom'+record.key,
      {
        initialValue: text || '',
        rules: [{ required: true, message: '起飛機場不能為空' }],
      })(
        <Input />
      ))
  },{
    title: '到達機場',
    dataIndex: 'placeTo',
    align:"center",
    render:  (text, record) => (
      getFieldDecorator('placeTo'+record.key,
      {
        initialValue: text || '',
        rules: [{ required: true, message: '到達機場不能為空' }],
      })(
        <Input />
      ))
    },{
      title: '艙等',
      dataIndex: 'level',
      align:"center",
      render: (text, record) => (
        getFieldDecorator('level'+record.key,
        {
          rules: [{ required: true, message: '艙等不能為空' }],
          initialValue: text ? text : record[`level${record.key}`],
      })(
        <Select style={{ width: 100 }} >
          {
            level.map(v => (<Select.Option key={v.Value}>{v.Value}</Select.Option>))
          }
        </Select>
      )
      )
  },{
    title: '起飛時間',
    dataIndex: 'timeStart',
    align:"center",
    render: (text, record) => {
      let value = text? 'initialValue' : 'other';
      
      return getFieldDecorator('timeStart'+record.key,
      {
        [value]: moment(text, 'YYYY-MM-DD HH:mm'),
        rules: [{ required: true, message: '起飛時間不能為空' }],
      })(
          <DatePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          placeholder="選擇時間"
        />
      )
    }
  }];
  if(!change){
    const money = {
      title: '金額(￥)',
      dataIndex: 'money',
      align:"center",
      render: (text, record) => {
        return getFieldDecorator('money'+record.key,
        {
          rules: [{ required: true, message: '金額不能為空' }],
          initialValue:text || ''
        })(
          <InputNumber
            formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: 150 }}
          />
        )
      }
    }
    columns.push(money);
  }
  const extra = [
    {
      title:'定位代碼',
      dataIndex:'ipcode',
      align:'center',
      render:(text,record)=>{
        return getFieldDecorator('ipcode'+record.key,
        {
          initialValue:text || ''
        }
      )(
          <Input />
        )
      }
    },
    {
      title:'備注',
      dataIndex:'remark',
      align:'center',
      render:(text,record)=>{
        return getFieldDecorator('remark'+record.key,
        {
          initialValue:text || ''
         }
      )(
          <Input />
        )
      }
    }
  ]
  extra.forEach(item=> columns.push(item))
    return(
      <Card title="行程">
        <Table 
        columns={columns}
        dataSource={quoteStartData}
        rowKey={'key'}
        bordered
        onRow={this.onRow}
        size="middle"
        pagination={false}
        scroll={{x:1500}}
         />
      </Card>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const {  quoteStartData, level, quoteFlightInfo } = state.travelAgencyPlatformReducer;
  return{quoteStartData, level, quoteFlightInfo}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleFlightNoChange(k, e){
      if(k>1){
        if(k % 2){
          k=1
        }
        else{
          k=0
        }
      }
      console.log(k)
      dispatch(actionCreators.flightNoChange(e.target.value, k, this.props.form))
    }
  }
}
export default Form.create()(connect( mapStateToProps, mapDispatchToProps )( QuotingFlight) );