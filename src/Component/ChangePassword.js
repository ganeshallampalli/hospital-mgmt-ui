import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
const schema = Yup.object().shape({
    newPassword: Yup.string().min(3).required("Required"),
    confirmPassword: Yup.string().min(3).required("Required"),
    currentPassword: Yup.string().min(3).required("Required"),
});

export const ChangePassword = () => {
    const { params } = useRouteMatch();
    const [myProfile, setMyProfile] = React.useState({
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
    });
    const changePassword = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            alert("New password and Confirm Password dont match")
        } else {
            axios.post("/api/v1/login/change-password", {
                id: params.id,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword
            }).then((response) => {
                alert(response.data);
            }).catch((reponse) => {
                alert("Error Changing password");
                console.log(reponse);
            });
        }

    };
    const initialLoad = () => {
        const param = params;
        if (param.id) {
            axios
                .get("/api/v1/user/" + param.id)
                .then((response) => {
                    setMyProfile({ ...response.data });
                })
                .catch((reponse) => {
                    console.log(reponse);
                });
        }
    };
    useEffect(() => {
        initialLoad(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const initialValues = { ...myProfile };
    return (
        <Formik
            validationSchema={schema}
            onSubmit={changePassword}
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
                            <h3>Change Password</h3>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs="6" controlId="validationFormik01">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="password"
                                    name="currentPassword"
                                    value={values.currentPassword}
                                    onChange={handleChange}
                                    isValid={touched.currentPassword && !errors.currentPassword}
                                />
                                {errors.currentPassword}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs="6" controlId="validationFormik01">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="password"
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    isValid={touched.newPassword && !errors.newPassword}
                                />
                                {errors.newPassword}
                            </Form.Group>
                            <Form.Group as={Col} xs="6" controlId="validationFormik01">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="password"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    isValid={touched.confirmPassword && !errors.confirmPassword}
                                />
                                {errors.confirmPassword}
                            </Form.Group> </Form.Row>
                        <Button type="submit" style={{ marginBottom: "10px" }} size="sm">
                            Submit form
                        </Button>
                    </Form>
                )}
        </Formik>
    );
};
