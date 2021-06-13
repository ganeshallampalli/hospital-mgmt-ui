import axios from "axios";
import {Formik} from "formik";
import React, {useEffect} from "react";
import {Button, Card, Col, Container, Form, InputGroup, Row, Tab, Tabs,} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Yup from "yup";
import {SET_USER_DATA} from "./redux/actionTypes";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email ID").required("Required"),
    password: Yup.string().required("Required"),
});


const SignUpSchema = Yup.object().shape({
    // username: Yup.string().required("Required"),
    password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email Id").required("Required"),
    address: Yup.string().required("Required"),
    mobileNo: Yup.string(),
        // .min(10).max(10).required("Mobile number should be of 10 digits"),
    role: Yup.string().required("Required"),
});

const LoginComponent = (props) => {
    function navigateToDashboard() {
        window.location.href = "/#/dashboard";
    }

    const sessionActive = () => {
    };
    useEffect(() => {
        sessionActive();
    }, []);
    const loginSubmit = (values) => {
        axios
            .post("/api/v1/login", {...values})
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                props.actions.setUser({
                    user: response.data,
                });
                navigateToDashboard();
            })
            .catch((response) => {
                alert("Not Able to login. Please check your username and password");
                console.log(response);
            });
    };
    localStorage.removeItem("user");

    const signupSubmit = (values) => {
        axios
            .post("/api/v1/user/signup", {...values})
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                props.actions.setUser({
                    user: response.data,
                });
                navigateToDashboard();
            })
            .catch((response) => {
                alert("Not Able to login. Please check your username and password");
                console.log(response);
            });
    };
    return (

        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
            <Tab eventKey="login" title="Login">
                <Container>
                    <Row>
                        <Col xs={{span: 5}}>
                            <Card>
                                <Card.Body style={{textAlign: "center"}}>
                                    <Card.Img
                                        style={{width: "14rem"}}
                                        variant="top"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBc6w1uSMX4KRe3ymhUfTt7epM_UWjPMii-w&usqp=CAU"
                                    />
                                    <Card.Title>Welcome To Hospital Management</Card.Title>
                                    <Formik
                                        validationSchema={SignInSchema}
                                        onSubmit={loginSubmit}
                                        initialValues={{
                                            email: "",
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
                                                        controlId="validationFormikEmail"
                                                    >
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend">
                                                                    Email
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                autoComplete="off"
                                                                type="text"
                                                                placeholder="Email"
                                                                aria-describedby="inputGroupPrepend"
                                                                name="email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.email}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.email}
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
                                                </Form.Row>
                                                <Row>
                                                    <Col>
                                                        <Button type="submit">Login</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Tab>
            <Tab eventKey="register" title="Sign Up">
                <Container>
                    <Row>
                        <Col xs={{span: 5}}>
                            <Card>
                                <Card.Body style={{textAlign: "center"}}>
                                    <Card.Title>Welcome To Hospital Management</Card.Title>
                                    <Formik
                                        validationSchema={SignUpSchema}
                                        onSubmit={signupSubmit}
                                        initialValues={{
                                            name: "",
                                            email: "",
                                            password: "",
                                            address: "",
                                            mobileNo: "",
                                            role: "",
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
                                                        controlId="validationFormikName"
                                                    >
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend">
                                                                    Name
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                autoComplete="off"
                                                                type="text"
                                                                placeholder="name"
                                                                aria-describedby="inputGroupPrepend"
                                                                name="name"
                                                                value={values.name}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.name}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.name}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group
                                                        as={Col}
                                                        xs="12"
                                                        controlId="validationFormikEmail"
                                                    >
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend">
                                                                    Email
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                type="email"
                                                                placeholder="email"
                                                                aria-describedby="inputGroupPrepend"
                                                                name="email"
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.email}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.email}
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
                                                                autoComplete="off"
                                                                type="password"
                                                                placeholder="password"
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
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group
                                                        as={Col}
                                                        xs="12"
                                                        controlId="validationFormikAddress"
                                                    >
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend">
                                                                    Address / Location
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                as="textarea"
                                                                autoComplete="off"
                                                                type="text"
                                                                placeholder="address"
                                                                aria-describedby="inputGroupPrepend"
                                                                name="address"
                                                                value={values.address}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.address}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.address}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group
                                                        as={Col}
                                                        xs="12"
                                                        controlId="validationFormikMobile"
                                                    >
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend">
                                                                    Mobile
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                autoComplete="off"
                                                                type="text"
                                                                placeholder="9999999999"
                                                                aria-describedby="inputGroupPrepend"
                                                                name="mobileNo"
                                                                value={values.mobileNo}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.mobileNo}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.mobileNo}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Form.Group
                                                        as={Col}
                                                        xs="12"
                                                        controlId="validationFormikRole"
                                                    >
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inputGroupPrepend">
                                                                    Role
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control
                                                                autoComplete="off"
                                                                type="text"
                                                                placeholder="Technician/Customer"
                                                                aria-describedby="inputGroupPrepend"
                                                                name="role"
                                                                value={values.role}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.role}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.role}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Form.Row>
                                                <Row>
                                                    <Col>
                                                        <Button type="submit">Sign Up</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <div></div>
            </Tab>
        </Tabs>


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
