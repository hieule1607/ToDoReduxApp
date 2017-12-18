import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, ListView, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';

class ProfileMain extends Component {

  state = {  }

  handleSave(t) {
    this.props.actions.addTodo(t)
    this.refs.textinput.clear()
  }

  render() {
    return(
      <View>
        <Text>{'ListCount: ' + this.props.todos.length}</Text>
        <TextInput ref={'textinput'} placeholder='Something to do' onSubmitEditing={(event) => this.handleSave(event.nativeEvent.text)}/>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain)