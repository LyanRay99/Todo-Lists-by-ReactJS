import React from 'react'

export const Item = (props) => {
    // const [id, names, check] = this.props.todo;
    return (
        < div className='lists__node' >
            <input
                type='checkbox'
                checked={props.todo.completed}
                onChange={() => props.checkTodo(props.todo.id)} //todo: đưa function đã tạo tạo 1 arrow function để nó ko bị lặp vô hạn
            ></input>
            <p
            // style={{ textDecoration: props.todo.checkTodo }}
            >{props.todo.title}</p>
            <div
                onClick={() => props.handlerDelete(props.todo.id)}
            >
                <span>x</span>
            </div>
        </div >
    )
}





