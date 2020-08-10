import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';
import currencyReducer from '../reducers/currencyConverter';

const getRatesSuccess = (rates, base, toCurrencyName, toCurrencyRate) => {
  return {
    type: actionTypes.GET_ALL_RATES,
    allRates: rates,
    fromCurrency: base,
    toCurrency: toCurrencyName,
    toCurrencyRate: toCurrencyRate
  }
}

const getUpdatedRate = (base, toCurrencyName, toCurrencyRate) => {
  return {
    type: actionTypes.GET_UPATED_RATE,
    fromCurrency: base,
    toCurrency: toCurrencyName,
    toCurrencyRate: toCurrencyRate
  }
}

export const getAllRates = () => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_CURRENCY_URL}/latest?base=USD`).then(response => {
      if(response) {

        let allCurrencyName = response.data.rates && Object.keys(response.data.rates);
        let toCurrencyName = allCurrencyName[11];
        let toCurrencyRate = parseFloat(response.data.rates[toCurrencyName]).toFixed(2);

        dispatch(getRatesSuccess(allCurrencyName, response.data.base, toCurrencyName, toCurrencyRate));
      }
    }).catch(error => {
      console.log('Rates Error', error);
    })
  }
}

export const getNewRate = (base, target) => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_CURRENCY_URL}/latest?base=${base}&symbols=${target}`).then(response => {
      if(response) {
        let currencyName = response.data.rates && Object.keys(response.data.rates);
        let currencyRate = response.data.rates[currencyName];
        
        dispatch(getUpdatedRate(response.data.base, currencyName, currencyRate))
      }
    })
  }
}