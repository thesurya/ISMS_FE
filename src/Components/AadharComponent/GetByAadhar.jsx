import {Footer} from "../Footer/Footer";
import {Header} from "../Header/Header";
import SideNavBar from "../SidebarMenu/Sidebar";
import {useNavigate} from "react-router-dom";
import {BackgroundLogo} from "../BackgroundLogo/BackgroundLogo";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../App.css';
import {
    Form,
    Col,
    Button
  } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";  
import { Details } from "../Capture/DetailsCard/Details";
import { add } from "date-fns/esm";
import { AddDetails } from "../AddDetails/AddDetails";
const showDetailsUrl = "showDetails";
const AddDetailUrl="addDetails"

const baseURL = "http://11.0.0.221:8000/uploadAadhaar/";

function GetByAadhar() {
  const [isAadharError, setIsAadharError] = useState(false);
  const [isAadhar, setIsAadhar] = useState(true);
  const [showDetails,setshowDetails]=useState(false);
  const [addDetails,setAddDetails]=useState(false)
  const [settling_props, set_settling_props] = useState({
    name: "",
    rank: "",
    phnumber: "",
    aadhar: "",
    cat: "",
    gender: "",
    blacklist: "",
    snumber: "",
    image: "",
  });
  const [data, setData] = useState({
    aadhaar: "",
  });

  async function submit(e) {
    e.preventDefault();
    const form = new FormData();
    console.log("here")
    form.append("aadhaar", data.aadhaar);
    const response = await axios.post(baseURL, form);
    if (response.data === "unknown") {
        console.log("not found in db, redirect to add details");
        // redirect to add new
        setAddDetails(true);

    } else {
        console.log("found in db, redirect to show details");
        set_settling_props({
          ...settling_props,
          name: response.data.Name,
          rank: response.data.Rank,
          phnumber: response.data.Number,
          aadhar: response.data.Adhar,
          cat: response.data.Cat,
          gender: response.data.gender,
          blacklist: response.data.B,
          snumber: response.data.snumber,
          token: response.data.token,
          image: response.data.image,
        });
        setshowDetails(true);
      // redirect to show details
    }
  }

  function handleValidation(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);

    if(e.target.value.length > 12) {
      setIsAadharError(true)
      setIsAadhar(true)
    }
    else if (e.target.value.length == 12){
        setIsAadhar(false)
        setIsAadharError(false)
    }
    else{
      setIsAadharError(false)
      setIsAadhar(true)
    }
  }

  return (
    <>
        <div className='SideNavBarClass'><SideNavBar/></div>
        <div className='HeaderClass'><Header /></div>
        
        <div className='App'>
        
        
        { !addDetails&& ( !showDetails ?
            <div className="App-Content mt-4" style={{width: "60%", top: '7rem'}}>
                <div className="card">
                    <div className="card-header">
                        <Form.Label className="form h4">Aadhar Card Number</Form.Label>
                    </div>
                    <div className="card-body">
                        <Form onSubmit={(e) => submit(e)}>
                            <div className="flex-container centre" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Group as={Col} >            
                                    <Form.Control
                                    id='aadhaar'
                                    onChange={(e) => handleValidation(e)}
                                    value={data.aadhaar}
                                    required
                                    type="number"
                                    placeholder="Enter Aadhar Number"
                                    />
                                </Form.Group>
                            </div>
                            {isAadharError && (
                                <Alert variant="danger" className="mt-2" style={{width:'100%'}}>Please Enter valid AadharCard number</Alert>
                            )}
                        </Form>
                    </div>
                    <div className="card-footer">
                        <Button type='submit' style={{ borderRadius: '20px' }} disabled={isAadhar} onClick={(e) => submit(e)} variant="primary col-3 mt-0">Get Details</Button>
                    </div>
                </div>
            </div>
            :
            <Details data={settling_props} showCapturedImage={false} GetByAadhar={true}/>)}
            { addDetails && <AddDetails propAadhar={data.aadhaar} />}
            <BackgroundLogo />
        </div>
        <div className='FooterClass'><Footer /></div>
    </>
  );
}
export default GetByAadhar;
