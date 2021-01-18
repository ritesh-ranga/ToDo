import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Card, Alert, Button, Modal } from 'react-bootstrap';

export default class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayDeleteModal : false,
            displayUpdateModal : false,
            selectedToDo: -1
        }

        this.onDelete = this.onDelete.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
        this.onDeleteCancel = this.onDeleteCancel.bind(this);

        this.onUpdate = this.onUpdate.bind(this);
        this.onUpdateConfirm = this.onUpdateConfirm.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);
    }

    onDelete(value) {
        this.setState({ selectedToDo: value })
        this.setState({ displayDeleteModal: true })
    }

    onDeleteConfirm() {
        this.setState({ displayDeleteModal: false })

        const url = `http://localhost:51191/ToDo/${this.state.selectedToDo}`;

        axios.delete(url)
            .then((res) => {
                this.props.callbackFunction(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ selectedToDo: -1 })
    }

    onDeleteCancel() {
        this.setState({ selectedToDo: -1 })
        this.setState({ displayDeleteModal: false })
    }

    onUpdate(value) {
        this.setState({ selectedToDo: value })
        this.setState({ displayUpdateModal: true })
    }

    onUpdateConfirm() {
        this.setState({ displayUpdateModal: false })

        const url = `http://localhost:51191/ToDo/${this.state.selectedToDo}`;

        axios.put(url)
            .then((res) => {
                this.props.callbackFunction(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ selectedToDo: -1 })
    }

    onUpdateCancel() {
        this.setState({ selectedToDo: -1 })
        this.setState({ displayUpdateModal: false })
    }
    
    render() {
        if (!this.props.todos || this.props.todos.length === 0) return <Alert variant="info">No Todos! Try adding some.</Alert>;
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>Available ToDos:</Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.todos.map((todo) => {
                                                return (
                                                <tr key={todo.id}>
                                                    <td>{todo.id}</td>
                                                    <td>
                                                        <span>{todo.name} </span>
                                                    </td>
                                                    <td>
                                                        <span>{new Date(todo.dueDate).toLocaleDateString('de-DE')}</span>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            { 
                                                                todo.isComplete ? 
                                                                <Alert variant="success" size="sm">
                                                                    Completed!
                                                                </Alert>: 
                                                                <Alert variant="warning" size="sm">
                                                                    Pending!
                                                                </Alert> 
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            { 
                                                                todo.isComplete ? 
                                                                <Button onClick={() => this.onDelete(todo.id)} variant="danger" size="sm" block>Delete</Button>: 
                                                                <Button onClick={() => this.onUpdate(todo.id)} variant="success" size="sm" block>Mark as done</Button>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.displayDeleteModal}>
                    <Modal.Header>
                        <Modal.Title>Delete ToDo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.onDeleteCancel()}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => this.onDeleteConfirm()}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.displayUpdateModal}>
                    <Modal.Header>
                        <Modal.Title>Update ToDo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to mark this as done?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.onUpdateCancel()}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => this.onUpdateConfirm()}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal>
          </div>
        );
    }
}
