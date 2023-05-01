import React from 'react';
import {TaskType} from './TodoList';


export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const Task = (props: TaskPropsType) => {

    return (

        <li><input type={'checkbox'} checked={props.isDone} /><span>{props.title}</span></li>

    );
};