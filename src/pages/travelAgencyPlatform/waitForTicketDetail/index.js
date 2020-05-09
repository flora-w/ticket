import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import FormInfo from '../components/formInfo'
import  Card  from '../../../components/card';
import { actionCreators } from '../store';
import { getUrlParam } from "../../../utils";
import { Tag, Button, Icon } from "antd";
import { MergeCellsTable } from "../../../components/table";
import Upload from "../../../components/upload";
  

class WaitForTicketDetail extends Component {
 getData = (id, data) => {
    for (const v of data) {
      if(v.SerialID === id){
        return v;
      }
    }
    return null;
  }
  formData = {};
  componentDidMount() {
    const formid = getUrlParam(this.props.location.search, 'formId');
    const formData = this.getData(formid, this.props.waitForTicketList);
    this.props.getWaitForTicketDetail(formData, this.props.history)
    this.formData = formData;
  }
  render(){
    const columns = [{
      title: '工號',
      dataIndex: 'empno',
      align:"center",
    }, {
      title: '姓名',
      dataIndex: 'name',
      align:"center",
    },{
      title: '性別',
      dataIndex: 'gender',
      align:"center",
    }, {
      title: '航程類別',
      dataIndex: 'category',
      align:"center",
    }, {
      title: '行程',
      align:"center",
      children: [
        {title: '出發時間區間',dataIndex: 'dateSection',align:"center",},
        {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
        {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
        {title: '航班',dataIndex: 'flightNo',align:"center",},
        {
          title: '金額',
          dataIndex: 'money',
          align:"center",
          render: text => <Tag color="red">{`￥ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Tag>
        },
      ]
    }]
    const { waitForTicketList, waitForTicketDetailFlight, uploadFile, handleWaitForTicketOk, history, waitForTicketForm,handleWaitForTicketGiveUp } = this.props;
    console.log(waitForTicketDetailFlight)
    const mergeItems = ['empno', 'name', 'gender', 'category'];
    return(
      <div>
        <FormInfo data={waitForTicketForm} />
        <Card title="明細">
          <MergeCellsTable
            data={waitForTicketDetailFlight}
            columns={columns}
            rowKey={waitForTicketDetailFlight.key}
            mergeItems={mergeItems}
          />
          <div style={{marginTop: 30}}>
            <span style={{color: 'red'}}>*</span>  上傳行程單: 
            <Upload success={uploadFile}/>
          </div>
          <div style={{  textAlign: 'center' }}>
            <Button style={{marginRight:30}}
              type="primary"
              onClick={() => handleWaitForTicketOk(this.formData, history)}
            >確定</Button>

            <Button
              type="primary"
              onClick={() => handleWaitForTicketGiveUp(this.formData, history)}
            >放棄出票</Button>
          </div>
        </Card>
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { waitForTicketList, waitForTicketDetailFlight, waitForTicketForm } = state.travelAgencyPlatformReducer;
  return{waitForTicketList, waitForTicketDetailFlight, waitForTicketForm}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getWaitForTicketDetail(formData, history){
      dispatch(actionCreators.getWaitForTicketDetail(formData, history))
    },
    uploadFile(file){
      dispatch(actionCreators.uploadFile(file))
    },
    handleWaitForTicketOk(form, history){
      dispatch(actionCreators.waitForTicketOk(form, history))
    },
    handleWaitForTicketGiveUp(form, history){
      dispatch(actionCreators.waitForTicketGiveUp(form, history))
    }
  }
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps )( WaitForTicketDetail ))