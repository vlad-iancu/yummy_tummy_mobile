import { StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Home from './home/Home';
import { Alert, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ProgressBarContext } from '../App';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer/lib/typescript/src/types';
import axios from 'axios';
import Profile from './profile/Profile';
import useAuthToken from './utils/useAuthToken';

const Drawer = createDrawerNavigator()

interface MainProps {
    navigation: StackNavigationProp<any, any>
}

interface User {
    id?: number,
    name?: string,
    phone?: string,
    email?: string
}
export default function Main({ navigation }: MainProps) {
    let { setLoading } = useContext(ProgressBarContext)
    let [user, setUser] = useState({})
    let [token, authError] = useAuthToken()
    const goToLogin = useCallback((message: string = "You are not authenticated") => {
        Alert.alert("", message,
            [
                {
                    text: "Go to login",
                    onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [
                                { name: "Login" }
                            ]
                        })
                    }
                }
            ], {
            cancelable: false
        })
    },[])
    const logout = () => {
        EncryptedStorage.removeItem("authToken")
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: "Login" }
                    ]
                })
            })
    }
    useEffect(() => {
        if(authError) {
            goToLogin()
        }
    },[authError, goToLogin])
    useEffect(() => {
        console.log("token is:" + token + " from main")
        if (token) {
            console.log("Entered the get request")
            setLoading(true)
            axios.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(result => {
                    setUser(result.data)
                })
                .catch(() => {
                    goToLogin("Could not get the profile information")
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [token, goToLogin])
    return (
        <Drawer.Navigator drawerContent={getDrawerContent(logout, user)} screenOptions = {
            {
                headerShown: true,
            }
        }>
            <Drawer.Screen component={Home} name="Home" options={{ title: "Home" }} />
            <Drawer.Screen component={Profile} name="Profile" options={{title: "Profile"}} />
        </Drawer.Navigator>
    )
}
function getDrawerContent(logout: () => void, { email, phone, name }: User) {
    return function DrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
        return (
            <DrawerContentScrollView>
                <View>
                    <Text>{name}</Text>
                    <Text>{email}</Text>
                    <Text>{phone}</Text>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => { logout() }} />
            </DrawerContentScrollView>
        )
    }
}
