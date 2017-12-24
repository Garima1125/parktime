// Garima
// 
import React, {Component} from 'react';
import $ from 'jquery';
class Owner extends Component {
    render() {
        return (
          <form className ="owner-details">
          <h1>Pet Owner details</h1>
              <div className="form-group">
                <label htmlFor="profile-pic">Upload your photo</label>
                <input type="file" value={this.state.picture} id="exampleInputFile"/>
              </div>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="input" className="form-control" value={this.state.first_name} placeholder="Dave" />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="input" className="form-control" value={this.state.last_name} placeholder="Smith" />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input type="textarea" value={this.state.experience} className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="input" className="form-control" value={this.state.address} placeholder="Address" />
              </div>
              <div className="smallbox">
              <div className="form-group1">
                <label htmlFor="postal-code">Postal Code</label>
                <input type="input" className="form-control"  value={this.state.postal_code} id="postal" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Unit Number</label>
                <input type="input" className="form-control" id="unit" value={this.state.unit_number} placeholder="Unit No:" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Province</label>
                <input type="input" className="form-control" id= "pro" value={this.state.province} placeholder="Province" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">County</label>
                <input type="input" id= "con" value={this.state.country} className="form-control"/>
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Contact Number:</label>
                <input type="input" className="form-control" value={this.state.contact_number} id ="contact" />
              </div>
              </div>
              <button className="btn btn-primary">Submit</button>
          </form>

        );
    }
}

export default Owner;
