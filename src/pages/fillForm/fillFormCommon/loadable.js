import React from "react";
import Loadable from 'react-loadable';
import { Skeleton } from 'antd';

 
 const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading(){
    return <Skeleton loading={true} active  />
  } 
});

export default () => <LoadableComponent/>;