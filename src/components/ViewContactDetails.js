import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, FormGroup, Col , Label} from 'reactstrap';
class ViewContactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }

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
   
    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <span style={{ "margin-left": "15px", float: "left" }}>Contact Details</span>
                        <button id="Back" onClick={()=>{this.props.history.push("/")}} style={{ "margin-left": "15px", float: "left" }}><i style={{ color: 'lightskyblue' }} className="fa fa-arrow-left"></i> Back</button>
                    </CardHeader>
                    <CardBody>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Name : </Label>
                      </Col>
                      <Col xs="12" md="6">
                      <span>{this.props.contacts.selectedContactDetails != null ? this.props.contacts.selectedContactDetails.name : "" }</span>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label>Mobile Number : </Label>
                      </Col>
                      <Col xs="12" md="6">
                      <span>{this.props.contacts.selectedContactDetails != null ? this.props.contacts.selectedContactDetails.mobile_number : ""}</span>
                      </Col>
                    </FormGroup>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default connect(({contacts})=>{return {contacts:contacts}})(ViewContactDetails);