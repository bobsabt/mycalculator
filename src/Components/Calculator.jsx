import React from 'react';
import NumberButtons from './NumberButtons';
import OperatorButtons from './OperatorButtons';
import Screen from './Screen';

const Calculator = () => {
     
    // The number the user is currently entering
    const [currentNumber, setCurrentNumber] = React.useState(0);
    // The previous number or result that will be the first operand of the calculation
    const [prevValue, setPrevValue] = React.useState(0);
    // The currently active operator
    const [currentOperator, setCurrentOperator] = React.useState("");
    // The use to keep track of the fraction of the current number
    const [fractionPow, setFractionPow] = React.useState(1);
    // The current number contains decimal
    const [containsDot, setContainsDot] = React.useState(false);
    // The user pushed an operator button or there was an error and the next number button will start a new number
    const [isNewNumber, setIsNewNumber] = React.useState(true);


    // The event handler of the number buttons' onClick event
    const setNumberValue = (value) => {

        // CurrentNumber can be a string e.g. "Error"
        if(typeof currentNumber !== "number"){
            // We start a new number
            setIsNewNumber(true);
            setFractionPow(1);
            setPrevValue(0);
        }

        if(isNewNumber){
            if(value === "."){
                setFractionPow(1);
                setCurrentNumber(0);
            }  
            else{
                setCurrentNumber(value);
            } 
            setIsNewNumber(false);         
        }
        else{
            if(value !== "."){
                if(!containsDot){
                    // To allow to write more number digits, currentNumber have to move left with one local value
                    setCurrentNumber(currentNumber * 10 + value);
                }
                else{
                    // CurrentNumber will be more accurate if the next fractional digit is added to a bigger number and we divide it back              
                    setCurrentNumber((currentNumber * Math.pow(10,fractionPow) + value) / Math.pow(10,fractionPow));
                    setFractionPow(fractionPow + 1);
                }
            }
            else{
                    setContainsDot(true);
            }
        }
    };
    return (
        <div className="calculator-container">
            <Screen value={currentNumber}/>
            <div className='buttons-container'>
                <OperatorButtons />  
                <NumberButtons onClickHandler={setNumberValue}/>
            </div>            
        </div>
    );
};

export default Calculator;
