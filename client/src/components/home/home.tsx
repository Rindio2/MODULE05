// import React from 'react'
import './home.scss'
import Header from '../header/header';
export default function home() {
  return (
    <div>
      <div className='header_web'>
        <Header/>
      </div>
      <div className='body_web'>
        <h1>AiDos</h1>
        <h4>Fashion is live</h4>
        
      </div>
      <div className='footer_web'>
        <p>@sice 2020 by Rindio</p>
      </div>
    </div>
  )
}
