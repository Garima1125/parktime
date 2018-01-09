import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';

class NewReviewModal extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         showModal: false,
    //         dog_picture:'',
    //         dog_name: '',
    //         dog_age: 0,
    //         dog_breed: '',
    //         dog_description: '',
    //         imgFile:'',
    //         imagePreviewUrl:'',
    //     }
    // }
    //
    // close = () => {
    //     this.setState({ showModal: false });
    // }
    //
    // open = () => {
    //     this.setState({ showModal: true });
    // }
    //
    // change = (e) => {
    //     this.setState({ [e.target.id]: e.target.value });
    // }
    //
    // handlePictureChange = (e) => {
    //   e.preventDefault();
    //
    //     let reader = new FileReader();
    //     let imgFile = e.target.files[0];
    //
    //     reader.onloadend = () => {
    //       this.setState({
    //         imgFile: imgFile,
    //         imagePreviewUrl: reader.result
    //       });
    //     }
    //
    //     reader.readAsDataURL(imgFile)
    // }
    //
    //
    //
    //
    // register = () => {
    //     let data = {
    //         dog_picture: this.state.imagePreviewUrl,
    //         dog_name: this.state.dog_name,
    //         dog_age: this.state.dog_age,
    //         dog_breed: this.state.dog_breed,
    //         dog_description: this.state.dog_description
    //     };
    //     fetch('/dogs/new', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(data),
    //         credentials: "same-origin"
    //     }).then(resp => {
    //         if (resp.status !== 200){
    //             // TODO: error handling
    //             return;
    //         }
    //         console.log(JSON.stringify(resp));
    //         this.close();
    //         this.props.getDogs();
    //     }).catch(err => {
    //         console.log(err);
    //         console.log('error creating new dog');
    //     });
    // }

    render() {
        return (
            <div>
                <Button bsSize="small" onClick={this.open}>
                    <i className="fa fa-plus fa-fw" aria-hidden="true"></i>
                    &nbsp;
                    Review
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please leave ratings and Reviews</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                        <FormGroup controlId="picture">
                          <Col componentClass={ControlLabel} sm={2}>
                            Ratings
                          </Col>
                          <Col sm={8}>
                            <FormControl type="file" placeholder="picture url"
                              onChange={this.handlePictureChange}
                            />
                          </Col>
                        </FormGroup>
                            <FormGroup controlId="dog_description">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Comments
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="My dog is ..."
                                        value={this.state.review_comment}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.register}>Submit</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NewDogModal;
