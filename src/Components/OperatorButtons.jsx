import Button from "./Button";

const OperatorButtons = ({onClickHandler}) => {

    const operators = ["=","+", "-", "*", "/", "^2", "√", "C", ];

    return (
        <>
            {operators.map((operator, index) => <Button  key={index} label={operator} onClickHandler={onClickHandler}/> ) } 
        </>
    )
};

export default OperatorButtons;
