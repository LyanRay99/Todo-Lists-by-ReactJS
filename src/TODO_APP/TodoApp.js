import React, { useState } from 'react'
import { Item } from './Item'
import '../CSS/style.css'

export const TodoApp = (props) => {

    return (
        <div className='title'>
            <h1 style={{
                color: props.colorTitle
            }}>
                {props.title}
            </h1>
        </div>
    )
}


export const InputTodo = (props) => {
    const [names, setNames] = useState('')

    const changValue = (textInput) => {
        console.log(names)
        setNames(
            textInput.target.value
        )
    }

    return (
        <div className='inputTodo'>
            <input
                type='text'
                placeholder='Input Todo'
                value={names}
                onChange={changValue}
            ></input>
            <button onClick={() => {
                props.handlerAdd(names);
                setNames('')
            }}
            >Add</button>
        </div >
    )
}



export const Lists = (props) => {
    return (
        <div className='lists'>
            {
                props.todo.map(
                    (x) => (
                        <Item
                            key={x.id}
                            todo={x}
                            checkTodo={props.checkTodo}
                            handlerDelete={props.handlerDelete}
                        />
                    )
                )
            }
        </div>
    )
}


export const SetColor = (props) => {

    return (
        <div className='setColor'>
            <button onClick={props.setColorTitle}>Set Color Title</button>
            <button onClick={props.setColorEffect}>Set Color Effect</button>
        </div>
    )
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