import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeesFetch } from '../actions/EmployeeActions';
import { Spinner } from './common/Spinner';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {

  componentWillMount () {
    this.props.employeesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps (nextProps) {
    // nextProps are the next set of props that this component will be rendered with
    // this.props is still the OLD set of props
    this.createDataSource(nextProps);
  }

  createDataSource ({employees}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <EmployeeListItem employee={employee} />;
  }

  render () {
    if (this.props.loading) {
      return <Spinner/>;
    }

    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={employee => this.renderRow(employee)}
      />
    )
  }

}

const mapStateToProps = state => {
  const employees = _.map(state.employees.employees, (val, uid) => {
    return {...val, uid}; // { shift: 'Monday, name: 'Sue', uuid: '1234', ... }
  });
  return {employees, loading: state.employees.loading};
};

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);