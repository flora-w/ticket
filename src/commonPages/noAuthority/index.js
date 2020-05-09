import React from 'react';
import { Alert } from "antd";

export default () => {
  return (
    <Alert
      message="No Authority"
      description="沒有權限進入此頁面."
      type="warning"
      showIcon
  />
  )
}