import axios from "axios";
import React, {useEffect} from "react";
import {Button, Col, Form, Pagination, Table} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

const AppointmentList = (props) => {
    const [result, setResult] = React.useState({});
    const [pageNo, setPageNo] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const history = useHistory();
    const dateRef = React.createRef();
    const testNameRef = React.createRef();

    const getUser = () => {
        setEmail(JSON.parse(localStorage.getItem("user")).email);
        getAppointmentsList(); // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const getAppointmentsList = (pageNo = 0) => {
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
        getUser();
    }, []);

    const newAppointment = () => {
        history.push("/new-appointment");
    };
    const editAppointment = (id) => {
        history.push("/edit-appointment/" + id);
    };
    const nextClick = (id) => {
        getAppointmentsList(pageNo + 1);
    };
    const previousClick = (id) => {
        getAppointmentsList(pageNo - 1);
    };
    const search = (id) => {
        const testName = testNameRef.current.value;
        const date = dateRef.current.value;
        axios
            .get("/api/v1/appointment/search", {
                params: {testName, date, pageNo},
            })
            .then((response) => {
                setPageNo(0);
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
                        <Button style={{marginTop: "32px"}} size="sm" onClick={search}>
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
                {result?.content?.length === 0 ? (
                    <tr>
                        <td colSpan={10} className="text-center">
                            No Rows Found{" "}
                        </td>
                    </tr>
                ) : null}
                {result?.content?.map((row) => {
                    return (
                        <tr key={row.bookingId}>
                            <td>{row.bookingId}</td>
                            <td>{row.customerName}</td>
                            <td>{row.technicianName}</td>
                            <td>{row.type}</td>
                            <td>{row.appointmentDate?.substring(0, 10)}</td>
                            <td>{row.time}</td>
                            <td>{row.mobileNo}</td>
                            <td>{row.address}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.Item
                    disabled={result?.first === undefined ? true : result?.first}
                    onClick={previousClick}
                >
                    Previous
                </Pagination.Item>
                <Pagination.Item
                    disabled={result?.last === undefined ? true : result?.last}
                    onClick={nextClick}
                >
                    Next
                </Pagination.Item>
            </Pagination>
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
