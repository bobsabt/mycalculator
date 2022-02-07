import React from "react";

const Button = ({label}) => {

    const myLabel = label;

    const onClickHandler = (label)=>{
        console.log(label)
    }

    return (
        <>
            <button onClick={() => onClickHandler(myLabel)}>{label}</button>
        </>
    )
};

export default Button;