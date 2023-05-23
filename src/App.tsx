import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key:string]: TaskType[]
}


function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let[tasks, setTasks] = useState<TasksType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistId:string, id: string) {

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id )});
    }

    function addTask(todolistId:string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task,...tasks[todolistId]]})

    }

    const changeStatus = (todolistId:string, taskID: string, checkedValue: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskID ? {...el, isDone: checkedValue} : el)})
    }


    function changeFilter(todolistId:string, value: FilterValuesType) {
       setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value}: todolist))
    }


    return (


        <div className="App">

            {todolists.map(todolist => {

                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
                }


                return (
                    <Todolist key={todolist.id}
                              title={todolist.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeStatus={changeStatus}
                              todolistId={todolist.id}
                    />
                );
            })}


        </div>
    );
}

export default App;
