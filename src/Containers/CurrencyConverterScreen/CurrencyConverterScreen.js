import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CurrencyConverterScreen.css';
import Spinner from '../../Components/UI/Spinner/Spinner';
import BaseCurrency from '../../Components/BaseCurrency/BaseCurrency';
import TargetCurrency from '../../Components/TargetCurrency/TargetCurrency';
import * as actions from '../../Redux/actions/index';

class CurrencyConverterScreen extends Component {

  state = {
    targetCurrency: [],
    currencyValue: 1,
    baseCurrencyAmount: true
  }

  componentDidMount() {
    this.props.getAllRates();
  }

  handleCurrencyChange = event => {

    let fromCurrencyName, toCurrencyName;

    if(event.target.name === 'from') {
      fromCurrencyName = event.target.value ? event.target.value : this.props.fromCurrency;
      toCurrencyName = this.props.toCurrency;
    } else if(event.target.name === 'to') {
      toCurrencyName = event.target.value ? event.target.value : this.props.toCurrency;
      fromCurrencyName = this.props.fromCurrency;
    }

    this.props.getNewBaseName(fromCurrencyName, toCurrencyName)

  }

  handleFromAmountChange = event => {
    this.setState({ currencyValue: event.target.value, baseCurrencyAmount: true });
  }
  
  handleToAmountChange = event => {
    this.setState({ currencyValue: event.target.value, baseCurrencyAmount: false });
  }

  render() {

    const { currencyValue, baseCurrencyAmount } = this.state;
    const { toCurrencyRate } = this.props;

    let toAmount, fromAmount;

    // Handling inputs from different currency input box
    if(baseCurrencyAmount) {
      fromAmount = currencyValue;
      toAmount = currencyValue * toCurrencyRate;
    } else {
      toAmount = currencyValue;
      fromAmount = currencyValue / toCurrencyRate;
    }

    return (
      <>
        {
          this.props.isLoading ? <Spinner /> : 
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-end mr-3 mb-3">
                <button 
                  onClick={this.props.userLogout}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Logout
                </button>
              </div>
              <div className="currency-screen text-center">
                <h4 className="font-weight-bold">Choose Base Currency</h4>
                <hr />
                <BaseCurrency 
                  allRates={this.props.allRates}
                  handleBaseCurrencyName={this.handleCurrencyChange}
                  baseCurrencyValue={fromAmount}
                  handleFromCurrencyValue={this.handleFromAmountChange}
                  baseCurrency={this.props.fromCurrency}
                  name={'from'}
                />
                <h4 className="font-weight-bold mt-5">Choose Target Currency/Currencies</h4>
                <hr />
                <TargetCurrency
                  allRates={this.props.allRates}
                  handleTargetCurrencyName={this.handleCurrencyChange}
                  targetCurrencyValue={toAmount}
                  handleToCurrencyValue={this.handleToAmountChange}
                  targetCurrency={this.props.toCurrency}
                  name={'to'}
                />
              </div>
            </div>
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.AuthReducer.loading,
    allRates: state.CurrencyReducer.allRates,
    fromCurrency: state.CurrencyReducer.fromCurrency,
    toCurrency: state.CurrencyReducer.toCurrency,
    toCurrencyRate: state.CurrencyReducer.toCurrencyRate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(actions.logout()),
    getAllRates: () => dispatch(actions.getAllRates()),
    getNewBaseName: (baseCurrencyName, target) => dispatch(actions.getNewRate(baseCurrencyName, target))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConverterScreen);
