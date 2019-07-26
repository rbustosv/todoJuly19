import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";
import TodoItem from "./todoItem";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: "",
      todos: []
    };
  }

  componentDidMount(){
    fetch("http://rsbv-todo-list-api.herokuapp.com/todos")
     .then(response => response.json())
     .then(data => this.setState({ todos: data}));
  }


  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
      <TodoItem 
      key={todo.id} 
      todoItem={todo}
      deleteItem={this.deleteItem}
      />
      );
    });
  };

  handleChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://rsbv-todo-list-api.herokuapp.com/add-todo",
      headers: { "content-type": "application/json"},
      data: {
        title: this.state.todo,
        done: false
      }
    })
    .then(data => {
      this.setState({
        //pushing  (spreading) todo elements into the array
        todos: [...this.state.todos, data.data],
        todo: "" //cleaning text area
      });

    })
    .catch(error => console.log(error));

  };

  deleteItem = id => {
    fetch(`http://rsbv-todo-list-api.herokuapp.com/todo/${id}`,{
      method: "DELETE"
    })
    .then(
     this.setState({
       todos: this.state.todos.filter(item => {
         return item.id !== id//updating content showing records ignoring id deleted
       })
     })
    )

  }


  render() {
    return (
      <div className="App">
        <h1>ToDo List</h1>
        <form onSubmit={this.handleSubmit} className="add-todo">
          <input
            type="text"
            placeholder="Add todo"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
