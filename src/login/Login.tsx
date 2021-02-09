import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableNativeFeedback, Alert, Button } from 'react-native'
import axios from 'axios'
import Background from '../../assets/login.svg'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import RippleButton from '../utils/RippleButton'
import { StackNavigationProp } from '@react-navigation/stack'
import { ProgressBarContext } from '../../App'
import EncryptedStorage from 'react-native-encrypted-storage'

interface LoginProps {
    navigation: StackNavigationProp<any, any>
}

export default function Login({ navigation }: LoginProps) {
    let [email, setEmail] = useState("")
    let [phone, setPhone] = useState("")
    let [password, setPassword] = useState("")
    let progressBarContext = useContext(ProgressBarContext)
    
    const login = () => {
        progressBarContext.setLoading(true)
        axios.post("/login", { email, phone, password })
            .then(result => {
                if (result.status == 200) {
                    Alert.alert("", "Login successful")
                }
                EncryptedStorage.setItem("authToken", result.data.token)
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
                        placeholder="Email"
                        selectionColor={"#00000077"}
                        onChangeText={setEmail} />
                </View>
                <View style={styles.textContainer}>
                    <PhoneIcon width={16} height={16} style={styles.icon} />
                    <TextInput
                        style={styles.text}
                        placeholder="Phone"
                        selectionColor={"#00000077"}
                        onChangeText={setPhone} />
                </View>
                <View style={styles.textContainer}>
                    <TextInput
                        style={[styles.text, { marginLeft: 40 }]}
                        placeholder="Password"
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
                        <Text style={styles.buttonText}>Login</Text>
                    </RippleButton>
                </View>
                <View
                    style={{ marginLeft: 10, marginBottom: 10, flexDirection: "row" }}>
                    <Text>Don't have an account?</Text>
                    <Text style={styles.link} onPress={() => navigation.navigate("Register")} >Sign up</Text>
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
        //    elevation: 5,
        //    shadowColor: "lightgray",
        //    shadowRadius: 3,
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
        //backgroundColor: "white",
        //elevation: 3,
        //shadowColor: "lightgray",
        //shadowRadius: 1,
        //shadowOffset: { width: 0, height: 0 },
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