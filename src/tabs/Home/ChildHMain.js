import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';

class ChildHMain extends Component {
  state = { }  

  componentWillMount() {
    // const { setParams } = this.props.navigation;
    // setParams({data: this.props.todos});
  }

  handleSave(t) {
    this.props.actions.addTodo(t)
    this.refs.textinput.clear()
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.data.data}`,
    // headerRight: <Text>{navigation.state.params.data.length}</Text>
    
  });
  
  render() {
    // const {state} = this.props.navigation;
    // var name = state.params ? state.params.name : "<undefined>";
    return(
      <View>
        {/* <Text>{name}</Text> */}
        <Text>{'ListCount: ' + this.props.todos.length}</Text>
        <TextInput ref={'textinput'} placeholder='Something to do' onSubmitEditing={(event) => this.handleSave(event.nativeEvent.text)}/>
      </View>
    )
  }
}

// ChildHMain.navigationOptions = {
  // title: 'ChildMain',
  // headerBackTitle: null,
// };

const mapStateToProps = state => ({
  todos: state.todos,
  navigation: state.nav
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildHMain);