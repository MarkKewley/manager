import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from './types';
import { FirebaseHelper } from '../components/common';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({email, password}) =>  {
  return async dispatch => {
    dispatch({ type: LOGIN_USER });
    let response;
    try {
      response = await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      response = await handleSignInFailure(e, email, password);
    }


    if (response && response.uid) {
      dispatch(loginUserSuccess(response));
    } else {
      dispatch(loginUserFailed(response));
    }
  }
};

const handleSignInFailure = async ({ code, message }, email, password) => {
  const { USER_NOT_FOUND, WRONG_PASSWORD, INVALID_EMAIL, USER_DISABLED } = FirebaseHelper.erorrCode;
  switch (code) {
    case USER_NOT_FOUND:
      try {
        return await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (err) {
        return err.message;
      }
    case WRONG_PASSWORD:
      return 'Invalid password';
    case INVALID_EMAIL:
      return 'Invalid email';
    case USER_DISABLED:
      return 'This user has been disabled';
    default: {
      return message;
    }
  }
};

const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  };
};

const loginUserFailed = (message) => {
  return {
    type: LOGIN_USER_FAILED,
    payload: message
  };
};