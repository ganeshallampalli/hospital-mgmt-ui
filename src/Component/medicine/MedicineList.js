import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Form, Pagination, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const MedicineList = (props) => {
  const [result, setResult] = React.useState({});
  const [pageNo, setPageNo] = React.useState(0);
  const history = useHistory();
  const medicineNameRef = React.createRef();

  const getMedicinesList = (pageNo = 0) => {
    axios
      .get("/api/v1/medicine/all", { params: { pageNo } })
      .then((response) => {
        setPageNo(pageNo);
        setResult(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    getMedicinesList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteMedicine = (id) => {
    axios
      .delete("/api/v1/medicine/" + id)
      .then((response) => {
        getMedicinesList();
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const newMedicine = () => {
    history.push("/new-medicine");
  };
  const editMedicine = (id) => {
    history.push("/edit-medicine/" + id);
  };
  const nextClick = (id) => {
    getMedicinesList(pageNo + 1);
  };
  const previousClick = (id) => {
    getMedicinesList(pageNo - 1);
  };
  const search = (id) => {
    const medicineName = medicineNameRef.current.value;
    axios
      .get("/api/v1/medicine/search", {
        params: { role: "ROLE_DOCTOR", medicineName, pageNo },
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
        <h3>Medicine List</h3>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} xs="4" controlId="validationFormik01">
          <Form.Label>Medicine name</Form.Label>
          <Form.Control
            type="text"
            name="medicineName"
            size="sm"
            ref={medicineNameRef}
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
            <th>Patient Name</th>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Price</th>
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
                <td>{row.patientName}</td>
                <td>{row.medicineName}</td>
                <td>{row.quantity}</td>
                <td>{row.price}</td>
                {editAllowed && (
                  <td>
                    <Button size="sm" onClick={() => editMedicine(row.id)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="ml-2"
                      onClick={() => deleteMedicine(row.id)}
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
          <Pagination.Item onClick={newMedicine}>New</Pagination.Item>
        )}{" "}
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
export const MedicineConnectedList = connect(mapStateToProps, null)(MedicineList);
