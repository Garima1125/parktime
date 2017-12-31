// Jessica
// Modal for Registering a new Schedule for a specific job
import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class NewScheduleModal extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
            showModal: false,
            schedule_start_time: '',
            schedule_end_time: ''
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
        this.setState({[e.target.id]: e.target.value});
    }

    // when register new schedule
    register = () => {
        let data = {
            schedule_start_time: this.state.schedule_start_time,
            schedule_end_time: this.state.schedule_end_time,
            schedule_job_id: this.props.jobID
        };
        fetch(`/dogs/${this.props.dogID}/jobs/${this.props.jobID}/schedules/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(resp => {
            if (resp.status !== 200){
                // TODO: error handling
                return;
            }
            console.log(JSON.stringify(resp));
            this.close();
            this.props.getDogs();
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
                            <FormGroup controlId="schedule_start_time">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Start Time
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="timestamp" placeholder="start_time"
                                        value={this.state.schedule_start_time}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="schedule_end_time">
                                <Col componentClass={ControlLabel} sm={2}>
                                    End Time
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="timestamp" placeholder="end_time"
                                        value={this.state.schedule_end_time}
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
