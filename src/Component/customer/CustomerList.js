import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Form, Pagination, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const CustomerList = (props) => {
  const [result, setResult] = React.useState({});
  const [pageNo, setPageNo] = React.useState(0);
  const history = useHistory();
  const firstNameRef = React.createRef();
  const emailIdRef = React.createRef();

  const getCustomersList = (pageNo = 0) => {
    axios
      .get("/api/v1/user/all/customer", { params: { pageNo } })
      .then((response) => {
        setPageNo(pageNo);
        setResult(response.data);
      })
      .catch((reponse) => {
        console.log(reponse);
      });
  };
  useEffect(() => {
    getCustomersList();
  }, []);
  const deleteCustomer = (id) => {
    axios
      .delete("/api/v1/user/" + id)
      .then((response) => {
        getCustomersList();
      })
      .catch((reponse) => {
        console.log(reponse);
      });
  };
  const newCustomer = () => {
    history.push("/new-customer");
  };
  const editCustomer = (id) => {
    history.push("/edit-customer/" + id);
  };
  const nextClick = (id) => {
    getCustomersList(pageNo + 1);
  };
  const previousClick = (id) => {
    getCustomersList(pageNo - 1);
  };
  const search = (id) => {
    const emailId = emailIdRef.current.value;
    const firstName = firstNameRef.current.value;
    axios
      .get("/api/v1/user/search", {
        params: { role: "ROLE_CUSTOMER", emailId, firstName, pageNo },
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
        <h3>Customer List</h3>
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
          <Form.Label>Email Id</Form.Label>
          <Form.Control
            type="email"
            name="emailid"
            size="sm"
            ref={emailIdRef}
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
            <th>Username</th>
            <th>Email Id</th>
            <th>Mobile No</th>
            <th>Symptoms</th>
            <th>City</th>
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
                <td>{row.lastName}</td>
                <td>{row.emailId}</td>
                <td>{row.mobileNo}</td>
                <td>{row.symptoms}</td>
                <td>{row.city}</td>
                <td>{row.address}</td>
                {editAllowed && (
                  <td>
                    <Button size="sm" onClick={() => editCustomer(row.id)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="ml-2"
                      onClick={() => deleteCustomer(row.id)}
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
          <Pagination.Item onClick={newCustomer}>New</Pagination.Item>
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
export const CustomerConnectedList = connect(mapStateToProps, null)(CustomerList);
