import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import {
  Card,
  CardSection,
  Input,
  Button,
  Spinner
} from './common';

class LoginForm extends Component {

  onEmailChange (email) {
    this.props.emailChanged(email);
  }

  onPasswordChange (password) {
    this.props.passwordChanged(password);
  }

  onButtonPress () {
    const {email, password} = this.props;
    this.props.loginUser({email, password});
  }

  renderButton () {
    if (this.props.loading) {
        return <Spinner />;
    }

    return (
      <Button onPress={() => this.onButtonPress()}>
        Login
      </Button>
    );
  }

  renderError () {
    if (this.props.error) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.props.email}
            label='Email'
            placeholder='email@gmail.com'
            onChangeText={email => this.onEmailChange(email)}
          />
        </CardSection>

        <CardSection>
          <Input
            value={this.props.password}
            secureTextEntry
            label='Password'
            placeholder='password'
            onChangeText={password => this.onPasswordChange(password)}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = state => {
  const { email, password, error, loading } = state.auth;
  return {
    email,
    password,
    error,
    loading
  }
};

export default connect(mapStateToProps,
  {emailChanged, passwordChanged, loginUser})
(LoginForm);