// Garima
import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Redirect } from 'react-router';

class LogoutModal extends Component{

  constructor(props){
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.state = {
      showModal: false,
      authenticated:true

    }
  }

  close() {
     this.setState({ showModal: false });
   }

   open() {
     this.setState({ showModal: true });
   }

logoutUser(){
  this.setState({authenticated :false});
}

  render(){
    if(this.state.authenticated === false){
      // localStorage.removeItem('authenticated');
      // localStorage.removeItem('email');
      localStorage.clear();
      this.props.onChange({
        authenticated:false, email:''
      });
      return <Redirect to='/' />;
    }

    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          Logout
        </Button>

        <Modal show={this.state.showModal} onHide={this.close} bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title> Are you sure ? </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
            <div className="col-md-6"><Button onClick={this.close} bsStyle="default">Close</Button></div>
            <div className="col-md-6"><Button onClick={this.logoutUser} bsStyle="danger">Logout</Button></div>
            </div>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default LogoutModal;
