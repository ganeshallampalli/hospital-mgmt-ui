import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
const schema = Yup.object().shape({
  firstName: Yup.string().min(3).required("Required"),
  lastName: Yup.string().min(3).required("Required"),
  username: Yup.string().min(3).required("Required"),
  password: Yup.string().min(3).required("Required"),
  emailId: Yup.string().email().required("Required"),
  bloodGroup: Yup.string().min(3).required("Required"),
  mobileNo: Yup.number().min(3).required("Required"),
  gender: Yup.string().required("Required"),
  dob: Yup.date().required("DOB is required"),
  age: Yup.number().min(1).required("Required"),
  // clinic: Yup.string().min(3).required("Required"),
  // joiningDate: Yup.date().required("Joining Date is required"),
  allergies: Yup.string().min(3).required("Required"),
  city: Yup.string().min(3).required("Required"),
  symptoms: Yup.string().min(3).required("Required"),
  address: Yup.string().min(3).required("Required"),
  maritialStatus: Yup.string().min(3).required("Required"),
});

export const Patient = () => {
  const { params } = useRouteMatch();
  const [patient, setPatient] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    emailId: "",
    bloodGroup: "",
    mobileNo: "",
    gender: "Male",
    dob: "",
    age: "",
    // clinic: "",
    // joiningDate: "2021-06-18",
    allergies: "",
    city: "",
    symptoms: "",
    address: "",
    maritialStatus: "Unmarried",
  });
  const history = useHistory();
  function navigate() {
    history.push("/patient-list");
  }
  const savePatient = (values) => {
    values.role = "ROLE_PATIENT";
    axios
      .post("/api/v1/user", { ...values })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate();
      })
      .catch((reponse) => {
        alert("Username already exists.");
        console.log(reponse);
      });
  };
  const initialLoad = () => {
    const param = params;
    if (param.id) {
      axios
        .get("/api/v1/user/" + param.id)
        .then((response) => {
          setPatient({ ...response.data });
        })
        .catch((reponse) => {
          console.log(reponse);
        });
    }
  };
  useEffect(() => {
    initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialValues = { ...patient };
  if (initialValues.dob) {
    initialValues.dob = initialValues.dob.substring(0, 10);
  }
  // if (initialValues.joiningDate) {
  //   initialValues.joiningDate = initialValues.joiningDate.substring(0, 10);
  // }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={savePatient}
      enableReinitialize
      initialValues={initialValues}
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
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Row>
              <h3>Add new Patient</h3>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
                {errors.firstName}
              </Form.Group>

              <Form.Group as={Col} xs="6" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />

                {errors.lastName}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik03">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                />

                {errors.username}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik04">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                />

                {errors.password}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik05">
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="emailId"
                  value={values.emailId}
                  onChange={handleChange}
                  isValid={touched.emailId && !errors.emailId}
                />

                {errors.emailId}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik06">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="bloodGroup"
                  value={values.bloodGroup}
                  onChange={handleChange}
                  isValid={touched.bloodGroup && !errors.bloodGroup}
                />

                {errors.bloodGroup}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik07">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  name="mobileNo"
                  value={values.mobileNo}
                  onChange={handleChange}
                  isValid={touched.mobileNo && !errors.mobileNo}
                />

                {errors.mobileNo}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik08">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  isValid={touched.gender && !errors.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
                {errors.gender}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik09">
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="dob"
                  value={values.dob}
                  onChange={handleChange}
                  isValid={touched.dob && !errors.dob}
                />
                {errors.dob}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik10">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  isValid={touched.age && !errors.age}
                />

                {errors.age}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              {/*   <Form.Group as={Col} xs="6" controlId="validationFormik11">
              <Form.Label>Clinic</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="clinic"
                value={values.clinic}
                onChange={handleChange}
                isValid={touched.clinic && !errors.clinic}
              />

              {errors.clinic}
            </Form.Group> */}
              {/* <Form.Group as={Col} xs="6" controlId="validationFormik12">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                name="joiningDate"
                value={values.joiningDate}
                onChange={handleChange}
                isValid={touched.joiningDate && !errors.joiningDate}
              />

              {errors.joiningDate}
            </Form.Group> */}
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik13">
                <Form.Label>Allergies</Form.Label>
                <Form.Control
                  as="textarea"
                  size="sm"
                  type="text"
                  name="allergies"
                  value={values.allergies}
                  onChange={handleChange}
                  isValid={touched.allergies && !errors.allergies}
                />
                {errors.allergies}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik14">
                <Form.Label>City</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isValid={touched.city && !errors.city}
                />

                {errors.city}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik15">
                <Form.Label>Symptoms</Form.Label>
                <Form.Control
                  as="textarea"
                  size="sm"
                  type="text"
                  name="symptoms"
                  value={values.symptoms}
                  onChange={handleChange}
                  isValid={touched.symptoms && !errors.symptoms}
                />
                {errors.symptoms}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik16">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  size="sm"
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isValid={touched.address && !errors.address}
                />

                {errors.address}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik17">
                <Form.Label>Maritial Status</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  name="maritialStatus"
                  value={values.maritialStatus}
                  onChange={handleChange}
                  isValid={touched.maritialStatus && !errors.maritialStatus}
                >
                  <option value="Unmarried">Unmarried</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widow">Widow</option>
                </Form.Control>
                {errors.gender}
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginBottom: "10px" }} size="sm">
              Submit form
          </Button>
          </Form>
        )}
    </Formik>
  );
};
