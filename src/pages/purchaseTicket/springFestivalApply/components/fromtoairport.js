import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, message, Alert, Tag } from 'antd';
import FlightItem from '../../../../components/flightSelect/flightItem';
import FlightItemForMany from '../../../../components/flightSelect/flightItemForMany';
import { showNotification } from '../../../../utils/';
import PropTypes from 'prop-types';

const FromToAirport = props => {
  const {form, airport} = props;
  const [place, setPlace] = useState([]);
  const [index, setIndex] = useState(0);
  const [changeLimitDate, setChangeLimitDate] = useState(false);
  useEffect(() => {
    setPlace([...airport]);
  },[props.airport])
  /**
   * 切換航程類型重置所填數據
   */
  useEffect(() => {
    setChangeLimitDate((preState) => !preState)
    props.form.resetFields();
    setIndex((i) => ++i)
  },[props.category])
  return (
    <>
    {
        props.isSpecial && 
        <div style={{paddingLeft: 35, marginTop: 15}}>
          <Alert
            message={
              <>
                <div><Tag color='red'>注:</Tag>切換航程類型重置航程信息</div>
                <div>特殊訂票的行程信息衹能提交一次,如果多次提交,以最後一次提交的爲準</div>
              </>
            }
            type="warning"
            closable
          />
        </div>
      }    
      {
        props.category !== 'manyWay' &&
        <FlightItem 
            place={place} 
            changeLimitDate={changeLimitDate}
            category={props.category}
            form={form}
            index={index}
          />
      }
      {
        props.category === 'manyWay' &&
        <FlightItemForMany 
            place={place} 
            form={form}
          />
      }
      <div style={{textAlign: 'center'}}>
        <Button 
            type='primary' 
            onClick={handleGetFormData.bind(this,form,props, setIndex)} 
            style={{margin: 'auto', display: 'inline-block', marginRight: 10}}
            htmlType='button'
            disabled={props.btnDisabled}
          >新增</Button>
        <Button 
            onClick={() => {form.resetFields(); setIndex((i) => ++i)}} 
            style={{margin: 'auto', display: 'inline-block', height: 32, background: '#fc6', color: '#fff'}}
            htmlType='button'
            title='重置行程衹是清楚當前所填行程,不會對已提交的行程進行刪除'
          >重置行程</Button>
      </div>
      
      {/* <Row style={{marginTop: 20}}> 
        <Col offset={1}>
          <Alert
              message={
                <div>
                    <span>
                    <Tag color="red">溫馨提示：</Tag>請根據實際需求點選<Tag color='blue'>交通车</Tag>,未點選視為無需接送
                    </span>
                    <br/>
                    <br/>
                    <span>
                    時間區間前後相差 大於等於 
                    <Tag color="red">{`${(props.timeLimit/60).toFixed(2)}`}</Tag>
                    小時
                    </span>
                    { window.location.hash.includes('springFestival-apply') &&
                      <>
                        <br/>
                        <br/>
                        <span style={{color: '#f23030'}}>
                        返回日期與出發日期之間間隔應大於12天
                        </span>
                      </>
                    }
                </div>
              }
              type="info"
              closable
            />
        </Col>
      </Row> */}
    </>
  )
}

/**
 * 重组行程信息 上传类型
 * @param {数据} a 
 */
const resetData = (a, props) => {
  const data = JSON.parse(JSON.stringify(a)),
        temp = [],
        keys = Object.keys(data),
        airport = props.airport;
  let len = keys.includes('keys') ? data.keys.length : (data['type'] === 'twoWay' ? 2 : 1);
  for(let i = 0; i < len; i++) {
    if(data.type === 'twoWay') {
      let c = i === 0 ? {
        "StartAirportID": data.placeFrom, 
        "StartAirportName": getAirportName(airport, data.placeFrom), 
        "EndAirportID": data.placeTo, 
        "EndAirportName": getAirportName(airport, data.placeTo), 
        "StartDate": data.dateFrom, 
        "StartTime": data['timeFrom1'],
        "Astart": `${data.dateFrom} ${data['timeFrom1']}`, 
        "EndDate": null, 
        "EndTime": data['timeTo1'], 
        "Aend": null, 
        "Car": data['carNeed1'] ? 'Y' : 'N'
      } :
      {
        "StartAirportID": data.placeTo, 
        "StartAirportName": getAirportName(airport, data.placeTo), 
        "EndAirportID": data.placeFrom, 
        "EndAirportName": getAirportName(airport, data.placeFrom), 
        "StartDate": data.dateTo, 
        "StartTime": data['timeFrom2'],
        "Astart": `${data.dateTo} ${data['timeFrom2']}`, 
        "EndDate": null, 
        "EndTime": data['timeTo2'], 
        "Aend": null, 
        "Car": data['carNeed2'] ? 'Y' : 'N'
      }
      temp.push(c);
    }
    else {
      temp.push({
        "StartAirportID": data.placeFrom ? data.placeFrom : data['placeFrom_'+ (i+1)], 
        "StartAirportName": getAirportName(airport, data.placeFrom), 
        "EndAirportID": data.placeTo ? data.placeTo : data['placeTo_' + (i+1)], 
        "EndAirportName": getAirportName(airport, data.placeTo), 
        "StartDate": data.dateFrom ? data.dateFrom : data['dateFrom_' + (i+1)], 
        "StartTime": data.timeFrom1 ? data.timeFrom1 : data['timeFrom1_' + (i+1)], 
        "Astart": `${data.dateFrom ? data.dateFrom : data['dateFrom_' + (i+1)]} ${data.timeFrom1 ? data.timeFrom1 : data['timeFrom1_' + (i+1)]}`, 
        "EndDate": null, 
        "EndTime": data.timeTo1 ? data.timeTo1 : data['timeTo1_' + (i+1)], 
        "Aend": null, 
        "Car": data['carNeed' + (i+1)] ? (data['carNeed' + (i+1)] ? 'Y' : 'N') : (data['carNeed1_' + (i+1)] ? 'Y' : 'N')
      })
    }
  }
  return checkInfo(temp, props.timeLimit);
}

