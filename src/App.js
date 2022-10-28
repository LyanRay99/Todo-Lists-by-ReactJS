import React from 'react';
import { TodoApp, InputTodo, Lists } from './TODO_APP/TodoApp';
import { AppEffect, SetColor } from './TODO_APP/TodoApp';
import { v4 } from 'uuid'
import '../src/CSS/style.css';

//TODO: CLASS COMPONENT
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'TODO APP',
      colorTitle: 'red',
      colorEffect: 'blue',
      todo: [
        {
          id: v4(),
          name: 'HTML',
          check: false,
          checkTodo: 'none',
        },
        {
          id: v4(),
          name: 'CSS',
          check: false,
          checkTodo: 'none',
        },
        {
          id: v4(),
          name: 'Javascript',
          check: true,
          checkTodo: 'line-through',
        },
      ]
    }
  }

  //TODO: Set color for title
  setColorTitle = () => {
    const colorAblum = ['red', 'blue', 'green', 'yellow', 'white', 'aqua'];
    const colorLenght = colorAblum.length;
    const colorRandom = Math.floor(Math.random() * colorLenght);

    this.setState(
      {
        colorTitle: colorAblum[colorRandom]
      }
    )
  }

  //TODO: Set color for effect
  setColorEffect = () => {
    if (this.state.colorEffect == 'blue') {
      this.setState(
        { colorEffect: 'red' }
      )
    }
    else if (this.state.colorEffect == 'red') {
      this.setState(
        { colorEffect: 'greenyellow' }
      )
    }
    else {
      this.setState(
        { colorEffect: 'blue' }
      )
    }
  }

  //TODO: Setstate checkbox and text todo
  checkTodo = (id) => {
    this.setState({
      todo: this.state.todo.map(
        todo => {
          if (todo.id === id) {
            todo.check = !todo.check;
            todo.checkTodo === 'none' ? todo.checkTodo = 'line-through' : todo.checkTodo = 'none';
          }
          return todo;
        }
      )
    })
  }

  //TODO: Add todo into lists
  handlerAdd = (name) => {
    var checkTodoText = true;
    this.state.todo.map(todo => {
      if (todo.name === name) {
        checkTodoText = false
      }
    })

    var checkSpaceText = name.replace(/\s/g, "").length;

    if (name !== "" && checkTodoText === true && checkSpaceText) {
      var addCV = {
        id: v4(),
        name: name,
        check: false,
        checkTodo: 'none',
      }

      this.setState(
        {
          todo: [...this.state.todo, addCV]
        }
      )
    }
  }


  //TODO: Delete todo in lists
  handlerDelete = (id) => {
    this.setState({
      todo: [
        ...this.state.todo.filter(todo => {
          return todo.id !== id;
        })
      ]
    })
  }

  render() {
    return (
      <section>
        <div className='app__node'>
          <TodoApp todoApp={this.state} />
          <InputTodo handlerAdd={this.handlerAdd}
          />
          <SetColor
            setColorTitle={this.setColorTitle}
            setColorEffect={this.setColorEffect}
          />
          <Lists
            todo={this.state.todo}
            checkTodo={this.checkTodo}
            handlerDelete={this.handlerDelete}
          />
        </div>

        <div className='effect'>
          <span
            className='effect__bgc'
            style={{ backgroundColor: this.state.colorEffect }}>
          </span>
          <span className='effect__black'></span>
          <span className='effect__black'></span>
          <span
            className='effect__bgc'
            style={{ backgroundColor: this.state.colorEffect }}>
          </span>
        </div>
      </section>
    )
  }
}

export default App;

