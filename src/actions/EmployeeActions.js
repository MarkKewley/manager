import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMPLOYEE_CREATE, EMPLOYEE_UPDATE } from './types';

export const employeeUpdate = ({prop, value}) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: {prop, value}
  };
};

export const employeeCreate = ({name, phone, shift}) => {
  const {currentUser} = firebase.auth();

  return async dispatch => {
    // get access to our db and get a reference to the path to the JSON data store provided
    await firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({name, phone, shift});

    dispatch({type: EMPLOYEE_CREATE});

    // go back one on the stack (will not show back arrow)
    Actions.pop();
  };
};