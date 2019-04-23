import React, { Component } from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Todos from './components/Todos.js';
import AddTodo from "./components/AddTodo";
import Header from "./components/layout/Header.js"; 
// import uuid from 'uuid'; 

import './App.css';
import About from './components/pages/About.js';
import Axios from 'axios';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount(){
    Axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => this.setState({todos:res.data}));
  }

  //inverse value of completed
  markComplete = id => {
    this.setState({
      todo: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  //delete Todo
  delTodo = id => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res=>this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))
     
  };
  //add Todo
  addTodo = title => {
    // const newTodo = { id: uuid.v4(), title, completed: false };
    Axios.post("https://jsonplaceholder.typicode.com/todos",{
      title,
      completed:false
    }).then(res => this.setState({todos:
       [...this.state.todos, res.data]}));
    
    
  };
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props=>(
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  myTodos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
