import React, {Component} from 'react';
import Auth from './Auth/Auth.js';

class Signup extends Component {

 authenticate_user(){
    const auth = new Auth();
     auth.login();
     auth.handleAuthentication();
  }
    render() {
        return (
            <div>
                <button className= "btn btn-default navbar-btn" onClick={this.authenticate_user.bind(this)}>Get Started</button>
            </div>
        );
    }
}

export default Signup;