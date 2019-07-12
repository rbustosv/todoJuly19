import React from "react";
import ReactDOM from "react-dom";

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

  renderTodos = () => {
    return this.state.todos.map((todo, index) => {
      return <TodoItem title={todo} key={index} />;
    });
  };

  handleChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      //pushing  (spreading) todo elements into the array
      todos: [...this.state.todos, this.state.todo],
      todo: "" //cleaning text area
    });
  };

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
