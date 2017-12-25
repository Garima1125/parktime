// Garima & Jessica
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Nav from './components/Nav.jsx';

// import Signup from './Signup.jsx';
import Home from './containers/Home.jsx';
import Dogs from './containers/Dogs.jsx';
import About from './containers/About.jsx';
import Profile from './containers/Profile.jsx';
import Walker from './containers/Walker.jsx';
import Owner from './containers/Owner.jsx';
import JobSearch from './containers/JobSearch.jsx';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Nav />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/dogs' component={Dogs} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/walker' component={Walker} />
                    <Route exact path='/owner' component={Owner} />
                    <Route exact path='/search' component={JobSearch} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
