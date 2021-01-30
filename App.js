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
import { createStore } from 'redux'
import initialStoreState from './src/GlobalStore'
import rootReducer from './src/RootReducer'
import { Provider } from 'react-redux'
import ModalContainer from './src/alert-modal/ModalContainer'
import ProgressBarContainer from './src/utils/ProgressBarContainer'
const Stack = createStackNavigator()

const store = createStore(rootReducer)

export default function App(props) {
  return (
    <Provider store={store}>
        <ProgressBarContainer>
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
        </ProgressBarContainer>
    </Provider>
  )
}
