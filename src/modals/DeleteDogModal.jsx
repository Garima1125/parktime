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
            credentials: "same-origin"
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
                    <span className="glyphicon glyphicon-trash"></span>  Remove

                </Button>
                <Modal show={this.state.showModal} onHide={this.close} width = {200}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button id="trash-dog" onClick={this.delete}><span className="glyphicon glyphicon-trash"></span> Delete</Button>
                        <Button id="cancel-del" onClick={this.close}><span className="glyphicon glyphicon-remove"></span> Cancel</Button>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default DeleteDogModal;
