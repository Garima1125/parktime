import React, {Component} from 'react';

class Dog extends Component {
    render() {
        return (
          <form className ="Dog-profile" id="">
          <h2>Create your Paw-mate's profile below:</h2>
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
                <input type="textarea" className="form-control" id="exampleInputEmail1" placeholder="Email" />
              </div>
          </form>

        );
    }
}

export default Dog;