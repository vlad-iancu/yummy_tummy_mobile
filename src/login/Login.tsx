import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Background from '../../assets/login.svg'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import RippleButton from '../utils/RippleButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store'
import { Language } from '../locales/Language'
import useLanguageSetup from '../utils/useLanguageSetup'
import { loginAsyncThunk } from './AuthThunks'

interface LoginProps {
    navigation: StackNavigationProp<any, any>
}
export default function Login({ navigation }: LoginProps) {
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [password, setPassword] = useState("")
    let language = useSelector<RootState, Language>(state => state.ui.language)
    let token = useSelector<RootState, string>(state => state.auth.token)
    let dispatch = useDispatch()
    useLanguageSetup()
    const login = () => dispatch(loginAsyncThunk({ email, phone, password }))
    useEffect(() => {
        if (token) {
            navigation.reset({
                index: 0,
                routes: [
                    {name: "Main"}
                ]
            })
        }
    }, [token])
    return (
        <View style={styles.container}>
            <Background
                style={styles.background} />
            <View
                style={styles.cardContainer}>
                <View
                    style={styles.textContainer}>
                    <EmailIcon width={16} height={16} style={styles.icon} />
                    <TextInput
                        style={styles.text}
                        placeholder={language.email}
                        selectionColor={"#00000077"}
                        onChangeText={setEmail} />
                </View>
                <View style={styles.textContainer}>
                    <PhoneIcon width={16} height={16} style={styles.icon} />
                    <TextInput
                        style={styles.text}
                        placeholder={language.phone}
                        selectionColor={"#00000077"}
                        onChangeText={setPhone} />
                </View>
                <View style={styles.textContainer}>
                    <TextInput
                        style={[styles.text, { marginLeft: 40 }]}
                        placeholder={language.password}
                        selectionColor={"#00000077"}
                        secureTextEntry={true}
                        onChangeText={setPassword} />
                </View>
                <View style={styles.buttonLarge}>
                    <RippleButton
                        duration={750}
                        rippleColor="white"
                        style={styles.touchable}
                        onPress={login}>
                        <Text style={styles.buttonText}>{language.login}</Text>
                    </RippleButton>
                </View>
                <View
                    style={{ marginLeft: 10, marginBottom: 10, flexDirection: "row" }}>
                    <Text>{language.noAccountQuestion}</Text>
                    <Text style={styles.link} onPress={() => navigation.navigate("Register")} >{language.signUp}</Text>
                </View>
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        width: "100%",
        height: "100%",
        position: "absolute"
    },
    cardContainer: {
        width: 350,
        height: 250,
        backgroundColor: "white",
        borderRadius: 10,
    },
    text: {
        flex: 1,
        margin: 10,
        height: 30,
        borderStyle: "solid",
        borderRadius: 15,
        padding: 5,
        borderColor: "lightgray",
        borderWidth: 1,
    },
    textContainer: {
        flexDirection: "row"
    },
    icon: {
        marginTop: 16,
        marginLeft: 10,
        marginRight: 5
    },
    buttonLarge: {
        backgroundColor: "royalblue",
        width: "40%",
        height: 30,
        margin: 10,
        marginTop: 20,
        borderRadius: 15,
        alignSelf: "flex-end"

    },
    touchable: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    buttonText: {
        color: "white"
    },
    link: {
        color: "royalblue",
        fontWeight: "bold",
        marginLeft: 5,
    }
})