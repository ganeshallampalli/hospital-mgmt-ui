import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
const schema = Yup.object().shape({
  customerName: Yup.string().min(3).required("Required"),
  technicianName: Yup.string().min(3),
  address: Yup.string().min(3).required("Required"),
  mobileNo: Yup.number().min(3).required("Required"),
  type: Yup.string().min(3).required("Required"),
  appointmentDate: Yup.date().required("Required"),
  time: Yup.string().test("not empty", "Required", function (value) {
    return !!value;
  }),
});

export const Appointment = () => {
  const { params } = useRouteMatch();
  const [appointment, setAppointment] = React.useState({
    customerName: "",
    technicianName: "",
    address: "",
    mobileNo: undefined,
    type: "",
    appointmentDate: "",
    time: "",
  });
  const history = useHistory();
  function navigate() {
    history.push("/appointment-list");
  }
  const saveAppointment = (values) => {
    axios
      .post("/api/v1/appointment", { ...values })
      .then((response) => {
        localStorage.setItem("appointment", JSON.stringify(response.data));
        navigate();
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const initialLoad = () => {
    const param = params;
    if (param.id) {
      axios
        .get("/api/v1/appointment/" + param.id)
        .then((response) => {
          setAppointment({ ...response.data });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  useEffect(() => {
    initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialValues = { ...appointment };
  if (initialValues.appointmentDate) {
    initialValues.appointmentDate = initialValues.appointmentDate.substring(
      0,
      10
    );
  }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={saveAppointment}
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
              <h3>Book an Appointment</h3>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik01">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="customerName"
                  value={values.customerName}
                  onChange={handleChange}
                  isValid={touched.customerName && !errors.customerName}
                />
                {errors.customerName}
              </Form.Group>

              <Form.Group as={Col} xs="6" controlId="validationFormik02">
                <Form.Label>Technician Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="technicianName"
                  value={values.technicianName}
                  onChange={handleChange}
                  isValid={touched.technicianName && !errors.technicianName}
                />

                {errors.technicianName}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik03">
                <Form.Label>Test Type</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  isValid={touched.type && !errors.type}
                />

                {errors.type}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik04">
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
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik05">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="appointmentDate"
                  value={values.appointmentDate}
                  onChange={handleChange}
                  isValid={touched.appointmentDate && !errors.appointmentDate}
                />

                {errors.appointmentDate}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik06">
                <Form.Label>Appointment Time</Form.Label>
                <Form.Control
                  size="sm"
                  type="time"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  isValid={touched.time && !errors.time}
                />

                {errors.time}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik08">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  size="sm"
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isValid={touched.address && !errors.address}
                />
                {errors.address}
              </Form.Group>
            </Form.Row>

            <Button type="submit" style={{ marginBottom: "10px" }} size="sm">
              Book Appointment
          </Button>
          </Form>
        )}
    </Formik>
  );
};
