/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack'
import React, { useState } from 'react'
import Login from './src/login/Login'
import Register from './src/register/Register'
import { applyMiddleware, createStore } from 'redux'
import rootReducer, { RootState } from './src/RootReducer'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import ProgressBarContainer from './src/utils/ProgressBarContainer'
import axios from 'axios'
import { BASE_URL } from './src/Constants'
import Main from './src/Main'
import { ProgressBarContext } from './src/GlobalContext'
import LanguageProvider from './src/utils/LanguageProvider'
import ValidateAccount from './src/validate/ValidateAccount'

axios.defaults.baseURL = BASE_URL

const Stack = createStackNavigator<RootStackParamList>()

const enhancer = applyMiddleware(thunkMiddleware)
//const persistedReducer = persistReducer({ key: "root", storage }, rootReducer)
const store = createStore(rootReducer, enhancer)
//const persistor = persistStore(store)
//const ProgressBarContext = React.createContext({ loading: false, setLoading: (loading: boolean) => { } })
//const LanguageContext = React.createContext({ language: "en", setLanguage: (lang: string) => { } })
type RootStackParamList = {
  Main: undefined,
  Login: undefined,
  Register: undefined,
  Validate: { email?: string, phone?: string }
}
export default function App(props: any) {
  let [loading, setLoading] = useState(false)
  return (
    <Provider store={store}>
        <ProgressBarContext.Provider value={{ loading, setLoading }}>
          <LanguageProvider>
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
                  <Stack.Screen name="Validate" component={ValidateAccount} options={{ headerShown: false }} />
                </Stack.Navigator>
              </NavigationContainer>
            </ProgressBarContainer>
          </LanguageProvider>
        </ProgressBarContext.Provider>
    </Provider>
  )
}

export { ProgressBarContext }