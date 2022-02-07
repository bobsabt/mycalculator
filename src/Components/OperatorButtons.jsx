import Button from "./Button";

const OperatorButtons = () => {

    const operators = ["=","+", "-", "*", "/", "^2", "√", "C", ];

    return (
        <>
            {operators.map((operator, index) => <Button  key={index} label={operator} /> ) } 
        </>
    )
};

export default OperatorButtons;
