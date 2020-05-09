import React, { Component }  from 'react';
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import UserLogin from './userLogin';
import logo from '../../assets/sys_imgs/logo.png';


class Header extends Component {
  /**
   * 獲取菜單
   */
  getSubMenu = ({path, childrenShow, children}) => {
    return <ul className="header-submenu"  onMouseEnter={(e) => this.props.handleSubNavMouseOver(e,path)}>
      {
        children.map( (item, i) => {
          if(childrenShow){
            return<NavLink
              key={item.path}
              to={item.path}
              className="header-submenu-list"
              activeClassName="nav-active"
              onClick={() => this.props.handleNavClick(item.path, i)}
           ><li>
            {item.title}
            </li></NavLink>
          }else{
            return null;
          }        
        })
      }
    </ul>
  }


  render(){
    const {
      navConfigTravel, navConfig: navConfigStaff, navConfigCommon, handleSubNavMouseOver, handleSubNavMouseLeave, handleHeaderNavClick 
    } = this.props;
    let navConfig;
    //判斷是旅行社還是員工，渲染不同的導航
    const loginCategory = sessionStorage.getItem('category');
    if(loginCategory === 'staff'){
      navConfig = navConfigStaff;
    }else if(loginCategory === 'travel'){
      navConfig = navConfigTravel;
    }else{
      navConfig = navConfigCommon;
    }
    return(
      <div className="header">
        <div className="header-top">
        <img className="logo" src={logo} alt="纬创资通"/>
          <div className="header-content"></div>
        </div>
        <div className="header-nav">
          <div className="header-nav-content">
            <ul className="header-nav-lists">
              {
                navConfig.map(( v ) => {
                  if(v.children){
                   return <li 
                   key={v.path}
                   onMouseOver={(e) => handleSubNavMouseOver(e,v.path)}
                   onMouseLeave={(e) => handleSubNavMouseLeave(e,v.path)}
                   >
                    <NavLink 
                      activeClassName="nav-active"
                      to={v.path} 
                      onClick={() => handleHeaderNavClick(v.path)}
                      >
                       {v.title}
                     </NavLink>
                     <div className="header-submenu-container">{ this.getSubMenu(v)}</div> 
                  </li>
                  }else{
                    return <li key={v.path}>
                    <NavLink 
                      activeClassName="nav-active"
                      to={v.path} 
                      >
                       {v.title}
                     </NavLink>
                  </li>
                  }
                  
                })
              }
            </ul>
          </div>
          <UserLogin />
        </div>
      </div>
    )
  }
    
}

const mapStateToProps = ( state ) => {
  const { navConfigTravel, navConfig, navConfigCommon } = state.commonPageReducer;
  return{
    navConfigTravel,
    navConfig,
    navConfigCommon,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    handleHeaderNavClick(path){
      dispatch(actionCreators.headerNavClick(path))
    },
    handleSubNavMouseOver(e,path){
      dispatch(actionCreators.subNavMouseOver(path))
    },
    handleSubNavMouseLeave(e, path){
      dispatch(actionCreators.subNavMouseLeave(path))
    },
    handleNavClick(path, i){
      dispatch(actionCreators.changeNav(path, i))
    }
  }
}
  
export default  withRouter(connect( mapStateToProps, mapDispatchToProps )(Header));

