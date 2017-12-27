// Jessica
// Modal for Registering a new Schedule for a specific job
import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class NewScheduleModal extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
            showModal: false,
            start_time: '',
            end_time: '',
            status: ''
        }
    }

    // when the modal is closed
    close = () => {
        this.setState({ showModal: false});
    }

    // when the modal is opend
    open = () => {
        this.setState({ showModal: true});
    }

    // when the modal is changed
    change = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    // when register new schedule
    register = () => {
        let data = {
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            status: this.state.status
        };
        fetch(`/dogs/${this.props.dogID}/jobs/${this.props.jobID}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(resp => {
            return resp.json()
        }).then(data => {
            console.log(data);
            //TODO: Parse JSON response
        }).catch(err => {
            console.log(err);
            console.log('error creating new schedule');
        })
    }
        
    render() {
        return (
            <div>
                <Button bsSize="small" onClick={this.open}>
                    <i className="fa fa-calender fa-fw" aria-hidden="true"></i>
                    &nbsp;
                    Schedule
                    &nbsp;
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Schedule for Job {this.props.jobID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="start_time">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Start Time
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="start_time"
                                        value={this.state.start_time}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="end_time">
                                <Col componentClass={ControlLabel} sm={2}>
                                    End Time
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="end_time"
                                        value={this.state.end_time}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="status">
                                <Col componentClass={ControlLabel} sm={2}>
                                    End Time
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="status"
                                        value={this.state.end_time}
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

export default NewScheduleModal;

{/* 
<Button bsSize='small'>
<i className="fa fa-calender fa-fw" aria-hidden="true"></i>
&nbsp;
Schedule
</Button>

<NewScheduleModal dogID={dog.dog_id} jobID={dog.jobs.job_id} /> */}