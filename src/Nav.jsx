import React, {Component} from 'react';
// import Signup from './Signup.jsx';
import {Link} from 'react-router-dom';
import LoginModal from './LoginModal.jsx';

class Nav extends Component {
    render() {
        return (
              <nav className="navbar navbar-inverse bg-info" id= "head">
                <div className="container-fluid">
                   <Link to={'/'} className="navbar-brand">PARK TIME</Link>
                  <div className="navbar-header">
                  <Link className="home" to={'/'}>Home</Link>
                  <Link to={'/about'} className="about_us">About Us</Link>
                  <LoginModal />

                  </div>
                </div>
              </nav>
        );
    }
}

export default Nav;
