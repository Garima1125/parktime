import React, {Component} from 'react';

class Walker extends Component {
    render() {
        return (
          <form className ="walker-details" id="">
          <h2>Walker details</h2>
              <div className="form-group">
                <label for="experience">Experience</label>
                <input type="textarea" className="form-control"/>
              </div>
              <div className="form-group">
                <label for="desc">Description</label>
                <input type="textarea" className="form-control"/>
              </div>
              <div className="form-group">
                <label className="mr-sm-2" for="inlineFormCustomSelect" id="bankname">Bank Name</label>
                <select className="custom-select mb-2 mr-sm-2 mb-sm-0" id="choose">
                  <option selected>Choose...</option>
                  <option value="1">TD Canada Trust</option>
                  <option value="2">CIBC</option>
                  <option value="3">ScotiaBank</option>
                  <option value="4">Bank of Montreal</option>
                  <option value="5">Citibank Canada</option>
                  <option value="6">RBC Royal Bank</option>
                </select>
              </div>
              <div className="form-group">
                <label for="example">Bank Account Number</label>
                <input type="input" className="form-control" id="exampleInputEmail1" placeholder="Email" />
              </div>
          </form>

        );
    }
}

export default Walker;