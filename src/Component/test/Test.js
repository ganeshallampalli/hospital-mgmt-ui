import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
const schema = Yup.object().shape({
  name: Yup.string().min(3).required("Required"),
  price: Yup.number().min(1).required("Required"),
});

export const Test = () => {
  const { params } = useRouteMatch();
  const [test, setTest] = React.useState({
    name: "",
    price: 1

  });
  const history = useHistory();
  function navigate() {
    history.push("/test-list");
  }
  const saveTest = (values) => {
    values.role = "ROLE_ADMIN";
    axios
      .post("/api/v1/test", { ...values })
      .then((response) => {
        localStorage.setItem("test", JSON.stringify(response.data));
        navigate();
      })
      .catch((response) => {
        alert("Test already exists.");
        console.log(response);
      });
  };
  const initialLoad = () => {
    const param = params;
    if (param.id) {
      axios
        .get("/api/v1/test/" + param.id)
        .then((response) => {
          setTest({ ...response.data });
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };
  useEffect(() => {
    initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialValues = { ...test };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={saveTest}
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
              <h3>Add new Test</h3>
            </Form.Row>
            <Form.Row>

              <Form.Group as={Col} xs="6" controlId="validationFormik02">
                <Form.Label>Test Name</Form.Label>
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
            <Form.Row>

            </Form.Row>

            <Button type="submit"  style={{ marginBottom: "10px" }} size="sm">
              Submit form
          </Button>
          </Form>
        )}
    </Formik>
  );
};
