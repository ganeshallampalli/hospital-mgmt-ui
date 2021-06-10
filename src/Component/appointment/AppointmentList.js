import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Form, Pagination, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const AppointmentList = (props) => {
  const [result, setResult] = React.useState({});
  const [pageNo, setPageNo] = React.useState(0);
  const history = useHistory();
  const firstNameRef = React.createRef();
  const doctorNameRef = React.createRef();

  const getAppointmentsList = (pageNo = 0) => {
    axios
      .get("/api/v1/appointment/all", { params: { pageNo } })
      .then((response) => {
        setPageNo(pageNo);
        setResult(response.data);
      })
      .catch((reponse) => {
        console.log(reponse);
      });
  };
  useEffect(() => {
    getAppointmentsList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteAppointment = (id) => {
    axios
      .delete("/api/v1/appointment/" + id)
      .then((response) => {
        getAppointmentsList();
      })
      .catch((reponse) => {
        console.log(reponse);
      });
  };
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
    const doctorName = doctorNameRef.current.value;
    const firstName = firstNameRef.current.value;
    axios
      .get("/api/v1/appointment/search", {
        params: { doctorName, firstName, pageNo },
      })
      .then((response) => {
        setPageNo(0);
        setResult(response.data);
      })
      .catch((reponse) => {
        console.log(reponse);
      });
  };
  let editAllowed = false;
  if (
    props?.user?.role === "ROLE_ADMIN" ||
    props?.user?.role === "ROLE_RECEPTION"
  ) {
    editAllowed = true;
  }
  return (
    <div>
      <Form.Row>
        <h3>Appointment List</h3>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs="4" controlId="validationFormik01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            size="sm"
            ref={firstNameRef}
          />
        </Form.Group>

        <Form.Group as={Col} xs="4" controlId="validationFormik02">
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control
            type="text"
            name="doctorName"
            size="sm"
            ref={doctorNameRef}
          />
        </Form.Group>
        <Col>
          <Button style={{ marginTop: "32px" }} size="sm" onClick={search}>
            Search
          </Button>
        </Col>
      </Form.Row>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Doctor Name</th>
            <th>Disease</th>
            <th>Time</th>
            <th>Appointment Date</th>
            <th>Mobile No</th>
            <th>Address</th>
            {editAllowed && <th></th>}
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
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.doctorName}</td>
                <td>{row.disease}</td>
                <td>{row.time}</td>
                <td>{row.appointmentDate?.substring(0, 10)}</td>
                <td>{row.mobileNo}</td>
                <td>{row.address}</td>
                {editAllowed && (
                  <td>
                    <Button size="sm" onClick={() => editAppointment(row.id)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="ml-2"
                      onClick={() => deleteAppointment(row.id)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
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
        {editAllowed && (
          <Pagination.Item onClick={newAppointment}>New</Pagination.Item>
        )}
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
