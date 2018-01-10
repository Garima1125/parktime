import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, PageHeader, Button, ButtonToolbar, ListGroupItem} from 'react-bootstrap';
import Moment from 'moment';
import NewReviewModal from '../modals/NewReviewModal'

class MyJobsOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            jobs: []
        }
    }

    componentDidMount() {
        this.getUser();
        this.getJobs();
    }

    getUser = () => {
        fetch('/users', {
            credentials: "same-origin"
        }).then(resp => {
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

    getJobs = () => {
        // all jobs that have been paid and in active
        // get all jobs with walker_id as my user_id
        fetch('/jobsforreview', {
            credentials: "same-origin"
        }).then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            };
            resp.json().then(jobs => {
              console.log(jobs);
                this.setState({jobs: jobs});
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {

      let completedJobList = (
        <div class="panel panel-default" id="compleletedJobs-panel">
          <div class="panel-heading"></div>
            <table class="table">
           <thead>
          <tr>
          <th>Job Title</th>
          <th>Dog's Name</th>
          <th>Walker</th>
          <th>Job Date</th>
          <th></th>
          </tr>
           </thead>
           <tbody>
           {this.state.jobs.map(job =>
          <tr key={job.job_id}>
          <td>{job.job_title}</td>
          <td>{job.dog_name}</td>
          <td>{job.walker_name}</td>
          <td>{Moment(job.job_created_at).format('MMMM Do YYYY')}</td>
          <td>

            <ButtonToolbar>
                <NewReviewModal user={this.state.user} job={job} />
            </ButtonToolbar>

          </td>
          </tr>
        )}
           </tbody>
           </table>
       </div>

      )

        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <PageHeader>
                            Completed Jobs
                        </PageHeader>
                    </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <ul>
                            {completedJobList}
                        </ul>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default MyJobsOwner;
