import React from "react";

export type TodoListHeaderPropsType = {
    title: string
}

const TodoListHeader = (props: TodoListHeaderPropsType) => {
    return (
        <div className="header">
           <h3>{props.title}</h3>
        </div>
    );
};

export default TodoListHeader;