import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";

import * as Yup from "yup";
const schema = Yup.object().shape({
  equipmentName: Yup.string().min(3).required("Required"),
  image: Yup.string().required("Required")
});

export const Equipment = () => {
  const { params } = useRouteMatch();
  const [equipment, setEquipment] = React.useState({
    equipmentName: "",
    image: ""
  });
  const [file, setFile] = React.useState();
  const history = useHistory();
  function navigate() {
    history.push("/equipment-list");
  }
  const saveEquipment = (values) => {
    values.role = "ROLE_TECHNICIAN";
    values.image = file;
    console.log('image', file);
    axios
      .post("/api/v1/equipment", { ...values })
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
        .get("/api/v1/equipment/" + param.id)
        .then((response) => {
          setEquipment({ ...response.data });
        })
        .catch((reponse) => {
          console.log(reponse);
        });
    }
  };
  useEffect(() => {
    initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialValues = { ...equipment };
  if (initialValues.dob) {
    initialValues.dob = initialValues.dob.substring(0, 10);
  }
  if (initialValues.joiningDate) {
    initialValues.joiningDate = initialValues.joiningDate.substring(0, 10);
  }

  const getBase64 = file => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load something...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log('baseUrl', baseURL);
        setFile(baseURL);
      };
  };

  const handleFileInputChange = e => {
    let file;
    file = e.target.files[0];
    getBase64(file);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={saveEquipment}
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
              <h3>Add new equipment</h3>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik01">
                <Form.Label>Equipment name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="equipmentName"
                  value={values.equipmentName}
                  onChange={handleChange}
                  isValid={touched.equipmentName && !errors.equipmentName}
                />
                {errors.equipmentName}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} xs="6" controlId="validationFormik01">
                <Form.Label>Upload image1</Form.Label>
                <Form.Control
                    size="sm"
                    type="file"
                    name="image"
                    value={values.image}
                    onChange={(e) => {
                      handleChange(e);
                      handleFileInputChange(e);
                    }}
                    isValid={touched.image && !errors.image}
                />
                {errors.image}
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginBottom: "10px" }} size="sm">
              Add Equipment
          </Button>
          </Form>
        )}
    </Formik>
  );
};
