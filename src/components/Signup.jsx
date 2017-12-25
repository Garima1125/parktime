// Garima
// Google signup
// change jQuery to Fetch

import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router';
import $ from 'jquery';

class Signup extends Component {
    constructor() {
    super();
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      authenticated: false
    }
  }

    render() {

        const redirectUser = () => {
          this.setState({authenticated: true});
        }

        const responseGoogle = (response) => {
          console.log(response);
        }

        if (this.state.authenticated) {
          return <Redirect to='/profile' />;
        }

        return (
          <div className="signup">
            <GoogleLogin
               clientId="829233882608-34kd6bf3m8peptt56jsuqg7kukb86pi8.apps.googleusercontent.com"
               buttonText="Login with Google"
               onSuccess={redirectUser}
               onFailure={responseGoogle}
               className="btn btn-danger"
            />
          </div>

        );
    }
}

export default Signup;
