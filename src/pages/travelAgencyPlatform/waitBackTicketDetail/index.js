import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { compose } from "redux";
import { Tag, Button } from "antd";
import FormInfo from "../components/formInfo2";
import { actionCreators } from '../store';
import { getUrlParam } from "../../../utils";
import { MergeCellsTable } from "../../../components/table";
import Card from "../../../components/card";
import Upload from "../../../components/upload";

class WaitBackTicketDetail extends Component {
  id = 1;
  componentDidMount(){
    const serialid = getUrlParam(this.props.location.search, 'formId');
    this.id = getUrlParam(this.props.location.search, 'id');
    this.props.getWaitBackTicketDetail(serialid, this.id);
  }
  render(){
    const { waitBackChangeTicketForm, waitBackChangeTicketFlight, uploadSuccess, isWaitBackTicket, waitChangeTicketNewFlight, waitBackChangeSubmit } =  this.props;
    const columns = [
      {title: '工號',dataIndex: 'empno',align:"center",}, 
      {title: '姓名',dataIndex: 'name',align:"center",},
      {title: '性別',dataIndex: 'gender',align:"center",}, 
      {title: '航程類別',dataIndex: 'category',align:"center",},
      {title: '行程',align:"center",
        children: [
          {title: '出發時間區間',dataIndex: 'dateSection',align:"center",},
          {title: '出發機場',dataIndex: 'fromAirport',align:"center",},
          {title: '到達機場',dataIndex: 'arriveAirport',align:"center",},
          {title: '航班',dataIndex: 'flightNo',align:"center",},
          {
            title: `改簽費`,
            dataIndex: 'money',
            align:"center",
            render: text => <Tag color="red">{`￥ ${text}`}</Tag>
          },
        ]
    }]
    const mergeItems = ['empno', 'gender', 'name', 'category', 'price'];
    const title = isWaitBackTicket? '待退票明細' : '原出票明細';
    return(
      <div>
        <FormInfo data={waitBackChangeTicketForm} />
        <Card title={title}>
          <MergeCellsTable
            data={waitBackChangeTicketFlight}
            columns={columns}
            rowKey={waitBackChangeTicketFlight.key}
            mergeItems={mergeItems}
          />
        </Card>
        {
          !isWaitBackTicket &&
          <Card title='改簽報價明細'>
            <MergeCellsTable
              data={waitChangeTicketNewFlight}
              columns={columns}
              rowKey={waitChangeTicketNewFlight.key}
              mergeItems={mergeItems}
            />
          </Card>
        }
        <div className="upload-file">
            憑證:&nbsp; 
            <Upload success={uploadSuccess} />
          </div>
          <div className="submit-btn">
            <Button type="primary" onClick={waitBackChangeSubmit.bind(this, this.id)}>确定</Button>
          </div>
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  const { waitBackChangeTicketForm, waitBackChangeTicketFlight, isWaitBackTicket, waitChangeTicketNewFlight } = state.travelAgencyPlatformReducer;
  return{waitBackChangeTicketForm, waitBackChangeTicketFlight, isWaitBackTicket, waitChangeTicketNewFlight}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    getWaitBackTicketDetail(serialid, id){
      dispatch(actionCreators.getWaitBackTicketDetail(serialid, id))
    },
    uploadSuccess(file){
      dispatch(actionCreators.waitBackChangeUpload(file))
    },
    waitBackChangeSubmit(id){
      dispatch(actionCreators.waitBackChangeSubmit(this.props.history, id))
    }
  }
}

 export default compose(
  withRouter,
  connect( mapStateToProps, mapDispatchToProps ),
)( WaitBackTicketDetail )