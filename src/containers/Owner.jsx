// Garima
// creates onwer's profile
// react-boostrap



import React, {Component} from 'react';
import { Redirect } from 'react-router';

class Owner extends Component {

  constructor() {
    super();

    this.state = {
      user_picture: '',
      user_first_name: '',
      user_last_name: '',
      user_address: '',
      user_unit_number: '',
      user_postal_code: '',
      user_city: '',
      user_province: '',
      user_country: '',
      user_phone: '',
      user_email: localStorage.getItem("email"),
      ownerCreated: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleUnitNumberChange = this.handleUnitNumberChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
}

handlePictureChange(event) {
  this.setState({user_picture: event.target.value})
}

handleFirstNameChange(event) {
  this.setState({user_first_name: event.target.value})
}

handleLastNameChange(event) {
  this.setState({user_last_name: event.target.value})
}
handleAddressChange(event) {
  this.setState({user_address: event.target.value})
}
handleUnitNumberChange(event) {
  this.setState({user_unit_number: event.target.value})
}
handlePostalCodeChange(event) {
  this.setState({user_postal_code: event.target.value})
}

handleCityChange(event) {
  this.setState({user_city: event.target.value})
}
handleProvinceChange(event) {
  this.setState({user_province: event.target.value})
}

handleCountryChange(event) {
  this.setState({user_country: event.target.value})
}
handlePhoneChange(event) {
  this.setState({user_phone: event.target.value})
}

handleClick() {
  this.props.history.push('/profile');
  };

  handleSubmit(e) {
    e.preventDefault();
    fetch('/users/profile/createowner', {
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
      if(this.state.ownerCreated){
      return <Redirect to='/dogs' />;
      }
        return (
          <form className ="owner-details" onSubmit={this.handleSubmit}>
          <h1>Pet Owner's details</h1>
              <div className="form-group">
                <label htmlFor="profile-pic">Upload your photo</label>
                <input type="file" value={this.state.user_picture} onChange={this.handlePictureChange} id="exampleInputFile"/>
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
                <label htmlFor="Address">Address</label>
                <input type="textarea" value={this.state.user_address} onChange={this.handleAddressChange}className="form-control"/>
              </div>
              <div className="smallbox">
              <div className="form-group1">
                <label htmlFor="postal-code">Postal Code</label>
                <input type="input" className="form-control"  value={this.state.user_postal_code} onChange={this.handlePostalCodeChange}id="postal" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Unit Number</label>
                <input type="input" className="form-control" id="unit" value={this.state.user_unit_number} onChange={this.handleUnitNumberChange}placeholder="Unit No:" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Province</label>
                <input type="input" className="form-control" id= "pro" value={this.state.user_province} onChange={this.handleProvinceChange} placeholder="Province" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">County</label>
                <input type="input" id= "con" value={this.state.user_country} onChange={this.handleCountryChange} className="form-control"/>
              </div>
              <div className="form-group1">
                <label htmlFor="phone">Contact Number:</label>
                <input type="input" className="form-control" value={this.state.user_phone} onChange={this.handlePhoneChange} id ="contact" />
              </div>
              </div>
              <br /><br />
              <div className="form-group">
              <button type="submit" className="btn btn-primary" id="owner-submit">Submit</button>
              <button className="btn btn-primary" id="back" onClick={this.handleClick}>Back</button>
              </div>
          </form>

        );
    }
}

export default Owner;
