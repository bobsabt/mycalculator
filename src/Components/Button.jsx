import React from "react";

const Button = ({label, onClickHandler}) => {

    const myLabel = label;

    return (
        <>
            <button onClick={() => onClickHandler(myLabel)}>{label}</button>
        </>
    )
};

export default Button;