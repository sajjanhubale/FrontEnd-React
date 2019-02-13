import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardFooter, CardBody, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { mapDispatchToProps } from "../reducers/contact_reducer";
import axios from "axios";
import url from '../JS/url.js';
import swal from 'sweetalert';
class MainContactsComp extends Component {
    constructor() {
        super();
        this.state = {
            modalForVUD: false,
            selectedContact: null,
            contact_name: null,
            contact_mobile_number: null,
            contacts: []
        }
        this.toggleForVUD = this.toggleForVUD.bind(this);
        this.toggleForNew = this.toggleForNew.bind(this);
        this.onContactView = this.onContactView.bind(this);
        this.addNewContact = this.addNewContact.bind(this);
        this.loadContactList = this.loadContactList.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }
    componentDidMount() {
        this.loadContactList();
    }

    loadContactList() {
        axios.post(url.serverUrl + 'contacts/getlistofcontacts').then((response) => {
            if (response.data.flag === "success") {
             this.setState({contacts:response.data.data})
            }
            else
              swal("Sorry!!", "Failed to load contacts.");
          }).catch(function (err) {
            swal("Sorry!!", "Load Contacts - Something went wrong with server");
          })
    }
    toggleForVUD() {
        this.setState(prevState => ({
            modalForVUD: !prevState.modalForVUD
        }));
    }
    toggleForNew() {
        this.setState(prevState => ({
            modalForNew: !prevState.modalForNew
        }));
    }
    onContactClick = (e) => {
        console.log(e.target.id);
        this.setState({ selectedContact: e.target.id }, () => {
            this.toggleForVUD();
        })

    }
    onNewContact = (e) => {
        this.toggleForNew();
    }
    onContactView = () => {
        this.toggleForNew();
        let selectedContact = this.state.contacts.filter(item => item.name === this.state.selectedContact);
        this.props.setSelectedContact(selectedContact[0]);
        this.props.history.push("/contactdetails");
    }
    addNewContact = () => {
        this.setState({modalForNew:false,contact_name:null,mobileNumber:null});
        let jsonData = {
            name:this.state.contact_name,
            mobileNumber:this.state.contact_mobile_number
        }
        axios.post(url.serverUrl + 'contacts/addnewcontact', jsonData).then((response) => {
            if (response.data.flag === "success") {
                this.loadContactList();
              swal("Success!!", "New contact added Successfully");
            }
            else
              swal("Sorry!!", "Failed to add new contact.");
          }).catch(function (err) {
            swal("Sorry!!", "Add new contact -Something went wrong with server.");
          })
    }
    deleteContact = () => {
        this.setState({modalForVUD:false});
        let jsonData = {
            name:this.state.selectedContact
        }
        axios.post(url.serverUrl + 'contacts/deletecontact', jsonData).then((response) => {
            if (response.data.flag === "success") {
                this.loadContactList();
              swal("Success!!", "Selected contact deleted Successfully");
            }
            else
              swal("Sorry!!", "Failed to delete contact.");
          }).catch(function (err) {
            swal("Sorry!!", "Delete contact - Something went wrong with server.");
          })
    }
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <span>Contact List</span>
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            {
                                this.state.contacts.map(item => {
                                    return <ListGroupItem id={item.name} key={item.name} onClick={this.onContactClick}>{item.name}</ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <button id="addcontact" onClick={this.onNewContact} style={{ marginLeft: "15px", float: "left" }} ><i style={{ color: 'black' }} className="fa fa-plus" ></i> New</button>
                    </CardFooter>
                    <Modal isOpen={this.state.modalForVUD} toggle={this.toggleForVUD} className={this.props.className}>
                        <ModalHeader toggle={this.toggleForVUD}>{this.state.selectedContact}</ModalHeader>
                        <ModalBody>
                            do you want to View/Edit/Delete this contact?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onContactView}>View</Button>{' '}
                            <Button color="primary" onClick={this.toggleForVUD}>Edit</Button>{' '}
                            <Button color="primary" onClick={this.deleteContact}>Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggleForVUD}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modalForNew} toggle={this.toggleForNew} className={this.props.className}>
                        <ModalHeader toggle={this.toggleForNew}>{this.state.selectedContact}</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="contact_name">Contact Name</Label>
                                <Input type="text" id="contact_name" value={this.state.contact_name} onChange={(e) => this.setState({ contact_name: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="contact_mobile_number">Contact Mobile Number</Label>
                                <Input type="text" id="contact_mobile_number" value={this.state.contact_mobile_number} onChange={(e) => this.setState({ contact_mobile_number: e.target.value })} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addNewContact}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.toggleForNew}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Card>
            </div>
        )
    }
}
export default connect(null, mapDispatchToProps)(MainContactsComp);