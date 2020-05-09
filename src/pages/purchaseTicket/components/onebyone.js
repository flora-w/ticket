import React, { useState, useEffect, useCallback } from 'react';
import { Form, Row, Input, Button, DatePicker, Select } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

const OneByOne = props => {
  const [formItem, setFormItem] = useState([]);
  const { form, handleAddPerson, frequentContacts, getFrequentContacts, currentContacts, handleOptionChange} = props;
  const { getFieldDecorator } = form;
  const getValue = useCallback((form) => {
    getFrequentContacts(form.getFieldsValue(['LinkChName']))
  },[])
  useEffect(() => {
    const a = [
      [
        {label: '姓名:', isRequired: true, type: 'input', dataIndex: 'LinkChName', formOption: {rules: [{required: true, message: '請填寫乘機人姓名'}]}, props: {onBlur: getValue.bind(this, form)}},
        {label: '乘機人工號:', isRequired: true, type: 'option', dataIndex: 'LinkEmpNo', formOption: {
          rules: [{required: true, message: '請輸入乘機人工號'}]}},
        {label: '性別:', type: 'span', dataIndex: 'LinkSex', props: {disabled: true}}
      ],
      [
        {label: '國籍:', type: 'span', dataIndex: 'Country', props: {disabled: true}},
        {label: '證件類型:', type: 'span', dataIndex: 'CertType', props: {disabled: true}},
        {label: '證件號:', type: 'span', dataIndex: 'CertNO', props: {disabled: true}}
      ],
      [
        {label: '證件名:', type: 'span', dataIndex: 'CertName', props: {disabled: true}},
        {label: '證件有效期:', type: 'span', dataIndex: 'CertValidTime', props: {disabled: true}},
        {label: '手機:', type: 'span', dataIndex: 'Phone', props: {disabled: true}},
      ],
      [
        {label: '簽證有效期:', type: 'datePicker', dataIndex: 'SignValidTime'}
      ]
    ];
    setFormItem(a);
  },[])
  return (
    <>
    {
      formItem.map( (v,k) => (
        <Row key={k} style={{marginBottom: 0}}>
          <div className='onebyone-info-item' style={{marginTop: 40}}>
            {
              v.map((item, index) => (              
                <div  key={index}>
                  <label htmlFor="">
                    {
                      item.isRequired && 
                      <span style={{color: '#f23030'}}>*</span>
                    }
                    {item.label}
                  </label>
                  { 
                    item.type === 'input' &&
                    getFieldDecorator(item.dataIndex, {...item.formOption})(                 
                      <Input autoComplete='off' style={{width: 150}} {...item.props}/>
                  )}
                  {
                    item.type === 'span' && 
                    getFieldDecorator(item.dataIndex, {
                      initialValue: item.dataIndex === 'LinkSex' ? 
                      currentContacts[item.dataIndex] ? 
                      currentContacts[item.dataIndex] === 'M' ? '男' : '女' 
                      : '' : 
                      currentContacts[item.dataIndex] ? currentContacts[item.dataIndex] : ''})(                 
                      <Input {...item.props} style={{width: 100}}/>
                  )}
                  {
                    item.type === 'datePicker' && 
                    getFieldDecorator(item.dataIndex, {...item.formOption})(
                      <DatePicker />
                    )
                  }
                  {
                    item.type === 'option' && 
                    getFieldDecorator(item.dataIndex, {...item.formOption})(
                      <Select {...item.props} style={{width: 150}} onChange={handleOptionChange.bind(this)}>
                        { 
                          frequentContacts.map( person => (
                            <Select.Option value={person.LinkEmpNo} key={person.UniqueID}>{person.LinkEmpNo}</Select.Option>
                          ))
                        }
                      </Select>
                    )
                  }                 
                </div>              
              ))
            }
          </div>
        </Row>
      ))
    }      
      <Row>
          <Button
              loading={false}
              htmlType='submit'
              type='primary'
              style={{display: 'block', margin: 'auto'}}
              onClick={handleAddPerson.bind(this, form)}
            >新增</Button>
      </Row>
    </>
  )
}

OneByOne.propTypes = {
  loading: PropTypes.bool,
  handleAddPerson: PropTypes.func.isRequired,
  frequentContacts: PropTypes.array,
  getFrequentContacts: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired
}

OneByOne.defaultProps = {
  loading: false,
  frequentContacts: []
}

export default Form.create()(OneByOne);