import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Redux/actions/index';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    isError: false
  }

  handleFormChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleFormSignUp = event => {
    event.preventDefault();
    const { email, password, confirmPassword, firstName, lastName } = this.state;

    if(password !== confirmPassword || password.length < 6) {
      this.setState({ isError: true })
    } else {
      let isSignUp = true;

      let finalData = {
        email, 
        password, 
        confirmPassword, 
        firstName, 
        lastName
      }

      this.props.userSignup(email, password, finalData, isSignUp);
    }
    
  }

  render() {
    const { email, password, confirmPassword, firstName, lastName, isError } = this.state;

    return (
      <>
        <h3 className="font-weight-bold text-center">Creat An Account</h3>
        <hr />
        <form onSubmit={this.handleFormSignUp}>
          <div className="d-flex justify-content-around">
            <div className="form-group mr-2">
              <label htmlFor="firstName">First Name</label>
              <input 
                autoComplete="on"
                className="form-control"
                type="text"
                value={firstName}
                onChange={this.handleFormChange('firstName')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                autoComplete="on"
                className="form-control"
                type="text"
                value={lastName}
                onChange={this.handleFormChange('lastName')}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Enter Email</label>
            <input 
              autoComplete="on"
              className="form-control"
              type="email"
              value={email}
              onChange={this.handleFormChange('email')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Enter Password</label>
            <input
              autoComplete="on"
              className="form-control" 
              type="password"
              value={password}
              onChange={this.handleFormChange('password')}
            />
          </div>
          {isError && password.length < 6 ? <span className="text-danger">Password should be at least 6 characters</span> : ''}
          <div className="form-group">
            <label htmlFor="password">Re-enter Password</label>
            <input
              autoComplete="on"
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={this.handleFormChange('confirmPassword')}
            />
            {isError && confirmPassword !== password ? <span className="text-danger">Password do not match</span> : ''}
          </div>
          <button 
            type="submit" 
            className="btn btn-dark btn-block" 
            onClick={this.handleFormSignUp}
          >
            Sign Up
          </button>
        </form>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userSignup: (email, password, userData, isSignUp) => dispatch(actions.auth(email, password, userData, isSignUp)) 
  }
}

export default connect(null, mapDispatchToProps)(SignUp);
