import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import Signup from './Signup.jsx';
import Homepage from './Homepage.jsx';
import Profile from './profile.jsx';
import Walker from './Walker.jsx';
import Dog from './Dog.jsx';



class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Homepage />
                <Footer />
                <Profile />
                <Walker />
                <Dog />


            </div>
        );
    }
}

export default App;