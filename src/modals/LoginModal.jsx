// Garima

import React, { Component } from 'react';
import { NavItem, Modal, Button, ButtonGroup, Col, Row, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
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
        <Button bsStyle="default" bsSize="xsmall" onClick={this.open}><span className="glyphicon glyphicon-hand-right"></span>    Get Started
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="small" aria-labelledby="contained-modal-title-lg">

          <Modal.Header closeButton>
            <Modal.Title>Please Login/Register first! </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button onClick={this.redirectRegister}><span className="glyphicon glyphicon-plus"></span>  Register</Button>
            <Button onClick={this.redirectLogin}><span className="glyphicon glyphicon-user"></span>  Login</Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
};

export default withRouter(LoginModal);
