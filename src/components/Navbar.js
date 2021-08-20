import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function logout() {
  sessionStorage.removeItem("token");
  window.location.reload(false);
}

function getUser() {
  if (sessionStorage.getItem("token")) {
    return JSON.parse(sessionStorage.getItem("token")).email;
  } else return "utloggad";
}

function navbar() {
  if (sessionStorage.getItem("token")) {
    return (
      <div className="wrapper">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* Href does a hard reload, we don't want that. Check bootstrap for a solution */}
              <Nav.Link href="channels">Channels program</Nav.Link>
              <Nav.Link href="category">Category</Nav.Link>
              <Nav.Link href="favorite">Favorite</Nav.Link>
            </Nav>

            <Navbar.Collapse className="justify-content-end">
              <Nav.Link className="paddingleft" onClick={() => logout()}>
                <b>Log out</b>
              </Nav.Link>
              <Navbar.Text>
                Signed in as: <a href="#login">{getUser()}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div className="wrapper">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="channels">Channels program</Nav.Link>
              <Nav.Link href="category">Category</Nav.Link>
            </Nav>

            <Navbar.Collapse className="justify-content-end">
              <Nav.Link href="login">Login</Nav.Link>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default navbar;
