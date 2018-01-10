// Jessica

import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {Modal, Button, Form, FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ShowApplicationsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            applications: [],

            selected: null,
            page: 'select'
        }
    }

    close = () => {
        this.setState({ showModal: false });
    }

    open = () => {
        this.getApplications(() => {
            this.setState({ showModal: true });
        });
    }

    change = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    getApplications = (cb) => {
        fetch(`/dogs/${this.props.dogID}/jobs/${this.props.job.job_id}/applications`, {
            credentials: "same-origin"
        }).then(resp => {

            if (resp.status !== 200) {
                console.log(resp.status);
                return;
            }
            resp.json().then(applications => {
                console.log(applications);
                this.setState({applications: applications});
                cb();
            });
        }).catch(err => {
            console.log(err);
        });
    }

    select = (application) => {
        return () => {
            fetch(`/dogs/${this.props.dogID}/jobs/${this.props.job.job_id}/applications/${application.application_id}`, {
                method: 'PUT',
                credentials: "same-origin"
            }).then(resp => {
                if (resp.status !== 200){
                    // TODO: error handling
                    console.log(resp.status);
                    return;
                }
                this.setState({page: 'payment'})
                console.log(JSON.stringify(resp));
            }).catch(err => {
                console.log(err);
            });
        };
    }

    viewProfile = (application) => {
      this.context.router.push({ //browserHistory.push should also work here
        pathname: pathToMyComponent,
        state: {yourCalculatedData: data}
      });
    }

    render() {
        let applicationComponent = (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.applications.map(application =>
                      <tr key={application.application_id}>
                        <td>{application.user_first_name + ' ' + application.user_last_name}</td>
                        <td>{application.application_description}</td>
                        <td>
                        <Button bsSize="small" onClick={this.select(application)} id="select-btn">
                          <span className="glyphicon glyphicon-ok"></span>  Select
                        </Button>
                        &nbsp;&nbsp;
                        <Link to={{
                                  pathname: '/walkerprofileview',
                                  state: application
                                }}>
                        <Button bsSize="small" id="select-btn">
                          <span className="glyphicon glyphicon-eye-open"></span>  View Profile
                        </Button>
                        </Link>
                        </td>
                      </tr>
                    )
                  }
                  </tbody>
                </table>
                </div>
        )

        let paymentComponent = (
            <div>
                <h1>PAYMENT</h1>
            </div>
        );

        let mainComponent = null;

        if (this.state.page === 'select') {

            mainComponent = applicationComponent;

        } else if (this.state.page === 'payment') {

            mainComponent = paymentComponent;

        }

        // let mainComponent = this.state.page == 1 ? applicationComponent : paymentComponent;

        return (
            <div>
                <Button bsSize="small" onClick={this.open}>
                    <span className="glyphicon glyphicon-eye-open"></span>
                    &nbsp;
                    Show Applications
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>All Applications for {this.props.job.job_title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            {mainComponent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}><span className="glyphicon glyphicon-remove"></span>  Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ShowApplicationsModal;
