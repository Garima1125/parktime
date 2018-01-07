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
          <h4>Please enter your Postal Code</h4>
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
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/dog1.jpg' />
        <Carousel.Caption>
        <Panel>
        <Grid>
            <Row className="show-grid">
                <Col md={8}>
                    <h1>
                        Login &nbsp;
                    </h1>
                </Col>
            </Row>
            <br />
            <Row className="show-grid">
                <Col md={6}>
                    <Form horizontal action='/auth/login' method='POST'>
                        <FormGroup controlId="username">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={8}>
                                <FormControl name="username" type="string" placeholder="Email"
                                    value={this.state.username}
                                    onChange={this.change}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="password">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={8}>
                                <FormControl name="password" type="password" placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.change}
                                />
                            </Col>
                        </FormGroup>
                        <div className="signup">
                            <Button type="submit">
                                Login
                            </Button>
                        </div>
                        <div id="OR" className="hidden-xs">OR
                        </div>    
                    </Form>
                </Col>
                <Col md={8}>
                <Row className="text-center sign-with" id="sign-with">
                        <Col md={10}>
                            <h3>Sign in with</h3>
                        </Col>
                        <Col md={10}>
                            <ButtonGroup justified >
                                <div className="signup">

                                    <Button bsStyle="default" bsSize="xsmall" href='/auth/login' id="loginBtn-google">
                                    <img width={23} height={23} src='/static/assets/googlelogo.png' />    Google
                                    </Button>
                                </div>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
        </Panel>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/dogwalk.jpg' />
        <Carousel.Caption>
          <h3>Make a Booking</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        );
    }
}

export default Homepage;
