import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddForm} from './Components/AddForm';
import ButtonAppBar from './Components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string]: TaskType[]
}


function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    function removeTask(todolistId: string, id: string) {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)});
    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})

    }

    const changeStatus = (todolistId: string, taskID: string, checkedValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, isDone: checkedValue} : el)
        })
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist))
    }

    const addTodoList = (newTodoTitle: string) => {
        const newTodo: todolistsType = {id: v1(), title: newTodoTitle, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodo.id]: []})
    }

    const editTaskTitle = (todolistId: string, taskId: string, newTaskTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title: newTaskTitle} : task)
        })
    }

    const editTodoListTitle = (todoListId: string, newTodoListTitle: string) => {
        setTodolists(todolists.map(todoList => todoList.id === todoListId ? {
            ...todoList,
            title: newTodoListTitle
        } : todoList))
    }

    return (


        <div className="App">
            <ButtonAppBar/>

            <Container fixed>

                <Grid container style={{padding: '25px'}}>
            <AddForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
            {todolists.map(todolist => {

                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
                }


                return (
                    <Grid item>
                        <Paper elevation={3} style={{padding: '15px'}}>
                    <Todolist key={todolist.id}
                              title={todolist.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeStatus={changeStatus}
                              todolistId={todolist.id}
                              editTaskTitle={editTaskTitle}
                              editTodoListTitle={editTodoListTitle}

                    />
                        </Paper>
                    </Grid>
                );
            })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
