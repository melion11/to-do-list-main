import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.payload.id)
        }
        case 'ADD-NEW-TODO': {
            return [
                {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.newTitle} : todo)
        }
        case 'CHANGE-FILTER': {
            return state.map(todo => todo.id === action.payload.id ? {...todo, filter: action.payload.newFilter} : todo)
        }

        default:
            throw new Error('error action type')
    }
}

type ActionsType = RemoveTodolistACType | AddTodolistACType | EditTodolistTitleACType | ChangeTodoFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type EditTodolistTitleACType = ReturnType<typeof editTodolistTitleAC>
type ChangeTodoFilterACType = ReturnType<typeof changeTodoFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-NEW-TODO',
        payload: {
            newTodolistTitle,
            todolistId: v1()
        }
    } as const
}

export const editTodolistTitleAC = (id: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            newTitle
        }
    } as const
}

export const changeTodoFilterAC = (id: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            id,
            newFilter
        }
    } as const
}

