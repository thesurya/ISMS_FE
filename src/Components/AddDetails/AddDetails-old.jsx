import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    Form,
    Col,
    Button,
    Row,
    Container,
    InputGroup,
    Spinner,
    Alert
  } from "react-bootstrap";
import Webcam from 'react-webcam';
import Resizer from "react-image-file-resizer";
import { UserContext } from "../../context/WebcamContext";
import axios from 'axios';
const styles = {
    verticalLine: {
      borderRight: "solid gray 1px",
      borderLeft: "solid gray 1px"
    },
    webcam: {
      borderRadius: "15px"
    }
  };
var i = 0;
var data = [];
const baseURL = "http://11.0.0.221:8000/uploadImage/";
export const AddDetails = ({propAadhar}) => {
  const webcamRef = useRef(null);
    const {
    display_webcam,
    set_display_webcam,
    sm_value,
    set_sm_value,
    show_spinner,
    set_show_spinner,
    show_Success_alert,
    set_show_Success_alert,
    show_Warning_alert,
    set_show_Warning_alert
  } = useContext(UserContext); 
    
  const [disable_btn, set_btn] = useState(true);
  const [screenShots, setScreenShots] = useState([]);
  const [phoneerror,setIsphoneError]=useState(false);
  const [aadharerror,setIsAadharError]=useState(false);
  const [adddetails,setAddDetails]=useState(false);
  const [showAdddetailsSuccess, set_showAdddetailsSuccess] = useState(false);
  const [showAdddetailsFail, set_showAdddetailsFail] = useState(false);
  const [response, setResponse] = useState(" ");
  const [cat,setCat]=useState([]);
  const [sup,setSup]=useState([]);
  set_show_spinner(false)
  useEffect(() => {
     axios.get('http://11.0.0.221:8000/getCat/').then((res)=>{
      setCat(res.data);
      console.log("get categories called");
     })

     axios.get('http://11.0.0.221:8000/getSups/').then((res) => {
      setSup(res.data);
      console.log('supervisor list called');
     })
    
  }, [])
  

  const [data, setData] = useState({
    name: "",
    rank: "",
    phnumber: "",
    aadhar: "",
    cat: "",
    gender: "Male",
    blacklist: "No",
    snumber: "",
    token: "",
    supervisor:""
  });
    

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });



    function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }



   function  phonehandle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    if(e.target.value.length > 10) {
      setIsphoneError(true)
    }
    else{
      setIsphoneError(false)
      
    }
    
    console.log(newData)
  }

  const handleAadhar=(e)=>{
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    if (e.target.value.length === null || e.target.value.length < 12 ||e.target.value.length > 12) {
      setIsAadharError(true)
    }
    else{
      setIsAadharError(false)
    }
  }



   const capture= async () => {
    // data = [];
    setScreenShots([]);
    setAddDetails(true)
    try {
      for (i = 0; i < 5; i++) {
      console.log("inside for loop, capture called.")
      await sleep(1000);
      let imageSrc = webcamRef.current?.getScreenshot();
      console.log("imagesrc", imageSrc);
      data.push(imageSrc);
      const newFile = getFilefromBlob(imageSrc, `image.jpeg`);
      const newBlob = await resizeFile(newFile);
      setScreenShots((prevState) => [...prevState, newBlob]);
    }
      console.log(screenshots);
      const form = new FormData();
      form.append("photo0", data[0]);
      form.append("photo1", data[1]);
      form.append("photo2", data[2]);
      form.append("photo3", data[3]);
      form.append("photo4", data[4]);
      setAddDetails(true)
    }
    catch(error) {
      console.error(error);
    }
   } 
    const [validated, setValidated] = useState(false);

      const handleSubmit = async(event) => {
        const form = event.currentTarget;
        set_show_spinner(true)
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
        form.append("name", data.name);
        form.append("rank", data.rank);
        form.append("number", data.phnumber);
        form.append("aadhar", propAadhar);
        form.append("blacklist", data.blacklist);
        form.append("category", data.cat);
        form.append("gender", data.gender);
        form.append("snumber", data.snumber);
        form.append("token", data.token);
        form.append("supervisor", data.supervisor);

        const response = await axios.post(baseURL2, form);
        if (response.data === "success") {
        set_btn(true);
        set_show_spinner(false);
        set_showAdddetailsSuccess(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 3000);
        }
     
        else{
          set_btn(true);
          set_show_spinner(false);
          set_showAdddetailsFail(true);
          setResponse(response.data)
        }
        



      };


      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }


      const getFilefromBlob = (dataurl, filename) => {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
      };
  
  return (
    <>
      <Row>
        <Col className="card ml-1" md="3">
          <Webcam
                        audio={false}
                        ref={webcamRef}
                        minScreenshotHeight={200}
                        screenshotQuality={1}
                        minScreenshotWidth={100}
                        forceScreenshotSourceSize
                        onUserMedia={() => {
                          setDisableCapture(false);
                        }}
                        width={"95%"}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                          height: 1080,
                          width: 1920,
                          facingMode: "environment",
                        }}
                        style={styles.webcam}
                    />
                  <div className="mb-1">
                    
                    {disable_btn && (
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
                              onClick={capture}
                          >
                              Capture
                          </Button>
                        </Container>
                    )}
                  </div>
                   
                    <div style={{ margin: "20px" }}>
                    {screenShots.map((item, index) => {
                      return (
                        <span style={{ padding: "10px" }} key={index}>
                          <img
                            src={item}
                            alt={index}
                            style={{ width: "60px", height: "60px" }}
                          ></img>
                        </span>
                     );
                    })}
                    </div>
                  

        </Col>
        <Col className="card ml-1">
        <Container className="card-body d-flex align-items-baseline py-0">

          <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label className="form">Name</Form.Label>
              <Form.Control
                id="name"
                onChange={(e) => handle(e)}
                value={data.name}
                required
                type="text"
                placeholder="Name"
                
              />
              <Form.Control.Feedback type="invalid" >Name is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form">Gender</Form.Label>
              
              <Form.Control
                aria-label="Default select example"
                as="select"
                id="gender"
                onChange={(e) => handle(e)}
                // value={data.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form">Rank</Form.Label>
              <Form.Control
                id="rank"
                onChange={(e) => handle(e)}
                value={data.rank}
                required
                type="text"
                placeholder="Rank"
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form">Service Number</Form.Label>
              <Form.Control
                id="snumber"
                onChange={(e) => handle(e)}
                value={data.snumber}
                required
                type="text"
                placeholder="Service Number"
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" validationState={false}>
              <Form.Label className="form">Mobile Number</Form.Label>
              
              <Form.Control
                id="phnumber"
                onChange={(e) => phonehandle(e)}
                value={data.phnumber}
                required
                type='tel' 
                placeholder="Mobile Number"
                
                isInvalid={phoneerror}
              />
              <Form.Control.Feedback type="invalid">enter valid phone number</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form">Aadhar Number</Form.Label>
              <Form.Control
                id="aadhar"
                value={propAadhar}
                required
                type="number"
                placeholder="Aadhar"
                readOnly
                
              />
              
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form">Category</Form.Label>
              <Form.Control
                aria-label="Default select example"
                id="cat"
                as="select"
                onChange={(e) => handle(e)}
                // value={data.cat}
              >
              {cat.map((option,index)=>(
                <option  key={index} value={option.value}>{cat[index]}</option>
               

              ))}
                
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form">BlackList</Form.Label>
              <Form.Control
                aria-label="Default select example"
                as="select"
                id="blacklist"
                onChange={(e) => handle(e)}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Form.Control>
            </Form.Group>
         <Form.Group as={Col} md="4">
              <Form.Label className="form">Superviser</Form.Label>
              <Form.Control
                aria-label="Default select "
                id="supervisor"
                as="select"
                onChange={(e) => handle(e)}
                
              >
              {sup.map((option,index)=>(
                <option  key={index} value={option.value}>{sup[index]}</option>
               

              ))}
                
              </Form.Control>
              
            </Form.Group>

            </Row>
             {(disable_btn&&
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Button
                variant="outline-primary"
                color="primary"
                type="submit"
                disabled={!adddetails}
              >
                Add Details
              </Button>
            </Container>
            )}
          

          {!show_spinner && (
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp;&nbsp; Loading...
              </Button>
            </Container>
          )}
          {showAdddetailsSuccess && (
            <Alert variant="success">Person Added Successfully !</Alert>
          )}
          
           {showAdddetailsFail && (
            <Alert variant="danger">
              {response}
            </Alert>
          )}
            </Form>
             


        </Container>



        </Col>
               
                    
      </Row>
        
    </>
  )
}

