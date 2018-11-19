import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import {login} from '../store/actions/index'
import {LOGIN_SUCCESS} from '../store/actions/actionTypes'
import { TextInput, Card, Title, Button } from 'react-native-paper'

class SignInScreen extends React.Component {

  state = {
    email: 'konstantinkoval68@gmail.com',
    password: 'smartit2017'
  }

  onChange = (name, text) => {
    this.setState({[name]: text})
  }

  signIn = () => {
    if(this.state.email === '' ) {
      console.log('Email error')
      return false
    }
    if(this.state.password === '' ) {
      console.log('Password error')
      return false
    }
    this.props.login({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if(res.type === LOGIN_SUCCESS) {
        this.props.history.push('/')
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title style={{marginBottom: 15}}>Log In</Title>
            <TextInput
              theme={{
                colors: { primary: 'darkblue' }
              }}
              style={styles.input}
              name="email"
              mode="outlined"
              label='Email'
              value={this.state.email}
              onChangeText={(text) => this.onChange('email',text)}
            />
            <TextInput
              theme={{
                colors: { primary: 'darkblue' }
              }}
              style={styles.input}
              name="password"
              mode="outlined"
              label='Password'
              value={this.state.password}
              onChangeText={(text) => this.onChange('password',text)}
            />
          </Card.Content>
          <Card.Actions style={{justifyContent: 'flex-end'}}>
            <Button style={{marginRight: 8, marginBottom: 8}} mode='contained' color='darkblue' onPress={this.signIn}>SignIn</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingBottom: 125,
    backgroundColor: '#fff',
    justifyContent: 'center'

  },
  input: {
    marginBottom: 15
  }
});

export default connect(
  null,
  dispatch => ({
    login: data => dispatch(login(data))
  })
)(SignInScreen)