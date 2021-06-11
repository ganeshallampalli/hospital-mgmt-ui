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
  let showDoctor = false;
  let showTest = false;
  let showReception = false;
  let showPatient = false;
  let showAppointment = false;
  let showHelp = false;
  let showAddDoctor = false;
  let showAddTest = false;
  let showAddReception = false;
  let showAddPatient = false;
  let showAddAppointment = false;
  let showAddHelp = false;
  let showListDoctor = false;
  let showListTest = false;
  let showListReception = false;
  let showListPatient = false;
  let showListAppointment = false;
  let showListHelp = false;

  if (props?.user?.role === "ROLE_ADMIN") {
    showDoctor = true;
    showTest = true;
    showReception = true;
    showPatient = true;
    showAppointment = true;
    showHelp = true;
    showAddDoctor = true;
    showAddTest = true;
    showAddReception = true;
    showAddPatient = true;
    showAddAppointment = true;
    showAddHelp = false;
    showListDoctor = true;
    showListTest = true;
    showListReception = true;
    showListPatient = true;
    showListAppointment = true;
    showListHelp = true;
  } else if (props?.user?.role === "ROLE_DOCTOR") {
    showDoctor = false;
    showTest = true;
    showReception = false;
    showPatient = true;
    showAppointment = true;
    showHelp = true;
    showAddDoctor = false;
    showAddTest = true;
    showAddReception = false;
    showAddPatient = false;
    showAddAppointment = false;
    showAddHelp = true;
    showListDoctor = false;
    showListTest = true;
    showListReception = false;
    showListPatient = true;
    showListAppointment = true;
    showListHelp = false;
  } else if (props?.user?.role === "ROLE_PATIENT") {
    showDoctor = false;
    showTest = true;
    showReception = false;
    showPatient = false;
    showAppointment = true;
    showHelp = true;
    showAddDoctor = false;
    showAddTest = false;
    showAddReception = false;
    showAddPatient = false;
    showAddAppointment = false;
    showAddHelp = true;
    showListDoctor = false;
    showListTest = true;
    showListReception = false;
    showListPatient = false;
    showListAppointment = true;
    showListHelp = false;
  } else if (props?.user?.role === "ROLE_RECEPTION") {
    showDoctor = true;
    showTest = true;
    showReception = false;
    showPatient = true;
    showAppointment = true;
    showHelp = true;
    showAddDoctor = false;
    showAddTest = true;
    showAddReception = false;
    showAddPatient = true;
    showAddAppointment = true;
    showAddHelp = true
    showListDoctor = true;
    showListTest = true;
    showListReception = false;
    showListPatient = true;
    showListAppointment = true;
    showListHelp = false;
  }

  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="#/dashboard">Hospital Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="#/dashboard">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {props.user && (
        <Navbar.Collapse className="justify-content-end">
          {showDoctor && (
            <NavDropdown title="Doctor" id="basic-nav-dropdown">
              {showAddDoctor && (
                <NavDropdown.Item href="#/new-doctor">
                  Add Doctor
                </NavDropdown.Item>
              )}
              {showListDoctor && (
                <NavDropdown.Item href="#/doctor-list">
                  Doctor List
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
          {showReception && (
            <NavDropdown title="Receptionist" id="basic-nav-dropdown" >
              {showAddReception && (
                <NavDropdown.Item href="#/new-reception">
                  Add Receptionist
                </NavDropdown.Item>
              )}
              {showListReception && (
                <NavDropdown.Item href="#/reception-list">
                  Receptionist List
                </NavDropdown.Item>
              )}
            </NavDropdown>
          )}
          {showPatient && (
            <NavDropdown title="Patient" id="basic-nav-dropdown">
              {showAddPatient && (
                <NavDropdown.Item href="#/new-patient">
                  Add Patient
                </NavDropdown.Item>
              )}
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
          {showHelp && (
              <NavDropdown title="Help" id="basic-nav-dropdown">
                {showAddHelp && (
                    <NavDropdown.Item href="#/new-help">
                      Add Help
                    </NavDropdown.Item>
                )}
                {showListHelp && (
                    <NavDropdown.Item href="#/help-list">
                      Help List
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
