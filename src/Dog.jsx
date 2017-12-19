import React, {Component} from 'react';

class Dog extends Component {
    render() {
        return (
          <form className ="Dog-profile" id="">
          <h1>Create your Paw-mate's profile below:</h1>
              <div className="form-group">
                <label for="profile-pic">Upload your Paw's picture</label>
                <input type="file" id="exampleInputFile"/>
              </div>
              <div className="form-group">
                <label for="experience">Name</label>
                <input type="textarea" className="form-control"/>
              </div>
              <div className="form-group">
                <label for="desc">Age</label>
                <input type="input" className="form-control"/>
              </div>
              <div className="form-group">
                <label for="desc">Breed</label>
                <input type="input" className="form-control"/>
              </div>
              <div className="form-group">
                <label for="example">Description</label>
                <input type="textarea" className="form-control"/>
              </div>
          </form>

        );
    }
}

export default Dog;