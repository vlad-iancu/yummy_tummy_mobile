import { StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Home from './home/Home';
import { Alert, StyleSheet, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ProgressBarContext } from '../App';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer/lib/typescript/src/types';
import axios from 'axios';
import Profile from './profile/Profile';
import { Profile as UserProfile } from './profile/profileReducer'
import useAuthToken from './utils/useAuthToken';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileThunk } from './profile/profileReducer';
import FastImage from 'react-native-fast-image';

const Drawer = createDrawerNavigator()

interface MainProps {
    navigation: StackNavigationProp<any, any>
}

interface User {
    id?: number,
    name?: string,
    phone?: string,
    email?: string,
    photoUrl?: string
}
export default function Main({ navigation }: MainProps) {
    let { setLoading } = useContext(ProgressBarContext)
    let [token, authError] = useAuthToken()
    let dispatch = useDispatch()
    let user: UserProfile = useSelector((state: any) => state.profile)
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
    }, [])
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
        if (authError) {
            goToLogin()
        }
    }, [authError, goToLogin])
    useEffect(() => {
        if (!authError && token) {
            if (user && !user.loaded)
                dispatch(fetchProfileThunk(token, setLoading))
        }
    }, [token, goToLogin, user])
    return (
        <Drawer.Navigator drawerContent={getDrawerContent(logout, user)} screenOptions={
            {
                headerShown: true,
            }
        }>
            <Drawer.Screen component={Home} name="Home" options={{ title: "Home" }} />
            <Drawer.Screen component={Profile} name="Profile" options={{ title: "Profile" }} />
        </Drawer.Navigator>
    )
}
function getDrawerContent(logout: () => void, { email, phone, name, photoUrl, }: User) {
    return function DrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
        return (
            <DrawerContentScrollView>
                <View>
                    <FastImage source={{ cache: "web", priority: "normal", uri: photoUrl }} style={styles.photo} />
                    <View style={styles.profileData}>
                        <Text style={[styles.text, { fontSize: 20, color: "black" }]}>{name}</Text>
                        <Text style={[styles.text, { fontSize: 14 }]}>{email}</Text>
                        <Text style={[styles.text, { fontSize: 14 }]}>{phone}</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => { logout() }} />
            </DrawerContentScrollView>
        )
    }
}
const styles = StyleSheet.create({
    photo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        margin: 10,
    },
    profileData: {
        margin: 10
    },
    text: {
        color: "grey"
    }
})
