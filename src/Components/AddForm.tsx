import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist.module.css';


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


    return (


        <div>
            <input value={title}
                   className={error ? s.error : ''}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />

            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

