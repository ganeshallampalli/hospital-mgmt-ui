import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { SET_USER_DATA } from "./redux/actionTypes";
const NavbarComponent = (props) => {
  const history = useHistory();
  console.log(props.user);
  console.log("NavbarComponent");
  const signout = () => {
    props.actions.unsetUser({ user: {} });
    history.push("/login");
  };
  let showEquipment = false;
  let showTest = false;
  let showPatient = false;
  let showAppointment = false;
  let showAddEquipment = false;
  let showAddTest = false;
  let showAddAppointment = false;
  let showListEquipment = false;
  let showListTest = false;
  let showListPatient = false;
  let showListAppointment = false;

  if (props?.user?.role === "ROLE_ADMIN") {
    showEquipment = true;
    showTest = true;
    showPatient = true;
    showAppointment = true;
    showAddEquipment = true;
    showAddTest = true;
    showAddAppointment = false;
    showListEquipment = true;
    showListTest = true;
    showListPatient = true;
    showListAppointment = true;
  } else if (props?.user?.role === "ROLE_TECHNICIAN") {
    showEquipment = false;
    showTest = true;
    showPatient = true;
    showAppointment = true;
    showAddEquipment = false;
    showAddTest = true;
    showAddAppointment = false;
    showListEquipment = false;
    showListTest = true;
    showListPatient = true;
    showListAppointment = true;
  } else if (props?.user?.role === "ROLE_CUSTOMER") {
    showEquipment = false;
    showTest = true;
    showPatient = false;
    showAppointment = true;
    showAddEquipment = false;
    showAddTest = false;
    showAddAppointment = true;
    showListEquipment = false;
    showListTest = true;
    showListPatient = false;
    showListAppointment = true;
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#/dashboard">Hospital Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="#/dashboard">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {props.user && (
        <Navbar.Collapse className="justify-content-end">
          {showEquipment && (
            <NavDropdown title="Equipment" id="basic-nav-dropdown">
              {showAddEquipment && (
                <NavDropdown.Item href="#/new-equipment">
                  Add Equipment
                </NavDropdown.Item>
              )}
              {showListEquipment && (
                <NavDropdown.Item href="#/equipment-list">
                  Equipment List
                </NavDropdown.Item>
              )}
            </NavDropdown>
          )}
          {showTest && (
              <NavDropdown title="Test" id="basic-nav-dropdown">
                {showAddTest && (
                    <NavDropdown.Item href="#/new-test">
                      Add Test
                    </NavDropdown.Item>
                )}
                {showListTest && (
                    <NavDropdown.Item href="#/test-list">
                      Test List
                    </NavDropdown.Item>
                )}
              </NavDropdown>
          )}
          {showPatient && (
            <NavDropdown title="Patient" id="basic-nav-dropdown">
              {showListPatient && (
                <NavDropdown.Item href="#/patient-list">
                  Patient List
                </NavDropdown.Item>
              )}
            </NavDropdown>
          )}
          {showAppointment && (
            <NavDropdown title="Appointment" id="basic-nav-dropdown">
              {showAddAppointment && (
                <NavDropdown.Item href="#/new-appointment">
                  Add Appointment
                </NavDropdown.Item>
              )}
              {showListAppointment && (
                <NavDropdown.Item href="#/appointment-list">
                  Appointment List
                </NavDropdown.Item>
              )}
            </NavDropdown>
          )}
          <NavDropdown title="Profile" id="basic-nav-dropdown" drop={'left'}>
            <NavDropdown.Item href={"#/my-profile/" + props.user?.id}>
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Item href={"#/change-password/" + props.user?.id}>
              Change Password
            </NavDropdown.Item>
            <NavDropdown.Item onClick={signout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};
const actions = {
  unsetUser: (data) => {
    return {
      type: SET_USER_DATA,
      user: null,
    };
  },
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
function mapStateToProps(state) {
  return {
    user: state.userData.user,
  };
}
export const NavbarConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarComponent);
