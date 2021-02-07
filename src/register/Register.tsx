import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, Alert, TouchableNativeFeedback, TextInput } from 'react-native'
//import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Background from '../../assets/login.svg';
import axios from 'axios'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import UserIcon from '../../assets/user.svg'
import { BASE_URL as baseURL, DISPLAY_MODAL, LOADING } from '../Constants'
//import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack'
import RippleButton from '../utils/RippleButton';
import { ProgressBarContext } from '../../App';
interface RegisterProps {
    navigation: StackNavigationProp<any, any>
}
export default function Register({ navigation }: RegisterProps) {
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [phone, setPhone] = useState("")
    let [password, setPassword] = useState("")
    let progressBarContext = useContext(ProgressBarContext)
    let register = () => {
        progressBarContext.setLoading(true)
        axios.post(`/register`, { email, name, phone, password })
            .then(result => {
                let text = ""
                if (result.status == 200) text = "Registration successful"
                else text = result.data.message
                Alert.alert("", text)
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

            <Background style={styles.background} />

            <View style={styles.cardContainer}>

                <View style={styles.textContainer}>

                    <UserIcon width={16} height={16} style={styles.icon} />

                    <TextInput style={styles.text} placeholder="Name" selectionColor={"#00000077"} value={name} onChangeText={setName} />

                </View>

                <View style={styles.textContainer}>

                    <EmailIcon width={16} height={16} style={styles.icon} />

                    <TextInput style={styles.text} placeholder="Email" selectionColor={"#00000077"} value={email} onChangeText={setEmail} />

                </View>
                <View style={styles.textContainer}>

                    <PhoneIcon width={16} height={16} style={styles.icon} />

                    <TextInput style={styles.text} placeholder="Phone" selectionColor={"#00000077"} value={phone} onChangeText={setPhone} />

                </View>
                <View style={styles.textContainer}>

                    <TextInput style={[styles.text, { marginLeft: 40 }]} placeholder="Password" selectionColor={"#00000077"}
                        value={password} onChangeText={setPassword} secureTextEntry={true} />

                </View>
                <View style={styles.buttonLarge}>

                    <RippleButton duration={750} rippleColor="white" style={styles.touchable} onPress={register} >

                        <Text style={styles.buttonText}>Register</Text>

                    </RippleButton>

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
    /* marginTop={16} */ /* marginLeft={10} */ /* marginRight={5} */
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
        marginLeft: 5,
        fontWeight: "bold"
    }
})