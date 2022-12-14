import React from "react";
import { Item } from "./Item";
import "../SCSS/style.scss";
import {
  MainTitle,
  SetBtn,
  InputTodoList,
  Title,
} from "../SCSS/Styled Components/tagStyled";

export const TodoApp = (props) => {
  return (
    <div className="title">
      <MainTitle>TODO APP</MainTitle>
    </div>
  );
};

export const InputTodo = (props) => {
  return (
    <div className="inputTodo">
      <InputTodoList
        type="text"
        placeholder="Input Todo"
        value={props.updatedTodo.title}
        onChange={(e) => {
          props.setUpdatedTodo({
            id: props.updatedTodo.id,
            title: e.target.value,
          });
        }}
      ></InputTodoList>

      <SetBtn
        className="updateBtn"
        onClick={() => {
          props.updateTodo(props.updatedTodo);
        }}
      >
        Update
      </SetBtn>

      <SetBtn
        onClick={() => {
          props.handlerAdd(props.updatedTodo.title);
        }}
      >
        Add
      </SetBtn>
    </div>
  );
};

export const Lists = (props) => {
  return (
    <div className="listTotal" style={{ display: "block" }}>
      {props.listTodo === "Task List" ? (
        <Title>Task List</Title>
      ) : (
        <Title>Deleted List</Title>
      )}
      <div className="lists">
        {props.todo.map((x, index) => (
          <Item
            key={x.id}
            index={index}
            todo={x}
            checkTodo={props.checkTodo}
            handlerDelete={props.handlerDelete}
            listTodo={props.listTodo}
            exchangeTodo={props.exchangeTodo}
            editTodo={props.editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export const SetColor = (props) => {
  return (
    <div className="setColor">
      <SetBtn onClick={props.changeTheme}>Set Theme</SetBtn>
    </div>
  );
};
