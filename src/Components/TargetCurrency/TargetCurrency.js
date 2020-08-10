import React from 'react';
import SelectComponent from '../SelectComponent/SelectComponent';

const TargetCurrency = props => {

  return (
    <>
      <SelectComponent 
        allRates={props.allRates}
        rate={props.allRates[1]}
        handleCurrencyName={props.handleTargetCurrencyName}
        handleInputChange={props.handleToCurrencyValue}
        currencyName={props.targetCurrency}
        currencyValue={!props.targetCurrencyValue ? '' : props.targetCurrencyValue}
        name={props.name}
      />
    </>
  )
};

export default TargetCurrency;