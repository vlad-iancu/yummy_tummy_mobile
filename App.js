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
import React from 'react'
import Login from './src/login/Login'
import Register from './src/register/Register'
import { Easing } from "react-native";
const Stack = createStackNavigator()

export default function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register" screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
