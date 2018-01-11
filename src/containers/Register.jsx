import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Panel, Form, FormGroup, FormControl, ControlLabel, ButtonGroup, Button } from 'react-bootstrap';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={6}>
                        <PageHeader>
                            Register
                        </PageHeader>
                    </Col>
                </Row>
                <br />
                <Row className="show-grid" >
                    <Col md={12} id="reg">
                    <h2 id="goo-reg">Signup withe Google</h2>
                        <ButtonGroup justified>
                            <div className="signin">
                                <Button bsStyle="default" bsSize="small" href='/auth/login' id="regBtn">
                                    <img width={23} height={23} src='/static/assets/googlelogo.png' />    Google
                                </Button>
                            </div>
                        </ButtonGroup>
                    </Col>
                </Row>
                <h6 id="or">OR</h6>
                <Row className="show-grid" >
                    <Col md={6} xs={6} lg={6} sm={6} id="reg">
                        <Panel>
                            <Panel>
                                <Form horizontal action='/users/' method='POST'>
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
                                        <Button type="submit"><span className="glyphicon glyphicon-plus"></span>  Register
                                </Button>
                                    </div>
                                </Form>
                            </Panel>
                        </Panel>

                    </Col>

                    <Col md={6} xs={6} lg={6} sm={6}>
                        <img width={700} height={600} alt="900x500" src='/static/assets/bigstock.jpg' />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Register;
