import React, {Component} from 'react';
import Signup from './Signup.jsx';

class Nav extends Component {
    render() {
        return (
              <nav className="navbar navbar-dark bg-dark" id= "head">
                <div className="container-fluid">
                  <a className="navbar-brand">PARK TIME</a>
                  <div className="navbar-header">
                     <Signup id="login" />
                  </div>
                </div>
              </nav>
        );
    }
}

export default Nav;