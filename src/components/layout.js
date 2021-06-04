import React from "react";
import { Navbar } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { MDBContainer, MDBFooter } from "mdbreact";

const layout = (props) => {
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg" sticky="top">
        <LinkContainer to="/">
          <Navbar.Brand>Result Finder</Navbar.Brand>
        </LinkContainer>
      </Navbar>

      {props.children}

      <MDBFooter color="blue" className="font-small pt-4 mt-4 fixed-bottom">
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="shivambhardwaj0129@gmail.com"> Shivam Bhardwaj </a>
          </MDBContainer>
        </div>
      </MDBFooter>
    </React.Fragment>
  );
};

export default layout;
