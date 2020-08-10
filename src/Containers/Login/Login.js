import React, { Component } from 'react';
import './Login.css';
import SignIn from '../../Components/SignIn/SignIn';
import SignUp from '../../Components/SignUp/SignUp';

class Login extends Component {

  state = {
    isSignUp: false
  }
  

  swithToSignUp = () => {
    this.setState({ isSignUp: true })
  }

  swithToSignIn = () => {
    this.setState({ isSignUp: false });
  }

  render() {

    const { isSignUp } = this.state;

    return (
      <>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="d-flex justify-content-center mb-3">
              <button 
                type="button" 
                className="btn btn-outline-primary mr-3" 
                onClick={this.swithToSignIn}
                disabled={isSignUp === false ? true : false}
              >
                SignIn
              </button>
              <button 
                type="button" 
                className="btn btn-outline-primary" 
                onClick={this.swithToSignUp}
                disabled={isSignUp ? true : false}
              >
                SignUp
              </button>
            </div>
            <div className="login-form">
              {
                isSignUp ? <SignUp/> : <SignIn/>
              }
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Login;
