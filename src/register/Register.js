import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native'
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Background from '../../assets/login.svg';
import axios from 'axios'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import UserIcon from '../../assets/user.svg'
import { BASE_URL as baseURL, DISPLAY_MODAL, LOADING } from '../Constants'
import { useDispatch, useSelector } from 'react-redux';
export default function Register({ navigation }) {

    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [phone, setPhone] = useState("")
    let [password, setPassword] = useState("")
    let register = () => {
        console.log("Entered register")
        dispatch({ type: LOADING, payload: { loading: true } })
        console.log("Dispatched loading state")

        axios.post(`${baseURL}/register`, { email, name, phone, password } )
            .then(result => {
                console.log("Got result from server")
                let text = ""
                console.log(result.status)
                if (result.status == 200) text = "Registration successful"
                else text = result.data.message
                console.log(result.data)
                Alert.alert(null, text)
            })
            .catch(err => {
                console.log("Got error from server: " + err)
                console.log(err.response.data)
                Alert.alert(null, err.response.data.message)
            })
            .finally(() => {
                console.log("Resetting loading to false")
                dispatch({ type: LOADING, payload: { loading: false } })
            })
    }

    let dispatch = useDispatch();
    return (
        <View style={styles.container}>

            <Background style={styles.background} />

            <View style={styles.cardContainer}>

                <View style={styles.textContainer}>

                    <UserIcon width={16} height={16} marginTop={16} marginLeft={10} marginRight={5} />

                    <TextInput style={styles.text} placeholder="Name" selectionColor={"#00000077"} value={name} onChangeText={setName} />

                </View>

                <View style={styles.textContainer}>

                    <EmailIcon width={16} height={16} marginTop={16} marginLeft={10} marginRight={5} />

                    <TextInput style={styles.text} placeholder="Email" selectionColor={"#00000077"} value={email} onChangeText={setEmail} />

                </View>
                <View style={styles.textContainer}>

                    <PhoneIcon width={16} height={16} marginTop={16} marginLeft={10} marginRight={5} />

                    <TextInput style={styles.text} placeholder="Phone" selectionColor={"#00000077"} value={phone} onChangeText={setPhone} />

                </View>
                <View style={styles.textContainer}>

                    <TextInput style={[styles.text, { marginLeft: 40 }]} placeholder="Password" selectionColor={"#00000077"}
                        value={password} onChangeText={setPassword} secureTextEntry={true} />

                </View>
                <View style={styles.buttonLarge}>

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple("#FFFFFF", false,)}
                        useForeground={true}
                        onPress={register}>
                        <View style={styles.touchable}>

                            <Text style={styles.buttonText}>Register</Text>

                        </View>

                    </TouchableNativeFeedback>

                </View>

                <View style={{ marginLeft: 10, marginBottom: 10, flexDirection: "row" }}>

                    <Text>Already have an account?</Text>

                    <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Sign In</Text>

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
        height: 350,
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
        margin: 10
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
        marginLeft: 5,
        fontWeight: "bold"
    }
})