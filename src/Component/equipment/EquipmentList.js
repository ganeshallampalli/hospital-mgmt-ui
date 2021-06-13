import axios from "axios";
import React, { useEffect } from "react";
import {Button, Card, CardDeck, Col, Form} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const EquipmentList = (props) => {
  const [result, setResult] = React.useState({});
  const [pageNo, setPageNo] = React.useState(0);
  const history = useHistory();
  const [equipments, setEquipments] = React.useState([]);
  const firstNameRef = React.createRef();
  const emailIdRef = React.createRef();

  const getEquipmentsList = (pageNo = 0) => {
    axios
      .get("/api/v1/equipment/all", { params: { pageNo } })
      .then((response) => {
        setPageNo(pageNo);
        setResult(response.data);
        setEquipments(response.data); // TODO: Use this when the API is working
      })
      .catch((response) => {
        console.log(response);
      });
   // let equipments = JSON.parse(localStorage.getItem("equipments")); // TODO: Remove this. Only for my testing
    //setEquipments(equipments); // TODO: Remove this. Only for my testing
  };
  useEffect(() => {
    getEquipmentsList(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteEquipment = (id) => {
    axios
      .delete("/api/v1/equipment/" + id)
      .then((response) => {
        getEquipmentsList();
      })
      .catch((reponse) => {
        console.log(reponse);
      });
  };
  const newEquipment = () => {
    history.push("/new-equipment");
  };
  const editEquipment = (id) => {
    history.push("/edit-equipment/" + id);
  };
  const nextClick = (id) => {
    getEquipmentsList(pageNo + 1);
  };
  const previousClick = (id) => {
    getEquipmentsList(pageNo - 1);
  };
  const search = (id) => {
    const emailId = emailIdRef.current.value;
    const firstName = firstNameRef.current.value;
    axios
      .get("/api/v1/user/search", {
        params: { role: "ROLE_ADMIN", emailId, firstName, pageNo },
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
  if (props?.user?.role === "ROLE_ADMIN") {
    editAllowed = true;
  }
  return (
    <div>
      <Form.Row>
        <h3>Equipment List</h3>
      </Form.Row>
      <CardDeck style={{gap: '20px'}}>
        {equipments.map(equipment => {
          return (<Card style={{height: '350px', minWidth: '300px', maxWidth: "300px"}}>
            <Card.Img style={{height: '300px', width: '300px'}} variant="top" src={equipment.image} />
            <Card.Body>
              <Card.Title>{equipment.name}</Card.Title>
            </Card.Body>
          </Card>);
        })}
      </CardDeck>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userData.user,
  };
}
export const EquipmentConnectedList = connect(mapStateToProps, null)(EquipmentList);
