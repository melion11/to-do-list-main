import React from 'react';
import './App.css';
import Todolist, {TaskType} from './components/TodoList';

function App() {

    const title = 'What to learn';

    const tasks: TaskType[] = [
        {id: 1, title: ' HTML&CSS ', isDone: true},
        {id: 2, title: 'JS/ES6/TS', isDone: true},
        {id: 3, title: 'React/Reduxx', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={title} tasks={tasks} />
        </div>
    );
}

export default App;
