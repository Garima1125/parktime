// Jessica

import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class NewJobModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            job_title: '',
            job_description: '',
            job_rate: 0.0
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
            job_title: this.state.job_title,
            job_description: this.state.job_description,
            job_rate: this.state.job_rate,
            job_dog_id: this.props.dogID

        };
        fetch(`/dogs/${this.props.dogID}/jobs/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: "same-origin"
        }).then(resp => {
            if (resp.status !== 200) {
                // TODO: error handling
                return;
            }
            console.log(JSON.stringify(resp.status));
            this.close();
            this.props.getDogs();
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
                    Create a Job
                    &nbsp;
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Job for Dog {this.props.dogName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="job_title">
                                <Col componentClass={ControlLabel} sm={2}> Title
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="string" placeholder="Title"
                                        value={this.state.job_title}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="job_description">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Details
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Description"
                                        value={this.state.job_description}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="job_rate">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Rate
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="decimal" placeholder="Rate"
                                        value={this.state.job_rate}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.register}><span className="glyphicon glyphicon-ok"></span> Register</Button>
                        <Button onClick={this.close}><span className="glyphicon glyphicon-remove"></span> Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NewJobModal;
