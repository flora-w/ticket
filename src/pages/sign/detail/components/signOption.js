import React from 'react';
import { Form, Radio, Input, Button } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const signOption = ({ form, form:{getFieldDecorator}, signFormSubmit, formId }) => {
    return(
      <Form className="sign-option">
        <FormItem label="簽核結果">
          {
            getFieldDecorator('result', 
            { initialValue:1, rules: [{ required: true, message: '請選擇簽核結果',}]})(
              <RadioGroup name="radiogroup">
                <Radio value={1}>同意</Radio>
                <Radio value={2}>駁回</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="簽核意見">
          {
            getFieldDecorator('suggestion', 
            {/* 取消必填
              *{rules: [{ required: true, message: '請填寫簽核意見',}]} 
              */}
            )(
              <TextArea />
            )
          }
        </FormItem>
        <div>
          <Button 
          className="submit-btn"
          onClick={() => signFormSubmit(form, formId)}
          >送出</Button>
        </div>
      </Form>
    )
}
  
export default Form.create()( signOption );