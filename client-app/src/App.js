import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import List from './component/List';
import AddItem from './component/AddItem';
import { Container, Row, Col } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
          todos: null
      }
  }

  getAllToDos() {
    const apiUrl = 'http://localhost:51191/todo';
    axios.get(apiUrl).then((todos) => {
      const alltodos = todos.data;
      this.setState(() => {
        return { todos: alltodos };
      });
    }).catch(error => console.log(error));
  }
  
  componentDidMount () {
    this.getAllToDos();
  }

  callbackFunction = (dataFromChild) => {
    this.setState({ todos: dataFromChild });
  }

  render() {
    return (
      <Container fluid>
      <Row>
        <Col md={12}>
          <div style={{textAlign: 'center'}}><h1>ToDo Application</h1></div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <List todos={this.state.todos} callbackFunction={this.callbackFunction}/>
        </Col>
        <Col md={6}>
          <AddItem callbackFunction={this.callbackFunction}></AddItem>
        </Col>
      </Row>
    </Container>
    )
  }
}

