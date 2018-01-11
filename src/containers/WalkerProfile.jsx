import React, { Component } from 'react';
import {Grid, Row, Col, PageHeader,Image, Form, FormGroup, FormControl, ControlLabel, ButtonGroup, Button} from 'react-bootstrap';
import Moment from 'moment';
import Rating from 'react-rating';

class WalkerProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      picture: '',
      first_name: '',
      last_name: '',
      type: '',
      postal_code: '',
      address: '',
      unit_number: '',
      city: '',
      province: '',
      country: '',
      phone: '',
      description: '',
      reviews: []
    }
  }

  componentDidMount() {
    console.log(this.props.location.state);
    this.setState({ user_id: this.props.location.state.user_id });
    this.setState({ picture: this.props.location.state.user_picture });
    this.setState({ first_name: this.props.location.state.user_first_name });
    this.setState({ last_name: this.props.location.state.user_last_name });
    this.setState({ type: this.props.location.state.user_type });
    this.setState({ postal_code: this.props.location.state.user_postal_code });
    this.setState({ address: this.props.location.state.user_address });
    this.setState({ unit_number: this.props.location.state.user_unit_number });
    this.setState({ city: this.props.location.state.user_city });
    this.setState({ province: this.props.location.state.user_province });
    this.setState({ country: this.props.location.state.user_country });
    this.setState({ phone: this.props.location.state.user_phone });
    this.setState({ description: this.props.location.state.user_description });
    this.getReviews();
  }

  // getProfile = () => {
  //   fetch('/users/profile/view', {
  //     credentials: "same-origin"
  //   }).then(resp => {
  //     if (resp.status !== 200) {
  //       console.log(resp.status);
  //       return;
  //     }
  //     else {
  //       return resp.json();
  //     }
  //   }).then((user) => {
  //       console.log(user);
  //       this.setState({ user_id: user.user_id });
  //       this.setState({ picture: user.user_picture });
  //       this.setState({ first_name: user.user_first_name });
  //       this.setState({ last_name: user.user_last_name });
  //       this.setState({ type: user.user_type });
  //       this.setState({ postal_code: user.user_postal_code });
  //       this.setState({ address: user.user_address });
  //       this.setState({ unit_number: user.user_unit_number });
  //       this.setState({ city: user.user_city });
  //       this.setState({ province: user.user_province });
  //       this.setState({ country: user.user_country });
  //       this.setState({ phone: user.user_phone });
  //       this.setState({ description: user.user_description });
  //       this.getReviews();
  //     }).catch(err => {
  //       console.log(err);
  //     });
  // }

  getReviews = () => {
    var url = '/reviews/' + this.props.location.state.user_id + '/all';
    fetch(url, {
    }).then(resp => {
      if (resp.status !== 200) {
        console.log(resp.status);
        return;
      }
      else {
        return resp.json();
      }
    }).then((reviews) => {
      console.log(reviews);
        this.setState({reviews: reviews});
      }).catch(err => {
        console.log(err);
      });
  }

  // updateProfile = (event) => {
  //   event.preventDefault();
  //   var postal_code = this.state.postal_code;
  //   var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + postal_code.replace(' ', '') + "&key=AIzaSyBqTA4VZJ73mcFVSg8owb7gxsxA_k447Lg"
  //   console.log(url);
  //   fetch(url,{
  //   }).then(response => {
  //     return response.json();
  //   }).then(data => {
  //     console.log(data);
  //     var lat = data.results[0].geometry.location.lat;
  //     var lng = data.results[0].geometry.location.lng;
  //     this.setState({user_latitude: lat, user_longitude: lng})
  //     fetch('/users/update', {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(this.state)
  //     }).then(response => {
  //       return response.json();
  //     }).then(data => {
  //       this.setState(data);
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   }).catch(error => {
  //   console.log(error);
  //   })
  // }

  // change = (e) => {
  //   this.setState({ [e.target.id]: e.target.value });
  // }

  render() {
    return (
      <div>
      <div className = "row" id="walker-profile-list">
      <h1>Your Details</h1>
      <div className="col-sm-4">
      <Image src={this.state.picture} rounded className="imgPreview" />
      </div>
      <div className ="col-sm-8">
      <div className="row">
      <dl className="dl-horizontal" id="profileTable">
      <dt>Name</dt>
      <dd id="walker-name">{this.state.first_name + ' ' + this.state.last_name}</dd>
      <dt>Type</dt>
      <dd>{this.state.type}</dd>
      <dt>Address</dt>
      <dd>{this.state.address} </dd>
      <dt>Unit Number</dt>
      <dd>{this.state.unit_number}</dd>
      <dt>Postal Code</dt>
      <dd>{this.state.postal_code}</dd>
      <dt>City</dt>
      <dd>{this.state.city}</dd>
      <dt>Province</dt>
      <dd>{this.state.province}</dd>
      <dt>Country</dt>
      <dd>{this.state.country}</dd>
      <dt>Contact Number</dt>
      <dd>{this.state.phone}</dd>
      <dt>Description</dt>
      <dd>{this.state.description}</dd>
    </dl>
    </div>
  </div>
</div>
   <div class="panel panel-default" id="review-panel">
     <div class="panel-heading">Your Reviews</div>
       <table class="table">
      <thead>
     <tr>
     <th>Client Name</th>
     <th>Ratings</th>
     <th>Date Reviewed</th>
     <th>Comments</th>
     </tr>
      </thead>
      <tbody>
      {this.state.reviews.map(review =>
     <tr key={review.review_id}>
     <td>{review.user_first_name +' ' + review.user_last_name}</td>
     <td><Rating initialRating = {review.review_rating} readonly={true} /> </td>
     <td>{Moment(review.review_created_at ).format('MMMM Do YYYY, h:mm:ss a')}</td>

     <td>{review.review_comment}</td>

     </tr>
   )}
      </tbody>
      </table>
  </div>
   </div>
    );
  }
}

export default WalkerProfile;
