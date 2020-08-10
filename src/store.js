import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './Redux/reducers/auth';
import CurrencyReducer from './Redux/reducers/currencyConverter';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    AuthReducer,
    CurrencyReducer
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;