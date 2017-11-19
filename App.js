import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import { Header } from './src/components/common';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';

export default class App extends Component {

  componentWillMount () {
    const config = {
      apiKey: 'AIzaSyC1fWNVbZareAL1vViMagfHaGr1lcKokZA',
      authDomain: 'manager-19688.firebaseapp.com',
      databaseURL: 'https://manager-19688.firebaseio.com',
      projectId: 'manager-19688',
      storageBucket: 'manager-19688.appspot.com',
      messagingSenderId: '606603529672'
    };
    firebase.initializeApp(config);
  }
  
  render() {
    // second argument is initial state
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Header headerText='Manager' />
          <LoginForm />
        </View>
      </Provider>
    );
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
