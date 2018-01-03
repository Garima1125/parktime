import React, { Component } from 'react';
import {Grid, Row, Col, PageHeader, Form, FormGroup, FormControl, ControlLabel, ButtonGroup, Button} from 'react-bootstrap';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      first_name: '',
      last_name: '',
      type: '',
      postal_code: '',
      address: '',
      unit_number: '',
      city: '',
      province: '',
      country: '',
      phone: '',
      description: ''
    }
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    fetch('/users', {
      credentials: "same-origin"
    }).then(resp => {
      if (resp.status !== 200) {
        console.log(resp.status);
        return;
      }
      resp.json().then(user => {
        this.setState({ user_id: user.user_id });
        this.setState({ first_name: user.user_first_name });
        this.setState({ last_name: user.user_last_name });
        this.setState({ type: user.user_type });
        this.setState({ postal_code: user.user_postal_code });
        this.setState({ address: user.user_address });
        this.setState({ unit_number: user.user_unit_number });
        this.setState({ city: user.user_city });
        this.setState({ province: user.user_province });
        this.setState({ country: user.user_country });
        this.setState({ phone: user.user_phone });
        this.setState({ description: user.user_description });
      });
    }).catch(err => {
      console.log(err);
    });
  }

  updateProfile = () => {
    fetch('/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }).then(resp => {
      if (resp.status !== 200){
          alert('failed');
          return;
      }
      console.log(resp);
    }).catch(err => {
        console.log(err);
    });
  }

  change = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <PageHeader>
              Update Profile &nbsp;
              <small>please update profile to continue</small>
            </PageHeader>
          </Col>
        </Row>
        <br />
        <Row className="show-grid">
          <Col md={12}>
            <Form horizontal>
              <FormGroup controlId="first_name">
                <Col componentClass={ControlLabel} sm={2}>
                  First Name
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="First Name"
                    value={this.state.first_name}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="last_name">
                <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="Last Name"
                    value={this.state.last_name}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="type">
                <Col componentClass={ControlLabel} sm={2}>
                  Type
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="Type"
                    value={this.state.type}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="postal_code">
                <Col componentClass={ControlLabel} sm={2}>
                  Postal Code
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="Postal Code"
                    value={this.state.postal_code}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="address">
                <Col componentClass={ControlLabel} sm={2}>
                  Address
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="address"
                    value={this.state.address}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="unit_number">
                <Col componentClass={ControlLabel} sm={2}>
                  Unit Number
                </Col>
                <Col sm={10}>
                  <FormControl type="integer" placeholder="unit_number"
                    value={this.state.unit_number}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="city">
                <Col componentClass={ControlLabel} sm={2}>
                  City
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="city"
                    value={this.state.city}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="province">
                <Col componentClass={ControlLabel} sm={2}>
                  Province
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="province"
                    value={this.state.province}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="country">
                <Col componentClass={ControlLabel} sm={2}>
                  Country
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="country"
                    value={this.state.country}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="phone">
                <Col componentClass={ControlLabel} sm={2}>
                  Phone
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="phone"
                    value={this.state.phone}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="description">
                <Col componentClass={ControlLabel} sm={2}>
                  Description
                </Col>
                <Col sm={10}>
                  <FormControl type="string" placeholder="description"
                    value={this.state.description}
                    onChange={this.change}
                  />
                </Col>
              </FormGroup>
            </Form>
            
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={12}>
            <ButtonGroup>
              <Button onClick={this.updateProfile}>Update</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Profile;