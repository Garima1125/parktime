import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Grid, Row, Col, Button, ButtonToolbar, Panel, PageHeader} from 'react-bootstrap';
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
                    for (let i = 0; i < dogs.length; i++) {
                        dogs[i].jobs = [];
                    }
                    this.setState({dogs: dogs});
                    
                })
            }).catch(err => {
                console.log('error fetching list of dogs');
            });
    }

    render() {
        // once clicked, you need to redirect to single dog page
        let dogList = this.state.dogs.map(dog => {
            let jobList = dog.jobs.map(job => {
                return <div>{job.title}</div>
            });
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
                            </ButtonToolbar>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={12}>
                            {dog.description}
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={12}>
                            {jobList}
                        </Col>
                    </Row>
                </Panel>
            );
        });

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
                        {dogList}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dogs;