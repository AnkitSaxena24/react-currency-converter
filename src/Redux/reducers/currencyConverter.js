import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allRates: [],
  toCurrencyRate: null,
  toCurrency: null,
  fromCurrency: null
}

const getAllRates = (state, action) => {
  return {
    ...state,
    allRates: action.allRates,
    fromCurrency: action.fromCurrency,
    toCurrencyRate: action.toCurrencyRate,
    toCurrency: action.toCurrency
  }
}

const getUpdatedRates = (state, action) => {
  return {
    ...state,
    fromCurrency: action.fromCurrency,
    toCurrency: action.toCurrency,
    toCurrencyRate: action.toCurrencyRate
  }
}

const currencyReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_ALL_RATES: return getAllRates(state, action);
    case actionTypes.GET_UPATED_RATE: return getUpdatedRates(state, action)
    default:
      return state;
  }
}

export default currencyReducer;