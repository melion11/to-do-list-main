import type {Meta, StoryObj} from '@storybook/react';

import {Task} from './Task';
import {TaskType} from './Todolist';
import {action} from '@storybook/addon-actions';


const meta: Meta<typeof Task> = {
    title: 'Todolists/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        task: {id: 'aaa', title: 'JS', isDone: true},
        todolistId: 'todo1',
    }
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsDone: Story = {
    args: {
        task: {id: 'aaa', title: 'JS', isDone: true},
    },
};

export const TaskIsNotDone: Story = {
    args: {
        task: {id: 'aaa', title: 'JS', isDone: false},
    },
};
