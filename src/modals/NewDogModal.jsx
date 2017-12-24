import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class NewDogModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            age: 0,
            breed: '',
            description: ''
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
            name: this.state.name,
            age: this.state.age,
            breed: this.state.breed,
            description: this.state.description
        };
        fetch('/dogs', {
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
                    Register Dog
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create your Paw-mate's profile below</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="name">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Name" 
                                        value={this.state.name}                            
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="age">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Age
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="number" placeholder="Age" 
                                        value={this.state.age}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="breed">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Breed
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Puddle" 
                                        value={this.state.breed}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="description">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Description
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="My dog is ..." 
                                        value={this.state.description}
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

export default NewDogModal;
