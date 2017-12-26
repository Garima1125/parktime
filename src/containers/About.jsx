// Garima
// use react-bootstrap

import React, {Component} from 'react';

class About extends Component {
    render() {
        return (
          <div className="container" id="about-us">
          <div className="col-6  image_box">
             <img className="d-block w-100 img-fluid" id="dogpup" src={'/static/assets/dog.png'} />
          </div>
            <h1 id="about">About Us!!!!</h1>
            <div className="row">
              <div className="col-6 marginabout">
                <p>We are dedicated to the well-being of your pet, We're a friendly pet care provider who are more than happy to provide the love, care and a healthy dose of socialization! Apart for this, we also do exercises with pets so they remain energetic and occupied, as well as feel more upbeat while you’re gone. We don’t want to make them feel like they are any less loved here!
                If you allow us to play with your pet and to look after them, you surely won’t be disappointed! More often than not, people don’t have the time to spare for taking their dog out for a walk – owing to busy schedules and hectic routines – but at Park Time Dog Walking, we are available anytime to take your pup out for a casual stroll around the neighbourhood or a fun trip to the local park; take them out on exciting adventure walks and hikes through beautiful trails and ravines, and make sure the trip is truly enjoyable for your little one!
                </p>
              </div>
            </div>
            </div>
        );
    }
}

export default About;
