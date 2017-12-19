import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Nav from './Nav.jsx';

// import Signup from './Signup.jsx';
import Homepage from './Homepage.jsx';
//import Profile from './Profile.jsx';
// import Walker from './Walker.jsx';
// import Dog from './Dog.jsx';
// import Job from './Job.jsx';
import About from './About.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';



class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <div>
                    <Nav />
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/about' component={About} />
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;