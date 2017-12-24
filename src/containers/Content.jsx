import React, {Component} from 'react';
import uuidv4 from 'uuid/v4';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.getUsers();
        //this.getUser()
    }
    getUsers() {
        fetch('/users')
    	.then(results => {
            return results.json();
        }).then(users => {
            console.log("users: " + JSON.stringify(users));
            this.setState({users: users});
        }).catch(error => {
            // network error
        });
    }

    getUser(user_id) {
        fetch('/users/' + user_id)
        .then (result => {
            return result.json();
        }).then (user => {
            this.setState({user:user});
        }).catch(error => {
            // TODO: update component view
            // to tell user that error occured
            console.log(error.messge);
        })
    }
    // set state -> keep list of users

    // query -> get list of users
    render() {
        // render list of users
        // iterative items -> always require unique key
        let userList = this.state.users.map((user) => {
            return <li key={uuidv4()} >{user.email}</li>
        });

        return (
            <div>
                <ul>
                    {userList}
                </ul>
            </div>
        );
    }
}
export default Content;