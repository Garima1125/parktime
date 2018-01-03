// Garima

import React, { Component } from 'react';
import { Modal, Button, ButtonGroup, Col, Row, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router';

class LoginModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      username: '',
      password: '',
      page: 0
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

  continue = (e) => {
    // 4 = maximum page + 1
    let nextPage = this.state.page + 1 % 4;
    this.setState({ page: nextPage });
  }

  /***** Beginning of Google Auth *****/

  handleError = (e) => {
    console.log(e);
  }

  redirectUser = (resp) => {
    fetch('/users/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.profileObj)
    }).then(response => {
      return response.json();
    }).then(data => {
      // TODO: check response to see if persisted
      this.setState(data);
    }).catch(err => {
      console.log(err);
    });
  }

  /***** End of Google Auth *****/

  loginComponent = () => {

  }

  selectComponent = () => {

  }

  updateComponent = () => {

  }

  /*
  redirectUser(response) {
    this.state.email = response.profileObj.email;
    fetch("/users/auth/google/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.profileObj)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      this.setState(data);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });

  }

  authenticateUser() {
    fetch("/users/auth/login/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email, password: this.state.password })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      this.setState(data);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  };
  */


  render() {
    /*
    const responseGoogle = (response) => {
      console.log(response);
    }

    if (this.state.authenticated) {
      this.props.onChange({ email: this.state.email, authenticated: this.state.authenticated });
      localStorage.setItem('authenticated', true);
      localStorage.setItem('email', this.state.email);
      localStorage.setItem('userType', this.state.userType)
      if (this.state.userType === 'walker') {
        return <Redirect to='/walker/profile/view' />;
      }
      else {
        return <Redirect to='/profile' />;
      }

    }
    */

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
                <Form horizontal>
                  <FormGroup controlId="email">
                    <Col componentClass={ControlLabel} sm={2}>
                      Email
                    </Col>
                    <Col sm={10}>
                      <FormControl type="string" placeholder="Email"
                        value={this.state.email}
                        onChange={this.change}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2}>
                      Password
                    </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Password"
                        value={this.state.password}
                        onChange={this.change}
                      />
                    </Col>
                  </FormGroup>
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
                        <GoogleLogin
                          clientId="829233882608-34kd6bf3m8peptt56jsuqg7kukb86pi8.apps.googleusercontent.com"
                          buttonText="Login with Google"
                          onSuccess={this.redirectUser}
                          onFailure={this.handleError}
                          className="btn btn-danger"
                        />
                      </div>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.continue}>Continue</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
};

export default LoginModal;
