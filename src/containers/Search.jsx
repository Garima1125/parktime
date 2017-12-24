import React, {Component} from 'react';
import {Grid, Row, Col, Button, ButtonToolbar, Panel, PageHeader} from 'react-bootstrap';

class Search extends Component {

    constructor(props) {
        super(props);
        window.initMap = this.initMap;
        //loadJS('https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js');
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyChAVeWn4OYB0sKtR0QN7IyYfYL85O3tQ8&callback=initMap&libraries=visualization')
        this.state = {
            info: null,
            markers: []
        }
        this.map = null;
    }

    componentDidMount() {
        
    }

    initMap = () => {

        console.log('initMap');

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 6
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

        let res = [];
        
        for (let job in res) {
            this.addMarker(job);
        }

         // add cluster support
         /*
         let markerCluster = new MarkerClusterer(this.map, this.markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
            */

    }

    addMarker = (job) => {
        let marker = new google.maps.Marker({
            position: {
                lat: parseFloat(job.lat),
                lng: parseFloat(job.lng)
            },
            label: job.id,
            map: this.map
        })
        
        marker.addListener('click', 
            this.clickHandler(job, marker));

        this.markers.push(marker);
    }


    clickHandler = (job, marker) => {
        let info = (
            <div>
                {job.id}
            </div>
        );
        this.setState({info: info});
        google.maps.event.trigger(map, 'resize');
        this.map.setCenter(marker.getPosition());
    }

    render() {
        let mapWidth = this.state.info ? 4 : 12;
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
                    <Col xs={12} md={8}>
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