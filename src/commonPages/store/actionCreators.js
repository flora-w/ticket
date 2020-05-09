
import * as actionTypes from './actionTypes';
//页面加载或刷新页面时
export const activeNavStyle = (navData, thisNav) => {
  return {
    type: actionTypes.CHANGE_NAV_ONLOAD,
    navData,
    thisNav
  }
}
//点击左边导航
export const changeNav = (path, i) => {
  return {
    type: actionTypes.CHANGE_NAV,
    path,
    i
  }
}
//点击头部
export const headerNavClick = (path) => {
  return {
    type: actionTypes.HEADER_NAV_CLICK,
    path
  }
}
//显示二级菜单
export const subNavMouseOver = (path) => {
  return {
    type: actionTypes.HEADER_NAV_OVER,
    path
  }
}
export const subNavMouseLeave = (path) => {
  return {
    type: actionTypes.HEADER_NAV_LEAVE,
    path
  }
}

