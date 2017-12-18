import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, ListView, View, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions';

class MTest extends Component {

  state = {  }

  render() {
    return(
      <View>
        <Button //this.props.actions.fetchData()
          onPress={() => this.props.fetchData()}
          title="Load Data"
        />
        {
          this.props.appData.isFetching && <Text>Loading</Text>
        }
        {
          this.props.appData.data.length ? (
            this.props.appData.data.map((person, i) => {
              return <View key={i}>
                      <Text>{'Name: ' + person.name}</Text>
                      <Text>{'Age: ' + person.age}</Text>
                    </View>
            })  
          ) : null
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  appData: state.testData
})

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(TodoActions.fetchData()),
  // actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MTest)