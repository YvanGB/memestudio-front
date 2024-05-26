import React from 'react'

function Header() {
  return (
    <div style={{
        display:'flex',
        textAlign: 'center',
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems:'center',
    }}>
        <h1 style={{color: 'orange', fontSize: '5rem', fontFamily:'cursive'}}>MemeStudio</h1>
    </div>
  )
}

export default Header