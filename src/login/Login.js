import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { TextInput, TouchableNativeFeedback } from 'react-native-gesture-handler'
import Background from '../../assets/login.svg'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
export default function Login({ navigation }) {
    return (
        <View style={styles.container}>

            <Background style={styles.background} />

            <View style={styles.cardContainer}>

                <View style={styles.textContainer}>

                    <EmailIcon width={16} height={16} marginTop={16} marginLeft={10} marginRight={5} />

                    <TextInput style={styles.text} placeholder="Email" selectionColor={"#00000077"} />

                </View>
                <View style={styles.textContainer}>

                    <PhoneIcon width={16} height={16} marginTop={16} marginLeft={10} marginRight={5} />

                    <TextInput style={styles.text} placeholder="Phone" />

                </View>
                <View style={styles.textContainer}>

                    <TextInput style={[styles.text, { marginLeft: 40 }]} placeholder="Password" />

                </View>
                <View style={styles.buttonLarge}>

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
                        useForeground={true}
                        onPress={(e) => console.log("Login button pressed")}>
                        <View style={styles.touchable}>

                            <Text style={styles.buttonText}>Login</Text>

                        </View>

                    </TouchableNativeFeedback>

                </View>

                <View style={{ marginLeft: 10, marginBottom: 10, flexDirection: "row" }}>

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
        elevation: 5,
        shadowColor: "lightgray",
        shadowRadius: 3,
    },
    text: {
        flex: 1,
        margin: 10,
        height: 30,
        borderStyle: "solid",
        borderRadius: 15,
        padding: 5,
        backgroundColor: "white",
        elevation: 3,
        shadowColor: "lightgray",
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 0 },
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
        fontWeight: "bold",
        marginLeft: 5,
    }
})