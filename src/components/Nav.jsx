// login/register
// about us
// find dog walkers
// find jobs

import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, Button, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import GoogleLogin from 'react-google-login';
import LoginModal from '../modals/LoginModal.jsx';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import LogoutModal from '../modals/LogoutModal.jsx';
class Navigation extends Component {
  constructor() {
    super();
    this.state = {
        user: {}
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

  renderOnType = (type, component) => {
    if (!this.state.user) {
        return null;
    }
    if (this.state.user.user_type === type) {
        return component;
    }
    return null;
  }


  render() {
    let authModal = (Object.keys(this.state.user).length !== 0) ? <LogoutModal /> : <LoginModal />;
    let hello = (Object.keys(this.state.user).length !== 0) ? <div><span className="glyphicon glyphicon-user"></span>Hello {this.state.user.user_email}</div> : null;

    let myJobsMenu = this.renderOnType('walker', <LinkContainer to='/myjobs'><NavItem eventKey={3}>My Jobs</NavItem></LinkContainer>);
    let searchJobsMenu = this.renderOnType('walker', <LinkContainer to='/search/jobs'><NavItem eventKey={4}>Search Jobs</NavItem></LinkContainer>);
    let myDogsMenu = this.renderOnType('owner', <LinkContainer to='/dogs'><NavItem eventKey={2}>My Dogs</NavItem></LinkContainer>);
    let myJobsOwnerMenu = this.renderOnType('owner', <LinkContainer to='/myjobsowner'><NavItem eventKey={5}>My Jobs Owner</NavItem></LinkContainer>);
       
    return (
        <Navbar collapseOnSelect className="navbar navbar-inverse">
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">
                    ParkTime</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to='/about'>
                        <NavItem eventKey={1}>About</NavItem>
                    </LinkContainer>
                    {myJobsMenu}
                    {searchJobsMenu}
                    {myDogsMenu}
                    {myJobsOwnerMenu}
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        {authModal}
                    </NavItem>
                    <NavItem eventKey={1}>
                        <NavDropdown eventKey="4" title=  {hello} id="drop">

                        <MenuItem eventKey="4.1"><Link to={'/profile/view'}>My Profile</Link></MenuItem>
                        {myJobsMenu}
                        {searchJobsMenu}
                        {myDogsMenu}
                        {myJobsOwnerMenu}
                      </NavDropdown>
                    </NavItem>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }


}

export default Navigation;
