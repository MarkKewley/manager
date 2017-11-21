import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions/EmployeeActions';
import { Spinner } from './common/Spinner';

class EmployeeList extends Component {

  componentWillMount () {
    this.props.employeesFetch();
  }

  render () {
    return <Spinner/>;
  }

}

const mapStateToProps = state => {
  const {employees} = state;
  return {employees};
};

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);