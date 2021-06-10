import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { SET_USER_DATA } from "./redux/actionTypes";

const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginComponent = (props) => {
  function navigateToDashboard() {
    window.location.href = "/#/dashboard";
  }
  const sessionActive = () => { };
  useEffect(() => {
    sessionActive();
  }, []);
  const loginSubmit = (values) => {
    axios
      .post("/api/v1/login", { ...values })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        props.actions.setUser({
          user: response.data,
        });
        navigateToDashboard();
      })
      .catch((reponse) => {
        alert("Not Able to login. Please check your username and password");
        console.log(reponse);
      });
  };
  localStorage.removeItem("user");
  return (
    <Container>
      <Row>
        <Col xs={{ span: 4, offset: 1 }}>
          <Card className="text-center" style={{ minHeight: "450px" }}>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Title>Special title treatment2</Card.Title>
              <Card.Title>Special title treatment3</Card.Title>
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
        <Col xs={{ span: 5 }}>
          <Card>
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Img
                style={{ width: "14rem" }}
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBc6w1uSMX4KRe3ymhUfTt7epM_UWjPMii-w&usqp=CAU"
              />
              <Card.Title>Welcome To Med-Connect</Card.Title>
              <Formik
                validationSchema={SignInSchema}
                onSubmit={loginSubmit}
                initialValues={{
                  username: "",
                  password: "",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          xs="12"
                          controlId="validationFormikUsername"
                        >
                          <InputGroup hasValidation>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">
                                Username
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              autoComplete="off"
                              type="text"
                              placeholder="Username"
                              aria-describedby="inputGroupPrepend"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          xs="12"
                          controlId="validationFormikPassword"
                        >
                          <InputGroup hasValidation>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend">
                                Password
                            </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              aria-describedby="inputGroupPrepend"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Form.Row>{" "}
                      <Button type="submit">Login</Button>
                    </Form>
                  )}
              </Formik>
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

export const LoginConnectedComponent = connect(
  null,
  mapDispatchToProps
)(LoginComponent);
