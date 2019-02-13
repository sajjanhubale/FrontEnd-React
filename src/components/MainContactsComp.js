import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardHeader,CardFooter, CardBody, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { mapDispatchToProps } from "../reducers/contact_reducer";
class MainContactsComp extends Component {
    constructor() {
        super();
        this.state = {
            modalForVUD: false,
            selectedContact: null,
            contacts: []
        }
        this.toggleForVUD = this.toggleForVUD.bind(this);
        this.toggleForNew = this.toggleForNew.bind(this);
        this.onContactView = this.onContactView.bind(this);
    }
    componentDidMount() {
        let contacts = [
            {
                name: "ABC",
                mobile_number: "81375979235"
            },
            {
                name: "PQR",
                mobile_number: "9813457905"
            },
            {
                name: "MNS",
                mobile_number: "9835850253"
            },
            {
                name: "XYZ",
                mobile_number: "9845720500235"
            }
        ]
        this.setState({ contacts: contacts })
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
    onNewContact = (e) =>{
            this.toggleForNew();
    }
    onContactView = () =>{
        this.toggleForNew();
        let selectedContact = this.state.contacts.filter(item => item.name === this.state.selectedContact);
        this.props.setSelectedContact(selectedContact[0]);
        this.props.history.push("/contactdetails");
     
     
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
                                    return <ListGroupItem id={item.name} onClick={this.onContactClick}>{item.name}</ListGroupItem>
                                })
                            }
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                    <button id="addcontact" onClick={this.onNewContact} style={{ "margin-left": "15px", float: "left" }} ><i style={{ color: 'black' }} className="fa fa-plus" ></i> New</button>
                    </CardFooter>
                    <Modal isOpen={this.state.modalForVUD} toggle={this.toggleForVUD} className={this.props.className}>
                        <ModalHeader toggle={this.toggleForVUD}>{this.state.selectedContact}</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onContactView}>View</Button>{' '}
                            <Button color="primary" onClick={this.toggleForVUD}>Edit</Button>{' '}
                            <Button color="primary" onClick={this.toggleForVUD}>Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggleForVUD}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modalForNew} toggle={this.toggleForNew} className={this.props.className}>
                        <ModalHeader toggle={this.toggleForNew}>{this.state.selectedContact}</ModalHeader>
                        <ModalBody>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleForNew}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.toggleForNew}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Card>
            </div>
        )
    }
}
export default connect(null,mapDispatchToProps)(MainContactsComp);