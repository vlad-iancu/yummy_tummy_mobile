import { StackNavigationProp } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationProp } from '@react-navigation/drawer'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Home from './home/Home';
import { Alert, StyleSheet, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { ProgressBarContext } from '../App';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer/lib/typescript/src/types';
import Profile from './profile/Profile';
import { Profile as UserProfile } from './profile/profileReducer'
import useAuthToken from './utils/useAuthToken';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileThunk } from './profile/profileReducer';
import FastImage from 'react-native-fast-image';
import { LanguageContext } from './GlobalContext';
import Settings from './settings/Settings';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

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
    let { language } = useContext(LanguageContext)
    const goToLogin = useCallback((message: string = language.notAuthenticated) => {
        Alert.alert("", message,
            [
                {
                    text: language.goToLogin,
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
    }, [language])
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
            <Drawer.Screen component={Home} name={language.home} options={{ headerTitle: "" }} />
            <Drawer.Screen component={Profile} name={language.profile} options={{ title: language.profile }} />
            <Drawer.Screen component={Settings} name={language.settings} options={{ title: language.settings }} />
        </Drawer.Navigator>
    )
}
function getDrawerContent(logout: () => void, { email, phone, name, photoUrl, }: User) {
    let { language } = useContext(LanguageContext)
    return function DrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
        return (
            <DrawerContentScrollView>
                <View>
                    {
                        photoUrl ? <FastImage source={{ cache: "web", priority: "normal", uri: photoUrl }} style={styles.photo} /> :
                        <FontAwesomeIcon style={styles.placeholder} size={70} name="user-circle-o" color="#77777788" />
                    }
                    <View style={styles.profileData}>
                        <Text style={[styles.text, { fontSize: 20, color: "black" }]}>{name}</Text>
                        <Text style={[styles.text, { fontSize: 14 }]}>{email}</Text>
                        <Text style={[styles.text, { fontSize: 14 }]}>{phone}</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label={language.logout} onPress={() => { logout() }} />
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
    placeholder: {
        margin: 10,
    },
    profileData: {
        margin: 20
    },
    text: {
        color: "grey"
    }
})
