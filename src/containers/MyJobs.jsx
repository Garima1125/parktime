import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';

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
    }

    getUser = () => {
        fetch('/users').then(resp => {
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
        fetch('/walkers/jobs').then(resp => {
            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            };
            resp.json().then(jobs => {
                this.setState({jobs: jobs});
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        let jobComponent = this.state.jobs.map(job => {
            return (
                <li key={uuid()}>
                    #{job.job_id} - {job.job_description} - {job.job_status}
                </li>
            );
        });
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <PageHeader>
                            My Jobs &nbsp; 
                            <small>Offered</small>
                        </PageHeader>
                    </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                        <ul>
                            {jobComponent}
                        </ul>
                    </Col>
                </Row>                
            </Grid>
        );
    }
}

export default MyJobs;