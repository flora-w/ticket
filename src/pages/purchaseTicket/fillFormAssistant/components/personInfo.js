import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Popconfirm, Row, Col, Table, Tag } from "antd";
import { getText } from "../../../../utils";
import { deleteDraft } from '../store/actionCreators';

class PersonInfo extends Component {

/**
 * 顯示額外的數據
 */
  showExtraData = (record) => {
    return (
      <div className="extra-data">
        <Tag color="blue">證件類型:</Tag><span>{record.zjCategory_a}</span>
        <Tag color="blue">證件號:</Tag><span>{record.zjNo_a}</span>
        <Tag color="blue">證件有效期:</Tag><span>{record.zjDate_a}</span>
        <Tag color="blue">證件英文名:</Tag><span>{record.zjEnname_a}</span>
        {this.renderUnsure('cc_formid', record, '差旅單號')}
        {this.renderUnsure('gz_dept', record, '掛賬部門')}
        {this.renderUnsure('ftSequenId1', record, '返台休假單號')}
        {this.renderUnsure('ftSequenId', record, '返台休假類型')}
        {this.renderUnsure('familyGuanxi', record, '與本人關係')}
        {this.renderUnsure('familyName', record, '眷屬姓名')}
      </div>
    )
  }

  /**
   * 如果存在則渲染
   */
  renderUnsure = (key, data, title) => {
    if(key in data){
      let text = data[key];
      if(Array.isArray(data[key])){
        const ftszitem = this.props.pageData.ftszItem
        text = this.showGoToTWItem(data[key], ftszitem);
      }
      return (
        <>
          <Tag color="blue">{title}:</Tag><span>{text}</span>
        </>
      )
    }else{
      return null
    }
  }
  /**
   * 顯示返台休假item文本
   */
  showGoToTWItem = (arr, data) => {
    let result = arr.map(v => getText(v, data, 'ViceName'));
    return result.join('，')
  }

  render() {
    const { familyData, deleteFamilyInfo} = this.props;
    const columns1 = [
      { title: '乘機人工號', dataIndex: 'empno_a' },
      { title: '乘機人姓名', dataIndex: 'person_a' },
      { title: '乘機人性別', dataIndex: 'sex_a',},
      { title: '所屬部門', dataIndex: 'dept_a' },
      { title: '國籍', dataIndex: 'nationality_a' },
      { title: '手機號', dataIndex: 'phone_a' },
      {
        render: (text, record) => (
          <span>
            <Divider type="vertical" />
            <Popconfirm
              title="確定要刪除嗎?"
              onConfirm={() => deleteFamilyInfo(record)}
              onCancel={null}
              okText="是"
              cancelText="否">
              <a href="javascript:;">刪除</a>
            </Popconfirm>
          </span>
        ),
      },
    ]
   
    return (
    <Row className="fill-form-assistant">
      <Col span="20" offset="1">
        <Table
          dataSource={familyData}
          expandedRowRender={this.showExtraData}
          columns={columns1}
          rowKey='index'
        />
      </Col>
    </Row>
    )
  }
}

const mapStateToProps = (state) => {
  const { familyData ,category,formData, pageData} = state.fillFormReducer.fillFormAssistantReducer;
  return { familyData,category ,formData, pageData}
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFamilyInfo(record){
      dispatch(deleteDraft(record));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonInfo)