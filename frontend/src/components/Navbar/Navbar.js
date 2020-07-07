import React from 'react';
import { toArray } from "react-emoji-render";
import {Navbar,Nav} from "react-bootstrap"
// import "./Navbar.css"
class Nvbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('userTokenTime')
    }
  }

  render() {
    const content = toArray(
      "SeMEnD :)"
    );
    return (
      //https://react-bootstrap.github.io/components/navbar/
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">{content}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* {alert("nckd")} */}
            {
              this.state.loggedIn ?
              <React.Fragment>
                <Nav.Link className="nav-item nav-link" href="/" exact>Home</Nav.Link>
                <Nav.Link className="nav-item nav-link" href="/upload">Upload</Nav.Link>
                <Nav.Link className="nav-item nav-link" href="/SignOut">Sign Out</Nav.Link>
              </React.Fragment>
              :
              <React.Fragment>
                <Nav.Link className="nav-item nav-link" href="/signIn">Sign In</Nav.Link>
                <Nav.Link className="nav-item nav-link" href="/signUp">Sign Up</Nav.Link>
              </React.Fragment>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Nvbar;