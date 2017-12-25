// Garima
// Creating Walker's profile
// react-boostrap

import React, {Component} from 'react';
import $ from 'jquery';


class Walker extends Component {

  constructor() {
    super();

    this.state = {
      picture: '',
      first_name: '',
      last_name: '',
      experience: '',
      description: '',
      postal_code: '',
      bank_name: '',
      account_number: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleExperienceChange = this.handleExperienceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleBankNameChange = this.handleBankNameChange.bind(this);
    this.handleAccountNumberChange = this.handleAccountNumberChange.bind(this);

  }

  handlePictureChange(event) {
    this.setState({picture: event.target.value})
  }

  handleFirstNameChange(event) {
    this.setState({first_name: event.target.value})
  }

  handleLastNameChange(event) {
    this.setState({last_name: event.target.value})
  }
  handleExperienceChange(event) {
    this.setState({experience: event.target.value})
  }
  handleDescriptionChange(event) {
    this.setState({description: event.target.value})
  }
  handlePostalCodeChange(event) {
    this.setState({postal_code: event.target.value})
  }

  handleBankNameChange(event) {
    this.setState({bank_name: event.target.value})
  }
  handleAccountNumberChange(event) {
    this.setState({account_number: event.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/users/profile/create', {
      method: "POST",
      body: this.state
    }).then(function(response) {

    }).catch(function(error) {
        console.log(error);
    });
  }

    render() {
        return (
          <form className ="walker-details" onSubmit={this.handleSubmit}>
          <h1>Walker details</h1>
              <div className="form-group">
                <label htmlFor="profile-pic">Upload your photo</label>
                <input type="file" value={this.state.picture} onChange={this.handlePictureChange} id="exampleInputFile" />
              </div>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="input" className="form-control" value={this.state.first_name} onChange={this.handleFirstNameChange} placeholder="Dave" />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="input" className="form-control" value={this.state.last_name} onChange={this.handleLastNameChange} placeholder="Smith" />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input type="textarea" value={this.state.experience} onChange={this.handleExperienceChange}className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input type="textarea" value={this.state.description} onChange={this.handleDescriptionChange}className="form-control"/>
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Postal Code</label>
                <input type="input" className="form-control" value={this.state.postal_code} onChange={this.handlePostalCodeChange}id="postal" />
              </div>
              <div className="form-group">
                <label className="mr-sm-2" htmlFor="inlineFormCustomSelect" id="bankname">Bank Name</label>
                <select className="custom-select mb-2 mr-sm-2 mb-sm-0" value={this.state.bank_name} onChange={this.handleBankNameChange}id="choose">
                  <option defaultValue>Choose...</option>
                  <option value="1">TD Canada Trust</option>
                  <option value="2">CIBC</option>
                  <option value="3">ScotiaBank</option>
                  <option value="4">Bank of Montreal</option>
                  <option value="5">Citibank Canada</option>
                  <option value="6">RBC Royal Bank</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="example">Bank Account Number</label>
                <input type="input" className="form-control" value={this.state.account_number} onChange={this.handleAccountNumberChange} id="exampleInputEmail1" placeholder="Account Number" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button className="btn btn-primary">Back</button>
          </form>

        );
    }
}

export default Walker;
