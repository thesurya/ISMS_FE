import React from 'react'
import HeaderImage from '../../static/mylogo.png'
import './Header.css'

export const Header = () => {
  return (
      <div className="headerTitle mb-0">
        <a href="/">
          <img
            className="logo"
            src={HeaderImage}
            width="100rem"
            alt="INS Valsura"
          />
        </a>
        <span>AI Based Facial Recognition System</span>
      </div>
  )
}
