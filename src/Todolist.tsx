import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus:(taskID:string,checkedValue:boolean)=>void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>('')
    const [buttonName, setButtonName] = useState<string>('all')

    const addTask = () => {
        if (title.trim()) {
        props.addTask(title.trim());
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

    const onAllClickHandler = () => {
        props.changeFilter("all");
        setButtonName('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active");
        setButtonName('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
        setButtonName('completed')
    }

    const changeStatusHandler=(taskId: string, checkedValue:boolean)=>{
        // console.log(event.currentTarget.checked)
        props.changeStatus(taskId, checkedValue)
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
                    const onClickHandler = () => props.removeTask(t.id)


                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>)=> changeStatusHandler(t.id, e.currentTarget.checked)}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={ buttonName === 'all' ? s.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={ buttonName === 'active' ? s.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={ buttonName === 'completed' ? s.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
