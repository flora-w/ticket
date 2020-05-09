import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from "antd";
import { actionCreators } from "../store"
import { getUrlParam } from "../../../../utils"

class WaitAffirmTicketOutList extends Component {
  // componentDidMount(){
  //   const serialId = getUrlParam(this.urlParam, 'serialId');
  //   this.props.waitFormClick(serialId);
  // }
  componentWillMount() {
    this.props.getChangePageData();
  }
  render() {
    //待報價頁面的表格
    const columns = [{
      title: '單號',
      dataIndex: 'sequenceId',
      align: "center",
      render: (text, record) => <a
        href="javascript:;"
        onClick={() => this.props.handleWaitFormClick(record)}
      >{text}</a>


    }, {
      title: '表單名稱',
      dataIndex: 'fillFormName',
      align: "center"

    }, {
      title: '申請人',
      dataIndex: 'applyPerson',
      align: "center"

    }, {
      title: '填單日期',
      dataIndex: 'fillInDate',
      align: "center"
    }, {
      title: '目前狀態',
      dataIndex: 'status',
      align: "center"

    }];

    const { waitAffirmTicketOutList } = this.props;
    // console.log(WaitAffirmTicketOutList)
    return (
      <div className="travel-agency-platform">
        <Table
          rowKey='sequenceId'
          columns={columns}
          dataSource={waitAffirmTicketOutList}
          bordered
          pagination={false}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { waitAffirmTicketOutList } = state.ordersReducer.waitAffirmTicketOutReducer;
  return { waitAffirmTicketOutList }

}
const mapDispatchToProps = (dispatch) => {
  return {
    getChangePageData() {
      dispatch(actionCreators.getChangePageData())
    },
    handleWaitFormClick(record) {
      dispatch(actionCreators.waitFormClick(record))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitAffirmTicketOutList)