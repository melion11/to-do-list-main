import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolistAC,
    changeTodoFilterAC,
    editTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';

test('correct todolist should be removed', ()=>{
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(newState.length).toBe(1)
    expect(newState[0].id).toBe(todolistID2)
})

// test('add todolist in state', ()=> {
//     const todolistID1 = v1();
//     const todolistID2 = v1();
//
//     const startState: Array<todolistsType> = [
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ]
//
//     const newTitle = 'newTitle'
//     const newTodo = {id: v1(), title: newTitle, filter: 'all'}
//     const newState = todolistsReducer(startState, {type: 'ADD-NEW-TODO', newTodo})
//
//     expect(newState.length).toBe(3)
//     expect(newState[0].title).toBe('newTitle')
//
// })

test('add todolist in state', ()=> {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newTodolistTitle = 'newTitle'

    const newState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(newState.length).toBe(3)
    expect(newState[0].title).toBe('newTitle')
    expect(newState[0].filter).toBe('all')

})

test('correct todolist should change name', ()=> {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newTitle = 'What to dry'

    const newState = todolistsReducer(startState, editTodolistTitleAC(todolistID2, newTitle))

    expect(newState[1].title).toBe(newTitle)
    expect(newState[0].title).toBe('What to learn')

})

test('correct filter of todolist should be changed', ()=> {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const newFilter: FilterValuesType = 'completed'
    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const newState = todolistsReducer(startState, changeTodoFilterAC(todolistID1, newFilter))

    expect(newState[0].filter).toBe(newFilter)
    expect(newState[1].filter).toBe('all')
    expect(newState[0].title).toBe('What to learn')

})

