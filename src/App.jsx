import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Content from './Content.jsx';
import Footer from './Footer.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Content />
                <Footer />
            </div>
        );
    }
}
export default App;