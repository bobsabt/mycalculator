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

    // The event handler of the operator buttons' onClick event
    const setCurrentOperatorValue = (operator) => {

        let result;

        // Reset the containsDot 
        setContainsDot(false);

        // If we have an error we get back a string
        if(typeof currentNumber !== "number"){
            setIsNewNumber(true);
            setFractionPow(1);
        }

        // If (operator === C ) -> reset everything to base condition
        if( operator === "C"){
            setCurrentOperator("");
            setCurrentNumber(0);
            setPrevValue(0);
            return;
        }

        // If (operator === (√ || ^2)) -> it only operates with one number(currentNumber)
        if(operator === "√"){
            result = Math.sqrt(currentNumber);
            setCurrentOperator("");
            setCurrentNumber(result);
            setPrevValue(result);
            setIsNewNumber(true);
            return;            
        }

        if(operator === "^2"){
            result = Math.pow(currentNumber, 2);
            setCurrentOperator("");
            setCurrentNumber(result);
            setPrevValue(result);
            setIsNewNumber(true);
            return;      
        }

        if(isNewNumber){ 
            setCurrentOperator(operator);       
        }
        else{
            if(currentOperator === ""){
                // No previous operator, we just store this one and move current number to previous value
                setCurrentOperator(operator);
                setPrevValue(currentNumber);
            }
            else{
                // Execute the previous operator
                if(currentOperator === "+"){
                    result = prevValue + currentNumber;
                }
                if(currentOperator === "-"){
                    result = prevValue - currentNumber;
                }
                if(currentOperator === "*"){
                    result = prevValue * currentNumber;
                }
                if(currentOperator === "/"){
                    if(currentNumber === 0){
                        result = "Error";
                    }
                    else{
                        result = prevValue / currentNumber;
                    }                    
                }       
                setCurrentNumber(result);
                setPrevValue(result);
            }

            // Store the current operator but there is no further operation after "="
            setCurrentOperator((operator !== "=") ? operator : "");
            setIsNewNumber(true);
            setFractionPow(1);
        }
    }
    const formatDisplay = (displayValue) => {
        let newValue = displayValue.toString();

        // We have to handle when there are too many digits are in front of the dot, because screen value consists of 11 digits
        // Include method works on strings
        if (newValue.includes(".")){ 
            // Get the index of dot          
            const indexOfDot = newValue.indexOf(".");           
            if(indexOfDot >= 11){
                newValue= "Error";                      
            }
        }
        else{
            if(newValue.length >= 11){
                newValue = "Error";       
            }
        }
        return newValue;
    }

    return (
        <div className="calculator-container">
            <Screen value={formatDisplay(currentNumber).substring(0,11)}/>
            <div className='buttons-container'>
                <OperatorButtons onClickHandler={setCurrentOperatorValue}/>  
                <NumberButtons onClickHandler={setNumberValue}/>
            </div>            
        </div>
    );
};

export default Calculator;
