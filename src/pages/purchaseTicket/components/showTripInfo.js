import React, { useState, useEffect, useCallback } from 'react';
import { Tag, Icon } from 'antd';
import './index.less';

const ShowTripInfo = (props) => {
  const [tripType, setType] = useState(null);
  useEffect(() => {
    setType(getTripName(props.tripType))
  }, [props.tripType])
  const getTripName = useCallback((type) => {
    switch(type) {
      case 'oneWay':
        return '單程';
      case 'twoWay':
        return '往返';
      case 'mangWay':
        return '多程'
      default:
        return null;
    }
  },[])
  return (
    <div className='special-trip-info'>
      <div className='special-trip-type'><Tag color='blue'>{tripType}</Tag></div>
      {
        props.data.map((v,k) => (
          <div className='special-trip-item' key={k}>
            <span>{v.StartAirportName}</span>
            <Icon type="swap-right" />
            <span>{v.EndAirportName}</span>      
            <span><Tag color='cyan'>出發日期</Tag>{v.StartDate}</span>       
            <span><Tag color='cyan'>出發時間</Tag>{v.StartTime}</span>~<span>{v.EndTime}</span> 
            <span><Tag color='cyan'>交通車否</Tag>{v.Car === 'Y' ? '是' : '否'}</span>
          </div>
        ))
      }
    </div>
  )
}

export default ShowTripInfo;