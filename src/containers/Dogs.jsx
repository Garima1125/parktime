// Jessica 
// when logged in as owner, I can add a dog profile

import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, Button, ButtonToolbar, Panel, PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';
import NewDogModal from '../modals/NewDogModal';
import NewJobModal from '../modals/NewJobModal';
import NewScheduleModal from '../modals/NewScheduleModal';

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
        fetch('dogs/all')
        .then(resp => {
            if (resp.status !== 200) {
                // TODO: error handling
                return;
            }
            resp.json().then(dogs => {
                this.setState({dogs: dogs});
            })
        }) .catch(err => {
            console.log('error fetching list of dogs');
        })
    }

    scheduleList = (job) => {
        return job.schedules.map(schedule => {
            return (
                <div key={uuid()}>
                    <ListGroupItem>
                        {schedule.schedule_status}: {schedule.schedule_start_time} - {schedule.schedule_end_time}
                    </ListGroupItem>
                    <Button bsSize='small' bsStyle='danger'>
                        <i className="fa fa-times fa-fw" aria-hidden="true"></i>
                        Remove
                        &nbsp;
                    </Button>
                </div>
            );
        });
    }

    jobList = (dog) => {
        return dog.jobs.map(job => {
            return (
                <ListGroupItem key={uuid()}>
                    <Row className="show-grid">
                        <Col md={12}>
                            {job.job_title} - {job.job_description} - {job.job_rate} - {job.job_status}
                        </Col>
                    </Row>
                    <ButtonToolbar>
                        <NewScheduleModal dogID={dog.dog_id} jobID={dog.jobs.job_id} />
                        <Button bsSize='small' bsStyle='danger'>
                            <i className="fa fa-times fa-fw" aria-hidden="true"></i>
                            Remove
                            &nbsp;
                        </Button>
                    </ButtonToolbar>
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
                <Panel key={uuid()} header={`#${dog.dog_id} ${dog.dog_name} (${dog.dog_age}) ${dog.dog_breed}`}>
                    <Row className="show-grid">
                        <Col md={12}>
                            <ButtonToolbar>
                                <NewJobModal dogID={dog.dog_id} getDogs={this.getDogs}/>
                                <Button bsSize='small' bsStyle='danger'>
                                    <i className="fa fa-times fa-fw" aria-hidden="true"></i>
                                    Remove
                                    &nbsp;
                                </Button>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={12}>
                            {dog.dog_description}
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
        })
    }

    render() {
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
                        {this.dogList()};
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dogs;

