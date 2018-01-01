// Jessica
// Modal for deleting a schedule from a job

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteScheduleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
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

    // when delete a schedule
    delete = () => {
        fetch(`/dogs/${this.props.dogID}/jobs/${this.props.jobID}/schedules/${this.props.scheduleID}`, {
            method: 'DELETE'
        }).then(resp => {
            if (resp.status !== 200){
                // TODO: error handling
                return;
            }
            this.close();
            this.props.getDogs();
        }).catch(err => {
            console.log(err);
            console.log('error deleting schedule');
        })
    }
        
    render() {
        return (
            <div>
                <Button bsSize='small' bsStyle='danger' onClick={this.open} >
                    <i className="fa fa-times fa-fw" aria-hidden="true"></i>
                    Remove Schedule
                    &nbsp;
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.delete}>Delete SCHEDULE</Button>
                        <Button onClick={this.close}>Cancel</Button>
                    </Modal.Body>
                    <Modal.Footer>                        
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DeleteScheduleModal;
