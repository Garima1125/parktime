import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router';
import $ from 'jquery';

class LoginModal extends Component {

  constructor() {
    super();

    this.state = {
      showModal: false,
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      authenticated: false
    }
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  };

  open() {
    this.setState({ showModal: true });
  };

  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }

  redirectUser(response) {
    $.ajax({
      url: "/users/auth/google/",
      type: "POST",
      data: response.profileObj,
      dataType: 'json',
      ContentType: 'application/json',
      success: (data) => {
          console.log(data);
          this.setState(data);
      },
      error: function(error) {
        console.log(error);
      }.bind(this)

    });
  };

  authenticateUser(e) {
    e.preventDefault();
    $.ajax({
      url: "/users/auth/login/",
      type: "POST",
      data: {email: this.state.email, password: this.state.password},
      dataType: 'json',
      ContentType: 'application/json',
      success: (data) => {
        console.log(data);
        this.setState(data);
      },
      error: function(error) {
        console.log(error);
      }.bind(this)
    });
  };

  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }

    if (this.state.authenticated) {

      return <Redirect to='/profile' />;
    }

    return (
      <div>
        <Button
          bsStyle="default"
          bsSize="xsmall"
          onClick={this.open}
        >
          Get Started
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title>Get Started</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-8 divTag">
                <ul className="nav nav-tabs">
                   <li className="active">
                     <a href="#Login" data-toggle="tab">Login/Register</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="Login">
                  <form role="form" className="form-horizontal" onSubmit={this.authenticateUser}>
                      <div className="form-group">
                        <label htmlFor="email" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={this.state.email} id="email1" placeholder="Email" onChange={this.handleEmailChange} />
                        </div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="exampleInputPassword1" className="col-sm-2 control-label">
                              Password</label>
                          <div className="col-sm-10">
                              <input type="password" className="form-control" value={this.state.password} id="exampleInputPassword1" placeholder="Password" onChange={this.handlePasswordChange}/>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-sm-2">
                          </div>
                          <div className="col-sm-10">
                              <button type="submit" className="btn btn-primary btn-sm">
                                  Continue</button>
                          </div>
                      </div>
                  </form>
                  </div>
                </div>
                <div id="OR" className="hidden-xs">OR
                </div>
              </div>
              <div className="col-lg-4">
                        <div className="row text-center sign-with">
                            <div className="col-md-12">

                                <h3>
                                    Sign in with</h3>
                            </div>
                            <div className="col-md-12">
                                <div className="btn-group btn-group-justified">
                                  <div className="signup">
                                    <GoogleLogin
                                       clientId="829233882608-34kd6bf3m8peptt56jsuqg7kukb86pi8.apps.googleusercontent.com"
                                       buttonText="Login with Google"
                                       onSuccess={this.redirectUser}
                                       onFailure={responseGoogle}
                                       className="btn btn-danger"
                                      />
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
          </Modal.Body>

        </Modal>
      </div>
    );
  }
};

export default LoginModal;
