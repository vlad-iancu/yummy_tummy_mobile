/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack'
import React, { useState } from 'react'
import Login from './login/Login'
import Register from './register/Register'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './RootReducer'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import ProgressBarContainer from './utils/ProgressBarContainer'
import axios from 'axios'
import { BASE_URL } from './Constants'
import Main from './Main'
import {ProgressBarContext} from './GlobalContext'
import en from './locales/en'
import ro from './locales/ro'
import LanguageProvider from './utils/useLanguageSetup'
import store from './Store'
import useLanguageSetup from './utils/useLanguageSetup'
axios.defaults.baseURL = BASE_URL

const Stack = createStackNavigator()

/* const enhancer = applyMiddleware(thunkMiddleware)

const store = createStore(rootReducer, enhancer) */

export default function App(props: any) {
  return (
    <Provider store={store}>
          <ProgressBarContainer>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login" screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </ProgressBarContainer>
    </Provider>
  )
}

export { ProgressBarContext }