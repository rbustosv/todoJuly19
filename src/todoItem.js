import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: props.todoItem.done
    };
  }
  
  toggleDone = () => {
    fetch(`http://rsbv-todo-list-api.herokuapp.com/todo/${this.props.todoItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.props.todoItem.title,
        done: !this.state.done
      })
    })
    .then(
      this.setState({
        done: !this.state.done
      })
    )
    .catch(error => console.log(error))
  }; 

  render() {
    return (
      <div className="todo-item">
        <input
          onClick={this.toggleDone}
          type="checkbox"
          defaultChecked={this.state.done}
        />
        <p className={this.state.done ? "done" : null}>{this.props.todoItem.title}</p>
        <button onClick={() => this.props.deleteItem(this.props.todoItem.id)}>X</button>
      </div>
    );
  }
}

export default TodoItem;
