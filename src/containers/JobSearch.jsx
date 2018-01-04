// Jessica
// map - display jobs near me

import React, {Component} from 'react';
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
            walkers: [],
        }
        this.markers = [];
        this.map = null;
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        fetch('/users', {
            credentials: "same-origin"
        }).then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            };
            console.log('this user' + JSON.stringify(resp));
            resp.json().then(user => {
                this.setState({user: user});
            });
        }).catch(err => {
            console.log(err);
        })
    }

    initMap = () => {
        
        let lat = parseFloat(this.state.user.user_latitude) || 10.2; //43.983112;
        let lng = parseFloat(this.state.user.user_longitude) || -40.0; //-79.590700;

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            zoom: 8
        });

        // get all nearby coordinates using fetch
        this.getJobs();
    }

    getJobs = () => {
        fetch('/jobs').then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            }
            resp.json().then(jobs => {
                console.log('get jobs' + JSON.stringify(jobs));
                for (let job of jobs) {
                    this.addMarker(job);
                }
                // add cluster support
                var markerCluster = new MarkerClusterer(this.map, this.markers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            });
        }).catch(err => {
            console.log(err);
        })
    }

    addMarker = (job) => {

        let marker = new google.maps.Marker({
            position: {
                lat: parseFloat(job.user_latitude),
                lng: parseFloat(job.user_longitude)
            },
            label: job.job_id,
            map: this.map
        })

        console.log(job.job_id +'lat' + job.user_latitude + 'lng' + job.user_longitude);

        marker.addListener('click', this.clickHandler(job, marker));

        this.markers.push(marker);
    }

    clickHandler = (job, marker) => {
        return () => {
            // loop through all my applications and if we can find this job_id
            let info = (
                <ul>
                    <li>{job.job_id}</li>
                    <li>{job.job_title}</li>
                    <li>{job.job_description}</li>
                    <li>{job.job_rate}</li>
                    <li>{job.user_email}</li>
                    <li>{job.dog_name}</li>
                    <NewApplicationModal job={job} />
                </ul>
            );
            this.setState({info: info});
            google.maps.event.trigger(map, 'resize');
            this.map.setCenter(marker.getPosition());
        };
    }

    render() {
        let mapWidth = this.state.info ? 9 : 12;
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <PageHeader>
                            Search Jobs &nbsp; 
                            <small>find your paw-mate!</small>
                        </PageHeader>
                    </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={12} md={mapWidth}>
                        <div id="map" style={{height:'400px', width:'100%'}}></div>
                    </Col>
                    <Col xs={12} md={3}>
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