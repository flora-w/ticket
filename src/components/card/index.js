import React from "react";
import { Card } from "antd";
import './index.less';

export default ({children, title, className = ''}) => {
  className = 'ef-card ' + className;
  return(
    <Card 
    title={title}
    className={className}
    >
      {children}
    </Card>
  )
}