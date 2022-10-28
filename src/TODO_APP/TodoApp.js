import React from 'react'
import { Item } from './Item'
import '../CSS/style.css'

export class TodoApp extends React.Component {
    colorTitle = this.props.todoApp.colorTitle;
    render() {
        return (
            <div className='title'>
                <h1 style={{ color: this.props.todoApp.colorTitle }}>{this.props.todoApp.title}</h1>
            </div>
        )
    }
}

export class InputTodo extends React.Component {
    state = {
        names: "",
    }

    changValue = (textInput) => {
        this.setState({
            names: textInput.target.value
        })
    }

    render() {
        return (
            <div className='inputTodo'>
                <input
                    type='text'
                    placeholder='Input Todo'
                    value={this.state.names}
                    onChange={this.changValue}
                ></input>
                <button onClick={() => (
                    this.props.handlerAdd(this.state.names),
                    this.setState({
                        names: ""
                    })
                )}
                >Add</button>
            </div >
        )
    }
}


export class Lists extends React.Component {
    render() {
        return (
            <div className='lists'>
                {
                    this.props.todo.map(
                        (x) => (
                            <Item
                                key={x.id}
                                todo={x}
                                checkTodo={this.props.checkTodo}
                                handlerDelete={this.props.handlerDelete}
                            />
                        )
                    )
                }
            </div>
        )
    }
}

export class SetColor extends React.Component {
    render() {
        // console.log(this.props.SetColor);
        return (
            <div className='setColor'>
                <button onClick={this.props.setColorTitle}>Set Color Title</button>
                <button onClick={this.props.setColorEffect}>Set Color Effect</button>
            </div>
        )
    }


}

//TODO: Effects
export class AppEffect extends React.Component {
    render() {
        return (
            <div className='appEffect'>
                <div className='appEffect__bgc'></div>
                <div className='appEffect__black'></div>
                <div className='appEffect__black'></div>
                <div className='appEffect__bgc'></div>
            </div>
        )
    }
}