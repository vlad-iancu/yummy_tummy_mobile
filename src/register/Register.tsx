import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native'
import Background from '../../assets/login.svg';
import axios from 'axios'
import EmailIcon from '../../assets/email.svg'
import PhoneIcon from '../../assets/phone.svg'
import UserIcon from '../../assets/user.svg'
import { StackNavigationProp } from '@react-navigation/stack'
import RippleButton from '../utils/RippleButton';
import { ProgressBarContext } from '../App';
import { LanguageContext } from '../GlobalContext';

interface RegisterProps {
    navigation: StackNavigationProp<any, any>
}
export default function Register({ navigation }: RegisterProps) {
    let [email, setEmail] = useState("")
    let [name, setName] = useState("")
    let [phone, setPhone] = useState("")
    let [password, setPassword] = useState("")
    let progressBarContext = useContext(ProgressBarContext)
    let language = useSelector<RootState,Language>(state => state.language)
    let register = () => {
        progressBarContext.setLoading(true)
        axios.post(`/register`, { email, name, phone, password })
            .then(result => {
                let text = ""
                if (result.status == 200) text = language.registrationSuccessful
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
                    <TextInput style={styles.text} placeholder={language.name} selectionColor={"#00000077"} value={name} onChangeText={setName} />
                </View>
                <View style={styles.textContainer}>
                    <EmailIcon width={16} height={16} style={styles.icon} />
                    <TextInput style={styles.text} placeholder={language.email} selectionColor={"#00000077"} value={email} onChangeText={setEmail} />
                </View>
                <View style={styles.textContainer}>
                    <PhoneIcon width={16} height={16} style={styles.icon} />
                    <TextInput style={styles.text} placeholder={language.phone} selectionColor={"#00000077"} value={phone} onChangeText={setPhone} />
                </View>
                <View style={styles.textContainer}>
                    <TextInput style={[styles.text, { marginLeft: 40 }]} placeholder={language.password} selectionColor={"#00000077"}
                        value={password} onChangeText={setPassword} secureTextEntry={true} />
                </View>
                <View style={styles.buttonLarge}>
                    <RippleButton duration={750} rippleColor="white" style={styles.touchable} onPress={register} >
                        <Text style={styles.buttonText}>{language.register}</Text>
                    </RippleButton>
                </View>
                <View style={{ marginLeft: 10, marginBottom: 10, flexDirection: "row" }}>
                    <Text>{language.alreadyHaveAnAccountQuestion}</Text>
                    <Text style={styles.link} onPress={() => navigation.navigate("Login")}>{language.signIn}</Text>
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
        marginLeft: 5,
        fontWeight: "bold"
    }
})