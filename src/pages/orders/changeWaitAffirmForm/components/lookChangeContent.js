import React from 'react';
import { Table } from "antd";
import Card from "../../../../components/card";

export default ({ data, changePrice, returnPrice }) => {
    const columns = [
        { title: '出發時間區間', dataIndex: 'dateSection', align: "center", },
        { title: '出發機場', dataIndex: 'StartAirPort', align: "center", },
        { title: '到達機場', dataIndex: 'ArriveAirPort', align: "center", },
        { title: '航班', dataIndex: 'FlyNo', align: "center", className: "th-colorful" },
        { title: '起飛機場', dataIndex: 'StartAirportName', align: "center", className: "th-colorful" },
        { title: '到達機場', dataIndex: 'EndAirportName', align: "center", className: "th-colorful" },
        { title: '艙等', dataIndex: 'ClassType', align: "center", className: "th-colorful" },
        { title: '起飛時間', dataIndex: 'FlyTime', align: "center", className: "th-colorful" },
    ]
    const styleDiv = {marginBottom: 20};
    const stylePrice = { color: 'red'};
    return (
        <div className="orders">
            {
                returnPrice &&
                <div className="price" style={styleDiv}><b>退票費用:</b>&nbsp;<span style={stylePrice}>{returnPrice}</span></div>
            }
            {
                changePrice &&
                <div className="price" style={styleDiv}><b>改簽費用:</b>&nbsp;<span style={stylePrice}>{changePrice}</span></div>
            }
            
            <Card
                title="改簽行程"
                className="sign-history order-back-change"
            >
                {
                    data.length > 0 &&
                    <Table
                        rowKey={data.key}
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        size="middle"
                        bordered
                    />
                }
            </Card>
        </div>
        
    )
}