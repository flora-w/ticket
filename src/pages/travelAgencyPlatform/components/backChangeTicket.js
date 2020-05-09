import React from 'react';
import { Input, Form, InputNumber } from "antd";

export default Form.create()((props) => {
  const { form:{getFieldDecorator}, back, change  } = props;
  const style = {
    width: 300,
    margin: '10px 5px'
  }
    return(
      <div>
        {
          back &&
          <div>
          <span style={{color: 'red'}}>* </span>
          退票金額:
          {getFieldDecorator('backCost', {
            rules: [{ required: true, message: '請輸入金額' }],
          })(
            <InputNumber
            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
            placeholder="退票金額"
            size="small"
            style={style} 
          />
          )}
        </div>
        }
        {
          change &&
          <div>
            <span style={{ color: 'red' }}>* </span>
            改簽金額:
            {getFieldDecorator('changeCost', {
              rules: [{ required: true, message: '請輸入金額' }],
            })(
              <InputNumber
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\￥\s?|(,*)/g, '')}
              placeholder="改簽金額"
              size="small"
              style={style} 
            />
            )}
          </div>
        }
      </div>
    )
})
  