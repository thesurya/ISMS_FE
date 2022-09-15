import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Col, Row ,Container, Button, Alert } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
const modifyUrl="http://11.0.0.221:8000/imgsAadhar/?aadhaar="
const modurl="/imgsAadhar"
const deleteURL="http://11.0.0.221:8000/deleteData/?aadhaar="
const getByAadharUrl = "/getByAadhar";
export const Modify = ({data}) => {
    console.log(data)
    const navigate=useNavigate();
    const [value,setvalue]=useState(null)
    const [success,showSuccess]=useState(false)
    const [alertdata,setalertData]=useState("");
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    function navigateTo(url, options) {
        try {
          navigate(url, { ...options, replace: true});
        }
        catch(error) {
          console.error("Error: ", error);
        }
      }
    const deleteData=()=>{
        


        axios.get(deleteURL+data.aadhar).then((res)=>{
            console.log(res.data)
            showSuccess(true)
            setalertData(res.data)
            sleep(2500).then(() => {
                navigateTo(getByAadharUrl);
              });


        })
    }
   
    const getData=()=>{

            axios.get(modifyUrl+data.aadhar).then((res) => {
            console.log(res);
            setvalue(res);
            })

    }

    useEffect(() => {
        console.log("api call succesful");
        getData();
        
    },[])

  console.log(value)
  
  return (
    <div>
        <div className='d-inline '>
            

                
                
                    <Col className="card ml-1 m-1 ">
               
                    <Container className="card-body d-flex align-items-baseline py-0">
                    <Button className="mt-2 m-0"
                              style={{
                                width: "25%",
                                minWidth: "150px",
                                borderRadius: "20px"}}
                              variant="primary"
                              color="primary" 
                              onClick={deleteData}>Delete Data</Button>
                    
                        <div className="col-md-6 px-5">
                            <div className="row">Name: {data.name}</div>
                            <hr />
                            <div className="row">Rank: {data.rank}</div>
                            <hr />
                            <div className="row">Phone: {data.phnumber}</div>
                            <hr />
                            <div className="row">Aadhar: {data.aadhar}</div>
                            
                        </div>
                        <span className="border"></span>
                        <div className="col-md-6 px-5 border-right">
                            <div className="row">Category: {data.cat}</div>
                            <hr />
                            <div className="row">Gender: {data.gender}</div>
                            <hr />
                            <div className="row">SNumber: {data.snumber}</div>
                            <hr />
                        </div>
                        
                    </Container>
                    </Col>
                    <Col className="card ml-1 m-1">
                    <Container className="card-body  align-items-baseline py-0"> 
                    
                    <div className="card-header">Stored Images</div>
                    
                    <div className="card-body d-flex " style={{overflowX: "scroll"}}>
                        {value?
                        value.data.image.map((option,index)=>(
                                            
                                                <img className='m-1' key={index} src={`data:image/png;base64,${value.data.image[index]}`} width="25%" alt="Matched Image" />
                                            ))
                        :""}
                        
                    </div>
                     {success && (
                        <Alert variant="warning" style={{width:"100%"}}>{alertdata}!</Alert>
                    )}
                    
                    </Container>
                    </Col>
                    
                     
            
            
        </div>
    </div>
  )
}
