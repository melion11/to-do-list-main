import React from "react";
import {Button, ButtonPropsType} from './Button';

export type AddFormPropsType = {
    title?: ButtonPropsType
}

export const AddForm = (props: AddFormPropsType) => {
    return (
        <div className="add_form">
            <input/>
            <Button title={'+'}/>
        </div>
    );
};

