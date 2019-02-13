import React, { Component } from "react";
import { Card, CardHeader, CardBody} from 'reactstrap';
class ViewContactDetails extends Component {
    constructor() {
        super();
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
                        <span>Contact Details</span>
                    </CardHeader>
                    <CardBody>
                      </CardBody>
                </Card>
            </div>
        )
    }
}
export default ViewContactDetails;