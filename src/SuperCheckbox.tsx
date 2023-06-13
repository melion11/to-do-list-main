import React, {ChangeEvent} from 'react';

export type CheckboxPropsType = {
    checked: boolean
    callBack: (checked: boolean) => void
}

export const SuperCheckbox = (props: CheckboxPropsType) => {


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }


    return <input checked={props.checked} type="checkbox" onChange={onChangeHandler}/>
};
