import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {logout} from '../store/actions'
import { Appbar } from 'react-native-paper';

export function withHeader(WrappedComponent) {
  class Header extends Component {

    logoutUser = () => {
      console.log('pressed')
      this.props.logout()
    }

    goBack = () => console.log('Went back');

    render() {
      return (
        <View style={styles.container}>
          <Appbar.Header style={styles.header}>
            {/*<Appbar.BackAction*/}
              {/*onPress={this.goBack}*/}
            {/*/>*/}
            <Appbar.Content
              title="Skills"
              subtitle="Developer's skills chart"
            />
            <Appbar.Action icon={require('../assets/images/sign-out-alt-solid.png')} onPress={this.logoutUser} />
          </Appbar.Header>
          <WrappedComponent {...this.props}/>
          </View>
        )

    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    header: {
      backgroundColor: 'darkblue',
    }
  });

  return connect(null, dispatch => ({
    logout: () => dispatch(logout()),
  }))(Header)
}