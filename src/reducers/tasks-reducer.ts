import {TasksStateType} from '../App';
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer';



export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todoID]: state[action.payload.todoID].filter(task => task.id !== action.payload.taskID)}
        }
        case 'ADD-TASK': {
            return {...state, [action.payload.todID]: [{id: '3', title: action.payload.newTitle, isDone: false},...state[action.payload.todID]]}
        }
        case 'CHANGE-STATUS-TASK': {
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(task => task.id === action.payload.taskID ? {...task, isDone: action.payload.changeValue} : task)}
        }
        case 'EDIT-TASK-TITLE': {
            return {...state, [action.payload.todoID]: state[action.payload.todoID].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.newTaskTitle} : task)}
        }
        case 'ADD-NEW-TODO': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default: throw new Error('wrong action type')
    }
}


type ActionsType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | EditTaskTitleAC | AddTodolistACType | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type EditTaskTitleAC = ReturnType<typeof editTaskTitleAC>

export const removeTaskAC = (todoID: string, taskID:string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoID,
            taskID
        }
    } as const
}

export const addTaskAC = (todID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todID,
            newTitle
        }
    } as const
}

export const changeStatusAC = (todoID: string, taskID:string, changeValue: boolean) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        payload: {
            todoID,
            taskID,
            changeValue
        }
    } as const
}

export  const editTaskTitleAC = (todoID: string, taskId: string, newTaskTitle: string) => {
    return {
        type: 'EDIT-TASK-TITLE',
        payload: {
            todoID,
            taskId,
            newTaskTitle
        }
    } as const
}