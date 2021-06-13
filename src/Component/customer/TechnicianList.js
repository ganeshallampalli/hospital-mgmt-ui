import axios from "axios";
import React, {useEffect} from "react";
import {Button, Col, Form, Pagination, Table} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

const TechnicianList = (props) => {
  const [result, setResult] = React.useState({});
  const [pageNo, setPageNo] = React.useState(0);
  const history = useHistory();
  const firstNameRef = React.createRef();
  const emailIdRef = React.createRef();

  const getTechniciansList = (pageNo = 0) => {
    axios
      .get("/api/v1/user/all/technician", { params: { pageNo } })
      .then((response) => {
        setPageNo(pageNo);
        setResult(response.data);
      })
      .catch((reponse) => {
        console.log(reponse);
      });
  };
  useEffect(() => {
    getTechniciansList();
  }, []);
  const deleteTechnician = (id) => {
    axios
      .delete("/api/v1/user/" + id)
      .then((response) => {
        getTechniciansList();
      })
      .catch((response) => {
        console.log(response);
      });
  };
  // const newTechnician = () => {
  //   history.push("/new-technician");
  // };
  // const editTechnician = (id) => {
  //   history.push("/edit-technician/" + id);
  // };
  const nextClick = (id) => {
    getTechniciansList(pageNo + 1);
  };
  const previousClick = (id) => {
    getTechniciansList(pageNo - 1);
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
      props?.user?.role === "ROLE_ADMIN"
  ) {
    editAllowed = true;
  }
  return (
    <div>
      <Form.Row>
        <h3>Technician List</h3>
      </Form.Row>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email Id</th>
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
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
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
export const TechnicianConnectedList = connect(mapStateToProps, null)(TechnicianList);
