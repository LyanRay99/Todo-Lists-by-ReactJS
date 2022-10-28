import React from 'react'

export class Item extends React.Component {
    render() {
        // const [id, names, check] = this.props.todo;
        return (
            < div className='lists__node' >
                <input
                    type='checkbox'
                    checked={this.props.todo.check}
                    onChange={() => this.props.checkTodo(this.props.todo.id)} //todo: đưa function đã tạo tạo 1 arrow function để nó ko bị lặp vô hạn
                ></input>
                <p
                    style={{ textDecoration: this.props.todo.checkTodo }}
                >{this.props.todo.name}</p>
                <div
                    onClick={() => this.props.handlerDelete(this.props.todo.id)}
                >
                    <span>x</span>
                </div>
            </div >
        )
    }
}



//TODO: UUID để random ra dãy số ngẫu nhiên không trùng nhau theo thời gian

