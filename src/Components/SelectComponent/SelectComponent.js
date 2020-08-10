import React from 'react';

const SelectComponent = props => {
  return (
    <>
      <form className="">
        <div className="form-group">
          <div className="d-flex justify-content-around">
            <input
              type="text"
              className="form-control mr-2 text-center"
              value={props.currencyValue}
              onChange={props.handleInputChange}
            />
            <select name={props.name} className="custom-select text-center" onChange={props.handleCurrencyName}>
              <option value="">{props.currencyName}</option>
              {
                props.allRates && props.allRates.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))
              }
            </select>
          </div>
        </div>
      </form>
    </>
  )
}

export default SelectComponent;