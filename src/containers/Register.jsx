import React, { Component } from 'react';
import {Grid, Row, Col, PageHeader, Form, FormGroup, FormControl, ControlLabel, ButtonGroup, Button} from 'react-bootstrap';

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
                    <Col md={12}>
                        <PageHeader>
                            Register &nbsp;
                            <small>text here</small>
                        </PageHeader>
                    </Col>
                </Row>
                <br />
                <Row className="show-grid">
                    <Col md={6}>

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
                                <Button type="submit">
                                    Register
                                </Button>
                            </div>

                        </Form>
                    </Col>
                    <div id="flower">
                    <img width={500} height={600} alt="900x500" src='/static/assets/flower.jpg' />
                    </div>
                </Row>
            </Grid>
        );
    }
}

export default Register;
