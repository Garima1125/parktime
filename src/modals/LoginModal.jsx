// Garima

import React, { Component } from 'react';
import { NavItem, Modal, Button, ButtonGroup, Col, Row, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router';
import {withRouter} from "react-router-dom";

class LoginModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      username: '',
      password: ''
    }
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  change = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  redirectLogin = () => {
    this.close();
    this.props.history.push('/login');
  }

  redirectRegister = () => {
    this.close();
    this.props.history.push('/register');
  }

  redirectProfile = () => {
    this.close();
    this.props.history.push('/profile');
  }

  render() {

    return (
      <div>
        <Button bsStyle="default" bsSize="xsmall" onClick={this.open}>
          Get Started
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title>Login/Register</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="show-grid">
              <Col md={8} className="divTag">
              <Form horizontal action='/auth/login' method='POST'>
                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl name="username" type="string" placeholder="Email"
                            value={this.state.username}
                            onChange={this.change}
                        />
                    </Col>
                </FormGroup>
                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={10}>
                        <FormControl name="password" type="password" placeholder="Password"
                            value={this.state.password}
                            onChange={this.change}
                        />
                    </Col>
                </FormGroup>
                <div className="signup">
                  <Button type='submit'>
                        Login
                  </Button>
                </div>
                </Form>
              </Col>
              <Col md={4}>
                <Row className="text-center sign-with">
                  <Col md={12}>
                    <h3>Sign in with</h3>
                  </Col>
                  <Col md={12}>
                    <ButtonGroup justified>
                      <div className="signup">
                        <Button bsStyle="default" bsSize="xsmall" href='/auth/login'>
                          Google
                        </Button>
                      </div>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button onClick={this.redirectRegister}>Redirect to Register</Button>
            <Button onClick={this.redirectLogin}>Redirect to Login</Button>
            <Button onClick={this.redirectProfile}>Redirect to Profile</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
};

export default withRouter(LoginModal);
