import React from 'react'
import logoRight from '../../static/azadi.png'
import logoLeft from '../../static/logo-valsura.png'
import './Footer.css'
export const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className='row' style={{width: '100%'}}>
            <div className='col-1 m-2'>        
                <img src={logoLeft} style={{position:'relative'}} alt="Home" title="Home"/> 
            </div>
            <div className='col m-4'>
                <p style={{textAlign:'center', fontSize: "20"}}>Content Owned, Updated and Maintained by Indian Naval Ship Valsura. Copyright © Since 2022. All Rights Reserved.</p>
            </div>
            <div className='col-1 m-2'>
                <img src={logoRight} style={{position:'relative', height: "4rem"}} alt="Home" title="Home"/>
            </div>
        </div>
      </div>
    </>
  )
}
