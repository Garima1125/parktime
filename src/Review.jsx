
import React, {Component} from 'react';

class Review extends Component {
    render() {
        return (
          <form className ="reviews" id="">
          <h2>Please leave reviews and ratings below:</h2>
              <div class="btn-group">
                  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Action
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#"></a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                  </div>
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