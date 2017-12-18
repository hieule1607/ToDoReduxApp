import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput, ListView, View, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';

class HomeMain extends Component {

  state = {  }
  
  componentDidMount() {
    const { setParams } = this.props.navigation;
    setParams({data: this.props.todos.length});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todos != this.props.todos) {
      this.props.navigation.setParams({ data: nextProps.todos.length });
    }
  }

  // componentWillUpdate(nextProps) {
  //   if (this.props !== nextProps) {
  //     if (nextProps.todos) {
  //       console.log('Hieu')
  //       nextProps.navigation.setParams({data: nextProps.todos.length});
  //     }
  //   }
  // }

  handleSave(t) {
    this.props.actions.addTodo(t)
  }

  handleDelete(data) {
    this.props.actions.deleteTodo(data.id)
  }

  static navigationOptions = ({ navigation }) => ({
    // title: `${navigation.state.params.data}`,  
    title: `Total todo:${navigation.state.params && navigation.state.params.data ? navigation.state.params.data : ''}`,
    // headerRight: <Text>{navigation.state.params.data.length}</Text>
  });

  render() {
    const { todos, navigation } = this.props

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return(
      <View>
        <Button
          onPress={() => navigation.navigate('RHChild', {data: navigation.state.params})}
          title="Navigate to  ChildHMain"
        />
        <TextInput placeholder='Something to do' onSubmitEditing={(event) => this.handleSave(event.nativeEvent.text)}/>
        <ListView 
          dataSource={ds.cloneWithRows(todos)}
          renderRow={(rowData) => <Text onPress={() => this.handleDelete(rowData)}>{rowData.text}</Text>}
        />
      </View>
    )
  }
}
HomeMain.propTypes = {
  navigation: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeMain)