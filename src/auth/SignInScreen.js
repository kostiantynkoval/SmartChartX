import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import {login} from '../store/actions/index';
import {LOGIN_SUCCESS} from "../store/actions/actionTypes";

class SignInScreen extends React.Component {

  signIn = () => {
    this.props.login({
      email: 'konstantinkoval68@gmail.com',
      password: 'smartit2017'
    }).then(res => {
      if(res.type === LOGIN_SUCCESS) {
        this.props.history.push('/')
      }
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={this.signIn}><Text>SignIn</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  },
});

export default connect(
  null,
  dispatch => ({
    login: data => dispatch(login(data))
  })
)(SignInScreen)