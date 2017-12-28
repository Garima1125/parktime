// Garima
// displays profile for the dog walker
// if logged in as owner, you can Interested in a dog walker -> send a message

// Garima
// Creating Walker's profile
// react-boostrap

import React, {Component} from 'react';
import { Redirect } from 'react-router';


class WalkerProfile extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      user_picture: '',
      user_first_name: '',
      user_last_name: '',
      walker_experience: '',
      walker_description: '',
      user_postal_code: '',
      walker_bank_name: '',
      walker_account_number: '',
      walker_expected_payrate:'',
      user_email: localStorage.getItem("email"),
    }
  }

  handleClick() {
    this.props.history.push('/');
    };




  componentDidMount() {
    var url = '/walkers/profile/view/' + this.state.user_email;
    fetch(url, {
      method: "GET",
    }).then(function(response){
       return response.json();
    }).then(function(data){
       var state = {
         user_picture: data[0].user_picture,
         user_first_name: data[0].user_first_name,
         user_last_name: data[0].user_last_name,
         walker_experience: data[0].walker_experience,
         walker_description: data[0].walker_description,
         user_postal_code: data[0].user_postal_code,
         walker_bank_name: data[0].walker_bank_name,
         walker_account_number: data[0].walker_account_number,
         walker_expected_payrate: data[0].walker_expected_payrate,
       }
       this.setState(state);
       console.log(state);
    }.bind(this)).catch(function(error){
      console.log(error);
    });
  }

    render() {
        return (
          <form className ="walker-details" onSubmit={this.handleSubmit}>
          <h1>Walker's Profile</h1>
              <div className="form-group">
                <img src={this.state.user_picture} id="exampleInputFile" />
              </div>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="input" className="form-control" value={this.state.user_first_name} placeholder="Dave" />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="input" className="form-control" value={this.state.user_last_name} placeholder="Smith" />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input type="textarea" value={this.state.walker_experience} className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input type="textarea" value={this.state.walker_description} className="form-control"/>
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Postal Code</label>
                <input type="input" className="form-control" value={this.state.user_postal_code} id="postal" />
              </div>
              <div className="form-group" >
                <label className="mr-sm-2" htmlFor="inlineFormCustomSelect" id="bankname">Bank Name</label>
                <input className="custom-select mb-2 mr-sm-2 mb-sm-0" value={this.state.walker_bank_name} id="choose">
                </input>
              </div>
              <div className="form-group">
                <label htmlFor="example">Bank Account Number</label>
                <input type="input" className="form-control" value={this.state.walker_account_number} id="exampleInputEmail1" placeholder="Account Number" />
              </div>
              <div className="form-group1">
                <label htmlFor="payrate">Expected Pay Rate</label>
                <input type="input" className="form-control" value={this.state.walker_expected_payrate} id="payrate" />
              </div>
              <button type="submit" className="btn btn-primary" id="walker-submit">Edit</button>
              <button className="btn btn-primary" id="backbtn" onClick={this.handleClick}>Back</button>
          </form>

        );
    }
}

export default WalkerProfile;
