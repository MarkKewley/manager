import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_CREATE,
  EMPLOYEE_UPDATE,
  EMPLOYEES_FETCH_SUCCESS
} from './types';

export const employeeUpdate = ({prop, value}) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: {prop, value}
  };
};

export const employeeCreate = ({name, phone, shift}) => {
  return async dispatch => {
    const {currentUser} = firebase.auth();
    // get access to our db and get a reference to the path to the JSON data store provided
    await firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({name, phone, shift});

    dispatch({type: EMPLOYEE_CREATE});

    // go back one on the stack (will not show back arrow)
    Actions.pop();
  };
};

export const employeesFetch = () => {
  return async dispatch => {
    const {currentUser} = firebase.auth();
    // anytime any data comes accross the ref call the fat arrow object with 'snapshot' with the new data
    // NOTE: This will continually update and call the 'on' during the lifecycle of the application and call the dispatch method
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()});
      });
  };
};