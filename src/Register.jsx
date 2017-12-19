import React, {Component} from 'react';

class Register extends Component {
    render() {
        return (
          <form className ="user-register">
             
              <div className="form-group">
                <label for="first-name">First Name</label>
                <input type="input" className="form-control" placeholder="Dave" />
              </div>
              <div className="form-group">
                <label for="last-name">Last Name</label>
                <input type="input" className="form-control" placeholder="Smith" />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
              </div>
              
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
              </div>
          </form>

        );
    }
}