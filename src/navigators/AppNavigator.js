import React, { Component } from 'react';
import { BackHandler, StatusBar, View } from "react-native";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';

import HomeTab from '../tabs/Home/HMain';
import ChildHMain from '../tabs/Home/ChildHMain';
import ProfileTab from '../tabs/Profile/PMain';
import TestTab from '../tabs/Test/MTest';

const styleNavigation = {
  headerTintColor: '#ffffff',
  headerStyle: {
    backgroundColor: '#ffc383'
  },  
}

const HomeNavigator = StackNavigator({
  RHMainTab: { screen: HomeTab },
  RHChild: { screen: ChildHMain}
}, {
  navigationOptions: {...styleNavigation, tabBarLabel: 'Home'},
})

const ProfileNavigator = StackNavigator({
  RPMainTab: { screen: ProfileTab },
})

const TestNavigator = StackNavigator({
  RMTestTab: { screen: TestTab },
})

export const TodoTabNavigator = TabNavigator({
  TodoHome: { screen: HomeNavigator },
  TodoProfile: { screen: ProfileNavigator },
  TodoTest: { screen: TestNavigator },
})

class AppWithNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { nav, dispatch } = this.props;
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back());
    return true;
  }
  
  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });
    return (
      <View style={{flex:1}}>
        <StatusBar barStyle='light-content'/>
        <TodoTabNavigator navigation={navigation}/>
      </View>
    )
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);