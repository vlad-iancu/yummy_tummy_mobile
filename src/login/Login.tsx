import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableNativeFeedback, Alert, Button } from 'react-native'
import axios from 'axios'
import Background from '../../assets/login.svg'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import RippleButton from '../utils/RippleButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { ProgressBarContext } from '../../App'
import EncryptedStorage from 'react-native-encrypted-storage'
import { LanguageContext } from '../GlobalContext'
import { useDispatch } from 'react-redux'
import { fetchProfileThunk } from '../profile/profileReducer'

type RootStackParamList = {
    Main: undefined,
    Login: undefined,
    Register: undefined,
    Validate: { email?: string, phone?: string }
}
interface LoginProps {
    navigation: StackNavigationProp<RootStackParamList, "Login">
}

export default function Login({ navigation }: LoginProps) {
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [password, setPassword] = useState("")
    let progressBarContext = useContext(ProgressBarContext)
    let { language } = useContext(LanguageContext)
    let dispatch = useDispatch()
    useEffect(() => {
        async function checkIfUserIsValidating() {
            try {
                let email = await EncryptedStorage.getItem("emailToValidate")
                let phone = await EncryptedStorage.getItem("phoneToValidate")
                if (phone || email) {
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: "Validate", params: { email, phone } }
                        ]
                    })
                }
            }
            catch (err) {

            }
        }
        checkIfUserIsValidating()
    }, [])
    const login = () => {
        progressBarContext.setLoading(true)
        axios.post("/login", { email, phone, password })
            .then(result => {
                console.log("We are setting this token in login:" + result.data.token)
                EncryptedStorage.setItem("authToken", result.data.token)
                    .then(() => {
                        dispatch(fetchProfileThunk(result.data.token, progressBarContext.setLoading))
                        navigation.reset({
                            index: 0,
                            routes: [
                                { name: "Main" }
                            ]
                        })
                        navigation.navigate("Main")
                    })
            })
            .catch(err => {
                Alert.alert("", err.response.data.message)
            })
            .finally(() => {
                progressBarContext.setLoading(false)
            })

    }
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