import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import DataTodo from "../src/database/todo.json";
import DataTodoDeleted from "../src/database/todoDeleted.json";
import { TodoApp, InputTodo, Lists } from "./TODO_APP/TodoApp";
import { SetColor } from "./TODO_APP/TodoApp";
import "../src/SCSS/style.scss";
import {
  AppNode,
  DarkTheme,
  LightTheme,
  ContainerList,
  SpinEffect,
} from "./SCSS/Styled Components/tagStyled";
import { ThemeProvider } from "styled-components";

export const App = () => {
  const [todo, setTodo] = useState([]);
  const [deleteTodo, setDeleteTodo] = useState([]);
  const [updatedTodo, setUpdatedTodo] = useState({
    id: "",
    title: "",
  });
  const [theme, setTheme] = useState(DarkTheme);

  //TODO: Call API để binding data (đã edit thành Data cứng được import từ file json)
  useEffect(() => {
    setTodo(DataTodo);
    setDeleteTodo(DataTodoDeleted);
  }, []);

  //TODO: Set color for title
  // const setColorTitle = () => {
  //   const colorR = Math.floor(Math.random() * 256);
  //   const colorG = Math.floor(Math.random() * 256);
  //   const colorB = Math.floor(Math.random() * 256);

  //   setTodoApp({
  //     ...todoApp,
  //     colorTitle: `rgb(${colorR}, ${colorG},${colorB})`,
  //   });
  // };

  //* Function create auto random color for colorTitle & colorEffect
  // const autoRandomColor = () => {
  //   const colorR = Math.floor(Math.random() * 256)
  //   const colorG = Math.floor(Math.random() * 256)
  //   const colorB = Math.floor(Math.random() * 256)
  //   return (
  //     `rgb(${colorR}, ${colorG}, ${colorB})`
  //   )
  // }

  //Sử dụng UseEffect để kết hợp render lại các state thay đổi
  // useEffect(() => {
  //   setTimeout(() => {
  //     setColorEffects(colorEffect = autoRandomColor())
  //     setTodoApp({
  //       ...todoApp,
  //       colorTitle: autoRandomColor(),
  //     })
  //   }, 1000)
  // }, [colorEffect])

  //TODO: Set color for effect
  // const setColorEffect = () => {
  //   const colorAblum = ["red", "blue", "green", "yellow", "white", "aqua"];
  //   const colorLenght = colorAblum.length;
  //   const colorRandom = Math.floor(Math.random() * colorLenght);
  //   setColorEffects(colorAblum[colorRandom]);
  // };

  //TODO: Change Theme
  /**
   * * Thực hiện thay đổi theme cho TodoApp với Styled-components
   * * Theme Style đã được định nghĩa từ trước
   * * Ta chỉ việc click button để thay đổi theme như ý
   */
  const changeTheme = () => {
    if (theme === DarkTheme) {
      setTheme(LightTheme);
    } else {
      setTheme(DarkTheme);
    }
  };

  //TODO: Setstate checkbox and text todo
  /**
   * * Function nhận lại id của item cần checkbox
   * * Thực hiện setState thuộc tính Completed của item đó lại (dùng toán tử not !)
   */
  const checkTodo = (id) => {
    setTodo(
      todo.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
    setDeleteTodo(
      deleteTodo.map((deleteTodo) => {
        if (deleteTodo.id === id) {
          deleteTodo.completed = !deleteTodo.completed;
        }
        return deleteTodo;
      })
    );
  };

  //TODO: Add todo into lists
  const handlerAdd = (name) => {
    //check text input có bị trùng với 1 trong các todo đã có hay ko
    var checkTodoText = true;
    todo.map((todo) => {
      if (todo.title === name) {
        checkTodoText = false;
      }
    });

    //Check text input có phải toàn space hay ko
    var checkSpaceText = name.replace(/\s/g, "").length;

    if (name !== "" && checkTodoText === true && checkSpaceText) {
      var addCV = {
        id: v4(),
        title: name,
        completed: false,
      };

      setTodo([...todo, addCV]);
    }

    //* Reset lại ô Input
    setUpdatedTodo({
      id: "",
      title: "",
    });
  };

  //TODO: Delete todo in lists
  const handlerDelete = (itemDelete, listTodo) => {
    if (listTodo === "Task List") {
      setTodo([
        ...todo.filter((todo) => {
          return todo.id !== itemDelete.id;
        }),
      ]);
    } else if (listTodo === "Deleted task list") {
      setDeleteTodo([
        ...deleteTodo.filter((todo) => {
          return todo.id !== itemDelete.id;
        }),
      ]);
    }
  };

  //TODO: Edit todo
  const editTodo = (itemUpdate) => {
    setUpdatedTodo({
      id: itemUpdate.id,
      title: itemUpdate.title,
    });
  };

  //TODO: Updated Todo
  const updateTodo = (itemUpdate) => {
    setTodo(
      todo.filter((item) => {
        if (item.id === itemUpdate.id) {
          item.title = itemUpdate.title;
        }
        return todo;
      })
    );

    //* Reset lại ô Input
    setUpdatedTodo({
      id: "",
      title: "",
    });
  };

  //TODO: Completed & Restore todo
  const exchangeTodo = (itemExchange, listTodo) => {
    //* Copy item cần chuyển
    var addCV = {
      id: itemExchange.id,
      title: itemExchange.title,
      completed: itemExchange.completed,
    };

    if (listTodo === "Task List") {
      //* Delete nó khỏi Todo array và Add nó vào Deleted array
      setTodo([
        ...todo.filter((todo) => {
          return todo.id !== itemExchange.id;
        }),
      ]);
      setDeleteTodo([...deleteTodo, addCV]);
    } else if (listTodo === "Deleted task list") {
      //* Delete nó khỏi Todo array và Add nó vào Deleted array
      setTodo([...todo, addCV]);
      setDeleteTodo([
        ...deleteTodo.filter((todo) => {
          return todo.id !== itemExchange.id;
        }),
      ]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section>
        <AppNode className="app__node">
          <TodoApp />
          <InputTodo
            handlerAdd={handlerAdd}
            updatedTodo={updatedTodo}
            setUpdatedTodo={setUpdatedTodo}
            updateTodo={updateTodo}
          />

          <SetColor changeTheme={changeTheme} />

          <ContainerList>
            <Lists
              todo={todo}
              checkTodo={checkTodo}
              handlerDelete={handlerDelete}
              exchangeTodo={exchangeTodo}
              editTodo={editTodo}
              listTodo="Task List"
            />
            <Lists
              todo={deleteTodo}
              checkTodo={checkTodo}
              handlerDelete={handlerDelete}
              exchangeTodo={exchangeTodo}
              listTodo="Deleted task list"
            />
          </ContainerList>
        </AppNode>

        <div className="effect">
          <SpinEffect></SpinEffect>
          <span className="effect__black"></span>
          <span className="effect__black"></span>
          <SpinEffect></SpinEffect>
        </div>
      </section>
    </ThemeProvider>
  );
};
