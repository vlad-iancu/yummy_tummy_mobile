import { StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationProp } from '@react-navigation/drawer'
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { DrawerNavigationState, NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './home/Home';
import { Alert, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ProgressBarContext } from '../App';
import { DrawerContentComponentProps, DrawerContentOptions, DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import axios from 'axios';

const Drawer = createDrawerNavigator()

interface MainProps {
    navigation: StackNavigationProp<any, any>
}
interface WrapperProps {
    navigation: DrawerNavigationProp<any, any>
    component: (props: ScreenProps) => JSX.Element,
    title: string
}
interface ScreenProps {
    navigation: DrawerNavigationProp<any, any>
}
interface User {
    id?: number,
    name?: string,
    phone?: string,
    email?: string
}
export default function Main({ navigation }: MainProps) {
    let [token, setToken] = useState("")
    let { loading, setLoading } = useContext(ProgressBarContext)
    let [user, setUser] = useState({})
    const goToLogin = (message: string = "You are not authenticated") => {
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
    }
    const logout = () => {
        EncryptedStorage.removeItem("authToken")
            .then(result => {
                navigation.reset({
                    index: 0,
                    routes: [
                        { name: "Login" }
                    ]
                })
            })
    }
    useEffect(() => {
        setLoading(true)
        EncryptedStorage.getItem("authToken")
            .then(result => {
                console.log("Got token:" + result)
                setLoading(false)
                if (result) setToken(result)
                else goToLogin()
            })
            .catch((_) => {
                setLoading(false)
                goToLogin()
            })
    }, [])
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
                    console.log("Data is:")
                    console.log(result.data)
                    setUser(result.data)
                })
                .catch(err => {
                    goToLogin("Could not get the profile information")
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [token])
    return (
        <Drawer.Navigator drawerContent={getDrawerContent(logout, user)} screenOptions = {
            {
                headerShown: true,
            }
        }>
            <Drawer.Screen component={Home} name="Home" options={{ title: "Home" }} />
        </Drawer.Navigator>
    )
}
function getDrawerContent(logout: () => void, { id, email, phone, name }: User) {
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
