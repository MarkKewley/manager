import React, { Component } from 'react';
import Communications from 'react-native-communications';
import _ from 'lodash';
import { connect } from 'react-redux';

import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount () {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({prop, value});
    });
  }

  onButtonPress () {
    const {name, phone, shift} = this.props;
    this.props.employeeSave({name, phone, shift, uid: this.props.employee.uid});
  }

  onTextPress () {
    const {phone, shift} = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onFirePress () {
    this.setState({showModal: !this.state.showModal});
  }

  onDeclineFire () {
    this.setState({showModal: false});
  }

  onAcceptFire () {
    this.props.employeeDelete(this.props.employee.uid);
  }

  render () {
    return (
      <Card>
        <EmployeeForm/>
        <CardSection>
          <Button onPress={() => this.onButtonPress()}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.onTextPress()}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.onFirePress()}>
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onDecline={() => this.onDeclineFire()}
          onAccept={() => this.onAcceptFire()}
        >
          Are you sure you want to fire {this.props.employee.name}?
        </Confirm>
      </Card>
    );
  }

}

const mapStateToProps = state => {
  const {name, phone, shift} = state.employeeForm;
  return {name, phone, shift};
};

export default connect(mapStateToProps, {employeeUpdate, employeeSave, employeeDelete})(EmployeeEdit);