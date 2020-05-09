import React from "react";
import Loadable from 'react-loadable';

 
 const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading(){
    return <div>正在加載。。。</div>
  } 
});

export default () => <LoadableComponent/>;