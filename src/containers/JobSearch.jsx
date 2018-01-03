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
        fetch('/users/whoami').then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            };
            resp.json().then(user => {
                this.setState({user: user});
            });
        }).catch(err => {
            console.log(err);
        })
    }

    isMine = (dog, job, cb) => {
        fetch(`/dogs/${dog.dog_id}/jobs/${job.job_id}`).then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            }
            resp.json().then(result => {
                cb(result);
            });
        }).catch(err => {
            console.log(err);
        });
    }   

    getMine = () => {
        fetch(`/dogs/${dog.dog_id}/jobs/${job.job_id}/applications/mine`).then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            }
            resp.json().then(applications => {
                this.setState({mine: applications})
            });
        }).catch(err => {
            console.log(err);
        });
    }

    initMap = () => {

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 43.983112, lng: -79.590700},
            zoom: 8
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.map.setCenter(pos);
            }, () => {
                // handle geolocation error
                console.log('error - geolocation failed')
            });
        }

        // TODO: get all nearby coordinates using fetch
        this.getJobs();

    }

    getJobs = () => {
        fetch('/jobs').then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            }
            resp.json().then(jobs => {
                console.log(jobs);
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
                lat: parseFloat(job.user_detail_latitude),
                lng: parseFloat(job.user_detail_longitude)
            },
            label: job.job_id,
            map: this.map
        })

        marker.addListener('click', this.clickHandler(job, marker));

        this.markers.push(marker);
    }

    apply = (job) => {
        return () => {
            fetch(`/dogs/${job.dog_id}/jobs/${job.job_id}/applications/new`, {
                method: 'POST'
            }).then(resp => {
                if (resp.status !== 200) {
                    console.log(resp.status);
                    return;
                }
                resp.json().then(data => {
                    console.log(data);
                    this.getMine();
                });
            }).catch(err => {
                console.log(err);
            });
        };
    }

    change = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        this.setState({ [e.target.id]: e.target.value });
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