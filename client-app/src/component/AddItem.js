import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

export default class AddItem extends Component {
    constructor(props) {
        super(props)

        this.onChangeToDoName = this.onChangeToDoName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.state = {
            name: '',
            dueDate: new Date(),
            modalText: '',
            displayModal : false,
            displaySpinner: false
        }
    }

    onChangeToDoName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeDate(date) {
        this.setState({ dueDate: date })
    }

    onSubmit(e) {
        this.setState({ displaySpinner: true })
        this.setState({ modalText: '' })

        e.preventDefault()

        const todoObject = {
            ID: -1,
            Name: this.state.name,
            DueDate: this.state.dueDate,
            IsComplete : false
        };
        
        const url = "http://localhost:51191/ToDo";

        axios.post(url, todoObject)
            .then((res) => {
                this.setState({ name: '' })
                this.setState({ displaySpinner: false })

                this.setState({ modalText: 'The todo has been added successfully!' })
                this.setState({ displayModal: true })
                
                this.props.callbackFunction(res.data)
            }).catch((error) => {
                this.setState({ displaySpinner: false })

                this.setState({ modalText: 'An unexpected error occured!' })
                this.setState({ displayModal: true })
               
                console.log(error)
            });
    }

    onModalClose() {
        this.setState({ displayModal: false })
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Add a new ToDo:</Card.Header>
                                <Card.Body>
                                    <div className="wrapper">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" value={this.state.name} onChange={this.onChangeToDoName} className="form-control" required="true" />
                                            </div>
                                            <div className="form-group">
                                                <label>Due Date</label><br/>
                                                <DatePicker onChange={this.onChangeDate} value={this.state.dueDate} minDate={new Date()} required={true} format="dd.MM.yyyy" locale="de-DE"/><br/>
                                            </div>
                                            <div className="form-group">
                                                {this.state.displaySpinner && <Spinner animation="border" variant="primary" />}
                                                {!this.state.displaySpinner && <input type="submit" value="Create" className="btn btn-primary btn-block" />}
                                            </div>
                                        </form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>  

                <Modal show={this.state.displayModal}>
                    <Modal.Header>
                        <Modal.Title>Alert!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.onModalClose()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
