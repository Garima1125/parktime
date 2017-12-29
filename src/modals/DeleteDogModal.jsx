import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class DeleteDogModal extends Component {

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

    delete = () => {
        fetch(`/dogs/${this.props.dogID}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(resp => {
            if (resp.status !== 200){
                // TODO: error handling
                console.log('invalid response');
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
                <Button bsSize='small' bsStyle='danger' onClick={this.open} >
                    <i className="fa fa-times fa-fw" aria-hidden="true"></i>
                    Remove
                    &nbsp;
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.delete}>Delete</Button>
                        <Button onClick={this.close}>Cancel</Button>
                    </Modal.Body>
                    <Modal.Footer>                        
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DeleteDogModal;