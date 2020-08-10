import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as actions from '../../Redux/actions/index';

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleSignIn = event => {
    event.preventDefault();
    const { email, password } = this.state;

    let isSignUp = false;

    this.props.userSignIn(email, password, isSignUp);

  }

  render() {

    const { email, password } = this.state;

    let errorMessage = null;

    if(this.props.error !== null) {
      errorMessage = (
        <p style={{
          color: 'red',
          fontWeight: 'bold',
          border: '1px solid #eee',
          boxShadow: '2px 5px 10px #ccc',
          borderRadius: '5px',
          padding: '5px',
          textAlign: 'center'
        }}>{this.props.error.message.split('_').join(' ')}</p>
      )
    }

    return (
      <>
        <h3 className="font-weight-bold text-center">Sign In</h3>
        <hr />
        {errorMessage}
        <form onSubmit={this.handleSignIn}>
          <div className="form-group">
            <label htmlFor="email">Enter Email</label>
            <input 
              autoComplete="on"
              type="email"
              onChange={this.handleChange('email')}
              value={email}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Enter Password</label>
            <input 
              autoComplete="on"
              type="password"
              onChange={this.handleChange('password')}
              value={password}
              className="form-control"
              disabled={!email ? true : false}
            />
          </div>
          <button type="submit" className="btn btn-dark btn-block">Sign In</button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.AuthReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userSignIn: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
