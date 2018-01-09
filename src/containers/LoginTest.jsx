import React, { Component } from 'react';
import {Grid, Row, Col, PageHeader, Form, FormGroup, FormControl, ControlLabel, ButtonGroup, Button} from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-xs-8 col-sm-8 col-lg-8">
                <p> Hello </p>
              </div>
              <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4">
                <p>Garima</p>
              </div>
              </div>
            </div>
        );
    }
}

export default Login;
