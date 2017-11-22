import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';

class EmployeeListItem extends Component {

  onRowPress () {
    // gives employee create form a prop of employee
    Actions.employeeEdit({employee: this.props.employee});
  }

  render () {
    const {name} = this.props.employee;
    return (
      <TouchableWithoutFeedback onPress={() => this.onRowPress()}>
        <View>
          <CardSection>
            <Text style={styles.nameStyle}>{name}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = {
  nameStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default EmployeeListItem;