// Jessica
// map - display jobs near me

import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import NewApplicationModal from '../modals/NewApplicationModal';


class JobSearch extends Component {

    constructor(props) {
        super(props);
        window.initMap = this.initMap;
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyChAVeWn4OYB0sKtR0QN7IyYfYL85O3tQ8&callback=initMap&libraries=visualization')
        this.state = {
            user: null,
            info: null,
            users: null, // also contain jobs
        }
        this.markers = [];
        this.map = null;
    }

    setLocation = () => {
        if (this.props.location.state) {
            console.log('location found');
            let lat = parseFloat(this.props.location.state.referrer.lat);
            let lng = parseFloat(this.props.location.state.referrer.lng);
            this.map.setCenter({lat: lat, lng: lng});
        } else if (this.state.user) {
            console.log('user found');
            let lat = parseFloat(this.state.user.user_latitude);
            let lng = parseFloat(this.state.user.user_longitude);
            this.map.setCenter({lat: lat, lng: lng});
        }
    }

    getUser = () => {
        fetch('/users', {
            credentials: "same-origin"
        }).then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            };
            resp.json().then(user => {
                if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
                    this.setState({user: user});
                }
                this.setLocation();
            });
        }).catch(err => {
            console.log(err);
        })
    }

    initMap = () => {
      let lat = 51.0876682;
      let lng = -49.0927846;

      this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: lng},
          zoom: 8
      });

      // get all nearby coordinates using fetch
      this.getJobs();
      this.getUser();

    }

    getJobs = () => {
        fetch('/jobs').then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            }
            resp.json().then(users => {

                this.setState({users: users});

                for (let user of users) {
                    this.addMarker(user);
                }

                // add cluster support
                var markerCluster = new MarkerClusterer(this.map, this.markers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            });
        }).catch(err => {
            console.log(err);
        })
    }

    addMarker = (user) => {

        let marker = new google.maps.Marker({
            position: {
                lat: parseFloat(user.user_latitude),
                lng: parseFloat(user.user_longitude)
            },
            label: user.user_email,
            map: this.map
        })

        marker.addListener('click', this.clickHandler(user, marker));

        this.markers.push(marker);
    }

    clickHandler = (user, marker) => {
        return () => {
            // loop through all my applications and if we can find this job_id
            let jobInfo = user.jobs.map(job => {
                return (
                  <Row className="show-grid">
                      <Col md={16}>
                      <h3>Job Details</h3>
                  <div className="panel panel-default">
                  <dl className="dl-vertical" id="job-dis">
                    <dd key={uuid()}></dd>
                    <dt>Job Title</dt>
                    <dd>{job.job_title}</dd>
                    <dd></dd>
                    <dt>Job Description</dt>
                    <dd>{job.job_description}</dd>
                    <dt>Job Pay-Rate</dt>
                    <dd>{job.job_rate}</dd>
                    <NewApplicationModal job={job}/>
                    </dl>
                    </div>
                    </Col>
                    </Row>
                );
            });
            let info = (
                <ul>
                    {jobInfo}

                </ul>
            );
            this.setState({info: info});
            google.maps.event.trigger(map, 'resize');
            this.map.setCenter(marker.getPosition());
        };
    }

    render() {
        let mapWidth = this.state.info ? 8 : 10;
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={10}>
                        <PageHeader>
                            Search Jobs &nbsp;
                            <small>find your paw-mate!</small>
                        </PageHeader>
                    </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={10} md={mapWidth}>
                        <div id="map" style={{height:'400px', width:'100%'}}></div>
                    </Col>
                    <Col xs={10} md={3}>
                        {this.state.info}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default JobSearch;
