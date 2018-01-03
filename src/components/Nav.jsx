// login/register
// about us
// find dog walkers
// find jobs

import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import GoogleLogin from 'react-google-login';
import LoginModal from '../modals/LoginModal.jsx';
import { Redirect } from 'react-router';
import LogoutModal from '../modals/LogoutModal.jsx';
class Navigation extends Component {
  constructor() {
    super();
    this.state = {
        user: null
    }
  }

  componentDidMount() {
      this.getUser();
  }

  getUser = () => {
    fetch('/users', {
      credentials: "same-origin"
    }).then(resp => {
      if (resp.status !== 200) {
        console.log(resp.status);
        return;
      }
      resp.json().then(user => {
        this.setState({user: user});
      }).catch(err => {
         // ignore
      });
    }).catch(err => {
      console.log(err);
    });
  }


  render() {

    let authModal = this.state.user ? <LogoutModal /> : <LoginModal />;
    let hello = this.state.user ? <div>Hello {this.state.user.user_email}</div> : null;
    return (
        <Navbar collapseOnSelect className="navbar">
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">ParkTime</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to='/about'>
                        <NavItem eventKey={1}>About</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/dogs'>
                        <NavItem eventKey={2}>My Dogs</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/myjobs'>
                        <NavItem eventKey={3}>My Jobs</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/search/jobs'>
                        <NavItem eventKey={4}>Search Jobs</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        {authModal}
                    </NavItem>
                    <NavItem eventKey={1}>
                        {hello}
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }


}

export default Navigation;
