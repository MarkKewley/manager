import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { Button, Card, CardSection, Input } from './common';

class EmployeeCreate extends Component {

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.props.name}
            label='Name'
            placeholder='Jane'
            onChangeText={value => this.props.employeeUpdate({prop: 'name', value})}
          />
        </CardSection>

        <CardSection>
          <Input
            value={this.props.phone}
            label='Phone'
            placeholder='555-555-555'
            onChangeText={value => this.props.employeeUpdate({prop: 'phone', value})}
          />
        </CardSection>

        <CardSection style={{flexDirection: 'column'}}>
          <Text style={styles.pickerLabelStyle}>Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({prop: 'shift', value})}
          >
            <Picker.Item label='Monday' value='Monday'/>
            <Picker.Item label='Tuesday' value='Tuesday'/>
            <Picker.Item label='Wednesday' value='Wednesday'/>
            <Picker.Item label='Thursday' value='Thursday'/>
            <Picker.Item label='Friday' value='Friday'/>
            <Picker.Item label='Saturday' value='Saturday'/>
            <Picker.Item label='Sunday' value='Sunday'/>
          </Picker>
        </CardSection>

        <CardSection>
          <Button>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }

}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = state => {
  const {name, phone, shift} = state.employeeForm;
  return {name, phone, shift};
};

export default connect(mapStateToProps, {employeeUpdate})(EmployeeCreate);