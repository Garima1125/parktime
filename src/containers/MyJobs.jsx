import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, PageHeader, Button, ButtonToolbar} from 'react-bootstrap';
import Moment from 'moment';

class MyJobs extends Component {
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
        fetch('/appliedjobs', {
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

    complete = (job) => {
        return () => {
            fetch('/completejob', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: "same-origin",
                body: JSON.stringify({job_id: job.job_id})
            }).then(resp => {
                console.log(resp)
                if (resp.status !== 200) {
                    console.log(resp.status);
                    return;
                };
                alert('success!');
            }).catch(err => {
                console.log(err);
            });
        }
    }

    render() {
      let completedJobList = (
        <div class="panel panel-default" id="Jobs-panel">
          <div class="panel-heading"></div>
            <table class="table">
           <thead>
          <tr>
          <th>Job Title</th>
          <th>Dog's Name</th>
          <th>Owner</th>
          <th>Job Date</th>
          <th></th>
          </tr>
           </thead>
           <tbody>
           {this.state.jobs.map(job =>
          <tr key={job.job_id}>
          <td>{job.job_title}</td>
          <td>{job.dog_name}</td>
          <td>{job.user_first_name + ' ' + job.user_last_name}</td>
          <td>{Moment(job.job_created_at).format('MMMM Do YYYY')}</td>
          <td>

            <ButtonToolbar>
            {job.job_status === 'completed'? <Button bsSize="small" disabled>Completed</Button> : <Button bsSize="small" onClick={this.complete(job)}>Mark Complete</Button>}
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
                        <div>
                        <img width={250} height={250} src='/static/assets/ties.jpg' />
                        </div>
                            Current Job Status
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

export default MyJobs;
