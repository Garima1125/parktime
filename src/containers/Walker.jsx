// Garima
// Creating Walker's profile
// react-boostrap

import React, {Component} from 'react';
import { Redirect } from 'react-router';


class Walker extends Component {

  constructor() {
    super();

    this.state = {
      user_picture: '',
      user_first_name: '',
      user_last_name: '',
      walker_experience: '',
      walker_description: '',
      walker_expected_payrate:'',
      user_postal_code: '',
      walker_bank_name: '',
      walker_account_number: '',
      user_email: localStorage.getItem("email"),
      profileCreated: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleExperienceChange = this.handleExperienceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePayRateChange = this.handlePayRateChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleBankNameChange = this.handleBankNameChange.bind(this);
    this.handleAccountNumberChange = this.handleAccountNumberChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handlePictureChange(event) {
    this.setState({user_picture: event.target.value})
  }

  handleFirstNameChange(event) {
    this.setState({user_first_name: event.target.value})
  }

  handlePayRateChange(event) {
    this.setState({walker_expected_payrate: event.target.value})
  }

  handleLastNameChange(event) {
    this.setState({user_last_name: event.target.value})
  }
  handleExperienceChange(event) {
    this.setState({walker_experience: event.target.value})
  }
  handleDescriptionChange(event) {
    this.setState({walker_description: event.target.value})
  }
  handlePostalCodeChange(event) {
    this.setState({user_postal_code: event.target.value})
  }

  handleBankNameChange(event) {
    this.setState({walker_bank_name: event.target.value})
  }
  handleAccountNumberChange(event) {
    this.setState({walker_account_number: event.target.value})
  }

  handleClick() {
    this.props.history.push('/profile');
    };

  handleSubmit(e) {
    e.preventDefault();
    fetch('/users/profile/create', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }).then(function(response) {
    return response.json();
    }).then(function(data) {
      this.setState(data);
    }.bind(this)).catch(function(error) {
        console.log(error);
    });
  }

    render() {
      if(this.state.profileCreated){
      return <Redirect to='/' />;
      }
        return (
          <form className ="walker-details" onSubmit={this.handleSubmit}>
          <h1>Walker details</h1>
              <div className="form-group">
                <label htmlFor="profile-pic">Upload your photo</label>
                <input type="file" value={this.state.user_picture} onChange={this.handlePictureChange} id="exampleInputFile" />
              </div>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="input" className="form-control" value={this.state.user_first_name} onChange={this.handleFirstNameChange} placeholder="Dave" />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="input" className="form-control" value={this.state.user_last_name} onChange={this.handleLastNameChange} placeholder="Smith" />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input type="textarea" value={this.state.walker_experience} onChange={this.handleExperienceChange}className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input type="textarea" value={this.state.walker_description} onChange={this.handleDescriptionChange}className="form-control"/>
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Postal Code</label>
                <input type="input" className="form-control" value={this.state.user_postal_code} onChange={this.handlePostalCodeChange}id="postal" />
              </div>
              <div className="form-group" >
                <label className="mr-sm-2" htmlFor="inlineFormCustomSelect" id="bankname">Bank Name</label>
                <select className="custom-select mb-2 mr-sm-2 mb-sm-0" value={this.state.walker_bank_name} onChange={this.handleBankNameChange}id="choose">
                  <option defaultValue>Choose...</option>
                  <option value="TD Canada Trust">TD Canada Trust</option>
                  <option value="CIBC">CIBC</option>
                  <option value="ScotiaBank">ScotiaBank</option>
                  <option value="Bank of Montreal">Bank of Montreal</option>
                  <option value="Citibank Canada">Citibank Canada</option>
                  <option value="RBC Royal Bank">RBC Royal Bank</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="example">Bank Account Number</label>
                <input type="input" className="form-control" value={this.state.walker_account_number} onChange={this.handleAccountNumberChange} id="exampleInputEmail1" placeholder="Account Number" />
              </div>
              <div className="form-group1">
                <label htmlFor="payrate">Expected Pay Rate</label>
                <input type="input" className="form-control" value={this.state.walker_expected_payrate} onChange={this.handlePayRateChange}id="postal" />
              </div>
              <button type="submit" className="btn btn-primary" id="walker-submit">Submit</button>
              <button className="btn btn-primary" id="backbtn" onClick={this.handleClick}>Back</button>
          </form>

        );
    }
}

export default Walker;
