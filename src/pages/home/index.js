import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import { actionCreators } from './store'
import bg1 from '../../assets/sys_imgs/bg1.jpg';
import bg2 from '../../assets/sys_imgs/bg2.jpg';
import bg3 from '../../assets/sys_imgs/bg3.jpg';
// import bg4 from '../../assets/sys_imgs/bg4.jpg';
// import bg5 from '../../assets/sys_imgs/bg5.png';
// import bg6 from '../../assets/sys_imgs/bg6.png';

import './index.less';

class Home extends Component {

  componentDidMount(){
    this.props.login()
  }
  render(){
    return(
      <div className="home">
        <Carousel autoplay className="lunbo">
          <div><img src={bg1} alt="banner图"/></div>
          <div><img src={bg2} alt="banner图"/></div>
          <div><img src={bg3} alt="banner图"/></div>
          {/* <div><img src={bg4} alt="banner图"/></div> */}
          {/* <div><img src={bg5} alt="banner图"/></div>
          <div><img src={bg6} alt="banner图"/></div> */}
        </Carousel>
        <div className="news">
          <div className="news-title">新闻消息</div>
          <hr/>
          <ul className="news-lists">
            <li><a href="javascript:;"></a></li>
            <li><a href="javascript:;"></a></li>
            <li><a href="javascript:;"></a></li>
          </ul>
        </div>
      </div>
    )
  }
}
  
const mapStateToProps = ( state ) => {
  return{}
}
const mapDispatchToProps = ( dispatch ) => {
  return{
    login(){
      dispatch(actionCreators.autoLogin())
    }
  }
}
export default connect( mapStateToProps, mapDispatchToProps )(Home);