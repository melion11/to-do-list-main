import React, {ChangeEvent, useState} from 'react';


export type EditableSpanPropsType = {
    title: string
    callBack: (newTaskTitle: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(props.title)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)

    }

    const editNewTitle = () => {
        if (editMode) {
            props.callBack(updateTitle)
        }
        setEditMode(!editMode)
    }



    return (
        editMode ? <input autoFocus onBlur={editNewTitle} value={updateTitle} onChange={onChangeHandler}/> : <span onDoubleClick={editNewTitle}>{props.title}</span>
    );
};

