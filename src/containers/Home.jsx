// Garima
// input postal code, convert to lat/lng
// submit to job search / dog walker search (maps)
import React, {Component} from 'react';
import {Carousel, Form, FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';

class Homepage extends Component {
    render() {
        return (
      <Carousel>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/cute-dog.jpg' />
        <Carousel.Caption>
          <h4>Please enter your Postal Code</h4>
          <Form inline className="postal">
              {' '}
              <FormGroup controlId="formInlinePostalCode">
              {' '}
              <FormControl type="text" placeholder="A1A 1A1" />
              </FormGroup>
              {' '}
              <Button type="submit">
                <Glyphicon glyph="search" />
              </Button>
              </Form>
              <Form inline>
              <Button type="submit" className= "walker-near-me">
              Walkers near me
              </Button>
              {' '}
              {' '}
              <Button type="submit" className= "jobs-near-me">
              Jobs near me
              </Button>
              </Form>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/andrew-pons-9.jpg' />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={1500} height={600} alt="900x500" src='/static/assets/dogwalk.jpg' />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        );
    }
}

export default Homepage;
