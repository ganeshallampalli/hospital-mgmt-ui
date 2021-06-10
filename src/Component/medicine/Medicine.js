import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
const schema = Yup.object().shape({
  patientName: Yup.string().min(3).required("Required"),
  medicineName: Yup.string().min(3).required("Required"),
  quantity: Yup.number().min(1).required("Required"),
  price: Yup.number().min(1).required("Required"),
});

export const Medicine = () => {
  const { params } = useRouteMatch();
  const [medicine, setMedicine] = React.useState({
    patientName: "",
    medicineName: "",
    quantity: 1,
    price: 1

  });
  const history = useHistory();
  function navigate() {
    history.push("/medicine-list");
  }
  const saveMedicine = (values) => {
    values.role = "ROLE_DOCTOR";
    axios
      .post("/api/v1/medicine", { ...values })
      .then((response) => {
        localStorage.setItem("medicine", JSON.stringify(response.data));
        navigate();
      })
      .catch((response) => {
        alert("Medicine already exists.");
        console.log(response);
      });
  };
  const initialLoad = () => {
    const param = params;
    if (param.id) {
      axios
        .get("/api/v1/medicine/" + param.id)
        .then((response) => {
          setMedicine({ ...response.data });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  useEffect(() => {
    initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialValues = { ...medicine };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={saveMedicine}
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
              <h3>Add new Medicine</h3>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik01">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="patientName"
                  value={values.patientName}
                  onChange={handleChange}
                  isValid={touched.patientName && !errors.patientName}
                />
                {errors.patientName}
              </Form.Group>

              <Form.Group as={Col} xs="6" controlId="validationFormik02">
                <Form.Label>Medicine Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="medicineName"
                  value={values.medicineName}
                  onChange={handleChange}
                  isValid={touched.medicineName && !errors.medicineName}
                />

                {errors.medicineName}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik07">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  isValid={touched.quantity && !errors.quantity}
                />
                {errors.quantity}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik07">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    size="sm"
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                />
                {errors.price}
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
