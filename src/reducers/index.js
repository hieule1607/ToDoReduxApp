import { combineReducers } from 'redux';
import { TodoTabNavigator } from '../navigators/AppNavigator';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import testData from './dataReducer';

const nav = (state, action) => {
  const newState = TodoTabNavigator.router.getStateForAction(action, state);
  return newState || state
}

const todoReducer = combineReducers({
  nav,
  todos,
  visibilityFilter,
  testData
})

export default todoReducer;