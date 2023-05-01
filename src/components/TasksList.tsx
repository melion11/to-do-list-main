import React from 'react';
import {TaskType} from './TodoList';
import {Task} from './Task';
import {Button} from './Button';

export type TasksListPropsType = {
    tasks: TaskType[]
}

export const TasksList = (props: TasksListPropsType) => {

    const tasks = props.tasks.map(el => {
        return (
            <Task id={el.id} title={el.title} isDone={el.isDone}/>
        );
    })

    return (
        <div className={'tasks_list'}>
            <ul>
                {tasks}
            </ul>
            <Button title={'All'}/>
            <Button title={'Active'}/>
            <Button title={'Completed'}/>

        </div>
    );
};
