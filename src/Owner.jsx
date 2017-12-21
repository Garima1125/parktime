import React, {Component} from 'react';

class Owner extends Component {
    render() {
        return (
          <form className ="owner-details">
          <h1>Pet Owner details</h1>
              <div className="form-group">
                <label htmlFor="profile-pic">Upload your photo</label>
                <input type="file" id="exampleInputFile"/>
              </div>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="input" className="form-control" placeholder="Dave" />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="input" className="form-control" placeholder="Smith" />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input type="textarea" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="input" className="form-control" placeholder="Address" />
              </div>
              <div className="smallbox">
              <div className="form-group1">
                <label htmlFor="postal-code">Postal Code</label>
                <input type="input" className="form-control" id="postal" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Unit Number</label>
                <input type="input" className="form-control" id="unit" placeholder="Unit No:" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Province</label>
                <input type="input" className="form-control" id= "pro" placeholder="Province" />
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">County</label>
                <input type="input" id= "con"className="form-control"/>
              </div>
              <div className="form-group1">
                <label htmlFor="postal-code">Contact Number:</label>
                <input type="input" className="form-control" id ="contact" />
              </div>
              </div>
              <button className="btn btn-primary">Submit</button>
          </form>

        );
    }
}

export default Owner;
