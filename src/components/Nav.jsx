// login/register
// about us
// find dog walkers
// find jobs

import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import LoginModal from '../modals/LoginModal.jsx';
import { Redirect } from 'react-router';
import LogoutModal from '../modals/LogoutModal.jsx';
class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      email: ''
    }
    this.changeState = this.changeState.bind(this);
  }

  changeState(data) {
    this.setState(data);
  }

  componentDidMount() {
    this.setState({authenticated: localStorage.getItem('authenticated')});
    this.setState({email: localStorage.getItem('email')});
  }

  render() {
    const logOut = () => {
      this.setState({authenticated: false, email: ''})
    }

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
                {this.state.authenticated ?
                <Nav>
                  <NavItem>Hello {this.state.email}</NavItem>
                </Nav> : <Nav></Nav>
                }
                <Nav pullRight>
                    <NavItem eventKey={3}>
                      {
                        this.state.authenticated ? <LogoutModal onChange={this.changeState}/>
                                                 : <LoginModal onChange={this.changeState} />
                      }
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }


}

export default Navigation;
