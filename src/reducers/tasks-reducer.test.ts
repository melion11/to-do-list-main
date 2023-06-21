import {v1} from 'uuid';
import {addTaskAC, changeStatusAC, editTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';

import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TasksStateType} from '../App';

test('remove task from todolist', ()=>{
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},

        ]
    }
    const taskId = startState[todolistID1][0].id

    const newState = tasksReducer(startState, removeTaskAC(todolistID1, taskId))

    expect(newState[todolistID1].length).toBe(2)
    expect(newState[todolistID2].length).toBe(2)

})

test('action reducer should be add task in todolist tasks', ()=> {

        const todolistID1 = v1();
        const todolistID2 = v1();

        const startState = {
            [todolistID1]: [
                {id: '1', title: 'HTML&CSS', isDone: true},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'ReactJS', isDone: false},
            ],
            [todolistID2]: [
                {id: '1', title: 'HTML&CSS2', isDone: true},
                {id: '2', title: 'JS2', isDone: true},

            ]
        }

        const newTitle = 'NEW'

        const newState = tasksReducer(startState, addTaskAC(todolistID2, newTitle))


        expect(newState[todolistID2].length).toBe(3)
        expect(newState[todolistID1].length).toBe(3)
        expect(newState[todolistID2][0].title).toBe(newTitle)

    })

test('action reducer should be change task status', ()=> {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},

        ]
    }

    const taskId = startState[todolistID1][2].id

    const newState = tasksReducer(startState, changeStatusAC(todolistID1,taskId, true ))

    expect(newState[todolistID1][2].isDone).toBe(true)
    expect(newState[todolistID1][1].isDone).toBe(true)

})

test('action reducer should be edit task title', ()=> {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},

        ]
    }

    const taskId = startState[todolistID1][0].id
    const newTitle = 'NEW'

    const newState = tasksReducer(startState, editTaskTitleAC(todolistID1, taskId, newTitle))

    expect(newState[todolistID1][0].title).toBe(newTitle)
    expect(newState[todolistID1][1].title).toBe('JS')
})

test('action reducer should be add tasks empty array', ()=> {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TasksStateType = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'HTML&CSS2', isDone: true},
            {id: '2', title: 'JS2', isDone: true},

        ]
    }

    const action = addTodolistAC('no matter title')

    const newState = tasksReducer(startState, action)

    const keys = Object.keys(newState)
    const newKey = keys.find(k => k !== todolistID1 && k !== todolistID2)
    if (!newKey) {
        throw Error('new key should be added!')
    }

    expect(keys.length).toBe(3)
    expect(newState[newKey]).toEqual([])


})


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});