import {
    Form,
    Col,
    Button,
    Row,
    Container
  } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";  
import { Modify } from "../../Modify/Modify";

const baseURL = "http://11.0.0.221:8000/makeEntry/";
const getSupervisorUrl = "http://11.0.0.221:8000/getSups/";

// const showCapturedImage = true;
const capturedImage = "https://www.pinterest.com/pin/296815431692112197/";

export const Details = ({data,showCapturedImage,capturedImage,GetByAadhar=false}) => {
    // required for make  entry api call
    console.log("here")
    console.log(data)
    console.log( capturedImage)
    const formData=data;
    console.log(formData.name)
    const [additionalData, setAdditionalData] = useState({
        token: "",
        supervisor: ""
    });
    const [modifyDetails,setmodifyDetails]=useState(false);
    const [showInOut, setShowInOut] = useState(false);
    const [alertData, setAlertData] = useState("");
    const [showSuccess, setSuccess] = useState(false);
    const [supervisor, setSupervisor]=useState([]);
    
    // useEffect(() => {
    //     console.log("api call succesful");
    //     axios.get(getSupervisorUrl).then((res) => {
    //     setSupervisor(res.data);
    //     })
    // }, [])
    
    function correctDetectionToggle(value) {
        setShowInOut(value);
    }

    function handle(e) {
        const additionalDataLocal = { ...additionalData };
        additionalDataLocal[e.target.id] = e.target.value;
        setAdditionalData(additionalDataLocal);
    }

    async function submit(e) {
        let val = e.target.value;   
        console.log("value",val);
        e.preventDefault();
        const form = new FormData();   
        form.append("val", val);
        form.append("name", formData.name);
        form.append("rank", formData.rank);
        form.append("number", formData.phnumber);
        form.append("aadhar", formData.aadhar);
        form.append("blacklist", formData.blacklist);
        form.append("category", formData.cat);
        form.append("gender", formData.gender);
        form.append("snumber", formData.snumber);
        form.append("supervisor", additionalData.supervisor);
        form.append("token", additionalData.token);
        form.append("similarity", formData.similarity);
        const response = await axios.post(baseURL, form);
        console.log(response)
        console.log(response.data)
        setSuccess(true);
        setAlertData(response.data);

        if(val == "Abort"){
          setTimeout(() => window.open('getByAadhar',"_self"),
          3000);
        }
        else {
          setTimeout(()=>window.open('/', "_self"),
          3000);
        }
      }
      const modify=()=>{

            setmodifyDetails(true)

      }

      return (
        <>
        { !modifyDetails &&
                <Row>
                {/* Captured Image */}
                { showCapturedImage && <Col className="card ml-1" md="3">
                    <div className="card-header">Captured Image</div>
                    <div className="card-body d-block ">
                        <div className="p-2">
                            <img src={capturedImage[0]} width="80%" alt="Captured Image" />
                        </div>
                        <div >
                            <img className="d-inline p-2" src={capturedImage[1]} width="40%" alt="Captured Image" />
                            <img  className="d-inline p-2" src={capturedImage[2]} width="40%" alt="Captured Image" />
                        </div>
                        
                    </div>
                </Col>}
                {/* Detected Data */}
                <Col className="card ml-1">
               
                    <Container className="card-body d-flex align-items-baseline py-0">
                        <div className="col-md-6 px-5">
                            <div className="row">Name: {formData.name}</div>
                            <hr />
                            <div className="row">Rank: {formData.rank}</div>
                            <hr />
                            <div className="row">Phone: {formData.phnumber}</div>
                            <hr />
                            <div className="row">Aadhar: {formData.aadhar}</div>
                            
                        </div>
                        <span className="border"></span>
                        <div className="col-md-6 px-5 border-right">
                            <div className="row">Category: {formData.cat}</div>
                            <hr />
                            <div className="row">Gender: {formData.gender}</div>
                            <hr />
                            <div className="row">SNumber: {formData.snumber}</div>
                            <hr />
                        </div>
                        
                    </Container>
                    <hr />
                    <Container className="card-body">
                        <Form>
                            <Row className="mb-4 ">
                                <Form.Group className="d-flex" controlId="validationCustom01">
                                    <div className="col-md-6 px-2">
                                        <Form.Label className="form">Supervisor</Form.Label>
                                        <Form.Control
                                            aria-label="Supervisor"
                                            id="supervisor"
                                            as="select"
                                            onChange={(e) => handle(e)} 
                                        >
                                            {supervisor.map((option,index)=>(
                                                <option key={index} value={option.value}>{supervisor[index]}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    <br />
                                    <div className="col-md-6 px-2">
                                        <Form.Label className="form">Token</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Token"
                                            id="token"
                                            onChange={(e) => handle(e)}
                                            disabled={false} 
                                        />
                                    </div>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Container>
                    <hr />
                    {!GetByAadhar &&
                    <Container className="card-body">
                        <p>Was the person detected correctly?&nbsp;</p>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="correct" id="correctDetect" onClick={()=>{setShowInOut(true)}} value="true"  />
                            <label className="form-check-label" htmlFor="correctDetect">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="incorrect" id="incorrectDetect"  value="Abort"  onClick={(e) => submit(e)}/>
                            <label className="form-check-label" htmlFor="incorrectDetect">No</label>
                        </div>
                    </Container> 
                    }
                    {/* Action items */}
                    {(showInOut || GetByAadhar) && <Container gap={2}>
                        <Button
                            variant="success col-md-3 mx-3"
                            onClick={(e) => submit(e)}
                            id="In"
                            value="In"
                        >
                            In
                        </Button>
                        <Button
                            variant="danger col-md-3 mx-3"
                            onClick={(e) => submit(e)}
                            id="Out"
                            value="Out"
                        >
                            Out
                        </Button>
                    </Container>}
                    {/* Alert */}
                     {showSuccess && (
                        <Alert variant="warning" style={{width:"100%"}}>{alertData}!</Alert>
                    )}
                </Col>
                {/* Matched Image */}
                <Col className="card ml-1" md="3" >
                    <div className="card-header">Matched Image</div>
                    <div className="card-body " >
                        <img src={`data:image/png;base64,${formData.image}`} width="80%" alt="Matched Image" />
                    <div className="card-text">Similarity - {formData.similarity}</div>

                    </div>
                    <div>
                         <Container
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                        >
                          <Button
                              className="mt-2 m-0"
                              style={{
                                width: "25%",
                                minWidth: "150px",
                                borderRadius: "20px"
                              }}
                              variant="primary"
                              color="primary"
                              onClick={modify}
                          >
                              Modify
                          </Button>
                        </Container>
                    </div>
                </Col>
            </Row>
        }

        {
            modifyDetails && <Modify data={data}/>

        }
            
        </>
    );
}
