import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
const schema = Yup.object().shape({
    name: Yup.string().min(3).required("Required"),
    // username: Yup.string().min(3).required("Required"),
    email: Yup.string().min(3).required("Required"),
    mobileNo: Yup.number().min(10).required("Required"),
});

export const MyProfile = () => {
    const { params } = useRouteMatch();
    const [myProfile, setMyProfile] = React.useState({
        name: "",
        username: "",
        email: "",
        mobileNo: undefined,
    });
    // function navigate() {
    //     history.push("/Daa");
    // }
    const saveMyProfile = (values) => {
        axios
            .post("/api/v1/user", { ...values })
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                alert("Profile Saved!");
            })
            .catch((response) => {
                alert("Error Saving Profile.Username may already Exist");
                console.log(response);
            });
    };
    const initialLoad = () => {
        const param = params;
        if (param.id) {
            axios
                .get("/api/v1/user/" + param.id)
                .then((response) => {
                    setMyProfile({ ...response.data });
                })
                .catch((response) => {
                    console.log(response);
                });
        }
    };
    useEffect(() => {
        initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const initialValues = { ...myProfile };
    if (initialValues.dob) {
        initialValues.dob = initialValues.dob?.substring(
            0,
            10
        );
    }
    return (
        <Formik
            validationSchema={schema}
            onSubmit={saveMyProfile}
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
                            <h3>My Profile</h3>
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
                                <Form.Label>Email</Form.Label>
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
                            <Form.Group as={Col} xs="6" controlId="validationFormik03">
                                <Form.Label>Username</Form.Label>
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
                        <Button type="submit" style={{ marginBottom: "10px" }} size="sm">
                            Submit form
                        </Button>
                    </Form>
                )}
        </Formik>
    );
};
