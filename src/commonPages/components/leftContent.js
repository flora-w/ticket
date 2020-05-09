import React, { useEffect  } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from "react-router-dom";
import { Icon } from "antd";
import {actionCreators} from "../store";

const LeftContent = props => {

  //获取需要显示的导航数据
  const getNavData = ( navConfig ) => {
    if(navConfig){
      for (let item of navConfig) {
        if(item.children && props.location.pathname.indexOf(item.path) !== -1){
          return item;
        }
      }
    }
    return null
  }

  //获取标题
  const getTitle = () => {
    const navData = getNavData(props.navConfig);
    if(navData){
      return <div className="title">
              <Icon type={navData.icon} theme="twoTone" />
              <span>{navData.title}</span>
             </div>
    } 
    return null;
  }

  //获取左边导航
  const getLeftNav = () => {
    const navData = getNavData(props.navConfig);
    if(navData){
      return navData.children.map(({ path, title, active }, i) => (
        <NavLink
           key={path}
           onClick={() => props.handleNavClick(path, i)}
           to={path}
           className={active? 'leftnav-active' : ''}
           >
        <li >
        <Icon type="right-circle" theme="twoTone" />
           <span className="titleNav">{title}</span>
        </li>
        </NavLink>
      ))
    }
    return null;
   
  }

  useEffect(() => {
    const navData = getNavData(props.navConfig);
    props.activeNavStyleOnload(navData, props.location.pathname);
  }, [props.location.pathname])
  
    return(
        <div className="left-content">
          <div>
            { getTitle() }
          </div>
          <ul className="left-nav">
            { getLeftNav()}
          </ul>
        </div>
    ) 
}
  
const mapStateToProps = ( state ) => {
  let { navConfig, navConfigTravel } = state.commonPageReducer;
  if(sessionStorage.getItem('category') === 'travel'){
    return { navConfig: navConfigTravel }
  }
  return{ navConfig }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    handleNavClick(path, i){
      dispatch(actionCreators.changeNav(path, i));
    },
    activeNavStyleOnload(navData, thisNav){
      dispatch(actionCreators.activeNavStyle(navData, thisNav));
    }
  }
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( LeftContent));