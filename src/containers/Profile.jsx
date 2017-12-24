// Garima
// choose between dog walker and job search

import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
    render() {
        return (
          <div className="container-fluid">
            <div className="row" id="chooseprofile">
                <div className="col-4">
                  <div className="list-group" id="list-tab" role="tablist">
                    <a className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list"  aria-controls="option" disabled>Choose your profile below</a>
                    <Link to={'/walker'} className="list-group-item list-group-item-action" role="tab" aria-controls="walker">Dog Walker</Link>
                    <Link to={'/owner'} className="list-group-item list-group-item-action" role="tab" aria-controls="owner">Pet Owner</Link>
                  </div>
                </div>
                <div className="col-8">
                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                    <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                  </div>
                </div>
              </div>
              <img id='gif' src={'/static/assets/update.gif'} alt='gif'/>
            </div>
        );
    }
}

export default Profile;
