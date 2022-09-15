import { useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import Col from "react-bootstrap/Col";
import { Spinner, Container } from "react-bootstrap";
import { UserContext } from "../../../context/WebcamContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SuccessAlert from "../../Alert/SuccessAlert";
import loaderGif from "../../../static/newGif.gif";
import { Details } from "../DetailsCard/Details";

const baseURL = "http://11.0.0.221:8000";
const testURL="/uploadImage"
const uploadImageUrl = baseURL + "/uploadImage/";
const showDetailsUrl = "showDetails";
const addDetailsUrl = "/addDetails/";
const getByAadharUrl = "/getByAadhar";

var i = 0;
var data = [];
var image=[];
const form = new FormData();

export const Camera = (props) => {
  console.log(props.addNewData)
  const navigate = useNavigate();
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
    set_show_Warning_alert,
    warning_alert_message,
    set_warning_alert_message
  } = useContext(UserContext);  
  
  function navigateTo(url, options) {
    try {
      navigate(url, { ...options, replace: true});
    }
    catch(error) {
      console.error("Error: ", error);
    }
  }

  const [disableCapture, setDisableCapture] = useState(false);
  const [disable_btn, set_btn] = useState(true);  
  const [showDetails,setshowDetails]=useState(false);
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

  const [screenShots, setScreenShots] = useState([]);
  const webcamRef = useRef(null);
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

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const capture = async () => {
    set_show_spinner(true);
    set_btn(false);
   
    setScreenShots([]);
    for (i = 0; i < props.numberOfImages; i++) {
      await sleep(1000);
      let imageSrc = webcamRef.current?.getScreenshot();
      data.push(imageSrc);
      
      const newFile = getFilefromBlob(imageSrc, `image.jpeg`);
      const newBlob = await resizeFile(newFile);
      setScreenShots((prevState) => [...prevState, newBlob]);
    }
    
    for(i = 0; i < props.numberOfImages; i++) {
        const imageName = 'photo' + i;
        form.append(imageName, data[i]);
        image.push(data[i]);
    }
    
     setDisableCapture(true);
     axios.post(uploadImageUrl, form).then((response) => {
      // axios.post(testURL).then((response)=>{
      if (response.data === "unknown") {
        set_show_Warning_alert(true);
        set_warning_alert_message("Image Match Unsuccesful, Please try with Aadhar Number");
        set_show_spinner(false);
        setDisableCapture(false);
        set_btn(true);
        setScreenShots([]);
        sleep(2500).then(() => {
          navigateTo(getByAadharUrl);
        });
      } else {
        set_show_Success_alert(true);
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
          similarity: response.data.similarity
        });
        set_btn(true);
        set_show_spinner(false);
        setDisableCapture(false);
        setshowDetails(true);
        setScreenShots([]);
      }
    }).catch((error) => {
        set_show_Warning_alert(true);
        set_warning_alert_message(JSON.stringify(error.message));
        set_show_spinner(false);
        setDisableCapture(false);
        set_btn(true);
        setScreenShots([]);
    });
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

  const styles = {
    verticalLine: {
      borderRight: "solid gray 1px",
      borderLeft: "solid gray 1px"
    },
    webcam: {
      borderRadius: "15px"
    }
  };

  return (
    
    <>
    
    { !showDetails ? 
    
      <div className="col-8 offset-md-2">
      <div className="card p-4 pb-0 mt-4"style={{minWidth:"100px"}}>
        <div className="card-body">
          {display_webcam && (
            <Col>
              {show_Success_alert || show_Warning_alert && <SuccessAlert/>}
                <>
                  {/* Webcam */}
                  { !disableCapture && <div>
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
                  </div>
                  }
                  { disableCapture &&
                    <img
                        src={loaderGif}
                        alt="Loader"
                        style={{ width: "100%", height: "100%", borderRadius: "15px" }}
                    />
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
                    {/* Spinner */}
                    {show_spinner && (
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
                              disabled
                            >
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
                  </div>
                </>
          
                {/* Images Captured */}
                {!disableCapture && <div className="mb-0">
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
                </div>}
            </Col>
          )}
        </div>
      </div>
    </div>
    
    :
    
    <Details data={settling_props} showCapturedImage={true} capturedImage={image} />
                }
    </>
  );
};
