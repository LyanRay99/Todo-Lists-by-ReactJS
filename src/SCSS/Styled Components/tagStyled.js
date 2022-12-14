//TODO: Styled Component
import styled from "styled-components";

//TODO: Theme mode
export const DarkTheme = {
  title: {
    color: "greenyellow",
    background: "rgb(84, 80, 80)",
  },
  input: {
    border: "2px solid white",
  },
  button: {
    color: "black",
    background: "greenyellow",
  },
  list: {
    color: "white",
  },
};

export const LightTheme = {
  title: {
    color: "black",
    background: "white",
  },
  input: {
    border: "2px solid black",
  },
  button: {
    color: "greenyellow",
    background: "black",
  },
  list: {
    color: "black",
  },
};

//TODO: Tag
export const AppNode = styled.div`
  background: ${(props) => props.theme.title.background};
`;

export const MainTitle = styled.h1`
  color: ${(props) => props.theme.title.color};
  border: 2px solid ${(props) => props.theme.title.color};
  border-radius: 30px;
  padding: 10px 0px;
  text-align: center;
  /* margin: auto; */
`;

export const SetBtn = styled.button`
  background-color: ${(props) => props.theme.button.background};
  color: ${(props) => props.theme.button.color};
`;

export const ContainerList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ContainerIcon = styled.div`
  display: flex;
  justify-content: right;
`;

export const Icon = styled.span`
  padding: 0px 5px;
  color: ${(props) => props.color};
`;

export const InputTodoList = styled.input`
  border: ${(props) => props.theme.input.border};
`;

export const Content = styled.p`
  color: ${(props) => props.theme.list.color};
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.title.color};
  text-align: center;
`;
