// Jessica

import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class NewApplicationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
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

    apply = () => {
            let data = {
                description: this.state.description
            };
            fetch(`/dogs/${this.props.job.dog_id}/jobs/${this.props.job.job_id}/applications/new`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(resp => {
                if (resp.status !== 200) {
                    console.log(resp.status);
                    return;
                }
                resp.json().then(data => {
                    console.log(data);
                    this.close();
                });
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Button bsSize="small" onClick={this.open}>
                    <i className="fa fa-plus fa-fw" aria-hidden="true"></i>
                    &nbsp;
                    Apply
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Apply</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="description">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Description
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="string" placeholder="Description" 
                                        value={this.state.description}                            
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.apply}>Apply</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NewApplicationModal;
