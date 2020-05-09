import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd'
import { actionCreators } from '../store'

class ChangeTicketList extends Component {

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
        onClick={() => this.props.handleFormWaitClick(record.serialId, record.formName)}
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

    }, {
      title: '出票旅行社',
      dataIndex: 'travelAgency',
      align: "center"

    }];

    const { changeTicketList } = this.props;
    // console.log(changeTicketList)
    return (
      <div className="travel-agency-platform">
        <Table
          rowKey='sequenceId'
          columns={columns}
          dataSource={changeTicketList}
          bordered
          pagination={false}
        />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { changeTicketList } = state.ordersReducer.changeWaitAffirmFormReducer;
  return { changeTicketList }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getChangePageData() {
      dispatch(actionCreators.getChangePageData())
    },
    handleFormWaitClick(serialId, name) {
      dispatch(actionCreators.formWaitClick(serialId, name))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTicketList)