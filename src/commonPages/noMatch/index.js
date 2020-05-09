import React from 'react'

export default () => {
  const styleH1 = { textAlign: 'center', color: '#999', fontSize: 50, paddingTop: 50 };
  const styleHr = { height: 5, background: '#ccc' };
  const styleP = { textAlign: 'center', color: '#666' }  
  return (
    <div>
      <h1 style={styleH1}>404</h1>
      <hr style={styleHr} />
      <p style={styleP}>頁面不見了, 請確認網址是否正確！</p>
    </div>
  )
}