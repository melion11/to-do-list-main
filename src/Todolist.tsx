import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'
import {AddForm} from './Components/AddForm';
import {EditableSpan} from './Components/EditableSpan';
import {Button,  IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskID: string, checkedValue: boolean) => void
    todolistId: string
    editTaskTitle: (todolistId: string, taskID: string, newTaskTitle: string) => void
    editTodoListTitle: (todoListId: string, newTodoListTitle: string) => void

}

export function Todolist(props: PropsType) {


    const [buttonName, setButtonName] = useState<string>('all')


    const onChangeFilter = (todolistId: string, value: FilterValuesType) => {
        props.changeFilter(todolistId, value);
        setButtonName(value)
    }


    const changeStatusHandler = (taskId: string, checkedValue: boolean) => {
        // console.log(event.currentTarget.checked)
        props.changeStatus(props.todolistId, taskId, checkedValue)
    }

    const addTaskHandler = (newTaskTitle: string) => {
        props.addTask(props.todolistId, newTaskTitle)
    }

    const editTodoListHandler = (newTodoListTitle: string) => {
        props.editTodoListTitle(props.todolistId, newTodoListTitle)
    }

    const editTaskHandler = (taskId:string,newTaskTitle: string) => {
        props.editTaskTitle(props.todolistId, taskId, newTaskTitle)
    }

    return <div>
        <h3> <EditableSpan callBack={editTodoListHandler} title={props.title}/> </h3>
        <div>

            <AddForm callBack={addTaskHandler}/>

        </div>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)



                    return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                        <Checkbox  checked={t.isDone}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => changeStatusHandler(t.id, e.currentTarget.checked)}/>
                        <EditableSpan callBack={(updateTitle)=>editTaskHandler(t.id,updateTitle)} title={t.title}/>
                        <IconButton onClick={onClickHandler} aria-label="delete"><DeleteIcon /></IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={buttonName === 'all' ? 'contained' : 'outlined'} color={'primary'}
                    onClick={() => {
                onChangeFilter(props.todolistId, 'all')
            }}>All
            </Button>
            <Button variant={buttonName === 'active' ? 'contained' : 'outlined'} color={'secondary'}
                    onClick={() => {
                onChangeFilter(props.todolistId, 'active')
            }}>Active
            </Button>
            <Button variant={buttonName === 'completed' ? 'contained' : 'outlined'} color={'success'}
                    onClick={() => {
                onChangeFilter(props.todolistId, 'completed')
            }}>Completed
            </Button>
        </div>
    </div>
}
