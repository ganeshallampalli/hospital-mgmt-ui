import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
const schema = Yup.object().shape({
  name: Yup.string().min(3).required("Required"),
  email: Yup.string().min(3).required("Required"),
  phone: Yup.number().min(10).required("Required"),
  feedback: Yup.string().min(3).required("Required"),
});

export const Help = () => {
  const { params } = useRouteMatch();
  const [help, setHelp] = React.useState({
    name: "",
    email: "",
    phone: 1,
    feedback: ""

  });
  const history = useHistory();
  function navigate() {
    history.push("/dashboard");
  }
  const saveHelp = (values) => {
    // values.role = "ROLE_ADMIN";
    axios
      .post("/api/v1/help", { ...values })
      .then((response) => {
        localStorage.setItem("help", JSON.stringify(response.data));
        alert("Feedback saved successfully.")
        navigate();
      })
      .catch((response) => {
        alert("Help exists.");
        console.log(response);
      });
  };
  const initialLoad = () => {
    const param = params;
    if (param.id) {
      axios
        .get("/api/v1/help/" + param.id)
        .then((response) => {
          setHelp({ ...response.data });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  useEffect(() => {
    initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialValues = { ...help };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={saveHelp}
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
              <h3>Add Help</h3>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                />
                {errors.name}
              </Form.Group>

              <Form.Group as={Col} xs="6" controlId="validationFormik02">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                />

                {errors.email}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik07">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isValid={touched.phone && !errors.phone}
                />
                {errors.phone}
              </Form.Group>
              <Form.Group as={Col} xs="6" controlId="validationFormik07">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                    as="textarea"
                    size="sm"
                    type="text"
                    name="feedback"
                    value={values.feedback}
                    onChange={handleChange}
                    isValid={touched.feedback && !errors.feedback}
                />
                {errors.feedback}
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
