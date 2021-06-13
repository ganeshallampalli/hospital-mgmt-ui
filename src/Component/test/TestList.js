import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Form, Pagination, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const TestsList = (props) => {
  const [result, setResult] = React.useState({});
  const [pageNo, setPageNo] = React.useState(0);
  const history = useHistory();
  const nameRef = React.createRef();

  const getTestsList = (pageNo = 0) => {
    axios
      .get("/api/v1/test/all", { params: { pageNo } })
      .then((response) => {
        setPageNo(pageNo);
        setResult(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    getTestsList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteTest = (id) => {
    axios
      .delete("/api/v1/test/" + id)
      .then((response) => {
        getTestsList();
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const newTest = () => {
    history.push("/new-test");
  };
  const editTest = (id) => {
    history.push("/edit-test/" + id);
  };
  const nextClick = (id) => {
    getTestsList(pageNo + 1);
  };
  const previousClick = (id) => {
    getTestsList(pageNo - 1);
  };
  const search = (id) => {
    const testName = nameRef.current.value;
    axios
      .get("/api/v1/test/search", {
        params: { role: "ROLE_TECHNICIAN", testName, pageNo },
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
  if (props?.user?.role === "ROLE_TECHNICIAN") {
    editAllowed = true;
  }
  return (
    <div>
      <Form.Row>
        <h3>Tests</h3>
      </Form.Row>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Test Name</th>
            <th>Price</th>
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
                <td>{row.price}</td>
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
          <Pagination.Item onClick={newTest}>New</Pagination.Item>
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
export const TestConnectedList = connect(mapStateToProps, null)(TestsList);