/**
 * 行程信息不为空的检测
 * @param {*} form 
 * @param {*} props 
 * @param {*} e 
 */
const handleGetFormData = (form,props, setIndex,e) => {
  e.preventDefault();
  const fromto = {
    placeFrom: '出發機場',
    placeTo: '到達機場',
    dateFrom: '出發日期',
    timeFrom1: '起飛時間區間(開始)',
    timeTo1: '起飛時間區間(結束)',
    carNeed1: '',
    dateTo: '返回日期',
    timeFrom2: '返回時間區間(開始)',
    timeTo2: '返回時間區間(結束)',
    carNeed2: ''
  }
  let  detail = {};
  if(props.category !== 'manyWay') {
    const temp = form.getFieldsValue();
    for (let i = 0,arr=Object.keys(temp); i<arr.length; i++) {
      if(temp[arr[i]] && !arr[i].includes('carNeed')) {
        detail[arr[i]] = arr[i].includes('time') ? temp[arr[i]].format('HH:mm') : (arr[i].includes('date') ? temp[arr[i]].format('YYYY-MM-DD') : temp[arr[i]]);
      } else if (arr[i].includes('carNeed')) {
        detail[arr[i]] = temp[arr[i]];
      }
      else {
        detail = {};
        message.warning(`${fromto[arr[i]]}不能爲空`);
        break;
      }
    }
  }
  else {
    const temp = form.getFieldsValue();
    for(let i = 0,arr=Object.keys(temp); i<arr.length; i++) {
      if(temp[arr[i]] && !arr[i].includes('carNeed')) {
        detail[arr[i]] = arr[i].includes('time') ? temp[arr[i]].format('HH:mm') : (arr[i].includes('date') ? temp[arr[i]].format('YYYY-MM-DD') : temp[arr[i]]);
      } else if (arr[i].includes('carNeed')) {
        detail[arr[i]] = temp[arr[i]];
      }
      else {
        detail = {};
        const a = arr[i].replace(/([a-zA-Z]+\d+|[a-zA-Z]+)(_\d+)/,'$1');
        message.warning(`${fromto[a]}不能爲空`);
        break;
      }
    }
  }
  if(!Object.keys(detail).length) return;
  detail.type = props.category;
  const a = resetData(detail, props);
  if( a === false) {
    return
  }
  form.resetFields();
  props.getJourneyData(a);
  setIndex((i) => ++i)
}


/**
 * 检测信息是否符合要求
 * @param {重组后后的行程信息} data 
 */
const checkInfo = (data, timeLimit) => {
  let bool = true;
  for(let i = 0, len = data.length; i < len; i++) {
    if(data[i].StartAirportID === data[i].EndAirportID) {
      showNotification({type: 'warning', message: '信息填寫錯誤', description: '出發與到達機場不能為同一個'});
      bool = false;
      break;
    }
    bool = checkTime(data[i].StartTime, data[i].EndTime, timeLimit);
  }
  return bool ? data : false
}

/**
 * 檢測時間
 * @param {單次航程出發起始區間} start 
 * @param {單次航程出發結束時間} end 
 * @param {時間間隔} limit 
 */
const checkTime = (start, end, limit) => {
  let st = start.split(':')[0] * 60 + parseInt(start.split(':')[1], 10),
      et = end.split(':')[0] * 60 + parseInt(end.split(':')[1], 10),
      m24 = 24* 60 ;
  if(st > et && (m24-st+et) < limit) {
    showNotification({type: 'warning', message: 'warning', description: '起始時間不能晚於結束時間'})
    return false
  }
  if(st === et ) {
    showNotification({type: 'warning', message: 'warning', description: '起始時間不能與結束時間相同'});
    return false
  }
  if(st < et && (et - st) < limit) {
    showNotification({type: 'warning', message: 'warning', description: `時間區間前後相差 大於等於 ${(limit/60).toFixed(2)}H`});
    return false
  }
  if(st > et && (m24-st+et) > limit) {
    showNotification({type: 'warning', message: 'warning', description: `時間區間前後相差 大於等於 ${(limit/60).toFixed(2)}H`});
    return false
  }
  return true
}

const getAirportName = (airport, code) => {
  let a = null;
  for(let i = 0,len = airport.length; i< len; i++) {
    if(airport[i].Code === code ) {
      a = airport[i].Value;
      break;
    }
  }
  return a;
}

FromToAirport.propTypes = {
  category: PropTypes.string,
  form: PropTypes.object.isRequired,
  btnDisabled: PropTypes.bool
}
FromToAirport.defaultProps = {
  category: 'twoWay',
  btnDisabled: false
}

export default Form.create()(FromToAirport);