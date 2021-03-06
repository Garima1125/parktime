// Jessica
// Modal for deleting a schedule from a job

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteJobModal extends Component {

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
        fetch(`/dogs/${this.props.dogID}/jobs/${this.props.jobID}`, {
            method: 'DELETE',
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
            console.log('error deleting job');
        })
    }

    render() {
        return (
            <div>
                <Button bsSize='small' bsStyle='danger' onClick={this.open} >
                    <span className="glyphicon glyphicon-trash"></span>
                    Remove Job
                    &nbsp;
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this job?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button id="deljob" onClick={this.delete}><span className="glyphicon glyphicon-trash"></span>  Delete JOB</Button>
                        <Button id="canjob" onClick={this.close}><span className="glyphicon glyphicon-remove"></span>  Cancel</Button>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DeleteJobModal;
