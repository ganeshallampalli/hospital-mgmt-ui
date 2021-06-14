import axios from "axios";
import React, {useEffect} from "react";
import {Button, Col, Form, Table} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

const AppointmentList = (props) => {
    const [result, setResult] = React.useState([]);
    const history = useHistory();
    const dateRef = React.createRef();
    const testNameRef = React.createRef();

    const getAppointmentsList = () => {
        let email = JSON.parse(localStorage.getItem("user")).email;
        axios
            .get("/api/v1/booking/all", {params: {email}})
            .then((response) => {
                setResult(response.data);
            })
            .catch((response) => {
                console.log(response);
            });
    };
    useEffect(() => {
        getAppointmentsList(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newAppointment = () => {
        history.push("/new-appointment");
    };
    const editAppointment = (id) => {
        history.push("/edit-appointment/" + id);
    };

    const searchDate = (id) => {
        const date = dateRef.current.value;
        axios
            .get("/api/v1/booking/search/date", {
                params: {date},
            })
            .then((response) => {
                setResult(response.data);
            })
            .catch((response) => {
                console.log(response);
            });
    };

    const searchTest = (id) => {
        const testName = testNameRef.current.value;
        axios
            .get("/api/v1/booking/search/test", {
                params: {testName},
            })
            .then((response) => {
                setResult(response.data);
            })
            .catch((response) => {
                console.log(response);
            });
    };
    let editAllowed = false;

    if (props?.user?.role === "ROLE_ADMIN") {
        editAllowed = true;
    }
    return (
        <div>
            <Form.Row>
                <h3>Appointment List</h3>
            </Form.Row>
            {editAllowed && (
                <Form.Row>
                    <Form.Group as={Col} xs="4" controlId="validationFormik01">
                        <Form.Label>Booking Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            size="sm"
                            ref={dateRef}
                        />
                    </Form.Group>
                    <Col>
                        <Button style={{marginTop: "32px"}} size="sm" onClick={searchDate}>
                            Search
                        </Button>
                    </Col>

                    <Form.Group as={Col} xs="4" controlId="validationFormik02">
                        <Form.Label>Test Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="testName"
                            size="sm"
                            ref={testNameRef}
                        />
                    </Form.Group>
                    <Col>
                        <Button style={{marginTop: "32px"}} size="sm" onClick={searchTest}>
                            Search
                        </Button>
                    </Col>
                </Form.Row>
            )}


            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Customer Name</th>
                    <th>Technician Name</th>
                    <th>Test Type</th>
                    <th>Appointment Date</th>
                    <th>Time</th>
                    <th>Mobile No</th>
                    <th>Address</th>
                    {/*{editAllowed && <th></th>}*/}
                </tr>
                </thead>
                <tbody>
                {result.length == 0 ? (
                    <tr>
                        <td colSpan={10} className="text-center">
                            No Rows Found{" "}
                        </td>
                    </tr>
                ) : null}
                {result.map((row) => {
                    return (
                        <tr key={row.bookingId}>
                            <td>{row.bookingId}</td>
                            <td>{row.customerName}</td>
                            <td>{row.technicianName}</td>
                            <td>{row.type}</td>
                            <td>{row.appointmentDate?.substring(0, 10)}</td>
                            <td>{row.appointmentTime?.substring(0, 5)}</td>
                            <td>{row.mobileNo}</td>
                            <td>{row.address}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user: state.userData.user,
    };
}

export const AppointmentConnectedList = connect(
    mapStateToProps,
    null
)(AppointmentList);
