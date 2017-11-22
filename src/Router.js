import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root'>
        <Scene key='auth' hideNavBar>
          <Scene
            hideNavBar={false}
            key='login'
            component={LoginForm}
            title='Please Login'
          />
        </Scene>
        <Scene key='main' hideNavBar>
          <Scene
            hideNavBar={false}
            key='employeeList'
            component={EmployeeList}
            title='Employees'
            onRight={() => Actions.employeeCreate()}
            rightTitle='Add'
            initial
          />
          <Scene
            hideNavBar={false}
            key='employeeCreate'
            title='Create Employee'
            component={EmployeeCreate}
          />
          <Scene
            hideNavBar={false}
            key='employeeEdit'
            title='Edit Employee'
            component={EmployeeEdit}
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;