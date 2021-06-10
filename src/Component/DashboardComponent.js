import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { SET_USER_DATA } from "./redux/actionTypes";
const DashboardComponent = (props) => {
  const history = useHistory();
  const login = () => {
    history.push("/login");
  };
  const user = localStorage.getItem("user");
  let userDetails = null;
  if (props.user === null || props.user === undefined) {
    if (user !== null && user !== "" && user !== '""') {
      userDetails = JSON.parse(user);
      props.actions.setUser({ user: userDetails });
    } else {
      login();
    }
  }
  let welcomeMessage = "Welcome : ";
  welcomeMessage += props.user?.firstName;
  switch (props.user?.role) {
    case "ROLE_ADMIN":
      welcomeMessage += " (ADMIN)";
      break;
    case "ROLE_DOCTOR":
      welcomeMessage += " (DOCTOR)";
      break;
    case "ROLE_RECEPTION":
      welcomeMessage += " (RECEPTIONIST)";
      break;
    case "ROLE_PATIENT":
      welcomeMessage += " (PATIENT)";
      break;
    default:
  }

  return (
    <Container>
      <Row>
        <Col xs={{ span: 4, offset: 2 }}>
          <Card className="text-center" style={{ minHeight: "314px" }}>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Title>Special title treatment2</Card.Title>
              <Card.Title>Special title treatment4</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        </Col>
        <Col xs={{ span: 4 }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk79EO3xn3yLOVkqBmdbrWNlWBW48pPmodEw&usqp=CAU"
            />
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title>Welcome To Med-Connect</Card.Title>
              <Card.Text>Our experts are here to help.</Card.Text>
              {user ? (
                welcomeMessage
              ) : (
                  <Button variant="primary" onClick={login}>
                    Login
                  </Button>
                )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
const actions = {
  setUser: (data) => {
    return {
      type: SET_USER_DATA,
      user: data.user,
    };
  },
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
function mapStateToProps(state) {
  return {
    user: state.userData.user,
  };
}
export const DashboardConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);
