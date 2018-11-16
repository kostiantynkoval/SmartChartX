import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store, { persistor } from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { NativeRouter } from 'react-router-native'
import { Switch,  Route } from 'react-router'
import SignInScreen from './src/auth/SignInScreen'
import PrivateRoute from './src/hoc/PrivateRoute'
import SkillsScreen from './src/components/SkillsScreen'


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <NativeRouter>
            <Switch>
              <Route path="/sign-in" component={SignInScreen}/>
              <PrivateRoute exact path="/" component={SkillsScreen}/>
            </Switch>
          </NativeRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App