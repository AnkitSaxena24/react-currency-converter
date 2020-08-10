import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token, 
    userId: userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');

  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const auth = (email, password, userData, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email, 
      password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD24GXj2kGtNDnmXD_azXYPntA6jKNv5Qc';

    if(!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD24GXj2kGtNDnmXD_azXYPntA6jKNv5Qc'
    }

    axios.post(url, authData).then(response => {
      if(response) {
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('email', response.data.email);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
      }
    }).catch(error => {
      dispatch(authFail(error.response.data.error))
    })
  };
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if(!token) {
      dispatch(logout())
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
    }
  }
}