import Alert from "react-bootstrap/Alert";
import { UserContext } from "../../context/WebcamContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

function SuccessAlert() {
  const {
    show_Success_alert,
    set_show_Success_alert,
    show_Warning_alert,
    set_show_Warning_alert,
    warning_alert_message
  } = useContext(UserContext);

  setTimeout(() => {
    set_show_Success_alert(false);
    set_show_Warning_alert(false);
  }, 3000);

  if (show_Success_alert) {
    return (
      <Container
        style={{
          marginBottom:"2rem",
          width: "30rem",
          height: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row className="justify-content-md-center">
          <Col>
            <Alert key="success" variant="success">
              Person detected Successfully
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  } else if(show_Warning_alert) {
      return (
        <Container
          className="mb-2"
          style={{
            width: "30rem",
            height: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row className="justify-content-md-center">
            <Col>
              <Alert key="danger" variant="danger">
                {warning_alert_message}
              </Alert>
            </Col>
          </Row>
        </Container>
      );}
}
export default SuccessAlert;
