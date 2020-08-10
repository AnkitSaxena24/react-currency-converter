import React from 'react';
import SelectComponent from '../SelectComponent/SelectComponent';

const BaseCurrency = props => {

  return (
    <>
      <SelectComponent 
        allRates={props.allRates}
        currencyName={props.baseCurrency}
        handleCurrencyName={props.handleBaseCurrencyName}
        handleInputChange={props.handleFromCurrencyValue}
        currencyValue={props.baseCurrencyValue}
        name={props.name}
      />
    </>
  )
};

export default BaseCurrency;