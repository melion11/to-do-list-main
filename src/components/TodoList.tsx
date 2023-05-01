import React from "react";
import TodoListHeader from './TodoListHeader';
import {AddForm} from './AddForm';
import {TasksList} from './TasksList';


export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div className="todolist">
            <TodoListHeader title={props.title}/>
            <AddForm/>
            <TasksList tasks={props.tasks}/>

        </div>
    );
};

export default TodoList;