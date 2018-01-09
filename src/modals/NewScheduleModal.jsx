// Jessica
// Modal for Registering a new Schedule for a specific job
import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import Datetime from 'react-datetime';
import Moment from 'moment';

class NewScheduleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    // change = (e) => {
    //   console.log(e._d);
    //   console.log(Moment(e._d).format('YYYY-MM-DD HH:mm:ss'));//20 Mart 2017)
    //     this.setState({[e.target.id]: e.target.value});
    //
    // }

    handleStartTimeChange = (event) => {
      this.setState({schedule_start_time: Moment(event._d).format('YYYY-MM-DD HH:mm:ss')});
    }

    handleEndTimeChange = (event) => {
      this.setState({schedule_end_time: Moment(event._d).format('YYYY-MM-DD HH:mm:ss')});
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
            body: JSON.stringify(data),
            credentials: "same-origin"
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
                    <i className="fa fa-plus fa-fw" aria-hidden="true"></i>
                    &nbsp;
                    Add Schedule
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
                                    Start Time  <span className="glyphicon glyphicon-calendar"></span>
                                </Col>
                                <Col sm={10}>
                                <Datetime
                                onChange={this.handleStartTimeChange}
                                inputProps={{placeholder: "start_time"}}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="schedule_end_time">
                                <Col componentClass={ControlLabel} sm={2}>
                                    End Time  <span className="glyphicon glyphicon-calendar"></span>
                                </Col>
                                <Col sm={10}>
                                    <Datetime
                                    onChange={this.handleEndTimeChange}
                                    inputProps={{placeholder: "end_time"}} />
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

export default NewScheduleModal;
