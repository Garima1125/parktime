// Jessica 
// when logged in as owner, I can add a dog profile

import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, Button, ButtonToolbar, Panel, PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';
import NewDogModal from '../modals/NewDogModal';
import NewJobModal from '../modals/NewJobModal';

class Dogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dogs: []
        }
    }

    componentDidMount() {
        this.getDogs();
    }

    getDogs = () => {
        // TODO: get dogs using fetch
        fetch('/dogs/all')
            .then(resp => {
                if (resp.status !== 200) {
                    // TODO: error handling
                    return;
                }
                resp.json().then(dogs => {
                    // HACK: put join dogs query
                    for (let dog in dogs) {

                    }
                    this.setState({dogs: dogs});
                    
                })
            }).catch(err => {
                console.log('error fetching list of dogs');
            });
    }

    scheduleList = (job) => {
        return job.schedules.map(schedule => {
            return (
                <ListGroupItem>
                    {schedule.status}: {schedule.start_time} - {schedule.end_time}
                </ListGroupItem>
            );
        });
    }

    jobList = (dog) => {
        return dog.jobs.map(job => {
            return (
                <ListGroupItem>
                    <Row className="show-grid">
                        <Col md={12}>
                            {job.title} - {job.description} - {job.rate} - {job.status}
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={12}>
                            <br />
                            <ListGroup>
                                {this.scheduleList(job)}
                            </ListGroup>
                        </Col>
                    </Row>
                </ListGroupItem>
            );
        });
    }

    dogList = () => {
        return this.state.dogs.map(dog => {
            return (
                <Panel key={uuid()} header={`#${dog.dog_id} ${dog.name} (${dog.age}) ${dog.breed}`}>
                    <Row className="show-grid">
                        <Col md={12}>
                            <ButtonToolbar>
                                <NewJobModal dogID={dog.dog_id} />
                                <Button bsSize='small'>
                                    <i className="fa fa-calendar fa-fw" aria-hidden="true"></i>
                                    &nbsp;
                                    Schedule
                                </Button>
                                <Button bsSize='small' bsStyle='danger'>
                                    <i className="fa fa-times fa-fw" aria-hidden="true"></i>
                                    &nbsp;
                                    Remove
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={12}>
                            {dog.description}
                        </Col>
                    </Row>
                    <br />
                    <Row className="show-grid">
                        <Col md={12}>
                            <ListGroup>
                                {this.jobList(dog)}
                            </ListGroup>
                        </Col>
                    </Row>
                </Panel>
            );
        });
    }

    render() {
        // once clicked, you need to redirect to single dog page
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <PageHeader>
                            My Dogs &nbsp; 
                            <small>Manage your dogs</small>
                        </PageHeader>
                        <ButtonToolbar>
                            <NewDogModal />
                        </ButtonToolbar>
                    </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col md={12}>
                        {this.dogList()}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dogs;

