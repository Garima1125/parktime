// Jessica
// map - display jobs near me

import React, {Component} from 'react';
import {Grid, Row, Col, Button, ButtonToolbar, Panel, PageHeader} from 'react-bootstrap';

class Search extends Component {

    constructor(props) {
        super(props);
        window.initMap = this.initMap;
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyChAVeWn4OYB0sKtR0QN7IyYfYL85O3tQ8&callback=initMap&libraries=visualization')
        this.state = {
            info: null,
            walkers: []
        }
        this.markers = [];
        this.map = null;
    }

    componentDidMount() {
        
    }

    initMap = () => {

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 43.983112, lng: -79.590700},
            zoom: 8
        });

        /*
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.map.setCenter(pos);
                this.map.setZoom(15);
                // TODO: add marker for my location
            }, () => {
                // handle geolocation error
                console.log('error - geolocation failed')
            });
        }
        */
  
        // TODO: get all nearby coordinates using fetch
        this.getWalkers();

    }

    getWalkers = () => {
        fetch('/users/walkers').then(resp => {
            if (resp.status !== 200) {
                // TODO: error handling
                console.log(resp.status);
                return;
            }
            return resp.json();
        }).then(data => {
            for (let walker of data) {
                this.addMarker(walker);
            }
            // add cluster support
            var markerCluster = new MarkerClusterer(this.map, this.markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }).catch(err => {
            console.log(err);
        })
    }

    addMarker = (walker) => {

        let marker = new google.maps.Marker({
            position: {
                lat: parseFloat(walker.user_latitude),
                lng: parseFloat(walker.user_longitude)
            },
            label: walker.user_email,
            map: this.map
        })

        marker.addListener('click', this.clickHandler(walker, marker));

        this.markers.push(marker);
    }


    clickHandler = (walker, marker) => {
        return () => {
            let info = (
                <div>
                    {walker.user_email}
                </div>
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

export default Search;