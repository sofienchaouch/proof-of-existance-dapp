import React, { Component } from 'react';
import Carousels from '../../components/Carousels/Carousels';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

class MainPage extends Component {

    state = {}

    render() {
        return (
            <div>
            <Container fluid>
                <br />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <div className="container-fluid p-5 activity">
                                    <div className="col text-center mb-2">
                                        <h2 className="mb-4">Welcome to the Proof Of Existance Dapp</h2>
                                    </div>
                                    
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }

}

export default MainPage;