import React, {Component} from 'react';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import Rating from 'react-rating';

class NewReviewModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            review_comment: '',
            rating: 0
        }
    }

    componentDidMount() {
      console.log(this.props);
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

    handleRatingChange = (e) => {
      this.setState({rating: e});
    }

    register = (e) => {
      e.preventDefault();
      let review = {
        rating: this.state.rating,
        review_comment: this.state.review_comment,
        reviewer_id: this.props.user.user_id,
        reviewee_id: this.props.job.walker_id
      }
      console.log(review);
      fetch('/reviews/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        this.close();
      }).catch((error) => {
        console.log(error);
      });

    }

    render() {
        return (
            <div>
            <Button bsStyle="default" bsSize="small" onClick={this.open}>
              <span className="glyphicon glyphicon-hand-right"></span>
              Review Walker
            </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Review Walker: {this.props.job.walker_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                        <FormGroup controlId="rating">
                          <Col componentClass={ControlLabel} sm={2}>
                            Rating
                          </Col>
                          <Col sm={8}>
                            <Rating
                               initialRating={this.state.rating}
                               onChange={this.handleRatingChange}
                            />
                          </Col>
                        </FormGroup>
                            <FormGroup controlId="review_comment">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Comments
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text"
                                        value={this.state.review_comment}
                                        onChange={this.change}
                                    />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.register}>Submit</Button>
                        <Button onClick={this.close}>Exit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NewReviewModal;
