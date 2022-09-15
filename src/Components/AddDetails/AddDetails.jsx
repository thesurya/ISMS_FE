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
import { Camera } from '../Capture/CameraCard/Camera';
import {  useNavigate } from 'react-router-dom';


const styles = {
    verticalLine: {
      borderRight: "solid gray 1px",
      borderLeft: "solid gray 1px"
    },
    webcam: {
      borderRadius: "15px"
    }
  };
const form = new FormData();
var i = 0;
var imageData = [];
const baseURL2 = "http://11.0.0.221:8000/saveDetails/";
const baseURL = "http://11.0.0.221:8000/uploadImage/";
export const AddDetails = ({propAadhar}) => {

  function navigateTo(url, options) {
    try {
      navigate(url, { ...options, replace: true});
    }
    catch(error) {
      console.error("Error: ", error);
    }
  }
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
  const navigate = useNavigate();
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
  const getByAadharUrl = "/";
  //set_show_spinner(false)
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
  

  var [data, setData] = useState({
    name: "",
    rank: "",
    phnumber: "",
    aadhar: "",
    cat: "",
    gender: "",
    blacklist: "",
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
  }

   const capture= async () => {
    imageData = [];
    setScreenShots([]);
    setAddDetails(true)
    try {
      for (i = 0; i < 5; i++) {
      console.log("inside for loop, capture called.")
      await sleep(1000);
      let imageSrc =''
      console.log(webcamRef)
      imageSrc = webcamRef.current? webcamRef.current.getScreenshot({width: 1920, height: 1080}):"";
      
      imageData.push(imageSrc);
    
      const newFile = getFilefromBlob(imageSrc, `image.jpeg`);
      const newBlob = await resizeFile(newFile);
      setScreenShots((prevState) => [...prevState, newBlob]);
    }

    
      form.append("photo0", imageData[0]);
      form.append("photo1", imageData[1]);
      form.append("photo2", imageData[2]);
      form.append("photo3", imageData[3]);
      form.append("photo4", imageData[4]);
      setAddDetails(true)
    }
    catch(error) {
      console.error(error);
    }
   } 
    const [validated, setValidated] = useState(false);
      
      const handleSubmit = async(event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const form1 = event.currentTarget;
        set_showAdddetailsFail(false);
        set_show_spinner(true);
        
        if (form1.checkValidity() === false) {
          console.log("inside if, handle submit");
          event.preventDefault();
          event.stopPropagation();
        }
        else {
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
            sleep(2500).then(() => {
              navigateTo(getByAadharUrl);
            });
          }
          else{
            console.log(response)
            set_btn(true);
            set_show_spinner(false);
            set_showAdddetailsFail(true);
            setResponse(response.data)
          }
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
           {/* <Camera numberOfImages={3} addNewData={true} /> */}
            {  <div>
                    <Webcam
                       audio={false}
                       minScreenshotHeight={200}
                        screenshotQuality={1}
                        minScreenshotWidth={100}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                       width={"95%"}
                         videoConstraints={{
                          height: 1080,
                          width: 1920,
                          facingMode: "environment",
                        }}
                        style={styles.webcam}
                    />
                  </div>
                  }
                  
                  {/* Capture Button */}
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
                
          
                {/* Images Captured */}
                 <div className="mb-0">
                  {screenShots.map((item, index) => {
                    return (
                      <span className="p-2" key={index}>
                        <img
                          src={item}
                          alt={index}
                          style={{ width: "50px", height: "50px", borderRadius: "15px" }}
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
                defaultValue={"default"}
              >
                <option className='text-muted' value={"default"} disabled>
                  Choose an option
                </option>
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
              <Form.Control.Feedback type="invalid">Please Enter a valid Rank</Form.Control.Feedback>
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
            <Form.Group as={Col} md="4" >
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
                defaultValue={"default"}
              >
                <option className='text-muted' value={"default"} disabled>
                  Choose an option
                </option>
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
                defaultValue={"default"}
                onChange={(e) => handle(e)}
              >
                <option className='text-muted' value={"default"} disabled>
                  Choose an option
                </option>
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
                defaultValue = {"default"}
              >
                <option className='text-muted' value={"default"} disabled>
                  Choose an option
                </option>
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

