import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan, EditableSpanPropsType} from './EditableSpan';
import {action} from '@storybook/addon-actions';
import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';


const meta: Meta<typeof EditableSpan> = {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        value: {
            defaultValue: '111',
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;



export const EditableSpanStory: Story = {
    args: {
        onChange: action('Value EditableSpan changed')
    }
};