import React from "react";
import Edit from "./edit";
import { List, Tag, DatePicker, TimePicker, Switch } from "antd";
import moment from "moment";

const Item = List.Item;
const OrdersForBackChange = ({ editData, ...props }) => {
    const { getFieldDecorator } = props.form;
    const spanStyle = {
        paddingLeft: 5,
        paddingRight: 5
    }
    const { category, detail } = editData;
    const format='HH:mm'
    return <List className="BCT">
        {
            detail.map((v, k) => {//頁面樣式的寫入，還有時間格式的填寫
                return (
                    <Item key={k}>
                        <Tag color="green" style={{padding:'none'}}>乘機人</Tag><span style={spanStyle}>{v.name}</span>
                        <Tag color="green">行程類型</Tag><span style={spanStyle}>{v.category}</span>
                        <Tag color="green">出發機場</Tag><span style={spanStyle}>{v.fromAirport}</span>
                        <Tag color="green">到達機場</Tag><span style={spanStyle}>{v.arriveAirport}</span>
                        <div>
                        <Tag color="green">出發日期</Tag>
                        <span>
                            {
                                getFieldDecorator('flyDateTo' + k, {
                                    rules: [{ required: true, message: 'Please select date!' }],
                                })(
                                    <DatePicker size='small' />
                                )
                            }
                        </span>
                        <Tag color="green">起飛時間區間</Tag>
                        <span>
                            {
                                getFieldDecorator('flyStartTime' + k, {
                                    rules: [{ required: true, message: 'Please select time!' }],
                                })(
                                    <TimePicker size='small' minuteStep={30} format={format}/>
                                )
                            }
                            ~
                            {
                                getFieldDecorator('flyEndTime' + k, {
                                    rules: [{ required: true, message: 'Please select time!' }],
                                })(
                                    <TimePicker size='small' minuteStep={30} format={format}/>
                                )
                            }
                        </span>
                        <Tag color="green" >交通車</Tag>
                        <span>
                            {getFieldDecorator('carNeed' + k, { initialValue: false })(
                                <Switch className="card-need" size="small"/>
                            )}
                        </span>
                        </div>
                        
                    </Item>
                )
            })
        }
    </List>

}

export default OrdersForBackChange;