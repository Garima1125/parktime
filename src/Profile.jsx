import React, {Component} from 'react';

class profile extends Component {
    render() {
        return (
          <div class="container-fluid">
          <form className ="user-register">
             <h1> Please create your Profile </h1>
              <div className="form-group">
                <label for="profile-pic">Upload your photo</label>
                <input type="file" id="exampleInputFile"/>
              </div>
              <div className="form-group">
                <label for="address">Address</label>
                <input type="input" className="form-control" placeholder="Address" />
              </div>
              <div className="smallbox">
              <div className="form-group1">
                <label for="postal-code">Postal Code</label>
                <input type="input" className="form-control" id="postal" />
              </div>
              <div className="form-group1">
                <label for="postal-code">Unit Number</label>
                <input type="input" className="form-control" id="unit" placeholder="Unit No:" />
              </div>
              <div className="form-group1">
                <label for="postal-code">Province</label>
                <input type="input" className="form-control" id= "pro" placeholder="Province" />
              </div>
              <div className="form-group1">
                <label for="postal-code">County</label>
                <input type="input" id= "con"className="form-control"/>
              </div>
              <div className="form-group1">
                <label for="postal-code">Contact Number:</label>
                <input type="input" className="form-control" id ="contact" />
              </div>
              </div>

              <div className="checkbox">
                <label>
                  <input type="checkbox"/> Remember Me
                </label>
              </div>
              <button type="submit" className="btn btn-primary" id="reg">Register</button>
              <div></div>
              <button type="next" className="btn btn-info" id="next">Next</button>
            </form>
            </div>
        );
    }
}

export default profile;