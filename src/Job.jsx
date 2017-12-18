import React, {Component} from 'react';

class Job extends Component {
    render() {
        return (
          <form className ="job-post" id="">
          <h2>Post a Job</h2>
              <div className="form-group">
                <label for="experience">Job Title</label>
                <input type="textarea" className="form-control"/>
              </div>
              <div className="form-group">
                <label for="desc">Description</label>
                <input type="textarea" className="form-control"/>
              </div>
              <div className="form-group">
                <label for="desc">Pay Rate</label>
                <input type="input" className="form-control"/>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="New" id="exampleRadios1" value="option1" checked/>
                   New - Hiring
                </label>
              </div>
              <div class="form-check">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="offered" id="exampleRadios2" value="option2"/>
                  Offered
                </label>
              </div>
              <div class="form-check disabled">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="accepted" id="exampleRadios3" value="option3" disabled/>
                  Job Completed
                </label>
              </div>
              <div class="form-check disabled">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" name="accepted" id="exampleRadios3" value="option3" disabled/>
                  Accepted- In process
                </label>
              </div>
          </form>

        );
    }
}

export default Job;