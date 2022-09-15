import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { Form, Col, Button } from "react-bootstrap";
import SideNavBar from "../SidebarMenu/Sidebar";
import {BackgroundLogo} from "../BackgroundLogo/BackgroundLogo";

export const AddAttributes = () => {
    const baseURL = "http://11.0.0.221:8000/saveCat/";
    const [cat,setCat] = useState();
    const form = new FormData();
    
    function handle(e){    
    setCat(e.target.value);
    }

    async function submit(e) {
        e.preventDefault();
        form.append("category",cat);

        const options = {
            timeout: 10000,
            timeoutErrorMessage: "Request Timed-Out, Please try later"
        }
        const response = await axios.post(baseURL, form, options);
        alert("Category Added \t" + response.data);
      }

  return (
    <>
        <div className='SideNavBarClass'><SideNavBar/></div>
        <div className='HeaderClass'><Header /></div>
        <div className='App'>
          <div className="App-Content mt-4" style={{width: "40%"}}>
            <div className="bodyContainer card" style={{top: '25px'}}>
                <div className='card-header' style={{ fontSize: '1.5rem', width: '100%' }}>Add New Attributes</div>
                <div className='card-body' style={{ width: "100%" }}>
                    <Form onSubmit={(e) => submit(e)}>
                        <Form.Group>
                            <div className='row'>
                                <label className='col-2 ml-2' htmlFor="newCategory">Category</label>
                                <div className='col'>
                                    <Form.Control id='newCategory' type="text" placeholder="Enter New Category" value={cat} onChange={(e) => handle(e)}/>
                                </div>
                            </div>
                        </Form.Group>
                    </Form> 
                </div>
                <div className='card-footer' style={{width: '100%'}}>    
                    <Button style={{width: '50%', borderRadius: '20px'}} variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </div>
          </div>
          <BackgroundLogo />
        </div>
        <div className='FooterClass'><Footer /></div>
    </>   
  )
}
