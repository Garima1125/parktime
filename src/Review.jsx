
import React, {Component} from 'react';

class Review extends Component {
    render() {
        return (
          <form className ="reviews" id="">
          <h1>Please leave reviews and ratings below:</h1>
                 <div className="form-group">
                <label className="mr-sm-2" for="inlineFormCustomSelect" id="bankname">Ratings</label>
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
                <label for="example">Reviews</label>
                <input type="textarea" className="form-control" id="exampleInputEmail1" placeholder="Email" />
              </div>
          </form>

        );
    }
}

export default Review;