import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <br /><br />
      <a className="menu-item"  href="/">
        Home
      </a>
      <hr/><br/>

      <a className="menu-item" href="/dashboard" >
        Analytics
      </a>
      <hr/><br/>
      
      <a className="menu-item" href="/getByAadhar" >
        Get by Aadhar
      </a>
      <hr/><br/>
      
      <a className="menu-item" href="/addAttributes" >
        Add Attributes
      </a>
      <hr/><br/>
      
      <a className="menu-item" href="/contactUs"  rel={'noreferrer'}>
        Contact Us
      </a>
      <hr/><br/>
    </Menu>
  );
};
