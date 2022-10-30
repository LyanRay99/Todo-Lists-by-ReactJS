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
      todo: [
        // {
        //   id: v4(),
        //   name: 'HTML',
        //   check: false,
        //   checkTodo: 'none',
        // },
        // {
        //   id: v4(),
        //   name: 'CSS',
        //   check: false,
        //   checkTodo: 'none',
        // },
        // {
        //   id: v4(),
        //   name: 'Javascript',
        //   check: true,
        //   checkTodo: 'line-through',
        // }
      ]
    })

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.data)
      .then(json => {
        setTodo({
          todo: json
        });
      })
  }, [])

  //TODO: Test UseEffect
  // useEffect(
  //   () => {
  //     console.log(`title: ${todoApp.title}`)
  //   }, [todoApp.title])

  // useEffect(
  //   () => {
  //     console.log(`color title: ${todoApp.colorTitle}`)
  //   }, [todoApp.colorTitle])

  // useEffect(
  //   () => {
  //     console.log(`effect: ${todoApp.colorEffect}`)
  //   }, [todoApp.colorEffect])

  //TODO: Set color for title
  const setColorTitle = () => {
    const colorR = Math.floor(Math.random() * 256)
    const colorG = Math.floor(Math.random() * 256)
    const colorB = Math.floor(Math.random() * 256)

    //Cách set colortitle thứ nhất (dùng Rest Operator)
    setTodoApp({
      ...todoApp,
      colorTitle: `rgb(${colorR}, ${colorG},${colorB})`,
    })

    //Cách set colortitle thứ hai (cách này sẽ dài dòng hơn nhưng nó ko làm render lại những value ko thay đổi)
    // setTodoApp(
    //   {
    //     title: 'TODO APP',
    //     colorTitle: colorAblum[colorRandom],
    //     colorEffect: todoApp.colorEffect,
    //   }
    // )
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
        // id: v4(),
        title: name,
        completed: false,
        // checkTodo: 'none',
      }

      //gọi API add todo vào list
      axios.post('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.data)
        .then(json => {
          setTodo({
            todo: [...state.todo, addCV]
          })
        })
    }
  }

  //TODO: Delete todo in lists
  const handlerDelete = (id) => {
    //gọi API delete todo khỏi list
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => response.data)
      .then(json => {
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



