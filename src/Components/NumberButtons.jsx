import Button from "./Button";

const NumberButtons = ({onClickHandler}) => {

    const numbers = [".", 0 , 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <>
            {numbers.map((number, index) => <Button key={index} label={number} onClickHandler={onClickHandler}/> ) }
        </>
    )
};

export default NumberButtons;
