import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faRotateLeft,
  faSquareCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  ContainerIcon,
  Icon,
  Content,
} from "../SCSS/Styled Components/tagStyled";

export const Item = (props) => {
  return (
    <div className="lists__node">
      <div className="lists__node__childs">
        <input
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => props.checkTodo(props.todo.id)} //todo: đưa function đã tạo tạo 1 arrow function để nó ko bị lặp vô hạn
        ></input>

        <Content
          style={
            props.todo.completed === true
              ? { textDecoration: "line-through" }
              : {}
          }
        >
          {props.todo.title}
        </Content>
      </div>

      <ContainerIcon>
        {props.listTodo === "Task List" ? (
          <React.Fragment>
            <Icon>
              <FontAwesomeIcon
                color="orange"
                icon={faPenToSquare}
                onClick={() => props.editTodo(props.todo)}
              />
            </Icon>
            <Icon>
              <FontAwesomeIcon
                color="green"
                icon={faSquareCheck}
                onClick={() => props.exchangeTodo(props.todo, props.listTodo)}
              />
            </Icon>
            <Icon>
              <FontAwesomeIcon
                color="red"
                icon={faTrash}
                onClick={() => props.handlerDelete(props.todo, props.listTodo)}
              />
            </Icon>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Icon>
              <FontAwesomeIcon
                color="aqua"
                icon={faRotateLeft}
                onClick={() => props.exchangeTodo(props.todo, props.listTodo)}
              />
            </Icon>
            <Icon>
              <FontAwesomeIcon
                color="red"
                icon={faTrash}
                onClick={() => props.handlerDelete(props.todo, props.listTodo)}
              />
            </Icon>
          </React.Fragment>
        )}
      </ContainerIcon>
    </div>
  );
};
