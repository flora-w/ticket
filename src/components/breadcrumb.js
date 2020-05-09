import React from 'react';
import { breadcrumbNameMap } from '../config/navConfig';
import { Breadcrumb, Icon  } from "antd";
import { Link, withRouter } from "react-router-dom";

export default withRouter(( props ) => {
  const { location } = props;
  
  //获取当前页面路径存储到数组中
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const getBreadcrumbs = () => {
    return pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;  //每次取数组中元素加1
      return <Breadcrumb.Item key={index}>
              <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
    })
  }
  
  return (
    <Breadcrumb style={{paddingLeft: 10}}>
      <Breadcrumb.Item key='index'>
        <Link to='/'><Icon type="home" /></Link>
      </Breadcrumb.Item>
      {
        getBreadcrumbs()
      }
    </Breadcrumb>
  )
})