import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId:string,taskId: string) => void
    changeFilter: (todolistId:string,value: FilterValuesType) => void
    addTask: (todolistId:string,title: string) => void
    changeStatus:(todolistId:string,taskID:string,checkedValue:boolean)=>void
    todolistId: string
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>('')
    const [buttonName, setButtonName] = useState<string>('all')

    const addTask = () => {
        if (title.trim()) {
        props.addTask(props.todolistId,title.trim());
        setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('Title is required')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onChangeFilter = (todolistId:string, value:FilterValuesType) => {
        props.changeFilter(todolistId, value);
        setButtonName(value)
    }


    const changeStatusHandler=(taskId: string, checkedValue:boolean)=>{
        // console.log(event.currentTarget.checked)
        props.changeStatus(props.todolistId,taskId, checkedValue)
    }



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={error ? s.error : ''}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />

            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={s.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId,t.id)


                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>)=> changeStatusHandler(t.id, e.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={ buttonName === 'all' ? s.activeFilter : ''} onClick={ ()=>{onChangeFilter(props.todolistId,'all')} }>All</button>
            <button className={ buttonName === 'active' ? s.activeFilter : ''} onClick={()=>{onChangeFilter(props.todolistId,'active')}}>Active</button>
            <button className={ buttonName === 'completed' ? s.activeFilter : ''} onClick={()=>{onChangeFilter(props.todolistId,'completed')}}>Completed</button>
        </div>
    </div>
}
