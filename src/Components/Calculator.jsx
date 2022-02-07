import React from 'react';
import NumberButtons from './NumberButtons';
import OperatorButtons from './OperatorButtons';
import Screen from './Screen';

const Calculator = () => {
    return (
        <div className="calculator-container">
            <Screen />
            <div className='buttons-container'>
                <OperatorButtons />  
                <NumberButtons />
            </div>            
        </div>
    );
};

export default Calculator;
