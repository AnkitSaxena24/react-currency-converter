import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import CurrencyConverterScreen from '../CurrencyConverterScreen/CurrencyConverterScreen';
import AppNameHeader from '../../Components/AppNameHeader/AppNameHeader';
import * as actionTypes from '../../Redux/actions/index';

class Layout extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  

  render() {

    let routes = (
      <Switch>
        <Route path='/login' component={Login} />
        <Redirect to='/login' />
      </Switch>
    );

    if(this.props.isAuthenticated !== null && this.props.error === null) {
      routes = ( 
        <Switch>
          <Route path='/' exact component={CurrencyConverterScreen} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div className="container">
        <AppNameHeader />
        <hr />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.AuthReducer.token,
    error: state.AuthReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionTypes.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
