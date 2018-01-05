// Jessica
// Owner's My dog page - can add a dog, job, and schedules

import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, Button, ButtonToolbar, Panel, PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';
import NewDogModal from '../modals/NewDogModal';
import NewJobModal from '../modals/NewJobModal';
import NewScheduleModal from '../modals/NewScheduleModal';
import DeleteDogModal from '../modals/DeleteDogModal';
import DeleteJobModal from '../modals/DeleteJobModal';
import DeleteScheduleModal from '../modals/DeleteScheduleModal';
import ShowApplicationsModal from '../modals/ShowApplicationsModal';
import Moment from 'moment';

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
        fetch('dogs/all', {
          credentials: "same-origin"
        })
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

    scheduleList = (dog,job) => {
        return job.schedules.map(schedule => {
            return (
                <div key={uuid()}>
                    <ListGroupItem>
                    <div className="row">
                       <dl className="dl-horizontal">
                          <dt>Start Time</dt>
                          <dd>{Moment(schedule.schedule_start_time).format('YYYY-MM-DD hh:mm:ss A')}</dd>
                          <dt>End Time</dt>
                          <dd>{Moment(schedule.schedule_end_time).format('YYYY-MM-DD hh:mm:ss A')}</dd>
                        </dl>
                        </div>
                        {schedule.schedule_status}  + {schedule.schedule_start_time} - {schedule.schedule_end_time}

<DeleteScheduleModal dogID={dog.dog_id} jobID={job.job_id} scheduleID={schedule.schedule_id} getDogs={this.getDogs} />
                    </ListGroupItem>

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
                        <div className="row">
                           <dl className="dl-horizontal">
                              <dt>Title</dt>
                              <dd id="title">{job.job_title}</dd>
                              <dt>Description</dt>
                              <dd>{job.job_description} </dd>
                              <dt>Pay Rate</dt>
                              <dd>{job.job_rate}</dd>
                            </dl>
                            </div>

                            #{job.job_id} {job.job_title} - {job.job_description} - {job.job_rate} - {job.job_status}
                        </Col>
                    </Row>
                    <ButtonToolbar>
                        <NewScheduleModal dogID={dog.dog_id} jobID={job.job_id} getDogs={this.getDogs} />
                        <DeleteJobModal dogID={dog.dog_id} jobID={job.job_id} getDogs={this.getDogs} />
                        <ShowApplicationsModal job={job} />
                    </ButtonToolbar>
                    <Row className="show-grid">
                        <Col md={12}>
                            <br />
                            <ListGroup>
                                {this.scheduleList(dog, job)}
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
              <ListGroupItem>
               <h3> Your Dog's Profile</h3>
                <div className="row" id= "dog-detail">
                   <dl className="dl-horizontal">
                      <dt>Dog's Name</dt>
                      <dd id="dog-name">{dog.dog_name}</dd>
                      <dt>Dog's Age</dt>
                      <dd>{dog.dog_age} </dd>
                      <dt>Dog's Breed</dt>
                      <dd>{dog.dog_breed}</dd>
                      <dt>Dog's Description</dt>
                      <dd>{dog.dog_description}</dd>
                    </dl>
                    </div>
                    </ListGroupItem>
                    <Row className="show-grid">
                        <Col md={12}>
                            <ButtonToolbar>
                                <NewJobModal dogID={dog.dog_id} getDogs={this.getDogs}/>
                                <DeleteDogModal dogID={dog.dog_id} getDogs={this.getDogs}/>
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
                            <NewDogModal getDogs={this.getDogs} />
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

// <DeleteJobModal getDogs={this.getDogs} dogID={dog.dog_id} />
// <DeleteDogModal getDogs={this.getDogs} dogID={dog.dog_id} />
