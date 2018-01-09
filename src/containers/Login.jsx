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
            <Grid>
                <Row className="show-grid">
                    <Col md={10}>
                        <PageHeader>
                            Login
                        </PageHeader>
                    </Col>
                </Row>
                <br />
                <Row className="show-grid">
                    <Col md={6} xs={6} lg={6} sm={6} className="divTag">
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
                                <Col componentClass={ControlLabel} sm={2} xs={2} md={2} lg={2}>
                                    Password
                                </Col>
                                <Col sm={10} md={10} xs={10} lg={10}>
                                    <FormControl name="password" type="password" placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <div className="signup">
                                <Button type="submit"><span className="glyphicon glyphicon-user"></span>   Login
                                </Button>
                            </div>
                            <div id="OR" className="hidden-xs">OR
                            </div>
                        </Form>
                    </Col>
                    <Col md={6} xs={6} lg={6} sm={6}>
                    <Row className="text-center sign-with" id="sign-with">
                            <Col md={10}>
                                <h3>Sign in with</h3>
                            </Col>
                            <Col md={10}>
                                <ButtonGroup justified >
                                    <div className="signin">
                                        <Button bsStyle="default" bsSize="small" href='/auth/login' id="loginBtn-google">
                                        <img width={23} height={23} src='/static/assets/googlelogo.png' />    Google
                                        </Button>
                                    </div>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Login;
