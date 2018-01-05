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
                            Login &nbsp;
                            <small>text here</small>
                        </PageHeader>
                    </Col>
                </Row>
                <br />
                <Row className="show-grid">
                    <Col md={4}>
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
                                <Button type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Col>
                    <Col md={8}>
                        <Row className="text-center sign-with">
                            <Col md={10}>
                                <h3>Sign in with</h3>
                            </Col>
                            <Col md={10}>
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
            </Grid>
        );
    }
}

export default Login;
