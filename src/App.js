import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import "./App.css";
import { FooterComponent } from "./Component/footer";
import { NavbarConnectedComponent } from "./Component/NavbarComponent";
import { dashboardRoutes } from "./Component/routes/dashboardRoutes";
export function App() {
  return (
    <>
      <NavbarConnectedComponent></NavbarConnectedComponent>
      <br></br> <br></br>
      <Container style={{ minHeight: "62vh" }}>
        <Row>
          <Col xs={12}>
            <Switch>
              {dashboardRoutes.map((route) => {
                return (
                  <Route path={route.path} key={route.path} exact>
                    {route.component}
                  </Route>
                );
              })}
            </Switch>
          </Col>
        </Row>
      </Container>
      <FooterComponent></FooterComponent>
    </>
  );
}
