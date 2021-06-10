import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Form, Pagination, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const HelpList = (props) => {
  const [result, setResult] = React.useState({});
  const [pageNo, setPageNo] = React.useState(0);
  const history = useHistory();
  // const medicineNameRef = React.createRef();

  const getHelpList = (pageNo = 0) => {
    axios
      .get("/api/v1/help/all", { params: { pageNo } })
      .then((response) => {
        setPageNo(pageNo);
        setResult(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    getHelpList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteHelp = (id) => {
    axios
      .delete("/api/v1/help/" + id)
      .then((response) => {
        alert("Feedback deleted successfully.")
        getHelpList();
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const newHelp = () => {
    history.push("/new-help");
  };
  // const editMedicine = (id) => {
  //   history.push("/edit-help/" + id);
  // };
  const nextClick = (id) => {
    getHelpList(pageNo + 1);
  };
  const previousClick = (id) => {
    getHelpList(pageNo - 1);
  };

  let editAllowed = false;
  let deleteAllowed = false;
  if (props?.user?.role === "ROLE_ADMIN") {
    deleteAllowed = true;
    editAllowed = false;
  }
  return (
    <div>
      <Form.Row>
        <h3>Help List</h3>
      </Form.Row>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email ID</th>
            <th>Phone No</th>
            <th>Feedback</th>
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
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.feedback}</td>
                {deleteAllowed && (
                  <td>

                    <Button
                      size="sm"
                      className="ml-2"
                      onClick={() => deleteHelp(row.id)}
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
          <Pagination.Item onClick={newHelp}>New</Pagination.Item>
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
export const HelpConnectedList = connect(mapStateToProps, null)(HelpList);
