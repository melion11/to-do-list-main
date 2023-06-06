import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist.module.css';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';


export type AddFormPropsType = {
    callBack: (newTitle: string) => void
}

export const AddForm = (props: AddFormPropsType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>('')

    const addTask = () => {
        if (title.trim()) {
            props.callBack(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const buttonStyles={
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        backgroundColor:'blue'
    }

    return (


        <div>
            <TextField error={!!error} size={'small'} value={title} onChange={ onChangeHandler }  onKeyPress={ onKeyPressHandler }  className={error ? s.error : ''} id="outlined-basic" label={error ? 'Title is required' : 'Please type something'} variant="outlined" />

            <Button style={buttonStyles} variant={'contained'} onClick={addTask}>+</Button>

        </div>
    );
};

