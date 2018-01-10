// Garima
// input postal code, convert to lat/lng
// submit to job search / dog walker search (maps)
import React, {Component} from 'react';
import {Carousel, Form, FormGroup, FormControl,ControlLabel, Col,Panel, Grid, Row, PageHeader, ButtonGroup, Button, Glyphicon} from 'react-bootstrap';
import {Redirect, Router} from 'react-router';
class Homepage extends Component {

  constructor(){
    super()
    this.state = {
      postal_code: '',
      redirect: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

handleChange(event) {
  this.setState({postal_code: event.target.value})
}


     handleSubmit(event) {
       event.preventDefault();
       console.log(this.state);
       var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.postal_code + "&key=AIzaSyBqTA4VZJ73mcFVSg8owb7gxsxA_k447Lg"
       fetch(url,{
       }).then(response => {
         return response.json();
       })
       .then(data => {
         console.log(data.results[0].geometry.location);
         this.setState({
           redirect: true,
           geodata: data.results[0].geometry.location
          });
       }).catch(error => {
         console.log(error);
       })
     }

    render() {
      const { redirect, geodata } = this.state

      if(redirect)
        return (<Redirect to={{
          pathname: '/search/jobs',
          state: { referrer: this.state.geodata}
        }} />)

      return (
      <Carousel>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/cute-dog.jpg' />
        <Carousel.Caption>
        <Panel id="geo" className="panel panel-transparent">
          <h2>Please enter your Postal Code</h2>
          <Form inline className="postal" onSubmit={this.handleSubmit}>
              {' '}
              <FormGroup controlId="formInlinePostalCode">
              {' '}
              <FormControl type="text" placeholder="A1A 1A1"  value={this.state.postal_code} onChange={this.handleChange}/>
              </FormGroup>
              {' '}
              </Form>
              <Form inline>
              <Button type="submit" onClick={this.handleSubmit} className= "walker-near-me"><span className="glyphicon glyphicon-search"></span>
              Walkers near me
              </Button>
              {' '}
              {' '}
              <Button type="submit" onClick={this.handleSubmit} className= "jobs-near-me"><span className="glyphicon glyphicon-search"></span>
              Jobs near me
              </Button>
              </Form>
              </Panel>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/tim.jpg' />
        <Carousel.Caption>
        <Panel className="panel panel-transparent">
        <h2 id="slide2">Choose a Dog Walker</h2>
        <p>We will pick up your dog from home and we can be flexible as to what our walk entails. Do you want your dog to have a run at the local park or like a particular route to walk? No problem, just tell us!</p>
        </Panel>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/dogwalk.jpg' />
        <Carousel.Caption>
          <Panel className="panel panel-transparent">
          <h2 id="slide3">Make a Booking</h2>
          <p>Do you spend all your time at work worrying about how your dog is doing at home? We want to help!
             You can now choose private, semi-private and small group walks during the work day to make sure your dog is happy and relaxed, even when you can't be there!
          </p>
          </Panel>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        );
    }
}

export default Homepage;
