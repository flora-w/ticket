import React, { Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './index.less'

let timer = null;
class CommonPage extends Component {

  
  componentDidMount() {
    const category = sessionStorage.getItem('category')
    const a = document.querySelector('.user-login2');   
    const b = document.querySelectorAll('.header-nav-lists li');
    timer = setInterval(function(){
      let w = window.innerWidth;
      if(!category){
        clearInterval(timer);
        return;
      }
      if(category == "travel" && w <1440){
        a.style.marginRight = '0';
      }
      else{
        a.style.marginRight = '130px';
      }
      if(category == 'staff'){
        if(b.forEach!=='Function'){
          for(let i = 0 ;i < b.length;i++){
            b[i].style.width = '150px'
          }
        }
      else{
        b.forEach(item => {
            item.style.width = '150px'
        });
      }
       
      }
    },10)
    
  }
  
  render(){
    return(
      <div>
        <Header />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }

  componentWillUnmount(){
    clearInterval(timer);
  }
}
  

export default CommonPage;