import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid'
import axios from "axios"
import { TodoApp, InputTodo, Lists } from './TODO_APP/TodoApp';
import { AppEffect, SetColor } from './TODO_APP/TodoApp';
import '../src/CSS/style.css'

//TODO: CLASS COMPONENT
export const App = () => {
  const [todoApp, setTodoApp] = useState({
    title: 'TODO APP',
    colorTitle: 'red',
  })
  var [colorEffect, setColorEffects] = useState('aqua')
  const [state, setTodo] = useState(
    {
      todo: []
    })

  useEffect(() => {
    fetch('http://localhost:8000/todo')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTodo({
          todo: data
        })
      })
  }, [])

  //TODO: Set color for title
  const setColorTitle = () => {
    const colorR = Math.floor(Math.random() * 256)
    const colorG = Math.floor(Math.random() * 256)
    const colorB = Math.floor(Math.random() * 256)

    setTodoApp({
      ...todoApp,
      colorTitle: `rgb(${colorR}, ${colorG},${colorB})`,
    })
  }

  //Function create auto random color for colorTitle & colorEffect
  const autoRandomColor = () => {
    const colorR = Math.floor(Math.random() * 256)
    const colorG = Math.floor(Math.random() * 256)
    const colorB = Math.floor(Math.random() * 256)
    return (
      `rgb(${colorR}, ${colorG}, ${colorB})`
    )
  }

  //Sử dụng UseEffect để kết hợp render lại các state thay đổi
  useEffect(() => {
    setTimeout(() => {
      setColorEffects(colorEffect = autoRandomColor())
      setTodoApp({
        ...todoApp,
        colorTitle: autoRandomColor(),
      })
    }, 1000)
  }, [colorEffect])

  //TODO: Set color for effect
  const setColorEffect = () => {
    const colorAblum = ['red', 'blue', 'green', 'yellow', 'white', 'aqua'];
    const colorLenght = colorAblum.length;
    const colorRandom = Math.floor(Math.random() * colorLenght);
    setColorEffects(colorAblum[colorRandom])
  }

  //TODO: Setstate checkbox and text todo
  const checkTodo = (id) => {
    setTodo({
      todo: state.todo.map(
        todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
            // todo.checkTodo === 'none' ? todo.checkTodo = 'line-through' : todo.checkTodo = 'none';
          }
          return todo;
        }
      )
    })
  }

  //TODO: Add todo into lists
  const handlerAdd = (name) => {
    //check text input có bị trùng với 1 trong các todo đã có hay ko
    var checkTodoText = true;
    state.todo.map(todo => {
      if (todo.title === name) {
        checkTodoText = false
      }
    })

    //Check text input có phải toàn space hay ko
    var checkSpaceText = name.replace(/\s/g, "").length;

    if (name !== "" && checkTodoText === true && checkSpaceText) {
      var addCV = {
        userId: v4(),
        id: v4(),
        title: name,
        completed: false,
      }
      console.log(JSON.stringify(addCV))
      //gọi API add todo vào list
      fetch('http://localhost:8000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addCV)
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setTodo({
            todo: [...state.todo, addCV]
          })
        })
    }
  }

  //TODO: Delete todo in lists
  const handlerDelete = (id) => {
    //gọi API delete todo khỏi list
    fetch(`http://localhost:8000/todo/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(id)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTodo({
          todo: [...state.todo.filter(todo => {
            return todo.id !== id;
          })]
        })
      })
  }

  return (
    <section>
      <div className='app__node'>
        <TodoApp
          title={todoApp.title}
          colorTitle={todoApp.colorTitle}
        />
        <InputTodo
          handlerAdd={handlerAdd}
        />
        <SetColor
          setColorTitle={setColorTitle}
          setColorEffect={setColorEffect}
        />
        <Lists
          todo={state.todo}
          checkTodo={checkTodo}
          handlerDelete={handlerDelete}
        />
      </div>

      <div className='effect'>
        <span
          className='effect__bgc'
          style={{ backgroundColor: colorEffect }}>
        </span>
        <span className='effect__black'></span>
        <span className='effect__black'></span>
        <span
          className='effect__bgc'
          style={{ backgroundColor: colorEffect }}>
        </span>
      </div>
    </section>
  )
}



