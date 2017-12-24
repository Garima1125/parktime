import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class NewJobModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            title: '',
            description: '',
            rate: 0.0
        }
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        this.setState({ showModal: true });
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    register = () => {
        let data = {
            title: this.state.title,
            description: this.state.description,
            rate: this.state.rate
        };
        fetch(`/dogs/${this.props.dogID}/job`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(resp => {
            return resp.json()
        }).then(data => {
            console.log(data);
            // TOOD: parse json response
        }).catch(err => {
            console.log(err);
            console.log('error creating new dog');
        });
    }

    render() {
        return (
            <div>
                <Button bsSize="small" onClick={this.open}>
                    <i className="fa fa-plus fa-fw" aria-hidden="true"></i>
                    &nbsp;
                    Post New Walk
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Job for Dog {this.props.dogID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="title">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Title
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Title" 
                                        value={this.state.title}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="age">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Description
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="number" placeholder="Description" 
                                        value={this.state.description}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="rate">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Rate
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Rate" 
                                        value={this.state.rate}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.register}>Register</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NewJobModal;