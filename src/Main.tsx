import { StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationProp } from '@react-navigation/drawer'
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { DrawerNavigationState, NavigationContainer, useNavigation } from '@react-navigation/native';
import Home from './home/Home';
import { Alert, Text } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ProgressBarContext } from '../App';
import { DrawerContentComponentProps, DrawerContentOptions, DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import axios from 'axios';

const Drawer = createDrawerNavigator()

interface MainProps {
    navigation: StackNavigationProp<any, any>
}

export default function Main({ navigation }: MainProps) {
    useNavigation()

    let [token, setToken] = useState("")
    let { loading, setLoading } = useContext(ProgressBarContext)
    const goToLogin = () => {
        Alert.alert("", "You are not authenticated",
            [
                {
                    text: "Go to login",
                    onPress: () => { navigation.reset({
                        index: 0,
                        routes: [
                            {name: "Login"}
                        ]
                    }) }
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
                    {name: "Login"}
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
                result ? setToken(token) : goToLogin()
            })
            .catch((_) => {
                setLoading(false)
                goToLogin()
            })
    }, [])
    useEffect(() => {
        if(token) {
            //here will be the token validation call
        }
    },[token])
    console.log("token is:" + token + " from main")
    return (
        <Drawer.Navigator drawerContent={getDrawerContent(logout)}>
            <Drawer.Screen component={Home} name="Home" />
        </Drawer.Navigator>
    )
}
function getDrawerContent(logout: () => void) {
    return function DrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
    
        return (
            <DrawerContentScrollView>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => {logout()}} />
            </DrawerContentScrollView>
        )
    }
}
